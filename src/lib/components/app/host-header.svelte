<script lang="ts">
	import { Badge } from '#lib/components/ui/badge/index.js';
	import { Button } from '#lib/components/ui/button/index.js';
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';

	// Top of every host editor page. The dashboard links to the guest site;
	// other pages link back to the dashboard.
	let { title, back = true }: { title: string; back?: boolean } = $props();
</script>

<header class="mb-6 flex flex-col gap-3">
	<div class="flex items-center justify-between">
		{#if back}
			<Button href="/host" variant="link" class="px-0">
				<ArrowLeftIcon />
				Host dashboard
			</Button>
		{:else}
			<Button href="/" variant="link" class="px-0">View guest site</Button>
		{/if}
		<Badge variant="warning">Host mode</Badge>
	</div>
	<h1 class="text-2xl font-semibold tracking-tight">{title}</h1>
</header>
