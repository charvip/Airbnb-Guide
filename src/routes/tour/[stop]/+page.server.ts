import { error } from '@sveltejs/kit';
import { getContent } from '#lib/server/content.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { tourStops, appliances, essentials } = await getContent();
	const index = tourStops.findIndex((s) => s.id === params.stop);
	const stop = tourStops[index];
	if (!stop) error(404, 'Tour stop not found');

	const prev = tourStops[index - 1];
	const next = tourStops[index + 1];
	return {
		stop,
		position: { index, total: tourStops.length },
		prev: prev && { href: `/tour/${prev.id}`, label: prev.title },
		next: next && { href: `/tour/${next.id}`, label: next.title },
		devices: stop.applianceIds
			.map((id) => appliances.find((a) => a.id === id))
			.filter((a) => a !== undefined),
		// Parking and checkout come from Essentials so they're only edited in one
		// place. Only these non-secret fields are sent (not the door code or WiFi).
		parking: essentials.parking,
		checkout: { time: essentials.checkoutTime, checklist: essentials.checkoutChecklist }
	};
};
