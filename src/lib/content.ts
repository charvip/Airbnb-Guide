import "server-only";
import { del, list, put } from "@vercel/blob";
import { revalidateTag, unstable_cache } from "next/cache";
import { defaultContent, type SiteContent } from "@/data/house";

// Where the guide's content lives.
//
// Vercel's servers can't save files to disk, so every host edit is written as
// a new JSON file in Vercel Blob under content/. Reads always pick the newest
// one. Each save gets a new random URL, which sidesteps CDN caching (an
// overwritten URL could keep serving the old copy for a while).
//
// Reads are cached and only refreshed when a host saves (plus once a day as a
// safety net). Without the cache, every guest page view would call list(),
// which Vercel bills as an "Advanced Operation" — the free Hobby plan only
// includes 2,000 a month, and Blob is blocked for 30 days if you go over.
//
// Without a Blob store connected (e.g. local dev), the default content from
// src/data/house.ts is used and saving is disabled.

const PREFIX = "content/site-";

// Vercel now connects Blob stores with short-lived OIDC credentials
// (BLOB_STORE_ID + a token Vercel rotates automatically); older connections
// use a static BLOB_READ_WRITE_TOKEN. The SDK handles both.
export const storageConnected = () =>
  Boolean(process.env.BLOB_STORE_ID || process.env.BLOB_READ_WRITE_TOKEN);

async function newestContentBlobs() {
  const { blobs } = await list({ prefix: PREFIX });
  return blobs.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
}

const CACHE_TAG = "site-content";

// Throws on failure (instead of returning defaults) so a temporary error is
// never cached; getContent() below catches it and falls back to the defaults.
async function loadFromBlob(): Promise<SiteContent> {
  const [newest] = await newestContentBlobs();
  if (!newest) return defaultContent;
  const res = await fetch(newest.url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Content fetch failed: ${res.status}`);
  const saved = (await res.json()) as Partial<SiteContent>;
  // Fill in any sections added to the defaults after this copy was saved.
  return { ...defaultContent, ...saved };
}

const loadCached = unstable_cache(loadFromBlob, [CACHE_TAG], {
  tags: [CACHE_TAG],
  revalidate: 60 * 60 * 24,
});

export async function getContent(): Promise<SiteContent> {
  if (!storageConnected()) return defaultContent;
  try {
    return await loadCached();
  } catch (err) {
    console.error("Could not load saved content, using defaults", err);
    return defaultContent;
  }
}

export async function saveContent(content: SiteContent) {
  if (!storageConnected()) {
    throw new Error("No Vercel Blob store connected, so changes can't be saved yet.");
  }
  await put(`${PREFIX}${Date.now()}.json`, JSON.stringify(content), {
    access: "public",
    addRandomSuffix: true,
    contentType: "application/json",
  });
  // Keep the 10 most recent versions as a simple undo history.
  const old = (await newestContentBlobs()).slice(10).map((b) => b.url);
  if (old.length) await del(old);
  // Make guests see the new version on their next page load.
  revalidateTag(CACHE_TAG);
}

export async function updateContent(change: (draft: SiteContent) => void) {
  // Edit the latest saved copy, not the cached one, so a save never builds on
  // stale data.
  const content = structuredClone(await loadFromBlob());
  change(content);
  await saveContent(content);
}
