<script lang="ts">
	import { uploadPresigned } from '@vercel/blob/client';
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
	import ArrowRightIcon from '@lucide/svelte/icons/arrow-right';
	import ImagePlusIcon from '@lucide/svelte/icons/image-plus';
	import { AspectRatio } from '#lib/components/ui/aspect-ratio/index.js';
	import { Button } from '#lib/components/ui/button/index.js';
	import * as Field from '#lib/components/ui/field/index.js';
	import FormSection from './form-section.svelte';

	// Photo manager inside a host edit form. Uploads go straight to Vercel Blob;
	// the resulting URLs are kept in hidden "photos" inputs, so they're saved
	// together with the rest of the form when the host presses "Save changes".
	let { photos: initial = [] }: { photos?: string[] } = $props();

	// Seeded once from the saved photos; after that the host's edits own it.
	// svelte-ignore state_referenced_locally
	let photos = $state([...initial]);
	let uploading = $state(false);
	let error = $state('');
	const inputId = $props.id();

	async function onFiles(event: Event & { currentTarget: HTMLInputElement }) {
		const input = event.currentTarget;
		const files = Array.from(input.files ?? []);
		input.value = '';
		if (files.length === 0) return;
		uploading = true;
		error = '';
		try {
			for (const file of files) {
				const blob = await uploadPresigned(`photos/${file.name}`, file, {
					access: 'public',
					handleUploadUrl: '/api/upload'
				});
				photos.push(blob.url);
			}
		} catch (err) {
			error = err instanceof Error ? err.message : 'Upload failed.';
		} finally {
			uploading = false;
		}
	}

	function move(i: number, dir: -1 | 1) {
		const j = i + dir;
		if (j < 0 || j >= photos.length) return;
		[photos[i], photos[j]] = [photos[j], photos[i]];
	}

	const remove = (url: string) => (photos = photos.filter((u) => u !== url));
</script>

<FormSection title="Photos">
	{#each photos as url (url)}
		<input type="hidden" name="photos" value={url} />
	{/each}

	{#if photos.length > 0}
		<div class="grid grid-cols-2 gap-3">
			{#each photos as url, i (url)}
				<div class="flex flex-col gap-2">
					<AspectRatio ratio={1} class="overflow-hidden rounded-xl bg-muted">
						<img src={url} alt="Photo {i + 1}" class="size-full object-cover" />
					</AspectRatio>
					<div class="flex gap-1">
						<Button
							variant="outline"
							size="icon-sm"
							aria-label="Move earlier"
							onclick={() => move(i, -1)}
						>
							<ArrowLeftIcon />
						</Button>
						<Button
							variant="outline"
							size="icon-sm"
							aria-label="Move later"
							onclick={() => move(i, 1)}
						>
							<ArrowRightIcon />
						</Button>
						<Button variant="destructive" size="sm" class="flex-1" onclick={() => remove(url)}>
							Remove
						</Button>
					</div>
				</div>
			{/each}
		</div>
	{/if}

	<Field.Field>
		<Field.Label
			for={inputId}
			class="flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-4 text-muted-foreground hover:border-primary"
		>
			<ImagePlusIcon class="size-5" />
			{uploading ? 'Uploading…' : 'Add photos'}
		</Field.Label>
		<input
			id={inputId}
			type="file"
			accept="image/*"
			multiple
			disabled={uploading}
			class="sr-only"
			onchange={onFiles}
		/>
		{#if error}<Field.Error>{error}</Field.Error>{/if}
		<Field.Description>Press "Save changes" after adding or removing photos.</Field.Description>
	</Field.Field>
</FormSection>
