import { notFound } from "next/navigation";
import { DangerButton, Field, FormCard, HostHeader, LinesField, Notice, SaveButton, TextArea } from "@/components/host-ui";
import { PhotoField } from "@/components/PhotoField";
import { getContent } from "@/lib/content";
import { deleteActivity, saveActivity } from "../../actions";

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ saved?: string; error?: string }> };

export default async function EditActivity({ params, searchParams }: Props) {
  const { id } = await params;
  const { saved, error } = await searchParams;
  const { activities } = await getContent();
  const activity = activities.find((a) => a.id === id);
  if (!activity) notFound();

  return (
    <div>
      <HostHeader title={`Activity: ${activity.name}`} />
      <Notice saved={saved} error={error} />
      <form action={saveActivity} className="space-y-6">
        <input type="hidden" name="id" value={activity.id} />
        <FormCard>
          <Field label="Name" name="name" defaultValue={activity.name} />
          <Field label="Emoji" name="emoji" defaultValue={activity.emoji} />
          <TextArea label="Summary" name="summary" defaultValue={activity.summary} />
          <LinesField label="Details" name="details" values={activity.details} />
        </FormCard>
        <PhotoField photos={activity.photos} />
        <SaveButton />
      </form>

      <form action={deleteActivity} className="mt-8">
        <input type="hidden" name="id" value={activity.id} />
        <DangerButton label={`Delete ${activity.name}`} />
      </form>
    </div>
  );
}
