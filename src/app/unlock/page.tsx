import { BackLink, PageHeader } from "@/components/ui";

export default async function UnlockPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const { next = "/essentials", error } = await searchParams;

  return (
    <div>
      <BackLink />
      <PageHeader
        emoji="🔒"
        title="Guest access"
        subtitle="Enter the guest passcode from your Airbnb booking messages to see the door code and WiFi."
      />
      <form method="POST" action="/api/unlock" className="space-y-4 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
        <input type="hidden" name="next" value={next} />
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-stone-600">Passcode</span>
          <input
            name="code"
            type="password"
            required
            autoFocus
            className="w-full rounded-xl border border-stone-300 px-4 py-3 text-lg focus:border-emerald-700 focus:outline-none"
          />
        </label>
        {error && <p className="text-sm font-medium text-red-700">That passcode didn&apos;t work. Please try again.</p>}
        <button type="submit" className="w-full rounded-full bg-emerald-800 py-3 font-semibold text-white hover:bg-emerald-900">
          Unlock
        </button>
      </form>
    </div>
  );
}
