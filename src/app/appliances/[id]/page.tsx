import { notFound } from "next/navigation";
import { BackLink, PageHeader, Photos, Section, StillStuck } from "@/components/ui";
import { getContent } from "@/lib/content";

export default async function AppliancePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { appliances } = await getContent();
  const appliance = appliances.find((a) => a.id === id);
  if (!appliance) notFound();

  return (
    <div>
      <BackLink href="/appliances" label="All devices" />
      <PageHeader emoji={appliance.emoji} title={appliance.name} subtitle={appliance.summary} />
      <Photos urls={appliance.photos} alt={appliance.name} />

      <Section title="📍 Where to find it">
        <dl className="space-y-3">
          <div>
            <dt className="text-sm font-medium text-stone-500">The {appliance.name.toLowerCase()}</dt>
            <dd>{appliance.location}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-stone-500">Supplies</dt>
            <dd>{appliance.suppliesLocation}</dd>
          </div>
        </dl>
      </Section>

      <Section title="🛠️ How to use it">
        <ol className="list-decimal space-y-2 pl-5">
          {appliance.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </Section>

      {appliance.troubleshooting && appliance.troubleshooting.length > 0 && (
        <Section title="🤔 If it does not work">
          <ul className="list-disc space-y-2 pl-5">
            {appliance.troubleshooting.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </Section>
      )}

      {appliance.tips && appliance.tips.length > 0 && (
        <Section title="💡 Good to know">
          <ul className="list-disc space-y-2 pl-5">
            {appliance.tips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </Section>
      )}

      <StillStuck />
    </div>
  );
}
