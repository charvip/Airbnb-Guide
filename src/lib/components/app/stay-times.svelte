<script lang="ts">
	// Check-in / checkout times as small pills. Items without a value are skipped.
	let { items }: { items: { label: string; value?: string }[] } = $props();

	const shown = $derived(items.filter((item) => item.value));
</script>

{#if shown.length > 0}
	<ul class="flex flex-wrap gap-2">
		{#each shown as item (item.label)}
			<li class="flex h-9 items-center gap-1.5 rounded-full bg-card px-4 text-sm">
				<span class="text-muted-foreground">{item.label}</span>
				<span class="font-semibold">{item.value}</span>
			</li>
		{/each}
	</ul>
{/if}
