<script lang="ts">
	import { BackLink, NavCard, PageHeader } from '#lib/components/app/index.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<BackLink />
<PageHeader
	emoji="🏡"
	title="House Tour"
	subtitle="Walk through the house from arrival to checkout."
/>
<ol class="flex flex-col gap-3">
	{#each data.tourStops as stop, i (stop.id)}
		<li>
			<NavCard
				href="/tour/{stop.id}"
				emoji={stop.emoji}
				title="{i + 1}. {stop.title}"
				subtitle={stop.summary}
			/>
		</li>
	{/each}
</ol>
