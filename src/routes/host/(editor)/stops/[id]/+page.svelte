<script lang="ts">
	import {
		EditorForm,
		FormNotice,
		FormSection,
		HostHeader,
		LinesField,
		PhotoField,
		TextAreaField,
		TextField
	} from '#lib/components/app/index.js';
	import { Button } from '#lib/components/ui/button/index.js';
	import * as Field from '#lib/components/ui/field/index.js';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();
	const stop = $derived(data.stop);
</script>

<HostHeader title="Tour stop: {stop.title}" />
<FormNotice result={form} />

{#key stop.id}
	<EditorForm>
		<FormSection>
			<TextField label="Title" name="title" value={stop.title} />
			<TextField label="Emoji" name="emoji" value={stop.emoji} />
			<TextAreaField label="Summary" name="summary" value={stop.summary} />
			<LinesField label="Good to know" name="details" values={stop.details} />
			{#if stop.id === 'arrival'}
				<Field.Description>Parking is shown here automatically from Essentials.</Field.Description>
			{/if}
			{#if stop.id === 'checkout'}
				<Field.Description>
					The checkout time and checklist are shown here automatically from Essentials.
				</Field.Description>
			{/if}
			<Field.Description>
				To show a device on this stop, open the device and pick this stop.
			</Field.Description>
		</FormSection>
		<PhotoField photos={stop.photos} />
		<Button type="submit" size="lg" class="h-12 w-full text-base font-semibold">Save changes</Button
		>
	</EditorForm>
{/key}
