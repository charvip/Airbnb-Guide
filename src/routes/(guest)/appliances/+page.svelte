<script lang="ts">
	import { BackLink, ListGroup, ListRow, PageHeader } from '#lib/components/app/index.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<BackLink />
<PageHeader title="Devices" subtitle="Tap a device to see where it is and how to use it." />

<ListGroup label="Devices">
	{#each data.appliances as device (device.id)}
		<ListRow
			href="/appliances/{device.id}"
			emoji={device.emoji}
			title={device.name}
			subtitle={device.summary}
		/>
	{/each}
</ListGroup>
