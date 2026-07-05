import { motion } from "motion/react";
import { Reveal } from "./Reveal";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import c1 from "@/assets/collection-1.jpg";
import c3 from "@/assets/collection-3.jpg";

const items = [
  { img: g1, span: "row-span-2", w: 900, h: 1200 },
  { img: g2, span: "", w: 900, h: 900 },
  { img: c1, span: "", w: 1024, h: 1280 },
  { img: g3, span: "row-span-2", w: 900, h: 1400 },
  { img: g4, span: "", w: 900, h: 1100 },
  { img: c3, span: "", w: 1024, h: 1280 },
];

export function Gallery() {
  return (
    <section id="gallery" className="relative bg-noir py-32 md:py-48 overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <Reveal>
          <div className="mb-20 md:mb-28 text-center">
            <div className="flex items-center justify-center gap-3 text-cream/50 mb-6">
              <span className="h-px w-10 bg-[color:var(--gold)]" />
              <span className="text-[10px] uppercase tracking-[0.4em]">02 — Gallery</span>
              <span className="h-px w-10 bg-[color:var(--gold)]" />
            </div>
            <h2 className="font-display text-cream text-[9vw] md:text-[5.5vw] leading-[0.95]">
              An <em className="text-[color:var(--gold)]">archive</em> of moments
            </h2>
          </div>
        </Reveal>

        <div className="group/gallery grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[220px] md:auto-rows-[280px]">
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.1, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`relative overflow-hidden ${it.span}`}
            >
              <img
                src={it.img}
                alt=""
                loading="lazy"
                width={it.w}
                height={it.h}
                className="h-full w-full object-cover transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-110 group-hover/gallery:blur-[2px] group-hover/gallery:opacity-60 hover:!blur-0 hover:!opacity-100"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}