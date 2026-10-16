import { error } from '@sveltejs/kit';
import { getContent } from '#lib/server/content.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { appliances } = await getContent();
	const device = appliances.find((a) => a.id === params.id);
	if (!device) error(404, 'Device not found');
	return { device };
};
