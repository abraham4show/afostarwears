import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Home", href: "#home" },
  { label: "Collections", href: "#collections" },
  { label: "Gallery", href: "#gallery" },
  { label: "The House", href: "#about" },
  { label: "Atelier", href: "#services" },
  { label: "Runway", href: "#behind" },
  { label: "Press", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[color:var(--cream)]/85 backdrop-blur-md border-b border-[color:var(--border)]/60"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-12">
        <a
          href="#home"
          className={`font-display text-xl tracking-[0.35em] uppercase transition-colors ${
            scrolled ? "text-noir" : "text-cream drop-shadow-[0_1px_10px_rgba(0,0,0,0.4)]"
          }`}
        >
          Àṣọ&nbsp;·&nbsp;Lagos
        </a>

        <nav className="hidden xl:flex items-center gap-9">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`group relative text-[11px] uppercase tracking-[0.28em] transition-colors ${
                scrolled
                  ? "text-noir/70 hover:text-noir"
                  : "text-cream/80 hover:text-cream"
              }`}
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[color:var(--gold)] transition-all duration-500 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className={`xl:hidden ${scrolled ? "text-noir" : "text-cream"}`}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="xl:hidden overflow-hidden bg-[color:var(--cream)] border-t border-[color:var(--border)]/60"
          >
            <div className="flex flex-col px-6 py-8 gap-5">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-noir text-sm uppercase tracking-[0.3em]"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}