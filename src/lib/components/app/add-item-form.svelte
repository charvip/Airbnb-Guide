<script lang="ts">
	import { Button } from '#lib/components/ui/button/index.js';
	import { Input } from '#lib/components/ui/input/index.js';

	// Inline "name + Add" form for creating a device or activity. The action
	// redirects to the new item's editor.
	let { action, placeholder }: { action: string; placeholder: string } = $props();
</script>

<form method="POST" {action} class="flex gap-2 pt-1">
	<Input name="name" {placeholder} aria-label={placeholder} required class="flex-1" />
	<Button type="submit">Add</Button>
</form>
