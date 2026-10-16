<script lang="ts">
	import { page } from '$app/state';
	import CircleQuestionMarkIcon from '@lucide/svelte/icons/circle-question-mark';
	import HouseIcon from '@lucide/svelte/icons/house';
	import KeyRoundIcon from '@lucide/svelte/icons/key-round';
	import MapIcon from '@lucide/svelte/icons/map';
	import { cn } from '#lib/utils.js';

	// Bottom navigation for every guest page. `match` lists the sections that
	// count as "inside" a tab, so device and activity pages light up Home.
	const tabs = [
		{ href: '/', label: 'Home', icon: HouseIcon, match: ['/', '/appliances', '/activities'] },
		{ href: '/tour', label: 'Tour', icon: MapIcon, match: ['/tour'] },
		{
			href: '/essentials',
			label: 'Essentials',
			icon: KeyRoundIcon,
			match: ['/essentials', '/unlock']
		},
		{ href: '/help', label: 'Help', icon: CircleQuestionMarkIcon, match: ['/help'] }
	];

	const path = $derived(page.url.pathname);
	const isActive = (match: string[]) =>
		match.some((m) => (m === '/' ? path === '/' : path === m || path.startsWith(`${m}/`)));
</script>

<nav
	aria-label="Guide"
	class="fixed inset-x-0 bottom-0 z-10 border-t bg-background/95 pb-safe backdrop-blur"
>
	<ul class="mx-auto grid max-w-page grid-cols-4 px-2">
		{#each tabs as tab (tab.href)}
			{@const active = isActive(tab.match)}
			<li>
				<a
					href={tab.href}
					aria-current={active ? 'page' : undefined}
					class={cn(
						'flex h-16 flex-col items-center justify-center gap-1 rounded-lg text-xs font-medium text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50',
						active && 'font-semibold text-primary hover:text-primary'
					)}
				>
					<tab.icon class="size-6" strokeWidth={1.75} />
					{tab.label}
				</a>
			</li>
		{/each}
	</ul>
</nav>
