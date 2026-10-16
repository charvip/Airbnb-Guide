import { guardGuestPage } from '#lib/server/auth.js';
import { getContent } from '#lib/server/content.js';
import type { PageServerLoad } from './$types';

// Door code and WiFi: behind the guest passcode when GUEST_CODE is set.
export const load: PageServerLoad = async ({ cookies, url }) => {
	guardGuestPage(cookies, url);
	const { essentials } = await getContent();
	return { essentials };
};
