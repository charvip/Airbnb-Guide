<script lang="ts">
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
	import ArrowRightIcon from '@lucide/svelte/icons/arrow-right';
	import { Button } from '#lib/components/ui/button/index.js';

	type Link = { href: string; label: string };

	// Previous / next buttons between tour stops. The last stop shows "Finish tour".
	let { prev, next, finish }: { prev?: Link; next?: Link; finish: Link } = $props();
</script>

<nav class="flex justify-between gap-3" aria-label="Tour">
	{#if prev}
		<Button href={prev.href} variant="outline" size="lg">
			<ArrowLeftIcon data-icon="inline-start" />
			{prev.label}
		</Button>
	{:else}
		<span></span>
	{/if}
	{#if next}
		<Button href={next.href} size="lg">
			{next.label}
			<ArrowRightIcon data-icon="inline-end" />
		</Button>
	{:else}
		<Button href={finish.href} size="lg">{finish.label}</Button>
	{/if}
</nav>
