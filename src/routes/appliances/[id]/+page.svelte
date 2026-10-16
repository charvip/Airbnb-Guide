<script lang="ts">
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
<PageHeader emoji={device.emoji} title={device.name} subtitle={device.summary} />
<PhotoGallery urls={device.photos} alt={device.name} />

<SectionCard emoji="📍" title="Where to find it">
	<InfoList
		items={[
			{ label: `The ${device.name.toLowerCase()}`, value: device.location },
			{ label: 'Supplies', value: device.suppliesLocation }
		]}
	/>
</SectionCard>

<SectionCard emoji="🛠️" title="How to use it">
	<TextList items={device.steps} ordered />
</SectionCard>

{#if device.troubleshooting?.length}
	<SectionCard emoji="🤔" title="If it does not work">
		<TextList items={device.troubleshooting} />
	</SectionCard>
{/if}

{#if device.tips?.length}
	<SectionCard emoji="💡" title="Good to know">
		<TextList items={device.tips} />
	</SectionCard>
{/if}

<ContactCta />
