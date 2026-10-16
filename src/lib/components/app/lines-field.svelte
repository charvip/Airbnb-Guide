<script lang="ts">
	import TextAreaField from './text-area-field.svelte';

	// A list (steps, tips, checklist) edited as one item per line. Quick to
	// edit on a phone and needs no add/remove buttons. The form action splits
	// it back into a list.
	let { label, name, values = [] }: { label: string; name: string; values?: string[] } = $props();
</script>

<TextAreaField
	{label}
	{name}
	value={values.join('\n')}
	rows={Math.max(3, values.length + 1)}
	hint="One item per line."
/>
