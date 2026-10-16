<script lang="ts">
	import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
	import * as Item from '#lib/components/ui/item/index.js';
	import Emoji from './emoji.svelte';

	// A tappable row linking to another page: emoji, title, optional summary.
	let {
		href,
		emoji,
		title,
		subtitle
	}: { href: string; emoji: string; title: string; subtitle?: string } = $props();
</script>

<Item.Root variant="outline" class="bg-card shadow-sm">
	{#snippet child({ props })}
		<a {href} {...props}>
			<Item.Media><Emoji {emoji} /></Item.Media>
			<Item.Content>
				<Item.Title class="text-base font-semibold">{title}</Item.Title>
				{#if subtitle}<Item.Description>{subtitle}</Item.Description>{/if}
			</Item.Content>
			<Item.Actions>
				<ChevronRightIcon class="size-4 text-muted-foreground" />
			</Item.Actions>
		</a>
	{/snippet}
</Item.Root>
