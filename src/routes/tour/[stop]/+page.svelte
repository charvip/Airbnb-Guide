<script lang="ts">
	import {
		BackLink,
		ContactCta,
		NavCard,
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

<BackLink href="/tour" label="All tour stops" />
<PageHeader
	emoji={stop.emoji}
	eyebrow="Stop {data.position.index + 1} of {data.position.total}"
	title={stop.title}
	subtitle={stop.summary}
/>
<PhotoGallery urls={stop.photos} alt={stop.title} />

{#if stop.id === 'arrival'}
	<SectionCard emoji="🚗" title="Where to park">
		<p>{data.parking}</p>
	</SectionCard>
{/if}

{#if stop.details.length > 0}
	<SectionCard title="Good to know">
		<TextList items={stop.details} />
	</SectionCard>
{/if}

{#if stop.id === 'checkout'}
	<SectionCard title="Checkout by {data.checkout.time}">
		<TextList items={data.checkout.checklist} />
	</SectionCard>
{/if}

{#if data.devices.length > 0}
	<section class="mb-6 flex flex-col gap-3">
		<h2 class="text-lg font-semibold">Devices here</h2>
		{#each data.devices as device (device.id)}
			<NavCard
				href="/appliances/{device.id}"
				emoji={device.emoji}
				title={device.name}
				subtitle={device.summary}
			/>
		{/each}
	</section>
{/if}

<TourPager prev={data.prev} next={data.next} finish={{ href: '/', label: 'Finish tour' }} />

<ContactCta />
