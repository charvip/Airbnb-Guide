import { getContent } from '#lib/server/content.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const { house, essentials, tourStops } = await getContent();
	return {
		house,
		// Only the non-secret stay times; the door code and WiFi stay on /essentials.
		// checkInTime can be missing from content saved before it was added.
		stay: { checkIn: essentials.checkInTime ?? '', checkout: essentials.checkoutTime },
		tourStopCount: tourStops.length
	};
};
