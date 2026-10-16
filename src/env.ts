import { defineEnvVars } from '@sveltejs/kit/env';

// Environment variables, read on the server through $app/env/private.
// Set them in Vercel → Project → Settings → Environment Variables, and in
// .env.local for local development. All are optional so the site still runs
// (with the host side locked and saving off) when they're missing.

const optional = (value: string | undefined) => value || undefined;

export const variables = defineEnvVars({
	HOST_PASSWORD: {
		schema: optional,
		description: 'Password for the host editor at /host. Without it the host side stays locked.'
	},
	GUEST_CODE: {
		schema: optional,
		description:
			'Passcode guests enter to see Essentials (door code, WiFi). Without it Essentials is open.'
	},
	BLOB_STORE_ID: {
		schema: optional,
		description: 'Added by Vercel when a Blob store is connected (OIDC credentials).'
	},
	BLOB_READ_WRITE_TOKEN: {
		schema: optional,
		description: 'Older static Blob credential; still supported.'
	}
});
