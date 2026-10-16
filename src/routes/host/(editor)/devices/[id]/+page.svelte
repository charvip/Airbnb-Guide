<script lang="ts">
	import {
		EditorForm,
		FormNotice,
		FormSection,
		HostHeader,
		LinesField,
		PhotoField,
		SelectField,
		TextField
	} from '#lib/components/app/index.js';
	import { Button } from '#lib/components/ui/button/index.js';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();
	const device = $derived(data.device);
</script>

<HostHeader title="Device: {device.name}" />
<FormNotice result={form} />

{#key device.id}
	<EditorForm action="?/save">
		<FormSection>
			<TextField label="Name" name="name" value={device.name} />
			<TextField label="Emoji" name="emoji" value={device.emoji} />
			<TextField label="Short summary" name="summary" value={device.summary} />
			<SelectField
				label="Show on tour stop"
				name="stopId"
				value={data.currentStop}
				options={[{ value: '', label: 'Not on the tour' }, ...data.stopOptions]}
			/>
		</FormSection>

		<FormSection title="Where it is">
			<TextField label="Location" name="location" value={device.location} />
			<TextField
				label="Where the supplies are"
				name="suppliesLocation"
				value={device.suppliesLocation}
			/>
		</FormSection>

		<FormSection title="Instructions">
			<LinesField label="Steps" name="steps" values={device.steps} />
			<LinesField
				label="If it does not work"
				name="troubleshooting"
				values={device.troubleshooting}
			/>
			<LinesField label="Good to know" name="tips" values={device.tips} />
		</FormSection>

		<PhotoField photos={device.photos} />
		<Button type="submit" size="lg" class="h-12 w-full text-base font-semibold">Save changes</Button
		>
	</EditorForm>
{/key}

<form method="POST" action="?/delete" class="mt-8">
	<Button type="submit" variant="destructive" size="lg" class="h-12 w-full text-base font-semibold">
		Delete {device.name}
	</Button>
</form>
