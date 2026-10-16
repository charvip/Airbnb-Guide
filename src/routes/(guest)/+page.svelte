<script lang="ts">
	import KeyRoundIcon from '@lucide/svelte/icons/key-round';
	import MessageCircleIcon from '@lucide/svelte/icons/message-circle';
	import MountainIcon from '@lucide/svelte/icons/mountain';
	import PlugIcon from '@lucide/svelte/icons/plug';
	import { FeatureCard, NavTile, PageHeader, StayTimes } from '#lib/components/app/index.js';
	import { Button } from '#lib/components/ui/button/index.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<PageHeader eyebrow="Welcome to" title={data.house.name} subtitle={data.house.welcome}>
	<StayTimes
		items={[
			{ label: 'Check-in', value: data.stay.checkIn },
			{ label: 'Checkout', value: data.stay.checkout }
		]}
	/>
</PageHeader>

<div class="flex flex-col gap-3">
	<FeatureCard
		href="/tour"
		eyebrow="Start here"
		title="Take the house tour"
		subtitle="{data.tourStopCount} stops, from arrival to checkout"
	/>

	<nav aria-label="Sections" class="grid grid-cols-2 gap-3">
		<NavTile href="/essentials" icon={KeyRoundIcon} title="Essentials" />
		<NavTile href="/appliances" icon={PlugIcon} title="Devices" />
		<NavTile href="/activities" icon={MountainIcon} title="Things to do" />
		<NavTile href="/help#contact" icon={MessageCircleIcon} title="Contact host" />
	</nav>
</div>

<footer class="flex justify-center pt-8">
	<Button href="/host" variant="link" size="sm" class="text-muted-foreground">Host login</Button>
</footer>
