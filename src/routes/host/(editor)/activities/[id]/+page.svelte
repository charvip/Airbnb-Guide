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
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();
	const activity = $derived(data.activity);
</script>

<HostHeader title="Activity: {activity.name}" />
<FormNotice result={form} />

{#key activity.id}
	<EditorForm action="?/save">
		<FormSection>
			<TextField label="Name" name="name" value={activity.name} />
			<TextField label="Emoji" name="emoji" value={activity.emoji} />
			<TextAreaField label="Summary" name="summary" value={activity.summary} />
			<LinesField label="Details" name="details" values={activity.details} />
		</FormSection>
		<PhotoField photos={activity.photos} />
		<Button type="submit" size="lg" class="h-12 w-full text-base font-semibold">Save changes</Button
		>
	</EditorForm>
{/key}

<form method="POST" action="?/delete" class="mt-8">
	<Button type="submit" variant="destructive" size="lg" class="h-12 w-full text-base font-semibold">
		Delete {activity.name}
	</Button>
</form>
