import { BackLink, NavCard, PageHeader } from "@/components/ui";
import { getContent } from "@/lib/content";

export default async function TourOverview() {
  const { tourStops } = await getContent();
  return (
    <div>
      <BackLink />
      <PageHeader emoji="🏡" title="House Tour" subtitle="Walk through the house from arrival to checkout." />
      <ol className="space-y-3">
        {tourStops.map((stop, i) => (
          <li key={stop.id}>
            <NavCard href={`/tour/${stop.id}`} emoji={stop.emoji} title={`${i + 1}. ${stop.title}`} subtitle={stop.summary} />
          </li>
        ))}
      </ol>
    </div>
  );
}
