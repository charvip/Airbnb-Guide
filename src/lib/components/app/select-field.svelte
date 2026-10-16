<script lang="ts">
	import * as Field from '#lib/components/ui/field/index.js';
	import * as NativeSelect from '#lib/components/ui/native-select/index.js';

	// Labelled dropdown.
	let {
		label,
		name,
		value = '',
		options
	}: {
		label: string;
		name: string;
		value?: string;
		options: { value: string; label: string }[];
	} = $props();

	const id = $props.id();
</script>

<Field.Field>
	<Field.Label for={id}>{label}</Field.Label>
	<NativeSelect.Root {id} {name} {value} class="w-full">
		{#each options as option (option.value)}
			<NativeSelect.Option value={option.value}>{option.label}</NativeSelect.Option>
		{/each}
	</NativeSelect.Root>
</Field.Field>
