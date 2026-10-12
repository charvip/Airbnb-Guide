import { BackLink, PageHeader } from "@/components/ui";

export default async function HostLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const { next = "/host", error } = await searchParams;
  const configured = Boolean(process.env.HOST_PASSWORD);

  return (
    <div>
      <BackLink label="Guest guide" />
      <PageHeader emoji="🔐" title="Host login" subtitle="Sign in to edit the guide, add instructions and upload photos." />

      {!configured ? (
        <p className="rounded-2xl border border-amber-300 bg-amber-50 p-4 text-amber-900">
          The host side is locked until a <code>HOST_PASSWORD</code> environment variable is set in Vercel.
        </p>
      ) : (
        <form method="POST" action="/api/host-login" className="space-y-4 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
          <input type="hidden" name="next" value={next} />
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-stone-600">Password</span>
            <input
              name="password"
              type="password"
              required
              autoFocus
              className="w-full rounded-xl border border-stone-300 px-4 py-3 text-lg focus:border-emerald-700 focus:outline-none"
            />
          </label>
          {error && <p className="text-sm font-medium text-red-700">Wrong password. Please try again.</p>}
          <button type="submit" className="w-full rounded-full bg-emerald-800 py-3 font-semibold text-white hover:bg-emerald-900">
            Sign in
          </button>
        </form>
      )}
    </div>
  );
}
