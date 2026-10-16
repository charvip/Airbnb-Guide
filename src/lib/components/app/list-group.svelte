<script lang="ts">
	import type { Snippet } from 'svelte';
	import Panel from './panel.svelte';

	// A panel of rows separated by hairlines (drawn by the rows). Holds ListRow or EditLink rows.
	let { label, children }: { label?: string; children: Snippet } = $props();
</script>

<Panel padded={false} aria-label={label}>
	{@render children()}
</Panel>
