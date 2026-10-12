import { notFound } from "next/navigation";
import { DangerButton, Field, FormCard, HostHeader, LinesField, Notice, SaveButton } from "@/components/host-ui";
import { PhotoField } from "@/components/PhotoField";
import { getContent } from "@/lib/content";
import { deleteDevice, saveDevice } from "../../actions";

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ saved?: string; error?: string }> };

export default async function EditDevice({ params, searchParams }: Props) {
  const { id } = await params;
  const { saved, error } = await searchParams;
  const { appliances, tourStops } = await getContent();
  const device = appliances.find((a) => a.id === id);
  if (!device) notFound();
  const currentStop = tourStops.find((s) => s.applianceIds.includes(device.id))?.id ?? "";

  return (
    <div>
      <HostHeader title={`Device: ${device.name}`} />
      <Notice saved={saved} error={error} />
      <form action={saveDevice} className="space-y-6">
        <input type="hidden" name="id" value={device.id} />
        <FormCard>
          <Field label="Name" name="name" defaultValue={device.name} />
          <Field label="Emoji" name="emoji" defaultValue={device.emoji} />
          <Field label="Short summary" name="summary" defaultValue={device.summary} />
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-stone-700">Show on tour stop</span>
            <select
              name="stopId"
              defaultValue={currentStop}
              className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2 focus:border-emerald-700 focus:outline-none"
            >
              <option value="">Not on the tour</option>
              {tourStops.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title}
                </option>
              ))}
            </select>
          </label>
        </FormCard>

        <FormCard>
          <h2 className="font-semibold">Where it is</h2>
          <Field label="Location" name="location" defaultValue={device.location} />
          <Field label="Where the supplies are" name="suppliesLocation" defaultValue={device.suppliesLocation} />
        </FormCard>

        <FormCard>
          <h2 className="font-semibold">Instructions</h2>
          <LinesField label="Steps" name="steps" values={device.steps} />
          <LinesField label="If it does not work" name="troubleshooting" values={device.troubleshooting} />
          <LinesField label="Good to know" name="tips" values={device.tips} />
        </FormCard>

        <PhotoField photos={device.photos} />
        <SaveButton />
      </form>

      <form action={deleteDevice} className="mt-8">
        <input type="hidden" name="id" value={device.id} />
        <DangerButton label={`Delete ${device.name}`} />
      </form>
    </div>
  );
}
