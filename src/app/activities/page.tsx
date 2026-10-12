import Link from "next/link";
import { BackLink, PageHeader, Section } from "@/components/ui";
import { activities } from "@/data/house";

export default function ActivitiesPage() {
  return (
    <div>
      <BackLink />
      <PageHeader emoji="🌲" title="Activities" subtitle="Things to do in and around the house." />
      {activities.map((activity) => (
        <Section key={activity.id} title={`${activity.emoji} ${activity.name}`}>
          <p className="mb-3 text-stone-700">{activity.summary}</p>
          <ul className="list-disc space-y-1 pl-5 text-stone-700">
            {activity.details.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
          {activity.applianceId && (
            <Link
              href={`/appliances/${activity.applianceId}`}
              className="mt-3 inline-block font-medium text-emerald-800 hover:underline"
            >
              How to use it →
            </Link>
          )}
        </Section>
      ))}
    </div>
  );
}
