import { error, redirect } from '@sveltejs/kit';
import { getContent } from '#lib/server/content.js';
import { lines, photos, save, text } from '#lib/server/host-actions.js';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { appliances, tourStops } = await getContent();
	const device = appliances.find((a) => a.id === params.id);
	if (!device) error(404, 'Device not found');
	return {
		device,
		currentStop: tourStops.find((s) => s.applianceIds.includes(device.id))?.id ?? '',
		stopOptions: tourStops.map((s) => ({ value: s.id, label: s.title }))
	};
};

export const actions: Actions = {
	save: async ({ request, cookies, params }) => {
		const form = await request.formData();
		const id = params.id;
		const stopId = text(form, 'stopId');
		return save(cookies, (c) => {
			const device = c.appliances.find((a) => a.id === id);
			if (!device) throw new Error('That device no longer exists.');
			device.name = text(form, 'name');
			device.emoji = text(form, 'emoji');
			device.summary = text(form, 'summary');
			device.location = text(form, 'location');
			device.suppliesLocation = text(form, 'suppliesLocation');
			device.steps = lines(form, 'steps');
			device.troubleshooting = lines(form, 'troubleshooting');
			device.tips = lines(form, 'tips');
			device.photos = photos(form);
			// A device appears on at most one tour stop.
			for (const stop of c.tourStops) {
				stop.applianceIds = stop.applianceIds.filter((a) => a !== id);
				if (stop.id === stopId) stop.applianceIds.push(id);
			}
		});
	},

	delete: async ({ cookies, params }) => {
		const result = await save(cookies, (c) => {
			c.appliances = c.appliances.filter((a) => a.id !== params.id);
			for (const stop of c.tourStops) {
				stop.applianceIds = stop.applianceIds.filter((a) => a !== params.id);
			}
		});
		if ('saved' in result) redirect(303, '/host');
		return result;
	}
};
