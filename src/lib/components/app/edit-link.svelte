<script lang="ts">
	import * as Item from '#lib/components/ui/item/index.js';
	import Emoji from './emoji.svelte';

	// A row on the host dashboard that opens an editor page. Sits in a ListGroup.
	let { href, emoji, title }: { href: string; emoji: string; title: string } = $props();
</script>

<Item.Root
	size="sm"
	class="rounded-none border-x-0 border-t-0 border-b-border last:border-b-0 hover:bg-accent"
>
	{#snippet child({ props })}
		<a {href} {...props}>
			<Item.Media><Emoji {emoji} size="sm" /></Item.Media>
			<Item.Content>
				<Item.Title class="text-base">{title}</Item.Title>
			</Item.Content>
			<Item.Actions>
				<span class="text-sm font-semibold text-primary">Edit</span>
			</Item.Actions>
		</a>
	{/snippet}
</Item.Root>
