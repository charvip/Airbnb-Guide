<script lang="ts">
	import type { Snippet } from 'svelte';
	import { enhance } from '$app/forms';

	// A host editor form. Submits to a form action without a full page reload
	// and keeps what the host typed on screen after saving (no reset).
	let { action, children }: { action?: string; children: Snippet } = $props();
</script>

<form
	method="POST"
	{action}
	class="flex flex-col gap-6"
	use:enhance={() =>
		async ({ update }) => {
			await update({ reset: false });
		}}
>
	{@render children()}
</form>
