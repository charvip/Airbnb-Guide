<script lang="ts">
	import { BackLink, NavCard, PageHeader } from '#lib/components/app/index.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<BackLink />
<PageHeader
	emoji="🔌"
	title="Devices"
	subtitle="Tap a device to see where it is and how to use it."
/>
<div class="flex flex-col gap-3">
	{#each data.appliances as device (device.id)}
		<NavCard
			href="/appliances/{device.id}"
			emoji={device.emoji}
			title={device.name}
			subtitle={device.summary}
		/>
	{/each}
</div>
