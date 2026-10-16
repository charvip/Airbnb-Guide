import { getContent } from '#lib/server/content.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const { faqs, host } = await getContent();
	return { faqs, host };
};
