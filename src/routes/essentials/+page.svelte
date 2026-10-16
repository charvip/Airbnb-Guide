<script lang="ts">
	import {
		BackLink,
		CodeDisplay,
		ContactCta,
		InfoList,
		PageHeader,
		SectionCard,
		TextList
	} from '#lib/components/app/index.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const essentials = $derived(data.essentials);
	const host = $derived(data.host);
</script>

<BackLink />
<PageHeader emoji="🔑" title="Essentials" subtitle="Everything you need for a smooth stay." />

<SectionCard emoji="🔐" title="Door lock">
	<CodeDisplay value={essentials.doorLock.code} />
	<p class="text-muted-foreground">{essentials.doorLock.instructions}</p>
</SectionCard>

<SectionCard emoji="📶" title="WiFi">
	<InfoList
		items={[
			{ label: 'Network', value: essentials.wifi.network, strong: true },
			{ label: 'Password', value: essentials.wifi.password, strong: true, mono: true }
		]}
	/>
</SectionCard>

<SectionCard emoji="🚗" title="Parking">
	<p>{essentials.parking}</p>
</SectionCard>

<SectionCard emoji="👋" title="Checkout by {essentials.checkoutTime}">
	<TextList items={essentials.checkoutChecklist} />
</SectionCard>

<SectionCard emoji="🤫" title="Quiet hours">
	<p>{essentials.quietHours}</p>
</SectionCard>

<SectionCard emoji="📞" title="Host">
	<p class="font-semibold">{host.name}</p>
	<p>{host.phone}</p>
	<p>{host.email}</p>
</SectionCard>

<ContactCta />
