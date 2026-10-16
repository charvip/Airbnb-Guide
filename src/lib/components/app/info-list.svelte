<script lang="ts" module>
	export type InfoItem = { label: string; value: string; strong?: boolean; mono?: boolean };
</script>

<script lang="ts">
	import { cn } from '#lib/utils.js';

	// Label / value pairs, e.g. WiFi network and password.
	let { items }: { items: InfoItem[] } = $props();
</script>

<dl class="flex flex-col gap-3">
	{#each items as item (item.label)}
		<div>
			<dt class="text-sm font-medium text-muted-foreground">{item.label}</dt>
			<dd class={cn(item.strong && 'font-semibold', item.mono && 'font-mono')}>{item.value}</dd>
		</div>
	{/each}
</dl>
