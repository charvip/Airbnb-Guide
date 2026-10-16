<script lang="ts">
	import ArrowRightIcon from '@lucide/svelte/icons/arrow-right';

	// The one bold call to action on a page (e.g. "Take the house tour").
	let {
		href,
		eyebrow,
		title,
		subtitle
	}: { href: string; eyebrow?: string; title: string; subtitle?: string } = $props();
</script>

<a
	{href}
	class="group flex items-end justify-between gap-4 rounded-2xl bg-primary p-5 text-primary-foreground transition-colors outline-none hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-ring/50"
>
	<span class="flex flex-col gap-1">
		{#if eyebrow}<span class="text-sm font-semibold">{eyebrow}</span>{/if}
		<span class="text-2xl leading-tight font-bold tracking-tight text-balance">{title}</span>
		{#if subtitle}<span class="text-sm">{subtitle}</span>{/if}
	</span>
	<span
		class="flex size-13 shrink-0 items-center justify-center rounded-full bg-primary-foreground text-primary transition-transform group-hover:translate-x-0.5"
	>
		<ArrowRightIcon class="size-5" />
	</span>
</a>
