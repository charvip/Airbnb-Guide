import { error } from '@sveltejs/kit';
import { getContent } from '#lib/server/content.js';
import { lines, photos, save, text } from '#lib/server/host-actions.js';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { tourStops } = await getContent();
	const stop = tourStops.find((s) => s.id === params.id);
	if (!stop) error(404, 'Tour stop not found');
	return { stop };
};

export const actions: Actions = {
	default: async ({ request, cookies, params }) => {
		const form = await request.formData();
		return save(cookies, (c) => {
			const stop = c.tourStops.find((s) => s.id === params.id);
			if (!stop) throw new Error('That tour stop no longer exists.');
			stop.title = text(form, 'title');
			stop.emoji = text(form, 'emoji');
			stop.summary = text(form, 'summary');
			stop.details = lines(form, 'details');
			stop.photos = photos(form);
		});
	}
};
