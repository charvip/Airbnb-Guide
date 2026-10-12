import { BackLink, PageHeader, Section } from "@/components/ui";
import { getContent } from "@/lib/content";

const isFilledIn = (value: string) => !value.startsWith("[ADD");

export default async function ContactPage() {
  const { host } = await getContent();
  return (
    <div>
      <BackLink />
      <PageHeader emoji="📞" title="Contact the Host" subtitle={host.responseNote} />

      <Section title={host.name}>
        <div className="space-y-3">
          {isFilledIn(host.phone) ? (
            <div className="flex gap-3">
              <a href={`tel:${host.phone}`} className="flex-1 rounded-full bg-emerald-800 py-3 text-center font-semibold text-white hover:bg-emerald-900">
                Call
              </a>
              <a href={`sms:${host.phone}`} className="flex-1 rounded-full border border-emerald-800 py-3 text-center font-semibold text-emerald-800 hover:bg-emerald-50">
                Text
              </a>
            </div>
          ) : (
            <p>{host.phone}</p>
          )}
          {isFilledIn(host.email) ? (
            <a href={`mailto:${host.email}`} className="block font-medium text-emerald-800 hover:underline">
              {host.email}
            </a>
          ) : (
            <p>{host.email}</p>
          )}
        </div>
      </Section>
    </div>
  );
}
