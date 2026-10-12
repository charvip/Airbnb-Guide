import { BackLink, PageHeader, Section, StillStuck } from "@/components/ui";
import { getContent } from "@/lib/content";

export default async function EssentialsPage() {
  const { essentials, host } = await getContent();
  return (
    <div>
      <BackLink />
      <PageHeader emoji="🔑" title="Essentials" subtitle="Everything you need for a smooth stay." />

      <Section title="🔐 Door lock">
        <p className="mb-2 text-2xl font-semibold tracking-widest">{essentials.doorLock.code}</p>
        <p className="text-stone-700">{essentials.doorLock.instructions}</p>
      </Section>

      <Section title="📶 WiFi">
        <dl className="space-y-2">
          <div>
            <dt className="text-sm font-medium text-stone-500">Network</dt>
            <dd className="font-semibold">{essentials.wifi.network}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-stone-500">Password</dt>
            <dd className="font-mono font-semibold">{essentials.wifi.password}</dd>
          </div>
        </dl>
      </Section>

      <Section title="🚗 Parking">
        <p>{essentials.parking}</p>
      </Section>

      <Section title={`👋 Checkout by ${essentials.checkoutTime}`}>
        <ul className="list-disc space-y-2 pl-5">
          {essentials.checkoutChecklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Section>

      <Section title="🤫 Quiet hours">
        <p>{essentials.quietHours}</p>
      </Section>

      <Section title="📞 Host">
        <p className="font-semibold">{host.name}</p>
        <p>{host.phone}</p>
        <p>{host.email}</p>
      </Section>

      <StillStuck />
    </div>
  );
}
