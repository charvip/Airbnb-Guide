<script lang="ts">
	import LightbulbIcon from '@lucide/svelte/icons/lightbulb';
	import ListChecksIcon from '@lucide/svelte/icons/list-checks';
	import SquareParkingIcon from '@lucide/svelte/icons/square-parking';
	import {
		BackLink,
		ContactCta,
		ListGroup,
		ListRow,
		PageHeader,
		PhotoGallery,
		SectionCard,
		TextList,
		TourPager
	} from '#lib/components/app/index.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const stop = $derived(data.stop);
</script>

<BackLink href="/tour" label="All stops" />
<PageHeader
	eyebrow="Stop {data.position.index + 1} of {data.position.total}"
	title={stop.title}
	subtitle={stop.summary}
/>

<div class="flex flex-col gap-3">
	<PhotoGallery urls={stop.photos} alt={stop.title} />

	{#if stop.id === 'arrival'}
		<SectionCard icon={SquareParkingIcon} title="Where to park">
			<p class="text-muted-foreground">{data.parking}</p>
		</SectionCard>
	{/if}

	{#if stop.details.length > 0}
		<SectionCard icon={LightbulbIcon} title="Good to know">
			<TextList items={stop.details} />
		</SectionCard>
	{/if}

	{#if stop.id === 'checkout'}
		<SectionCard icon={ListChecksIcon} title="Checkout" aside={data.checkout.time}>
			<TextList items={data.checkout.checklist} ordered />
		</SectionCard>
	{/if}

	{#if data.devices.length > 0}
		<h2 class="px-1 pt-5 text-sm font-medium text-muted-foreground">Devices here</h2>
		<ListGroup label="Devices here">
			{#each data.devices as device (device.id)}
				<ListRow
					href="/appliances/{device.id}"
					emoji={device.emoji}
					title={device.name}
					subtitle={device.summary}
				/>
			{/each}
		</ListGroup>
	{/if}

	<div class="pt-5">
		<TourPager prev={data.prev} next={data.next} finish={{ href: '/', label: 'Finish tour' }} />
	</div>
</div>

<ContactCta />
