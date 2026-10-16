<script lang="ts">
	import { NavCard, PageHeader } from '#lib/components/app/index.js';
	import { Button } from '#lib/components/ui/button/index.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div class="flex flex-col gap-8 pt-4">
	<PageHeader
		eyebrow="Guest Guide"
		title={data.house.name}
		subtitle={data.house.welcome}
		align="center"
	/>

	<Button href="/tour" size="lg" class="h-16 w-full rounded-2xl text-lg font-semibold shadow-sm">
		🏡 Start the House Tour
	</Button>

	<nav class="flex flex-col gap-3">
		<NavCard
			href="/appliances"
			emoji="🔌"
			title="Devices"
			subtitle="How to use everything in the house"
		/>
		<NavCard
			href="/essentials"
			emoji="🔑"
			title="Essentials"
			subtitle="Door code, WiFi, parking, checkout"
		/>
		<NavCard
			href="/activities"
			emoji="🌲"
			title="Activities"
			subtitle="Things to do during your stay"
		/>
		<NavCard href="/faq" emoji="❓" title="FAQ" subtitle="Quick answers to common questions" />
		<NavCard href="/contact" emoji="📞" title="Contact the Host" />
	</nav>

	<footer class="flex justify-center pt-6">
		<Button href="/host" variant="link" size="sm" class="text-muted-foreground">Host login</Button>
	</footer>
</div>
