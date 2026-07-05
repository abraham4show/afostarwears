import { Reveal } from "./Reveal";

const items = [
  {
    q: "Àṣọ Lagos dresses Africa the way great architects design cathedrals — with reverence, and with fire.",
    a: "Chidera Nwosu",
    r: "Editor-in-Chief, Vogue Africa",
  },
  {
    q: "My Aso Oke arrived like a letter from my grandmother. I have never felt more Yoruba, or more modern.",
    a: "Temilade Adéyemí",
    r: "Actress, AMVCA Best Lead 2025",
  },
  {
    q: "A rare, deliberate voice — proof that Nigerian couture belongs on every runway from Lagos to Paris.",
    a: "Marcus Okafor",
    r: "Curator, Zeitz MOCAA",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-cream py-32 md:py-48">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <Reveal>
          <div className="mb-20 md:mb-24 flex items-center gap-3 text-noir/60">
            <span className="h-px w-10 bg-[color:var(--gold)]" />
            <span className="text-[10px] uppercase tracking-[0.4em]">08 — In Their Words</span>
          </div>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-3">
          {items.map((t, i) => (
            <Reveal key={t.a} delay={i * 0.15}>
              <figure className="h-full border border-[color:var(--border)] bg-[color:var(--card)] p-10 md:p-12 flex flex-col justify-between transition-colors duration-700 hover:border-[color:var(--gold)]">
                <div>
                  <span className="font-display text-6xl text-[color:var(--gold)] leading-none">
                    &ldquo;
                  </span>
                  <blockquote className="mt-4 font-display italic text-2xl leading-snug text-noir">
                    {t.q}
                  </blockquote>
                </div>
                <figcaption className="mt-10 pt-6 border-t border-[color:var(--border)]">
                  <div className="text-sm text-noir">{t.a}</div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-noir/50 mt-1">
                    {t.r}
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}