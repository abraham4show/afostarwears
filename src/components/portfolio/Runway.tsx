import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Play } from "lucide-react";
import runway from "@/assets/runway.jpg";

export function Runway() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);

  return (
    <section id="behind" ref={ref} className="relative h-[90svh] overflow-hidden bg-noir">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img
          src={runway}
          alt="Runway show"
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="flex items-center gap-3 text-cream/70 mb-8"
        >
          <span className="h-px w-10 bg-[color:var(--gold)]" />
          <span className="text-[10px] uppercase tracking-[0.4em]">07 — Behind The Scenes</span>
          <span className="h-px w-10 bg-[color:var(--gold)]" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.2 }}
          className="font-display text-cream text-[11vw] md:text-[7vw] leading-[0.9] max-w-6xl"
        >
          The <em className="text-[color:var(--gold)]">runway</em>, in motion.
        </motion.h2>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          className="mt-14 group flex items-center gap-5 border border-cream/40 rounded-full pl-6 pr-2 py-2 text-cream hover:border-[color:var(--gold)] transition-colors"
        >
          <span className="text-[11px] uppercase tracking-[0.35em]">Watch the film</span>
          <span className="flex items-center justify-center w-12 h-12 rounded-full bg-[color:var(--gold)] text-noir">
            <Play size={16} fill="currentColor" />
          </span>
        </motion.button>
      </div>
    </section>
  );
}