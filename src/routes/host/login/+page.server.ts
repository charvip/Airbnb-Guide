import { fail, redirect } from '@sveltejs/kit';
import { hostConfigured, safeNext, signInHost } from '#lib/server/auth.js';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = ({ url }) => ({
	configured: hostConfigured(),
	next: safeNext(url.searchParams.get('next'), '/host', '/host')
});

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const form = await request.formData();
		const next = safeNext(form.get('next'), '/host', '/host');
		if (!signInHost(cookies, String(form.get('password') ?? ''))) {
			return fail(400, { error: 'Wrong password. Please try again.' });
		}
		redirect(303, next);
	}
};
