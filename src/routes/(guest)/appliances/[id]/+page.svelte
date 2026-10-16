<script lang="ts">
	import LightbulbIcon from '@lucide/svelte/icons/lightbulb';
	import ListOrderedIcon from '@lucide/svelte/icons/list-ordered';
	import MapPinIcon from '@lucide/svelte/icons/map-pin';
	import WrenchIcon from '@lucide/svelte/icons/wrench';
	import {
		BackLink,
		ContactCta,
		InfoList,
		PageHeader,
		PhotoGallery,
		SectionCard,
		TextList
	} from '#lib/components/app/index.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const device = $derived(data.device);
</script>

<BackLink href="/appliances" label="All devices" />
<PageHeader title={device.name} subtitle={device.summary} />

<div class="flex flex-col gap-3">
	<PhotoGallery urls={device.photos} alt={device.name} />

	<SectionCard icon={MapPinIcon} title="Where to find it">
		<InfoList
			items={[
				{ label: `The ${device.name.toLowerCase()}`, value: device.location },
				{ label: 'Supplies', value: device.suppliesLocation }
			]}
		/>
	</SectionCard>

	<SectionCard icon={ListOrderedIcon} title="How to use it">
		<TextList items={device.steps} ordered />
	</SectionCard>

	{#if device.troubleshooting?.length}
		<SectionCard icon={WrenchIcon} title="If it doesn't work">
			<TextList items={device.troubleshooting} />
		</SectionCard>
	{/if}

	{#if device.tips?.length}
		<SectionCard icon={LightbulbIcon} title="Good to know">
			<TextList items={device.tips} />
		</SectionCard>
	{/if}
</div>

<ContactCta />
