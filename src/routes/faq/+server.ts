import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// FAQ and contact now live together on /help. Keeps old links working.
export const GET: RequestHandler = () => redirect(308, '/help');
