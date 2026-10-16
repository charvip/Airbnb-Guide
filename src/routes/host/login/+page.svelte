<script lang="ts">
	import CircleAlertIcon from '@lucide/svelte/icons/circle-alert';
	import { BackLink, PageHeader, PasswordGate } from '#lib/components/app/index.js';
	import * as Alert from '#lib/components/ui/alert/index.js';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();
</script>

<BackLink label="Guest guide" />
<PageHeader
	title="Host login"
	subtitle="Sign in to edit the guide, add instructions and upload photos."
/>

{#if data.configured}
	<PasswordGate
		name="password"
		label="Password"
		submitLabel="Sign in"
		next={data.next}
		error={form?.error}
	/>
{:else}
	<Alert.Root variant="warning">
		<CircleAlertIcon />
		<Alert.Title>Host side locked</Alert.Title>
		<Alert.Description>
			The host side is locked until a HOST_PASSWORD environment variable is set in Vercel.
		</Alert.Description>
	</Alert.Root>
{/if}
