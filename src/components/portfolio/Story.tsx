import { Reveal } from "./Reveal";
import designer from "@/assets/designer.jpg";
import process from "@/assets/process.jpg";

const chapters = [
  {
    kicker: "The Designer",
    title: "Trained in Paris. Shaped by silence.",
    body: "Aria Lenoir studied haute couture under Madame Éveline Marchand before opening her rue de Sévigné atelier in 2014. Her work has been worn on the steps of the Palais Garnier, the Cannes red carpet, and quiet weddings on the Amalfi coast.",
    img: designer,
    reverse: false,
  },
  {
    kicker: "The Creative Process",
    title: "Forty hands. One silhouette.",
    body: "Each piece begins as a single line on tracing paper, then travels through the hands of embroiderers in Mumbai, silk weavers in Lyon, and premières d'atelier in Paris. A single gown may hold nine hundred hours of labor.",
    img: process,
    reverse: true,
  },
];

export function Story() {
  return (
    <section id="about" className="bg-cream py-32 md:py-48">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12 space-y-32 md:space-y-48">
        {chapters.map((c, i) => (
          <div
            key={c.kicker}
            className={`grid md:grid-cols-12 gap-10 md:gap-16 items-center ${
              c.reverse ? "md:[&>*:first-child]:order-2" : ""
            }`}
          >
            <Reveal className="md:col-span-6" y={60}>
              <div className="relative overflow-hidden aspect-[4/5] md:aspect-[5/6]">
                <img
                  src={c.img}
                  alt={c.title}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>

            <Reveal className="md:col-span-6 md:pl-8" delay={0.2}>
              <div className="flex items-center gap-3 text-noir/60 mb-6">
                <span className="h-px w-10 bg-[color:var(--gold)]" />
                <span className="text-[10px] uppercase tracking-[0.4em]">
                  0{i + 3} — {c.kicker}
                </span>
              </div>
              <h3 className="font-display text-4xl md:text-6xl leading-[1.05] text-noir">
                {c.title}
              </h3>
              <p className="mt-8 text-noir/70 leading-relaxed max-w-lg">{c.body}</p>
              <div className="mt-10 flex gap-10 text-noir">
                <div>
                  <div className="font-display text-4xl text-[color:var(--gold)]">12</div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-noir/50 mt-2">
                    Years of couture
                  </div>
                </div>
                <div>
                  <div className="font-display text-4xl text-[color:var(--gold)]">148</div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-noir/50 mt-2">
                    Bespoke pieces
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        ))}

        {/* Philosophy / Inspiration – large typographic band */}
        <Reveal>
          <div className="border-y border-[color:var(--border)] py-20 md:py-28 text-center">
            <div className="flex items-center justify-center gap-3 text-noir/60 mb-8">
              <span className="h-px w-10 bg-[color:var(--gold)]" />
              <span className="text-[10px] uppercase tracking-[0.4em]">
                05 — Philosophy
              </span>
              <span className="h-px w-10 bg-[color:var(--gold)]" />
            </div>
            <p className="font-display italic text-3xl md:text-6xl leading-[1.1] text-noir max-w-5xl mx-auto">
              "A garment is not decoration.
              <span className="block text-[color:var(--gold)] not-italic">
                It is the architecture of a woman's silence."
              </span>
            </p>
            <div className="mt-8 text-[10px] uppercase tracking-[0.4em] text-noir/50">
              — Aria Lenoir
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}