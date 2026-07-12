export function Footer() {
  return (
    <footer className="bg-noir text-cream border-t border-cream/10">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12 py-16 grid md:grid-cols-3 gap-12">
        <div>
          <div className="font-display text-2xl tracking-[0.35em] uppercase">Àṣọ · Lagos</div>
          <p className="mt-4 text-cream/50 text-sm leading-relaxed max-w-xs">
            House of Nigerian couture. Lagos — since MMXIV.
          </p>
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-cream/50 mb-4">
            The Journal
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex border-b border-cream/20 focus-within:border-[color:var(--gold)] transition-colors"
          >
            <input
              placeholder="Your email"
              className="flex-1 bg-transparent py-3 text-sm placeholder-cream/40 focus:outline-none"
            />
            <button className="text-[10px] uppercase tracking-[0.35em] text-[color:var(--gold)] px-2">
              Subscribe
            </button>
          </form>
        </div>

        <div className="md:text-right">
          <div className="text-[10px] uppercase tracking-[0.3em] text-cream/50 mb-4">Follow</div>
          <div className="flex md:justify-end gap-6 text-sm text-cream/70">
            {["Instagram", "TikTok", "Pinterest", "Arise Fashion"].map((s) => (
              <a key={s} href="#" className="hover:text-[color:var(--gold)] transition-colors">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[10px] uppercase tracking-[0.3em] text-cream/40">
          <span>© MMXXVI Àṣọ Lagos — Adérèmi Okonkwo Couture</span>
          <span>Made in Lagos · by hand, for the world</span>
        </div>
      </div>
    </footer>
  );
}