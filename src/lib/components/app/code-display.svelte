<script lang="ts">
	import Panel from './panel.svelte';

	// A short code shown large so it's easy to read off a phone at the door.
	let { label, value, note }: { label: string; value: string; note?: string } = $props();
</script>

<Panel class="gap-2">
	<p class="text-sm font-medium text-muted-foreground">{label}</p>
	<p class="text-6xl leading-none font-semibold tracking-widest text-primary tabular-nums">
		{value}
	</p>
	{#if note}<p class="pt-1 text-sm text-muted-foreground">{note}</p>{/if}
</Panel>
