<script lang="ts" module>
	export type InfoItem = { label: string; value: string; strong?: boolean; mono?: boolean };
</script>

<script lang="ts">
	import { cn } from '#lib/utils.js';

	// Label / value pairs, e.g. where a device is and where its supplies are.
	let { items }: { items: InfoItem[] } = $props();
</script>

<dl class="flex flex-col gap-3">
	{#each items as item (item.label)}
		<div class="flex flex-col gap-0.5">
			<dt class="text-sm text-muted-foreground">{item.label}</dt>
			<dd class={cn(item.strong && 'font-semibold', item.mono && 'font-mono')}>{item.value}</dd>
		</div>
	{/each}
</dl>
