<script lang="ts">
	import { cn } from '#lib/utils.js';

	// Bulleted (or numbered) list of plain text items.
	let {
		items,
		ordered = false,
		muted = false
	}: { items: string[]; ordered?: boolean; muted?: boolean } = $props();

	const listClass = $derived(
		cn(
			'flex flex-col gap-2 pl-5',
			ordered ? 'list-decimal' : 'list-disc',
			muted && 'text-muted-foreground'
		)
	);
</script>

<svelte:element this={ordered ? 'ol' : 'ul'} class={listClass}>
	{#each items as item, i (i)}
		<li>{item}</li>
	{/each}
</svelte:element>
