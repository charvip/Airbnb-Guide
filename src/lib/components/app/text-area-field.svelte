<script lang="ts">
	import * as Field from '#lib/components/ui/field/index.js';
	import { Textarea } from '#lib/components/ui/textarea/index.js';

	// Labelled multi-line input.
	let {
		label,
		name,
		value = '',
		hint,
		placeholder,
		rows = 3
	}: {
		label: string;
		name: string;
		value?: string;
		hint?: string;
		placeholder?: string;
		rows?: number;
	} = $props();

	const id = $props.id();
</script>

<Field.Field>
	<Field.Label for={id}>{label}</Field.Label>
	<Textarea {id} {name} {value} {placeholder} {rows} />
	{#if hint}<Field.Description>{hint}</Field.Description>{/if}
</Field.Field>
