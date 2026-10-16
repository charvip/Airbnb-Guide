<script lang="ts">
	import MessageCircleIcon from '@lucide/svelte/icons/message-circle';
	import PhoneIcon from '@lucide/svelte/icons/phone';
	import { PageHeader, Panel } from '#lib/components/app/index.js';
	import * as Accordion from '#lib/components/ui/accordion/index.js';
	import { Button } from '#lib/components/ui/button/index.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const host = $derived(data.host);
	const isFilledIn = (value: string) => !value.startsWith('[ADD');
</script>

<PageHeader title="Help" subtitle={host.responseNote} />

<div class="flex flex-col gap-3">
	<Panel id="contact" class="scroll-mt-6">
		<h2 class="text-base font-semibold">{host.name}</h2>
		{#if isFilledIn(host.phone)}
			<div class="grid grid-cols-2 gap-3">
				<Button href="sms:{host.phone}" size="lg" class="h-12 text-base font-semibold">
					<MessageCircleIcon data-icon="inline-start" />
					Text
				</Button>
				<Button
					href="tel:{host.phone}"
					variant="secondary"
					size="lg"
					class="h-12 text-base font-semibold"
				>
					<PhoneIcon data-icon="inline-start" />
					Call
				</Button>
			</div>
		{:else}
			<p class="text-muted-foreground">{host.phone}</p>
		{/if}
		{#if isFilledIn(host.email)}
			<Button href="mailto:{host.email}" variant="link" class="justify-start px-0 text-base">
				{host.email}
			</Button>
		{:else}
			<p class="text-muted-foreground">{host.email}</p>
		{/if}
	</Panel>

	<h2 class="px-1 pt-5 text-sm font-medium text-muted-foreground">Questions</h2>
	<Panel padded={false}>
		<Accordion.Root type="multiple" class="rounded-none border-0">
			{#each data.faqs as faq, i (i)}
				<Accordion.Item value="faq-{i}">
					<Accordion.Trigger class="px-5 py-4 text-base font-semibold hover:no-underline">
						{faq.question}
					</Accordion.Trigger>
					<Accordion.Content class="px-5 text-base text-muted-foreground">
						{faq.answer}
					</Accordion.Content>
				</Accordion.Item>
			{/each}
		</Accordion.Root>
	</Panel>
</div>
