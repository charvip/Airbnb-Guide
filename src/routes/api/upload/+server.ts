import { issueSignedToken } from '@vercel/blob';
import { handleUploadPresigned, type HandleUploadPresignedBody } from '@vercel/blob/client';
import { json } from '@sveltejs/kit';
import { isHost } from '#lib/server/auth.js';
import type { RequestHandler } from './$types';

// Photos upload straight from the host's browser to Vercel Blob. This route
// only hands out a short-lived presigned upload URL, and only to a signed-in
// host. Going direct avoids Vercel's ~4.5 MB request limit, which phone
// photos often exceed.
//
// Presigned URLs work with the OIDC credentials Vercel now uses for Blob
// stores (no long-lived read-write token needed). BLOB_WEBHOOK_PUBLIC_KEY,
// added by Vercel when the store is connected, is required by the SDK.

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/heic'];
const MAX_BYTES = 15 * 1024 * 1024;

export const POST: RequestHandler = async ({ request, cookies }) => {
	if (!isHost(cookies)) return json({ error: 'Not signed in as host.' }, { status: 401 });
	const body = (await request.json()) as HandleUploadPresignedBody;
	try {
		const result = await handleUploadPresigned({
			body,
			request,
			getSignedToken: async (pathname) => {
				if (!isHost(cookies)) throw new Error('Not signed in as host.');
				const token = await issueSignedToken({
					pathname,
					operations: ['put'],
					allowedContentTypes: ALLOWED_TYPES,
					maximumSizeInBytes: MAX_BYTES,
					validUntil: Date.now() + 10 * 60 * 1000
				});
				return {
					token,
					urlOptions: {
						allowedContentTypes: ALLOWED_TYPES,
						maximumSizeInBytes: MAX_BYTES,
						addRandomSuffix: true,
						allowOverwrite: false
					}
				};
			}
			// No onUploadCompleted: the photo URL is saved when the host presses
			// "Save changes", so there's nothing to do when the upload finishes.
		});
		return json(result);
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Upload failed';
		return json({ error: message }, { status: message.startsWith('Not signed in') ? 401 : 400 });
	}
};
