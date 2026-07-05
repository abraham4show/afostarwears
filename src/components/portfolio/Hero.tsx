import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import hero from "@/assets/hero.jpg";

export function Hero() {
  return (
    <section id="home" className="relative h-[100svh] w-full overflow-hidden bg-noir">
      <motion.img
        src={hero}
        alt="Àṣọ Lagos couture editorial — Nigerian model in embroidered Agbada"
        width={1600}
        height={1920}
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/80" />

      <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-between px-6 pt-32 pb-16 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="flex items-center gap-4 text-cream/80"
        >
          <span className="h-px w-10 bg-[color:var(--gold)]" />
          <span className="text-[10px] uppercase tracking-[0.4em]">Lagos · Harmattan / MMXXVI</span>
        </motion.div>

        <div className="max-w-5xl">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-cream font-display italic text-[15vw] leading-[0.85] md:text-[11vw]"
          >
            Àṣọ
            <span className="block not-italic tracking-tighter">Lagos</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.4 }}
            className="mt-8 max-w-md text-cream/70 text-sm md:text-base leading-relaxed"
          >
            A house of Nigerian couture — Yoruba, Igbo and Hausa silhouettes
            reimagined for the global stage. Hand-crafted in Lagos since 2014.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.6 }}
            className="mt-10 flex items-center gap-6"
          >
            <a
              href="#collections"
              className="group inline-flex items-center gap-3 border border-[color:var(--gold)] px-8 py-4 text-[11px] uppercase tracking-[0.35em] text-cream hover:bg-[color:var(--gold)] hover:text-noir transition-colors duration-500"
            >
              Explore Collections
              <span className="h-px w-6 bg-current transition-all duration-500 group-hover:w-10" />
            </a>
          </motion.div>
        </div>

        <motion.a
          href="#collections"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="flex flex-col items-center gap-3 text-cream/70 self-center"
        >
          <span className="text-[10px] uppercase tracking-[0.4em]">Scroll</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={16} />
          </motion.span>
        </motion.a>
      </div>
    </section>
  );
}