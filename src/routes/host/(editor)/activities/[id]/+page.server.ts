import { error, redirect } from '@sveltejs/kit';
import { getContent } from '#lib/server/content.js';
import { lines, photos, save, text } from '#lib/server/host-actions.js';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { activities } = await getContent();
	const activity = activities.find((a) => a.id === params.id);
	if (!activity) error(404, 'Activity not found');
	return { activity };
};

export const actions: Actions = {
	save: async ({ request, cookies, params }) => {
		const form = await request.formData();
		return save(cookies, (c) => {
			const activity = c.activities.find((a) => a.id === params.id);
			if (!activity) throw new Error('That activity no longer exists.');
			activity.name = text(form, 'name');
			activity.emoji = text(form, 'emoji');
			activity.summary = text(form, 'summary');
			activity.details = lines(form, 'details');
			activity.photos = photos(form);
		});
	},

	delete: async ({ cookies, params }) => {
		const result = await save(cookies, (c) => {
			c.activities = c.activities.filter((a) => a.id !== params.id);
		});
		if ('saved' in result) redirect(303, '/host');
		return result;
	}
};
