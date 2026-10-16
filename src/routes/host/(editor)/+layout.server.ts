import { guardHostPage } from '#lib/server/auth.js';
import type { LayoutServerLoad } from './$types';

// Every editor page needs the host to be signed in. Form actions don't run
// this load, so each action checks again (see save() in host-actions.ts).
export const load: LayoutServerLoad = ({ cookies, url }) => {
	guardHostPage(cookies, url);
};
