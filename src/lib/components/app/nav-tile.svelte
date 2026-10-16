<script lang="ts">
	import type { LucideIcon } from '@lucide/svelte';

	// A square shortcut on the home screen. Lay several out in a 2-column grid.
	let {
		href,
		icon: Icon,
		title,
		subtitle
	}: { href: string; icon: LucideIcon; title: string; subtitle?: string } = $props();
</script>

<a
	{href}
	class="flex h-28 flex-col justify-between rounded-xl bg-card p-4 transition-colors outline-none hover:bg-accent focus-visible:ring-3 focus-visible:ring-ring/50"
>
	<Icon class="size-6 text-primary" strokeWidth={1.75} />
	<span class="flex flex-col">
		<span class="text-base font-semibold">{title}</span>
		{#if subtitle}<span class="text-sm text-muted-foreground">{subtitle}</span>{/if}
	</span>
</a>
