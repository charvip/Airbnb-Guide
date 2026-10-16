<script lang="ts">
	import { Button } from '#lib/components/ui/button/index.js';
	import * as Card from '#lib/components/ui/card/index.js';
	import * as Field from '#lib/components/ui/field/index.js';
	import { Input } from '#lib/components/ui/input/index.js';

	// A one-field password form (guest passcode, host password). Posts to the
	// page's default form action with the secret and the page to return to.
	let {
		name,
		label,
		submitLabel,
		next,
		error
	}: { name: string; label: string; submitLabel: string; next: string; error?: string } = $props();

	const id = $props.id();
</script>

<Card.Root>
	<Card.Content>
		<form method="POST" class="flex flex-col gap-4">
			<input type="hidden" name="next" value={next} />
			<Field.Field data-invalid={error ? true : undefined}>
				<Field.Label for={id}>{label}</Field.Label>
				<!-- svelte-ignore a11y_autofocus -->
				<Input
					{id}
					{name}
					type="password"
					required
					autofocus
					class="h-12 text-lg"
					aria-invalid={error ? true : undefined}
				/>
				{#if error}<Field.Error>{error}</Field.Error>{/if}
			</Field.Field>
			<Button type="submit" size="lg" class="h-12 w-full text-base font-semibold">
				{submitLabel}
			</Button>
		</form>
	</Card.Content>
</Card.Root>
