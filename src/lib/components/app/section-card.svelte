<script lang="ts">
	import type { LucideIcon } from '@lucide/svelte';
	import type { Snippet } from 'svelte';
	import Emoji from './emoji.svelte';
	import Panel from './panel.svelte';

	// A titled block of content on a guest page. Leads with a UI icon (or a
	// content emoji); `aside` puts a short highlight on the right, e.g. a time.
	let {
		title,
		icon: Icon,
		emoji,
		aside,
		children
	}: {
		title: string;
		icon?: LucideIcon;
		emoji?: string;
		aside?: string;
		children: Snippet;
	} = $props();
</script>

<Panel>
	<header class="flex items-center gap-3">
		{#if Icon}
			<Icon class="size-5 shrink-0 text-primary" strokeWidth={1.75} />
		{:else if emoji}
			<Emoji {emoji} size="sm" />
		{/if}
		<h2 class="flex-1 text-base font-semibold">{title}</h2>
		{#if aside}<span class="text-sm font-semibold text-primary">{aside}</span>{/if}
	</header>
	<div class="flex flex-col gap-3 text-base">
		{@render children()}
	</div>
</Panel>
