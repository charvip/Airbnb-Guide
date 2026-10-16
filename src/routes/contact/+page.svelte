<script lang="ts">
	import { BackLink, PageHeader, SectionCard } from '#lib/components/app/index.js';
	import { Button } from '#lib/components/ui/button/index.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const host = $derived(data.host);
	const isFilledIn = (value: string) => !value.startsWith('[ADD');
</script>

<BackLink />
<PageHeader emoji="📞" title="Contact the Host" subtitle={host.responseNote} />

<SectionCard title={host.name}>
	<div class="flex flex-col gap-3">
		{#if isFilledIn(host.phone)}
			<div class="flex gap-3">
				<Button href="tel:{host.phone}" size="lg" class="h-12 flex-1 text-base font-semibold">
					Call
				</Button>
				<Button
					href="sms:{host.phone}"
					variant="secondary"
					size="lg"
					class="h-12 flex-1 text-base font-semibold"
				>
					Text
				</Button>
			</div>
		{:else}
			<p>{host.phone}</p>
		{/if}
		{#if isFilledIn(host.email)}
			<Button href="mailto:{host.email}" variant="link" class="justify-start px-0 text-base">
				{host.email}
			</Button>
		{:else}
			<p>{host.email}</p>
		{/if}
	</div>
</SectionCard>
