<script lang="ts">
	import {
		EditorForm,
		FormNotice,
		FormSection,
		HostHeader,
		LinesField,
		TextAreaField,
		TextField
	} from '#lib/components/app/index.js';
	import { Button } from '#lib/components/ui/button/index.js';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();
	const { house, host, essentials } = $derived(data);
</script>

<HostHeader title="Essentials & host info" />
<FormNotice result={form} />

<EditorForm>
	<FormSection title="Welcome">
		<TextField label="Property name" name="houseName" value={house.name} />
		<TextAreaField label="Welcome message" name="welcome" value={house.welcome} />
	</FormSection>

	<FormSection title="Host contact">
		<TextField label="Host name(s)" name="hostName" value={host.name} />
		<TextField label="Phone" name="hostPhone" value={host.phone} />
		<TextField label="Email" name="hostEmail" value={host.email} />
		<TextAreaField
			label="Note shown on the contact page"
			name="responseNote"
			value={host.responseNote}
			rows={2}
		/>
	</FormSection>

	<FormSection title="Door & WiFi">
		<TextField label="Door code" name="doorCode" value={essentials.doorLock.code} />
		<TextAreaField
			label="Door instructions"
			name="doorInstructions"
			value={essentials.doorLock.instructions}
			rows={2}
		/>
		<TextField label="WiFi network" name="wifiNetwork" value={essentials.wifi.network} />
		<TextField label="WiFi password" name="wifiPassword" value={essentials.wifi.password} />
	</FormSection>

	<FormSection title="Stay details">
		<TextAreaField label="Parking" name="parking" value={essentials.parking} rows={2} />
		<TextField label="Checkout time" name="checkoutTime" value={essentials.checkoutTime} />
		<LinesField
			label="Checkout checklist"
			name="checkoutChecklist"
			values={essentials.checkoutChecklist}
		/>
		<TextField label="Quiet hours" name="quietHours" value={essentials.quietHours} />
	</FormSection>

	<Button type="submit" size="lg" class="h-12 w-full text-base font-semibold">Save changes</Button>
</EditorForm>
