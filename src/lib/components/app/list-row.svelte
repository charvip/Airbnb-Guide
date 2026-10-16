<script lang="ts">
	import type { LucideIcon } from '@lucide/svelte';
	import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
	import * as Item from '#lib/components/ui/item/index.js';
	import Emoji from './emoji.svelte';

	// A tappable row inside a ListGroup. Leads with a content emoji, an icon or
	// a short marker such as a stop number.
	let {
		href,
		title,
		subtitle,
		emoji,
		icon: Icon,
		marker
	}: {
		href: string;
		title: string;
		subtitle?: string;
		emoji?: string;
		icon?: LucideIcon;
		marker?: string | number;
	} = $props();
</script>

<Item.Root
	class="rounded-none border-x-0 border-t-0 border-b-border last:border-b-0 hover:bg-accent"
>
	{#snippet child({ props })}
		<a {href} {...props}>
			{#if emoji}
				<Item.Media class="size-10 rounded-lg bg-secondary"><Emoji {emoji} size="sm" /></Item.Media>
			{:else if Icon}
				<Item.Media class="size-10 rounded-lg bg-secondary text-primary">
					<Icon class="size-5" strokeWidth={1.75} />
				</Item.Media>
			{:else if marker !== undefined}
				<Item.Media
					class="size-8 rounded-full bg-secondary text-sm font-semibold text-secondary-foreground"
				>
					{marker}
				</Item.Media>
			{/if}
			<Item.Content class="gap-0.5">
				<Item.Title class="text-base font-semibold">{title}</Item.Title>
				{#if subtitle}<Item.Description>{subtitle}</Item.Description>{/if}
			</Item.Content>
			<Item.Actions>
				<ChevronRightIcon class="size-4 text-muted-foreground" />
			</Item.Actions>
		</a>
	{/snippet}
</Item.Root>
