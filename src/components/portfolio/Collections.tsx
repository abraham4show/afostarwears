import { Reveal } from "./Reveal";
import c1 from "@/assets/collection-1.jpg";
import c2 from "@/assets/collection-2.jpg";
import c3 from "@/assets/collection-3.jpg";

const collections = [
  {
    img: c1,
    title: "Silence in Silk",
    season: "Spring / Summer 2026",
    desc: "Draped ivory silks and hand-gilded jewelry — a study in restraint and light.",
  },
  {
    img: c2,
    title: "Noir Absolu",
    season: "Autumn / Winter 2026",
    desc: "Tailored obsidian, sharp shoulders, and the architecture of the modern woman.",
  },
  {
    img: c3,
    title: "L'Or Vivant",
    season: "Couture MMXXVI",
    desc: "Byzantine embroidery, molten gold thread, and forty-two nights of atelier work.",
  },
];

export function Collections() {
  return (
    <section id="collections" className="relative bg-cream py-32 md:py-48">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <Reveal>
          <div className="flex items-end justify-between mb-20 md:mb-28">
            <div>
              <div className="flex items-center gap-3 text-noir/60 mb-6">
                <span className="h-px w-10 bg-[color:var(--gold)]" />
                <span className="text-[10px] uppercase tracking-[0.4em]">01 — Collections</span>
              </div>
              <h2 className="font-display text-[10vw] md:text-[6vw] leading-[0.9] text-noir">
                Seasons of<br /><em className="text-[color:var(--gold)]">quiet luxury</em>
              </h2>
            </div>
            <p className="hidden md:block max-w-sm text-noir/60 text-sm leading-relaxed">
              Three houses of thought, each a slow meditation on fabric,
              silhouette, and the woman who wears it.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-3 md:gap-6">
          {collections.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.15}>
              <article className="group cursor-pointer">
                <div className="relative overflow-hidden aspect-[3/4] bg-noir">
                  <img
                    src={c.img}
                    alt={c.title}
                    loading="lazy"
                    width={1024}
                    height={1280}
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-700" />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-transparent via-white/5 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  <span className="absolute top-6 left-6 text-[10px] uppercase tracking-[0.4em] text-cream">
                    №&nbsp;0{i + 1}
                  </span>
                </div>
                <div className="pt-6">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-display text-3xl text-noir">{c.title}</h3>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-noir/50">
                      {c.season}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-noir/60 leading-relaxed max-w-md">
                    {c.desc}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}