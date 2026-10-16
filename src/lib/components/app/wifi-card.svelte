<script lang="ts">
	import WifiIcon from '@lucide/svelte/icons/wifi';
	import { Button } from '#lib/components/ui/button/index.js';
	import Panel from './panel.svelte';

	// WiFi network and password, with a one-tap copy of the password.
	let { network, password }: { network: string; password: string } = $props();

	let copied = $state(false);

	async function copy() {
		try {
			await navigator.clipboard.writeText(password);
			copied = true;
			setTimeout(() => (copied = false), 2000);
		} catch {
			// Clipboard blocked: the password is still on screen to type.
		}
	}
</script>

<Panel class="flex-row items-center">
	<WifiIcon class="size-5 shrink-0 text-primary" strokeWidth={1.75} />
	<div class="flex min-w-0 flex-1 flex-col">
		<h2 class="text-base font-semibold"><span class="sr-only">WiFi network: </span>{network}</h2>
		<p class="font-mono text-sm break-all text-muted-foreground">
			<span class="sr-only">Password: </span>{password}
		</p>
	</div>
	<Button variant="secondary" size="sm" class="h-9 px-4 font-semibold" onclick={copy}>
		{copied ? 'Copied' : 'Copy'}
	</Button>
</Panel>
