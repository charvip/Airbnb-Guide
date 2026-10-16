<script lang="ts">
	import { TabBar } from '#lib/components/app/index.js';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<!-- Room at the bottom so the fixed tab bar never covers the last item. -->
<div class="pb-20">
	{@render children()}
</div>
<TabBar />
