<script lang="ts">
	import * as Field from '#lib/components/ui/field/index.js';
	import { Input } from '#lib/components/ui/input/index.js';

	// Labelled single-line input.
	let {
		label,
		name,
		value = '',
		hint,
		placeholder,
		required = false
	}: {
		label: string;
		name: string;
		value?: string;
		hint?: string;
		placeholder?: string;
		required?: boolean;
	} = $props();

	const id = $props.id();
</script>

<Field.Field>
	<Field.Label for={id}>{label}</Field.Label>
	<Input {id} {name} {value} {placeholder} {required} />
	{#if hint}<Field.Description>{hint}</Field.Description>{/if}
</Field.Field>
