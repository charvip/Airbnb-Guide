<script lang="ts">
	import { cn } from '#lib/utils.js';
	import Emoji from './emoji.svelte';

	let {
		title,
		emoji,
		eyebrow,
		subtitle,
		align = 'start'
	}: {
		title: string;
		emoji?: string;
		/** Small label above the title, e.g. "Guest Guide" or "Stop 2 of 5". */
		eyebrow?: string;
		subtitle?: string;
		align?: 'start' | 'center';
	} = $props();
</script>

<header class={cn('mb-6 flex flex-col gap-2', align === 'center' && 'items-center text-center')}>
	{#if emoji}<Emoji {emoji} size="lg" />{/if}
	{#if eyebrow}
		<p class="text-sm font-medium tracking-widest text-primary uppercase">{eyebrow}</p>
	{/if}
	<h1 class="text-3xl font-semibold tracking-tight">{title}</h1>
	{#if subtitle}<p class="text-muted-foreground">{subtitle}</p>{/if}
</header>
