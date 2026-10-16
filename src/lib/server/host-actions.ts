import { fail, type Cookies } from '@sveltejs/kit';
import type { SiteContent } from '#lib/data/house.js';
import { requireHost } from './auth';
import { updateContent } from './content';

// Shared helpers for the host editor's form actions. Every edit goes through
// save(): check the host is signed in, apply the change to the latest content,
// save it, and report back to the form.

export const text = (form: FormData, key: string) => String(form.get(key) ?? '').trim();

export const lines = (form: FormData, key: string) =>
	text(form, key)
		.split('\n')
		.map((l) => l.trim())
		.filter(Boolean);

export const photos = (form: FormData) => form.getAll('photos').map(String).filter(Boolean);

export async function save(cookies: Cookies, change: (c: SiteContent) => void) {
	requireHost(cookies);
	try {
		await updateContent(change);
	} catch (err) {
		return fail(400, { error: err instanceof Error ? err.message : 'Something went wrong.' });
	}
	return { saved: true };
}

export function slugify(name: string, taken: string[]) {
	const base =
		name
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-|-$/g, '') || 'item';
	let slug = base;
	for (let i = 2; taken.includes(slug); i++) slug = `${base}-${i}`;
	return slug;
}
