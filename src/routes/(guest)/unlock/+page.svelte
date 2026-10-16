<script lang="ts">
	import { PageHeader, PasswordGate } from '#lib/components/app/index.js';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();
</script>

<PageHeader
	title="Guest access"
	subtitle="Enter the guest passcode from your Airbnb booking messages to see the door code and WiFi."
/>
<PasswordGate
	name="code"
	label="Passcode"
	submitLabel="Unlock"
	next={data.next}
	error={form?.error}
/>
