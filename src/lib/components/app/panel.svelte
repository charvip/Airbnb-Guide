<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import * as Card from '#lib/components/ui/card/index.js';
	import { cn } from '#lib/utils.js';

	// The base surface of the guide: a flat white card on the page background.
	// Every grouped block (sections, lists, the door code) sits on one.
	let {
		padded = true,
		class: className,
		children,
		...rest
	}: HTMLAttributes<HTMLDivElement> & { padded?: boolean; children: Snippet } = $props();
</script>

<Card.Root
	class={cn('gap-0 rounded-xl py-0 shadow-none ring-0', padded && 'gap-3 p-5', className)}
	{...rest}
>
	{@render children()}
</Card.Root>
