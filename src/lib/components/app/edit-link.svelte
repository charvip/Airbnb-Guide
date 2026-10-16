<script lang="ts">
	import * as Item from '#lib/components/ui/item/index.js';
	import Emoji from './emoji.svelte';

	// A row on the host dashboard that opens an editor page.
	let { href, emoji, title }: { href: string; emoji: string; title: string } = $props();
</script>

<Item.Root variant="outline" size="sm" class="bg-card">
	{#snippet child({ props })}
		<a {href} {...props}>
			<Item.Media><Emoji {emoji} size="sm" /></Item.Media>
			<Item.Content>
				<Item.Title class="text-base">{title}</Item.Title>
			</Item.Content>
			<Item.Actions>
				<span class="text-sm font-medium text-primary">Edit</span>
			</Item.Actions>
		</a>
	{/snippet}
</Item.Root>
