import Link from "next/link";
import { notFound } from "next/navigation";
import { BackLink, NavCard, PageHeader, Photos, Section, StillStuck } from "@/components/ui";
import { getContent } from "@/lib/content";

export default async function TourStopPage({ params }: { params: Promise<{ stop: string }> }) {
  const { stop: stopId } = await params;
  const { tourStops, appliances, essentials } = await getContent();
  const index = tourStops.findIndex((s) => s.id === stopId);
  const stop = tourStops[index];
  if (!stop) notFound();

  const prev = tourStops[index - 1];
  const next = tourStops[index + 1];
  const stopAppliances = stop.applianceIds
    .map((id) => appliances.find((a) => a.id === id))
    .filter((a) => a !== undefined);

  return (
    <div>
      <BackLink href="/tour" label="All tour stops" />
      <p className="mb-1 text-sm font-medium text-stone-500">
        Stop {index + 1} of {tourStops.length}
      </p>
      <PageHeader emoji={stop.emoji} title={stop.title} subtitle={stop.summary} />
      <Photos urls={stop.photos} alt={stop.title} />

      {/* Parking and checkout come from Essentials so they're only edited in one place. */}
      {stop.id === "arrival" && (
        <Section title="🚗 Where to park">
          <p>{essentials.parking}</p>
        </Section>
      )}

      {stop.details.length > 0 && (
        <Section title="Good to know">
          <ul className="list-disc space-y-2 pl-5">
            {stop.details.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </Section>
      )}

      {stop.id === "checkout" && (
        <Section title={`Checkout by ${essentials.checkoutTime}`}>
          <ul className="list-disc space-y-2 pl-5">
            {essentials.checkoutChecklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Section>
      )}

      {stopAppliances.length > 0 && (
        <div className="mb-6">
          <h2 className="mb-3 text-lg font-semibold">Devices here</h2>
          <div className="space-y-3">
            {stopAppliances.map((a) => (
              <NavCard key={a.id} href={`/appliances/${a.id}`} emoji={a.emoji} title={a.name} subtitle={a.summary} />
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between gap-3">
        {prev ? (
          <Link href={`/tour/${prev.id}`} className="rounded-full border border-stone-300 px-5 py-2 font-medium hover:bg-stone-100">
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/tour/${next.id}`} className="rounded-full bg-emerald-800 px-5 py-2 font-medium text-white hover:bg-emerald-900">
            {next.title} →
          </Link>
        ) : (
          <Link href="/" className="rounded-full bg-emerald-800 px-5 py-2 font-medium text-white hover:bg-emerald-900">
            Finish tour
          </Link>
        )}
      </div>

      <StillStuck />
    </div>
  );
}
