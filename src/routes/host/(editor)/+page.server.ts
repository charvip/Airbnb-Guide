import { redirect } from '@sveltejs/kit';
import { requireHost, signOutHost } from '#lib/server/auth.js';
import { getContent, storageConnected } from '#lib/server/content.js';
import { save, slugify, text } from '#lib/server/host-actions.js';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const { tourStops, appliances, activities } = await getContent();
	return { tourStops, appliances, activities, storageConnected: storageConnected() };
};

export const actions: Actions = {
	createDevice: async ({ request, cookies }) => {
		requireHost(cookies);
		const name = text(await request.formData(), 'name') || 'New device';
		const { appliances } = await getContent();
		const id = slugify(
			name,
			appliances.map((a) => a.id)
		);
		const result = await save(cookies, (c) => {
			c.appliances.push({
				id,
				name,
				emoji: '🔌',
				summary: '',
				location: '',
				suppliesLocation: '',
				steps: [],
				troubleshooting: [],
				photos: []
			});
		});
		if ('saved' in result) redirect(303, `/host/devices/${id}`);
		return result;
	},

	createActivity: async ({ request, cookies }) => {
		requireHost(cookies);
		const name = text(await request.formData(), 'name') || 'New activity';
		const { activities } = await getContent();
		const id = slugify(
			name,
			activities.map((a) => a.id)
		);
		const result = await save(cookies, (c) => {
			c.activities.push({ id, name, emoji: '✨', summary: '', details: [], photos: [] });
		});
		if ('saved' in result) redirect(303, `/host/activities/${id}`);
		return result;
	},

	logout: async ({ cookies }) => {
		signOutHost(cookies);
		redirect(303, '/');
	}
};
