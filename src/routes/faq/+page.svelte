<script lang="ts">
	import { BackLink, ContactCta, PageHeader } from '#lib/components/app/index.js';
	import * as Accordion from '#lib/components/ui/accordion/index.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<BackLink />
<PageHeader emoji="❓" title="FAQ" subtitle="Tap a question to see the answer." />

<Accordion.Root type="multiple" class="bg-card shadow-sm">
	{#each data.faqs as faq, i (i)}
		<Accordion.Item value="faq-{i}">
			<Accordion.Trigger class="text-base font-semibold">{faq.question}</Accordion.Trigger>
			<Accordion.Content class="text-base text-muted-foreground">{faq.answer}</Accordion.Content>
		</Accordion.Item>
	{/each}
</Accordion.Root>

<ContactCta />
