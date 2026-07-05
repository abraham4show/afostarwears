import { Reveal } from "./Reveal";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="bg-noir text-cream py-32 md:py-48">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="grid md:grid-cols-12 gap-16">
          <Reveal className="md:col-span-5">
            <div className="flex items-center gap-3 text-cream/60 mb-6">
              <span className="h-px w-10 bg-[color:var(--gold)]" />
              <span className="text-[10px] uppercase tracking-[0.4em]">09 — Correspondence</span>
            </div>
            <h2 className="font-display text-5xl md:text-7xl leading-[0.95]">
              Begin a<br /><em className="text-[color:var(--gold)]">private</em> commission.
            </h2>
            <p className="mt-8 text-cream/60 leading-relaxed max-w-md">
              Fittings are by appointment. Please share a few details and the atelier will reply within three days.
            </p>

            <div className="mt-12 space-y-5 text-sm">
              <div className="flex items-center gap-4 text-cream/80">
                <MapPin size={16} className="text-[color:var(--gold)]" />
                27 Bourdillon Road, Ikoyi — Lagos, Nigeria
              </div>
              <div className="flex items-center gap-4 text-cream/80">
                <Mail size={16} className="text-[color:var(--gold)]" />
                atelier@asolagos.ng
              </div>
              <div className="flex items-center gap-4 text-cream/80">
                <Phone size={16} className="text-[color:var(--gold)]" />
                +234 (0) 803 214 8801
              </div>
              <a
                href="#"
                className="flex items-center gap-4 text-cream/80 hover:text-[color:var(--gold)] transition-colors"
              >
                <Instagram size={16} className="text-[color:var(--gold)]" />
                @asolagos.atelier
              </a>
            </div>
          </Reveal>

          <Reveal className="md:col-span-7" delay={0.15}>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="grid gap-8 md:grid-cols-2"
            >
              <Field label="Full name" />
              <Field label="Email" type="email" />
              <Field label="City" className="md:col-span-1" />
              <Field label="Occasion" className="md:col-span-1" />
              <Field label="Message" textarea className="md:col-span-2" />
              <button className="md:col-span-2 justify-self-start group inline-flex items-center gap-3 border border-[color:var(--gold)] px-8 py-4 text-[11px] uppercase tracking-[0.35em] text-cream hover:bg-[color:var(--gold)] hover:text-noir transition-colors duration-500">
                Send inquiry
                <span className="h-px w-6 bg-current transition-all duration-500 group-hover:w-10" />
              </button>
            </form>

            <div className="mt-16 aspect-[16/7] w-full overflow-hidden border border-cream/10">
              <iframe
                title="Atelier location"
                loading="lazy"
                src="https://www.openstreetmap.org/export/embed.html?bbox=3.435%2C6.445%2C3.455%2C6.460&layer=mapnik"
                className="h-full w-full grayscale contrast-125 opacity-80"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  type = "text",
  textarea = false,
  className = "",
}: {
  label: string;
  type?: string;
  textarea?: boolean;
  className?: string;
}) {
  const cls =
    "peer w-full bg-transparent border-0 border-b border-cream/20 pb-3 pt-6 text-cream placeholder-transparent focus:outline-none focus:border-[color:var(--gold)] transition-colors";
  return (
    <label className={`relative block ${className}`}>
      {textarea ? (
        <textarea rows={4} placeholder={label} className={cls} />
      ) : (
        <input type={type} placeholder={label} className={cls} />
      )}
      <span className="pointer-events-none absolute left-0 top-6 text-[10px] uppercase tracking-[0.3em] text-cream/50 transition-all peer-focus:top-0 peer-focus:text-[color:var(--gold)] peer-[:not(:placeholder-shown)]:top-0">
        {label}
      </span>
    </label>
  );
}