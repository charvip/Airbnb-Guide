import { error, redirect, type Cookies } from '@sveltejs/kit';
import { GUEST_CODE, HOST_PASSWORD } from '$app/env/private';

// Two gates:
// 1. /essentials (door code, WiFi) needs the guest passcode in GUEST_CODE.
//    If GUEST_CODE isn't set, the page stays open.
// 2. /host (the editor) needs the host password in HOST_PASSWORD.
//    If HOST_PASSWORD isn't set, the host side stays locked.
// Both values live in environment variables, never in the repo.
//
// Pages check in their load function; form actions and the upload endpoint
// check again, since they can be called without loading the page first.

const HOST_COOKIE = 'host_access';
const GUEST_COOKIE = 'guest_access';

export const hostConfigured = () => Boolean(HOST_PASSWORD);

export const isHost = (cookies: Cookies) =>
	Boolean(HOST_PASSWORD) && cookies.get(HOST_COOKIE) === HOST_PASSWORD;

const hasGuestAccess = (cookies: Cookies) =>
	!GUEST_CODE || cookies.get(GUEST_COOKIE) === GUEST_CODE;

const loginUrl = (path: string, url: URL) => `${path}?next=${encodeURIComponent(url.pathname)}`;

/** For page loads: send visitors who aren't signed in to the host login. */
export function guardHostPage(cookies: Cookies, url: URL) {
	if (!isHost(cookies)) redirect(303, loginUrl('/host/login', url));
}

/** For form actions and endpoints. */
export function requireHost(cookies: Cookies) {
	if (!isHost(cookies)) error(401, 'Not signed in as host.');
}

export function guardGuestPage(cookies: Cookies, url: URL) {
	if (!hasGuestAccess(cookies)) redirect(303, loginUrl('/unlock', url));
}

/** Only allow redirects to pages on this site. */
export function safeNext(raw: FormDataEntryValue | null, fallback: string, prefix = '/') {
	const next = String(raw ?? '');
	return next.startsWith(prefix) && !next.startsWith('//') ? next : fallback;
}

export function signInHost(cookies: Cookies, attempt: string) {
	if (!HOST_PASSWORD || attempt !== HOST_PASSWORD) return false;
	cookies.set(HOST_COOKIE, HOST_PASSWORD, {
		httpOnly: true,
		sameSite: 'lax',
		path: '/',
		maxAge: 60 * 60 * 24 * 30
	});
	return true;
}

export function signOutHost(cookies: Cookies) {
	cookies.delete(HOST_COOKIE, { path: '/' });
}

export function unlockGuest(cookies: Cookies, attempt: string) {
	if (!GUEST_CODE || attempt !== GUEST_CODE) return false;
	cookies.set(GUEST_COOKIE, GUEST_CODE, {
		httpOnly: true,
		sameSite: 'lax',
		path: '/',
		maxAge: 60 * 60 * 24 * 14 // two weeks, long enough for a stay
	});
	return true;
}
