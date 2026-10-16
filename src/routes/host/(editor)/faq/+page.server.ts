import { getContent } from '#lib/server/content.js';
import { save } from '#lib/server/host-actions.js';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const { faqs } = await getContent();
	return { faqs };
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const form = await request.formData();
		const questions = form.getAll('question').map((q) => String(q).trim());
		const answers = form.getAll('answer').map((a) => String(a).trim());
		return save(cookies, (c) => {
			// Clearing a question removes it.
			c.faqs = questions
				.map((question, i) => ({ question, answer: answers[i] ?? '' }))
				.filter((f) => f.question);
		});
	}
};
