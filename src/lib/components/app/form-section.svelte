<script lang="ts">
	import type { Snippet } from 'svelte';
	import * as Card from '#lib/components/ui/card/index.js';
	import * as Field from '#lib/components/ui/field/index.js';

	// A card grouping related fields in a host editor form.
	let { title, children }: { title?: string; children: Snippet } = $props();
</script>

<Card.Root>
	{#if title}
		<Card.Header>
			<Card.Title class="font-semibold">{title}</Card.Title>
		</Card.Header>
	{/if}
	<Card.Content>
		<Field.Group class="gap-5">
			{@render children()}
		</Field.Group>
	</Card.Content>
</Card.Root>
