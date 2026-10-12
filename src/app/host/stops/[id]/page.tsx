import { notFound } from "next/navigation";
import { Field, FormCard, HostHeader, LinesField, Notice, SaveButton, TextArea } from "@/components/host-ui";
import { PhotoField } from "@/components/PhotoField";
import { getContent } from "@/lib/content";
import { saveStop } from "../../actions";

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ saved?: string; error?: string }> };

export default async function EditStop({ params, searchParams }: Props) {
  const { id } = await params;
  const { saved, error } = await searchParams;
  const { tourStops } = await getContent();
  const stop = tourStops.find((s) => s.id === id);
  if (!stop) notFound();

  return (
    <div>
      <HostHeader title={`Tour stop: ${stop.title}`} />
      <Notice saved={saved} error={error} />
      <form action={saveStop} className="space-y-6">
        <input type="hidden" name="id" value={stop.id} />
        <FormCard>
          <Field label="Title" name="title" defaultValue={stop.title} />
          <Field label="Emoji" name="emoji" defaultValue={stop.emoji} />
          <TextArea label="Summary" name="summary" defaultValue={stop.summary} />
          <LinesField label="Good to know" name="details" values={stop.details} />
          {stop.id === "arrival" && <p className="text-sm text-stone-500">Parking is shown here automatically from Essentials.</p>}
          {stop.id === "checkout" && (
            <p className="text-sm text-stone-500">The checkout time and checklist are shown here automatically from Essentials.</p>
          )}
          <p className="text-sm text-stone-500">To show a device on this stop, open the device and pick this stop.</p>
        </FormCard>
        <PhotoField photos={stop.photos} />
        <SaveButton />
      </form>
    </div>
  );
}
