import { getContent } from '#lib/server/content.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const { faqs } = await getContent();
	return { faqs };
};
