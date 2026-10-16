<script lang="ts">
	// Host-uploaded photos (already web-sized on Vercel Blob).
	let { urls, alt }: { urls?: string[]; alt: string } = $props();
</script>

{#if urls && urls.length > 0}
	<div class="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
		{#each urls as url, i (url)}
			<img
				src={url}
				alt="{alt} photo {i + 1}"
				loading="lazy"
				class="w-full rounded-2xl border object-cover"
			/>
		{/each}
	</div>
{/if}
