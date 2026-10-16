<script lang="ts">
	import type { Snippet } from 'svelte';

	// Page title with an optional small line above (eyebrow), a subtitle, and
	// extra content underneath (e.g. StayTimes on the home screen).
	let {
		title,
		eyebrow,
		subtitle,
		children
	}: {
		title: string;
		/** Small label above the title, e.g. "Welcome to" or "Stop 2 of 5". */
		eyebrow?: string;
		subtitle?: string;
		children?: Snippet;
	} = $props();
</script>

<header class="mb-6 flex flex-col gap-1.5">
	{#if eyebrow}<p class="text-sm font-medium text-muted-foreground">{eyebrow}</p>{/if}
	<h1 class="text-3xl font-semibold tracking-tight text-balance">{title}</h1>
	{#if subtitle}<p class="text-base text-muted-foreground">{subtitle}</p>{/if}
	{#if children}<div class="pt-3">{@render children()}</div>{/if}
</header>
