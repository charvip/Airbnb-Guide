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
<PageHeader emoji="🌲" title="Activities" subtitle="Things to do in and around the house." />

{#each data.activities as activity (activity.id)}
	<SectionCard emoji={activity.emoji} title={activity.name}>
		<PhotoGallery urls={activity.photos} alt={activity.name} />
		<p class="mb-3 text-muted-foreground">{activity.summary}</p>
		<TextList items={activity.details} muted />
		{#if activity.applianceId}
			<Button href="/appliances/{activity.applianceId}" variant="link" class="mt-3 px-0">
				How to use it
				<ArrowRightIcon />
			</Button>
		{/if}
	</SectionCard>
{/each}
