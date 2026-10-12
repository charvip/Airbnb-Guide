import Link from "next/link";
import { notFound } from "next/navigation";
import { BackLink, NavCard, PageHeader, Section, StillStuck } from "@/components/ui";
import { getAppliance, getStop, tourStops } from "@/data/house";

// Pre-render one page per tour stop at build time.
export function generateStaticParams() {
  return tourStops.map((s) => ({ stop: s.id }));
}

export default async function TourStopPage({ params }: { params: Promise<{ stop: string }> }) {
  const { stop: stopId } = await params;
  const stop = getStop(stopId);
  if (!stop) notFound();

  const index = tourStops.findIndex((s) => s.id === stop.id);
  const prev = tourStops[index - 1];
  const next = tourStops[index + 1];
  const stopAppliances = stop.applianceIds.map(getAppliance).filter((a) => a !== undefined);

  return (
    <div>
      <BackLink href="/tour" label="All tour stops" />
      <p className="mb-1 text-sm font-medium text-stone-500">
        Stop {index + 1} of {tourStops.length}
      </p>
      <PageHeader emoji={stop.emoji} title={stop.title} subtitle={stop.summary} />

      {stop.details.length > 0 && (
        <Section title={stop.id === "checkout" ? "Checkout checklist" : "Good to know"}>
          <ul className="list-disc space-y-2 pl-5">
            {stop.details.map((d) => (
              <li key={d}>{d}</li>
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
