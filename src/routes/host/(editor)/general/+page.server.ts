import { getContent } from '#lib/server/content.js';
import { lines, save, text } from '#lib/server/host-actions.js';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const { house, host, essentials } = await getContent();
	return { house, host, essentials };
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const form = await request.formData();
		return save(cookies, (c) => {
			c.house = { name: text(form, 'houseName'), welcome: text(form, 'welcome') };
			c.host = {
				name: text(form, 'hostName'),
				phone: text(form, 'hostPhone'),
				email: text(form, 'hostEmail'),
				responseNote: text(form, 'responseNote')
			};
			c.essentials = {
				parking: text(form, 'parking'),
				doorLock: { code: text(form, 'doorCode'), instructions: text(form, 'doorInstructions') },
				wifi: { network: text(form, 'wifiNetwork'), password: text(form, 'wifiPassword') },
				checkInTime: text(form, 'checkInTime'),
				checkoutTime: text(form, 'checkoutTime'),
				checkoutChecklist: lines(form, 'checkoutChecklist'),
				quietHours: text(form, 'quietHours')
			};
		});
	}
};
