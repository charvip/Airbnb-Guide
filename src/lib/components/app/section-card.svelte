<script lang="ts">
	import type { Snippet } from 'svelte';
	import * as Card from '#lib/components/ui/card/index.js';
	import Emoji from './emoji.svelte';

	// A titled block of content on a guest page.
	let { title, emoji, children }: { title: string; emoji?: string; children: Snippet } = $props();
</script>

<Card.Root class="mb-6">
	<Card.Header>
		<Card.Title class="flex items-center gap-2 text-lg font-semibold">
			{#if emoji}<Emoji {emoji} size="sm" />{/if}
			{title}
		</Card.Title>
	</Card.Header>
	<Card.Content class="text-base">
		{@render children()}
	</Card.Content>
</Card.Root>
