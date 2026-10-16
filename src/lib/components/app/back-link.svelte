<script lang="ts">
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
	import { Button } from '#lib/components/ui/button/index.js';

	let { href = '/', label = 'Home' }: { href?: string; label?: string } = $props();
</script>

<Button {href} variant="link" class="mb-4 px-0">
	<ArrowLeftIcon />
	{label}
</Button>
