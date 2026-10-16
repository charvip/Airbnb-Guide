<script lang="ts">
	import CircleAlertIcon from '@lucide/svelte/icons/circle-alert';
	import {
		AddItemForm,
		EditLink,
		FormNotice,
		HostHeader,
		ListGroup
	} from '#lib/components/app/index.js';
	import * as Alert from '#lib/components/ui/alert/index.js';
	import { Button } from '#lib/components/ui/button/index.js';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();
</script>

<div class="flex flex-col gap-8">
	<div>
		<HostHeader title="Host dashboard" back={false} />
		<FormNotice result={form} />

		{#if !data.storageConnected}
			<Alert.Root variant="warning">
				<CircleAlertIcon />
				<Alert.Title>Saving is off</Alert.Title>
				<Alert.Description>
					Connect a Vercel Blob store to this project (Vercel → Storage → Create → Blob). You can
					look around, but edits won't be kept yet.
				</Alert.Description>
			</Alert.Root>
		{/if}
	</div>

	<section class="flex flex-col gap-2">
		<h2 class="px-1 text-sm font-medium text-muted-foreground">House info</h2>
		<ListGroup>
			<EditLink href="/host/general" emoji="🔑" title="Essentials, host contact & welcome" />
			<EditLink href="/host/faq" emoji="❓" title="FAQ" />
		</ListGroup>
	</section>

	<section class="flex flex-col gap-2">
		<h2 class="px-1 text-sm font-medium text-muted-foreground">House tour</h2>
		<ListGroup>
			{#each data.tourStops as stop (stop.id)}
				<EditLink href="/host/stops/{stop.id}" emoji={stop.emoji} title={stop.title} />
			{/each}
		</ListGroup>
	</section>

	<section class="flex flex-col gap-2">
		<h2 class="px-1 text-sm font-medium text-muted-foreground">Devices</h2>
		<ListGroup>
			{#each data.appliances as device (device.id)}
				<EditLink href="/host/devices/{device.id}" emoji={device.emoji} title={device.name} />
			{/each}
		</ListGroup>
		<AddItemForm action="?/createDevice" placeholder="New device name" />
	</section>

	<section class="flex flex-col gap-2">
		<h2 class="px-1 text-sm font-medium text-muted-foreground">Activities</h2>
		<ListGroup>
			{#each data.activities as activity (activity.id)}
				<EditLink
					href="/host/activities/{activity.id}"
					emoji={activity.emoji}
					title={activity.name}
				/>
			{/each}
		</ListGroup>
		<AddItemForm action="?/createActivity" placeholder="New activity name" />
	</section>

	<form method="POST" action="?/logout">
		<Button type="submit" variant="outline" size="lg" class="h-12 w-full">Sign out</Button>
	</form>
</div>
