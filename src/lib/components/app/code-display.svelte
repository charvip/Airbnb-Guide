<script lang="ts">
	// A short code shown large so it's easy to read off a phone, e.g. the door code.
	let { value }: { value: string } = $props();
</script>

<p class="mb-2 text-2xl font-semibold tracking-widest">{value}</p>
