import Link from "next/link";
import { NavCard } from "@/components/ui";
import { getContent } from "@/lib/content";

export default async function Home() {
  const { house } = await getContent();
  return (
    <div className="space-y-8">
      <header className="space-y-3 pt-4 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-emerald-800">Guest Guide</p>
        <h1 className="text-3xl font-semibold tracking-tight">{house.name}</h1>
        <p className="text-stone-600">{house.welcome}</p>
      </header>

      <Link
        href="/tour"
        className="block rounded-2xl bg-emerald-800 p-5 text-center text-lg font-semibold text-white shadow hover:bg-emerald-900"
      >
        🏡 Start the House Tour
      </Link>

      <nav className="space-y-3">
        <NavCard href="/appliances" emoji="🔌" title="Devices" subtitle="How to use everything in the house" />
        <NavCard href="/essentials" emoji="🔑" title="Essentials" subtitle="Door code, WiFi, parking, checkout" />
        <NavCard href="/activities" emoji="🌲" title="Activities" subtitle="Things to do during your stay" />
        <NavCard href="/faq" emoji="❓" title="FAQ" subtitle="Quick answers to common questions" />
        <NavCard href="/contact" emoji="📞" title="Contact the Host" />
      </nav>

      <footer className="pt-6 text-center">
        <Link href="/host" className="text-sm text-stone-500 hover:underline">
          Host login
        </Link>
      </footer>
    </div>
  );
}
