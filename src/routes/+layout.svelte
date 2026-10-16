<script lang="ts">
	import '#lib/styles/tokens.css';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<title>Guest Guide</title>
	<meta
		name="description"
		content="Everything you need for your stay: room tour, appliance how-tos, essentials and things to do."
	/>
</svelte:head>

<main class="mx-auto max-w-page px-5 pt-10 pb-12">
	{@render children()}
</main>
