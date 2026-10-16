<script lang="ts">
	import { cn } from '#lib/utils.js';

	// A list of plain text items: numbered steps in small tinted circles, or
	// bullets as small terracotta dots.
	let {
		items,
		ordered = false,
		muted = false
	}: { items: string[]; ordered?: boolean; muted?: boolean } = $props();
</script>

<svelte:element
	this={ordered ? 'ol' : 'ul'}
	class={cn('flex flex-col gap-3', muted && 'text-muted-foreground')}
>
	{#each items as item, i (i)}
		<li class="flex gap-3">
			{#if ordered}
				<span
					class="flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-secondary-foreground"
					aria-hidden="true"
				>
					{i + 1}
				</span>
			{:else}
				<span class="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true"></span>
			{/if}
			<span>{item}</span>
		</li>
	{/each}
</svelte:element>
