import { Reveal } from "./Reveal";

const services = [
  { n: "01", t: "Bespoke Couture", d: "Private commissions crafted over five to nine fittings in the Paris atelier." },
  { n: "02", t: "Bridal Ateliers", d: "Made-to-measure gowns for weddings, private ceremonies, and second-day looks." },
  { n: "03", t: "Runway Direction", d: "Creative direction and full runway production for luxury houses and events." },
  { n: "04", t: "Editorial Styling", d: "Wardrobe consulting for editorial covers, films, and red-carpet appearances." },
];

export function Services() {
  return (
    <section id="services" className="bg-noir text-cream py-32 md:py-48">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <Reveal>
          <div className="mb-20 md:mb-28 max-w-3xl">
            <div className="flex items-center gap-3 text-cream/60 mb-6">
              <span className="h-px w-10 bg-[color:var(--gold)]" />
              <span className="text-[10px] uppercase tracking-[0.4em]">06 — Services</span>
            </div>
            <h2 className="font-display text-[9vw] md:text-[5vw] leading-[0.95]">
              Craft, offered <em className="text-[color:var(--gold)]">by hand</em>.
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 border-t border-cream/10">
          {services.map((s, i) => (
            <Reveal
              key={s.n}
              delay={i * 0.1}
              className={`group relative border-b border-cream/10 ${
                i % 2 === 0 ? "md:border-r" : ""
              } border-cream/10 py-12 md:py-16 px-2 md:px-10`}
            >
              <div className="flex items-start gap-8">
                <span className="font-display text-[color:var(--gold)] text-2xl">{s.n}</span>
                <div className="flex-1">
                  <h3 className="font-display text-3xl md:text-4xl mb-4 transition-transform duration-500 group-hover:translate-x-2">
                    {s.t}
                  </h3>
                  <p className="text-cream/60 leading-relaxed max-w-md">{s.d}</p>
                </div>
              </div>
              <span className="absolute bottom-0 left-0 h-px w-0 bg-[color:var(--gold)] transition-all duration-700 group-hover:w-full" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}