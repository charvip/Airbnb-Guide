<script lang="ts" module>
	// Result of a host save, from the form action's return value.
	export type FormResult = { saved?: boolean; error?: string } | null | undefined;
</script>

<script lang="ts">
	import CircleCheckIcon from '@lucide/svelte/icons/circle-check';
	import CircleAlertIcon from '@lucide/svelte/icons/circle-alert';
	import * as Alert from '#lib/components/ui/alert/index.js';

	let { result }: { result: FormResult } = $props();
</script>

{#if result?.error}
	<Alert.Root variant="destructive" class="mb-4">
		<CircleAlertIcon />
		<Alert.Title>Couldn't save</Alert.Title>
		<Alert.Description>{result.error}</Alert.Description>
	</Alert.Root>
{:else if result?.saved}
	<Alert.Root variant="success" class="mb-4">
		<CircleCheckIcon />
		<Alert.Title>Saved!</Alert.Title>
		<Alert.Description>Guests see the update right away.</Alert.Description>
	</Alert.Root>
{/if}
