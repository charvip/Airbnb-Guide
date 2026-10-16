import { del, list, put } from '@vercel/blob';
import { getCache } from '@vercel/functions';
import { BLOB_READ_WRITE_TOKEN, BLOB_STORE_ID } from '$app/env/private';
import { defaultContent, type SiteContent } from '#lib/data/house.js';

// Where the guide's content lives.
//
// Vercel's servers can't save files to disk, so every host edit is written as
// a new JSON file in Vercel Blob under content/. Reads always pick the newest
// one. Each save gets a new random URL, which sidesteps CDN caching (an
// overwritten URL could keep serving the old copy for a while).
//
// Reads are cached in Vercel's Runtime Cache and only refreshed when a host
// saves (plus once a day as a safety net). Without the cache, every guest page
// view would call list(), which Vercel bills as an "Advanced Operation" — the
// free Hobby plan only includes 2,000 a month, and Blob is blocked for 30 days
// if you go over. Outside Vercel, getCache() falls back to an in-memory cache.
//
// Without a Blob store connected (e.g. local dev), the default content from
// src/lib/data/house.ts is used and saving is disabled.

const PREFIX = 'content/site-';
const CACHE_KEY = 'site-content';
const CACHE_TAG = 'site-content';

// Vercel now connects Blob stores with short-lived OIDC credentials
// (BLOB_STORE_ID + a token Vercel rotates automatically); older connections
// use a static BLOB_READ_WRITE_TOKEN. The SDK handles both.
export const storageConnected = () => Boolean(BLOB_STORE_ID || BLOB_READ_WRITE_TOKEN);

const cache = () => getCache({ namespace: 'airbnb-guide' });

async function newestContentBlobs() {
	const { blobs } = await list({ prefix: PREFIX });
	return blobs.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
}

// Throws on failure (instead of returning defaults) so a temporary error is
// never cached; getContent() below catches it and falls back to the defaults.
async function loadFromBlob(): Promise<SiteContent> {
	const [newest] = await newestContentBlobs();
	if (!newest) return defaultContent;
	const res = await fetch(newest.url, { cache: 'no-store' });
	if (!res.ok) throw new Error(`Content fetch failed: ${res.status}`);
	const saved = (await res.json()) as Partial<SiteContent>;
	// Fill in any sections added to the defaults after this copy was saved.
	return { ...defaultContent, ...saved };
}

export async function getContent(): Promise<SiteContent> {
	if (!storageConnected()) return defaultContent;
	try {
		const cached = (await cache().get(CACHE_KEY)) as SiteContent | null;
		if (cached) return cached;
		const content = await loadFromBlob();
		await cache().set(CACHE_KEY, content, { tags: [CACHE_TAG], ttl: 60 * 60 * 24 });
		return content;
	} catch (err) {
		console.error('Could not load saved content, using defaults', err);
		return defaultContent;
	}
}

async function saveContent(content: SiteContent) {
	await put(`${PREFIX}${Date.now()}.json`, JSON.stringify(content), {
		access: 'public',
		addRandomSuffix: true,
		contentType: 'application/json'
	});
	// Keep the 10 most recent versions as a simple undo history.
	const old = (await newestContentBlobs()).slice(10).map((b) => b.url);
	if (old.length) await del(old);
	// Make guests see the new version on their next page load.
	await cache().expireTag(CACHE_TAG);
}

export async function updateContent(change: (draft: SiteContent) => void) {
	if (!storageConnected()) {
		throw new Error("No Vercel Blob store connected, so changes can't be saved yet.");
	}
	// Edit the latest saved copy, not the cached one, so a save never builds on
	// stale data.
	const content = structuredClone(await loadFromBlob());
	change(content);
	await saveContent(content);
}
