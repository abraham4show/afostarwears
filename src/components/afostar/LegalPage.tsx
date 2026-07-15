import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

type Section = { heading: string; body: string | string[] };

export function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: Section[];
}) {
  return (
    <main className="bg-white text-black min-h-screen">
      <Navbar />
      <section className="max-w-3xl mx-auto px-5 md:px-8 py-14 md:py-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-black mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to shop
        </Link>
        <div className="text-xs uppercase tracking-widest text-neutral-500">Legal</div>
        <h1 className="font-display font-bold text-4xl md:text-5xl mt-2">{title}</h1>
        <p className="text-sm text-neutral-500 mt-2">Last updated {updated}</p>
        <p className="mt-6 text-neutral-700 leading-relaxed">{intro}</p>

        <div className="mt-10 space-y-8">
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="font-display font-bold text-xl md:text-2xl">{s.heading}</h2>
              {Array.isArray(s.body) ? (
                <ul className="mt-3 space-y-2 text-neutral-700 list-disc pl-5">
                  {s.body.map((b, i) => (
                    <li key={i} className="leading-relaxed">{b}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-neutral-700 leading-relaxed whitespace-pre-line">{s.body}</p>
              )}
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}