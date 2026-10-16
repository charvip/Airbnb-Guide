import { getContent } from '#lib/server/content.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const { activities } = await getContent();
	return { activities };
};
