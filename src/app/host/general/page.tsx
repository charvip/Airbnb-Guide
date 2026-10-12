import { Field, FormCard, HostHeader, LinesField, Notice, SaveButton, TextArea } from "@/components/host-ui";
import { getContent } from "@/lib/content";
import { saveGeneral } from "../actions";

export default async function EditGeneral({ searchParams }: { searchParams: Promise<{ saved?: string; error?: string }> }) {
  const { saved, error } = await searchParams;
  const { house, host, essentials } = await getContent();

  return (
    <div>
      <HostHeader title="Essentials & host info" />
      <Notice saved={saved} error={error} />
      <form action={saveGeneral} className="space-y-6">
        <FormCard>
          <h2 className="font-semibold">Welcome</h2>
          <Field label="Property name" name="houseName" defaultValue={house.name} />
          <TextArea label="Welcome message" name="welcome" defaultValue={house.welcome} />
        </FormCard>

        <FormCard>
          <h2 className="font-semibold">Host contact</h2>
          <Field label="Host name(s)" name="hostName" defaultValue={host.name} />
          <Field label="Phone" name="hostPhone" defaultValue={host.phone} />
          <Field label="Email" name="hostEmail" defaultValue={host.email} />
          <TextArea label="Note shown on the contact page" name="responseNote" defaultValue={host.responseNote} rows={2} />
        </FormCard>

        <FormCard>
          <h2 className="font-semibold">Door & WiFi</h2>
          <Field label="Door code" name="doorCode" defaultValue={essentials.doorLock.code} />
          <TextArea label="Door instructions" name="doorInstructions" defaultValue={essentials.doorLock.instructions} rows={2} />
          <Field label="WiFi network" name="wifiNetwork" defaultValue={essentials.wifi.network} />
          <Field label="WiFi password" name="wifiPassword" defaultValue={essentials.wifi.password} />
        </FormCard>

        <FormCard>
          <h2 className="font-semibold">Stay details</h2>
          <TextArea label="Parking" name="parking" defaultValue={essentials.parking} rows={2} />
          <Field label="Checkout time" name="checkoutTime" defaultValue={essentials.checkoutTime} />
          <LinesField label="Checkout checklist" name="checkoutChecklist" values={essentials.checkoutChecklist} />
          <Field label="Quiet hours" name="quietHours" defaultValue={essentials.quietHours} />
        </FormCard>

        <SaveButton />
      </form>
    </div>
  );
}
