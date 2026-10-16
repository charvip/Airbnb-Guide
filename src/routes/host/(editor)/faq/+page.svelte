<script lang="ts">
	import {
		EditorForm,
		FormNotice,
		FormSection,
		HostHeader,
		TextAreaField,
		TextField
	} from '#lib/components/app/index.js';
	import { Button } from '#lib/components/ui/button/index.js';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();
	// One blank row at the end for adding a new question.
	const rows = $derived([...data.faqs, { question: '', answer: '' }]);
</script>

<HostHeader title="FAQ" />
<FormNotice result={form} />
<p class="mb-4 text-sm text-muted-foreground">
	Fill in the last box to add a question. Clear a question to remove it.
</p>

<EditorForm>
	{#each rows as faq, i (i)}
		<FormSection>
			<TextField label="Question {i + 1}" name="question" value={faq.question} />
			<TextAreaField label="Answer" name="answer" value={faq.answer} rows={2} />
		</FormSection>
	{/each}
	<Button type="submit" size="lg" class="h-12 w-full text-base font-semibold">Save changes</Button>
</EditorForm>
