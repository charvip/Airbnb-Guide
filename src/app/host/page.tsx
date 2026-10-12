import { EditLink, HostHeader, Notice } from "@/components/host-ui";
import { getContent, storageConnected } from "@/lib/content";
import { createActivity, createDevice } from "./actions";

type Search = Promise<{ saved?: string; error?: string }>;

const addInput = "flex-1 rounded-xl border border-stone-300 bg-white px-3 py-2 focus:border-emerald-700 focus:outline-none";
const addButton = "rounded-xl bg-emerald-800 px-4 py-2 font-semibold text-white hover:bg-emerald-900";

export default async function HostDashboard({ searchParams }: { searchParams: Search }) {
  const { saved, error } = await searchParams;
  const { tourStops, appliances, activities } = await getContent();

  return (
    <div className="space-y-8">
      <HostHeader title="Host dashboard" back={false} />
      <Notice saved={saved} error={error} />

      {!storageConnected() && (
        <p className="rounded-2xl border border-amber-300 bg-amber-50 p-4 text-amber-900">
          Saving is off until a Vercel Blob store is connected to this project (Vercel → Storage → Create → Blob). You can
          look around, but edits won&apos;t be kept yet.
        </p>
      )}

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">House info</h2>
        <EditLink href="/host/general" emoji="🔑" title="Essentials, host contact & welcome" />
        <EditLink href="/host/faq" emoji="❓" title="FAQ" />
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">House tour</h2>
        {tourStops.map((s) => (
          <EditLink key={s.id} href={`/host/stops/${s.id}`} emoji={s.emoji} title={s.title} />
        ))}
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Devices</h2>
        {appliances.map((a) => (
          <EditLink key={a.id} href={`/host/devices/${a.id}`} emoji={a.emoji} title={a.name} />
        ))}
        <form action={createDevice} className="flex gap-2 pt-1">
          <input name="name" placeholder="New device name" required className={addInput} />
          <button type="submit" className={addButton}>Add</button>
        </form>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Activities</h2>
        {activities.map((a) => (
          <EditLink key={a.id} href={`/host/activities/${a.id}`} emoji={a.emoji} title={a.name} />
        ))}
        <form action={createActivity} className="flex gap-2 pt-1">
          <input name="name" placeholder="New activity name" required className={addInput} />
          <button type="submit" className={addButton}>Add</button>
        </form>
      </section>

      <form method="POST" action="/api/host-logout">
        <button type="submit" className="w-full rounded-full border border-stone-300 py-3 font-medium hover:bg-stone-100">
          Sign out
        </button>
      </form>
    </div>
  );
}
