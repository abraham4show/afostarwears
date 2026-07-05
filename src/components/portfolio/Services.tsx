import { Reveal } from "./Reveal";

const services = [
  { n: "01", t: "Bespoke Agbada & Kaftan", d: "Private commissions for men — Agbada, Senator, Kaftan and Babban Riga — cut over four to seven fittings in Ikoyi." },
  { n: "02", t: "Bridal & Traditional Attire", d: "Yoruba, Igbo and Hausa wedding ensembles — Iro and Buba, George wrapper, Isi Agu, lace and Aso Oke, styled with gele and coral." },
  { n: "03", t: "Luxury Ready-to-Wear", d: "Ankara and Adire capsule drops — modern silhouettes rooted in Nigerian textile heritage, shipped worldwide." },
  { n: "04", t: "Editorial & Runway Direction", d: "Creative direction for Lagos, Arise and Paris fashion weeks, editorial covers and red-carpet moments." },
];

export function Services() {
  return (
    <section id="services" className="bg-noir text-cream py-32 md:py-48">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <Reveal>
          <div className="mb-20 md:mb-28 max-w-3xl">
            <div className="flex items-center gap-3 text-cream/60 mb-6">
              <span className="h-px w-10 bg-[color:var(--gold)]" />
              <span className="text-[10px] uppercase tracking-[0.4em]">06 — The Atelier</span>
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