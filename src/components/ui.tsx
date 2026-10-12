import Link from "next/link";

// Shared building blocks so every page looks consistent.

export function PageHeader({ emoji, title, subtitle }: { emoji?: string; title: string; subtitle?: string }) {
  return (
    <header className="mb-6 space-y-2">
      {emoji && <div className="text-4xl">{emoji}</div>}
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      {subtitle && <p className="text-stone-600">{subtitle}</p>}
    </header>
  );
}

export function BackLink({ href = "/", label = "Home" }: { href?: string; label?: string }) {
  return (
    <Link href={href} className="mb-6 inline-block text-sm font-medium text-emerald-800 hover:underline">
      ← {label}
    </Link>
  );
}

export function NavCard({ href, emoji, title, subtitle }: { href: string; emoji: string; title: string; subtitle?: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-4 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm transition hover:border-emerald-700 hover:shadow"
    >
      <span className="text-3xl" aria-hidden>{emoji}</span>
      <span className="flex-1">
        <span className="block font-semibold">{title}</span>
        {subtitle && <span className="block text-sm text-stone-600">{subtitle}</span>}
      </span>
      <span className="text-stone-400" aria-hidden>›</span>
    </Link>
  );
}

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-6 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
      <h2 className="mb-3 text-lg font-semibold">{title}</h2>
      {children}
    </section>
  );
}

export function Photos({ urls, alt }: { urls?: string[]; alt: string }) {
  if (!urls || urls.length === 0) return null;
  return (
    <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
      {urls.map((url, i) => (
        // Plain <img>: photos are host uploads on Vercel Blob, already web-sized.
        // eslint-disable-next-line @next/next/no-img-element
        <img key={url} src={url} alt={`${alt} photo ${i + 1}`} className="w-full rounded-2xl border border-stone-200 object-cover" />
      ))}
    </div>
  );
}

export function StillStuck() {
  return (
    <div className="mt-10 text-center">
      <Link
        href="/contact"
        className="inline-block rounded-full bg-emerald-800 px-6 py-3 font-semibold text-white shadow hover:bg-emerald-900"
      >
        Still stuck? Contact the host
      </Link>
    </div>
  );
}
