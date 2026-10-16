<script lang="ts">
	import ArrowRightIcon from '@lucide/svelte/icons/arrow-right';
	import {
		BackLink,
		PageHeader,
		PhotoGallery,
		SectionCard,
		TextList
	} from '#lib/components/app/index.js';
	import { Button } from '#lib/components/ui/button/index.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<BackLink />
<PageHeader title="Things to do" subtitle="In and around the house." />

<div class="flex flex-col gap-3">
	{#each data.activities as activity (activity.id)}
		<SectionCard emoji={activity.emoji} title={activity.name}>
			<PhotoGallery urls={activity.photos} alt={activity.name} />
			<p class="text-muted-foreground">{activity.summary}</p>
			<TextList items={activity.details} />
			{#if activity.applianceId}
				<Button
					href="/appliances/{activity.applianceId}"
					variant="link"
					class="self-start px-0 font-semibold"
				>
					How to use it
					<ArrowRightIcon data-icon="inline-end" />
				</Button>
			{/if}
		</SectionCard>
	{/each}
</div>
