import { BackLink, PageHeader, StillStuck } from "@/components/ui";
import { faqs } from "@/data/house";

export default function FaqPage() {
  return (
    <div>
      <BackLink />
      <PageHeader emoji="❓" title="FAQ" subtitle="Tap a question to see the answer." />
      <div className="space-y-3">
        {faqs.map((faq) => (
          // Native <details> gives expand/collapse with no JavaScript.
          <details key={faq.question} className="group rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
            <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">
              {faq.question}
              <span className="text-stone-400 transition group-open:rotate-45" aria-hidden>+</span>
            </summary>
            <p className="mt-3 text-stone-700">{faq.answer}</p>
          </details>
        ))}
      </div>
      <StillStuck />
    </div>
  );
}
