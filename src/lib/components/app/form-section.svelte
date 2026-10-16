<script lang="ts">
	import type { Snippet } from 'svelte';
	import * as Field from '#lib/components/ui/field/index.js';
	import Panel from './panel.svelte';

	// A panel grouping related fields in a host editor form.
	let { title, children }: { title?: string; children: Snippet } = $props();
</script>

<Panel class="gap-5">
	{#if title}<h2 class="text-base font-semibold">{title}</h2>{/if}
	<Field.Group class="gap-5">
		{@render children()}
	</Field.Group>
</Panel>
