import { fail, redirect } from '@sveltejs/kit';
import { safeNext, unlockGuest } from '#lib/server/auth.js';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = ({ url }) => ({
	next: safeNext(url.searchParams.get('next'), '/essentials')
});

// Checks the passcode a guest typed. If it matches, sets an httpOnly cookie so
// the protected pages let them in.
export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const form = await request.formData();
		const next = safeNext(form.get('next'), '/essentials');
		if (!unlockGuest(cookies, String(form.get('code') ?? '').trim())) {
			return fail(400, { error: "That passcode didn't work. Please try again." });
		}
		redirect(303, next);
	}
};
