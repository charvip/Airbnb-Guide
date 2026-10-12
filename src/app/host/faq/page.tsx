import { FormCard, HostHeader, Notice, SaveButton } from "@/components/host-ui";
import { getContent } from "@/lib/content";
import { saveFaqs } from "../actions";

const inputClass = "w-full rounded-xl border border-stone-300 bg-white px-3 py-2 focus:border-emerald-700 focus:outline-none";

export default async function EditFaq({ searchParams }: { searchParams: Promise<{ saved?: string; error?: string }> }) {
  const { saved, error } = await searchParams;
  const { faqs } = await getContent();
  // One blank row at the end for adding a new question.
  const rows = [...faqs, { question: "", answer: "" }];

  return (
    <div>
      <HostHeader title="FAQ" />
      <Notice saved={saved} error={error} />
      <p className="mb-4 text-sm text-stone-600">Fill in the last box to add a question. Clear a question to remove it.</p>
      <form action={saveFaqs} className="space-y-4">
        {rows.map((faq, i) => (
          <FormCard key={i}>
            <input name="question" defaultValue={faq.question} placeholder="Question" className={`${inputClass} font-medium`} />
            <textarea name="answer" defaultValue={faq.answer} placeholder="Answer" rows={2} className={inputClass} />
          </FormCard>
        ))}
        <SaveButton />
      </form>
    </div>
  );
}
