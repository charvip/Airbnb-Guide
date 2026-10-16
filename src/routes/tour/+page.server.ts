import { getContent } from '#lib/server/content.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const { tourStops } = await getContent();
	return { tourStops };
};
