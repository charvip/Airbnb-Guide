import Link from "next/link";

// Form building blocks for the host editor.
// List fields (steps, tips, checklist) are a textarea with one item per line,
// which is quick to edit on a phone and needs no add/remove buttons.

const inputClass =
  "w-full rounded-xl border border-stone-300 bg-white px-3 py-2 focus:border-emerald-700 focus:outline-none";

export function HostHeader({ title, back = true }: { title: string; back?: boolean }) {
  return (
    <header className="mb-6 space-y-3">
      <div className="flex items-center justify-between text-sm">
        {back ? (
          <Link href="/host" className="font-medium text-emerald-800 hover:underline">
            ← Host dashboard
          </Link>
        ) : (
          <Link href="/" className="font-medium text-emerald-800 hover:underline">
            View guest site
          </Link>
        )}
        <span className="rounded-full bg-amber-100 px-3 py-1 font-medium text-amber-900">Host mode</span>
      </div>
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
    </header>
  );
}

export function Notice({ saved, error }: { saved?: string; error?: string }) {
  if (error) {
    return <p className="mb-4 rounded-xl border border-red-300 bg-red-50 p-3 text-red-800">Couldn&apos;t save: {error}</p>;
  }
  if (saved) {
    return <p className="mb-4 rounded-xl border border-emerald-300 bg-emerald-50 p-3 text-emerald-900">Saved! Guests see the update right away.</p>;
  }
  return null;
}

export function Field({ label, name, defaultValue, hint }: { label: string; name: string; defaultValue?: string; hint?: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-stone-700">{label}</span>
      <input name={name} defaultValue={defaultValue} className={inputClass} />
      {hint && <span className="mt-1 block text-xs text-stone-500">{hint}</span>}
    </label>
  );
}

export function TextArea({ label, name, defaultValue, rows = 3 }: { label: string; name: string; defaultValue?: string; rows?: number }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-stone-700">{label}</span>
      <textarea name={name} defaultValue={defaultValue} rows={rows} className={inputClass} />
    </label>
  );
}

export function LinesField({ label, name, values }: { label: string; name: string; values?: string[] }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-stone-700">{label}</span>
      <textarea
        name={name}
        defaultValue={(values ?? []).join("\n")}
        rows={Math.max(3, (values?.length ?? 0) + 1)}
        className={inputClass}
      />
      <span className="mt-1 block text-xs text-stone-500">One item per line.</span>
    </label>
  );
}

export function FormCard({ children }: { children: React.ReactNode }) {
  return <div className="space-y-4 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">{children}</div>;
}

export function SaveButton({ label = "Save changes" }: { label?: string }) {
  return (
    <button type="submit" className="w-full rounded-full bg-emerald-800 py-3 font-semibold text-white hover:bg-emerald-900">
      {label}
    </button>
  );
}

export function DangerButton({ label }: { label: string }) {
  return (
    <button type="submit" className="w-full rounded-full border border-red-300 py-3 font-semibold text-red-700 hover:bg-red-50">
      {label}
    </button>
  );
}

export function EditLink({ href, emoji, title }: { href: string; emoji: string; title: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-xl border border-stone-200 bg-white px-4 py-3 hover:border-emerald-700"
    >
      <span className="text-xl" aria-hidden>{emoji}</span>
      <span className="flex-1 font-medium">{title}</span>
      <span className="text-sm text-emerald-800">Edit</span>
    </Link>
  );
}
