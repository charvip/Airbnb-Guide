<script lang="ts">
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
	import { Button } from '#lib/components/ui/button/index.js';

	let { href = '/', label = 'Home' }: { href?: string; label?: string } = $props();
</script>

<Button {href} variant="ghost" class="mb-3 -ml-3 text-muted-foreground">
	<ArrowLeftIcon data-icon="inline-start" />
	{label}
</Button>
