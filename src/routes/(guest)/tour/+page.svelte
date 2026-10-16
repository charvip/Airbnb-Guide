<script lang="ts">
	import { ListGroup, ListRow, PageHeader } from '#lib/components/app/index.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<PageHeader title="House tour" subtitle="Walk through the house from arrival to checkout." />

<ListGroup label="Tour stops">
	{#each data.tourStops as stop, i (stop.id)}
		<ListRow href="/tour/{stop.id}" marker={i + 1} title={stop.title} subtitle={stop.summary} />
	{/each}
</ListGroup>
