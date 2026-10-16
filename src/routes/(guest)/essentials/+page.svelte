<script lang="ts">
	import ListChecksIcon from '@lucide/svelte/icons/list-checks';
	import MoonIcon from '@lucide/svelte/icons/moon';
	import SquareParkingIcon from '@lucide/svelte/icons/square-parking';
	import {
		CodeDisplay,
		ContactCta,
		PageHeader,
		SectionCard,
		TextList,
		WifiCard
	} from '#lib/components/app/index.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const essentials = $derived(data.essentials);
</script>

<PageHeader title="Essentials" />

<div class="flex flex-col gap-3">
	<CodeDisplay
		label="Door code"
		value={essentials.doorLock.code}
		note={essentials.doorLock.instructions}
	/>

	<WifiCard network={essentials.wifi.network} password={essentials.wifi.password} />

	<SectionCard icon={SquareParkingIcon} title="Parking">
		<p class="text-muted-foreground">{essentials.parking}</p>
	</SectionCard>

	<SectionCard icon={MoonIcon} title="Quiet hours">
		<p class="text-muted-foreground">{essentials.quietHours}</p>
	</SectionCard>

	<SectionCard icon={ListChecksIcon} title="Checkout" aside={essentials.checkoutTime}>
		<TextList items={essentials.checkoutChecklist} ordered />
	</SectionCard>
</div>

<ContactCta />
