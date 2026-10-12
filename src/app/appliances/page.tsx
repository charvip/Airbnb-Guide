import { BackLink, NavCard, PageHeader } from "@/components/ui";
import { appliances } from "@/data/house";

export default function AppliancesPage() {
  return (
    <div>
      <BackLink />
      <PageHeader emoji="🔌" title="Devices" subtitle="Tap a device to see where it is and how to use it." />
      <div className="space-y-3">
        {appliances.map((a) => (
          <NavCard key={a.id} href={`/appliances/${a.id}`} emoji={a.emoji} title={a.name} subtitle={a.summary} />
        ))}
      </div>
    </div>
  );
}
