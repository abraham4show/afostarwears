import { useMemo, useState } from "react";
import { AnimatePresence, motion, LayoutGroup } from "motion/react";
import { Reveal } from "./Reveal";
import c1 from "@/assets/collection-1.jpg";
import c2 from "@/assets/collection-2.jpg";
import c3 from "@/assets/collection-3.jpg";
import c4 from "@/assets/collection-4.jpg";
import c5 from "@/assets/collection-5.jpg";
import c6 from "@/assets/collection-6.jpg";

type Tag = "yoruba" | "igbo" | "hausa" | "women" | "men" | "wedding" | "rtw";

type Piece = {
  img: string;
  title: string;
  season: string;
  desc: string;
  tags: Tag[];
};

const pieces: Piece[] = [
  {
    img: c1,
    title: "Ìdí Àrà",
    season: "Aso Oke · Yoruba",
    desc: "Indigo Iro and Buba woven in Ede, gele hand-tied, gold thread pressed by masters of Ilorin.",
    tags: ["yoruba", "women", "wedding"],
  },
  {
    img: c2,
    title: "Ọdịnala",
    season: "Igbo Bridal",
    desc: "Red George wrapper with Isi Agu bodice and layered coral — the language of the Igbo bride.",
    tags: ["igbo", "women", "wedding"],
  },
  {
    img: c3,
    title: "Sarautar Zinariya",
    season: "Babban Riga · Hausa",
    desc: "Ivory Babban Riga with hand-embroidered zannuwa collar and hula cap. Kano craftsmanship, ceremonial weight.",
    tags: ["hausa", "men", "wedding"],
  },
  {
    img: c4,
    title: "Ìyàwó Zàhàbi",
    season: "Ivory & Gold Bridal",
    desc: "Lace bodice fused with gold beadwork, worn beneath a soft cream gele — an heirloom in the making.",
    tags: ["yoruba", "women", "wedding"],
  },
  {
    img: c5,
    title: "Ankara Ode",
    season: "Ready-to-Wear MMXXVI",
    desc: "Ochre and obsidian Ankara sculpted into a contemporary column — Nigeria on the streets of Milan.",
    tags: ["women", "rtw"],
  },
  {
    img: c6,
    title: "Senator No. 07",
    season: "Men's Kaftan",
    desc: "Cream Senator wear cut clean, with subtle tone-on-tone embroidery — quiet luxury for the modern Nigerian man.",
    tags: ["men", "rtw", "yoruba"],
  },
];

const filters: { key: "all" | Tag; label: string }[] = [
  { key: "all", label: "All" },
  { key: "women", label: "Women" },
  { key: "men", label: "Men" },
  { key: "yoruba", label: "Yoruba" },
  { key: "igbo", label: "Igbo" },
  { key: "hausa", label: "Hausa" },
  { key: "wedding", label: "Wedding" },
  { key: "rtw", label: "Ready-to-Wear" },
];

export function Collections() {
  const [active, setActive] = useState<"all" | Tag>("all");

  const filtered = useMemo(
    () => (active === "all" ? pieces : pieces.filter((p) => p.tags.includes(active))),
    [active]
  );

  return (
    <section id="collections" className="relative bg-cream py-32 md:py-48">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <Reveal>
          <div className="flex items-end justify-between mb-14 md:mb-20">
            <div>
              <div className="flex items-center gap-3 text-noir/60 mb-6">
                <span className="h-px w-10 bg-[color:var(--gold)]" />
                <span className="text-[10px] uppercase tracking-[0.4em]">01 — Collections</span>
              </div>
              <h2 className="font-display text-[10vw] md:text-[6vw] leading-[0.9] text-noir">
                A house of<br /><em className="text-[color:var(--gold)]">three cultures</em>
              </h2>
            </div>
            <p className="hidden md:block max-w-sm text-noir/60 text-sm leading-relaxed">
              Yoruba, Igbo and Hausa fashion — reimagined for men and women who
              carry Nigeria with them, wherever the world takes them.
            </p>
          </div>
        </Reveal>

        {/* Filter bar */}
        <Reveal>
          <div className="mb-14 md:mb-20 flex flex-wrap items-center gap-2 md:gap-3 border-y border-[color:var(--border)] py-6">
            {filters.map((f) => {
              const isActive = active === f.key;
              return (
                <button
                  key={f.key}
                  onClick={() => setActive(f.key)}
                  className={`relative px-4 py-2 text-[10px] uppercase tracking-[0.35em] transition-colors duration-500 ${
                    isActive ? "text-noir" : "text-noir/50 hover:text-noir"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 -z-0 bg-[color:var(--gold)]/20 border border-[color:var(--gold)]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{f.label}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <LayoutGroup>
          <motion.div layout className="grid gap-8 md:grid-cols-3 md:gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((c, i) => (
                <motion.article
                  layout
                  key={c.title}
                  initial={{ opacity: 0, y: 40, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.96 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden aspect-[3/4] bg-noir">
                    <img
                      src={c.img}
                      alt={c.title}
                      loading="lazy"
                      width={1024}
                      height={1280}
                      className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70 group-hover:opacity-30 transition-opacity duration-700" />
                    <span className="absolute top-6 left-6 text-[10px] uppercase tracking-[0.4em] text-cream">
                      №&nbsp;{String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
                      {c.tags.slice(0, 2).map((t) => (
                        <span
                          key={t}
                          className="text-[9px] uppercase tracking-[0.3em] text-cream/90 border border-cream/40 px-2 py-1 backdrop-blur-sm"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="pt-6">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-3xl text-noir">{c.title}</h3>
                      <span className="text-[10px] uppercase tracking-[0.3em] text-noir/50 shrink-0">
                        {c.season}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-noir/60 leading-relaxed max-w-md">
                      {c.desc}
                    </p>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  );
}