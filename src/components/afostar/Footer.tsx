import { Instagram, Music2, MapPin, Phone,  } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="font-display font-bold text-2xl">AFOSTAR<span className="text-neutral-500">·WEARS</span></div>
          <p className="mt-3 text-neutral-400 max-w-sm">
            Your Premium Fashion Plug. The Wholesale Guy in Oshodi — bulk & packs only, nationwide delivery.
          </p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-neutral-500 mb-3">Visit</div>
          <p className="inline-flex items-start gap-2 text-sm text-neutral-300"><MapPin className="w-4 h-4 mt-0.5" /> Oshodi Market, Lagos — Nigeria</p>
          <p className="mt-2 inline-flex items-center gap-2 text-sm text-neutral-300"><Phone className="w-4 h-4" /> +234 912 2881 673</p>
          
          
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-neutral-500 mb-3">Follow</div>
          <a href="https://instagram.com/thewholesaleguyinoshodi" target="_blank" rel="noopener" className="flex items-center gap-2 text-sm text-neutral-300 hover:text-white"><Instagram className="w-4 h-4" /> @thewholesaleguyinoshodi</a>
          <a href="https://tiktok.com/@thewholesaleguyinoshodi" target="_blank" rel="noopener" className="mt-2 flex items-center gap-2 text-sm text-neutral-300 hover:text-white"><Music2 className="w-4 h-4" /> @thewholesaleguyinoshodi</a>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} AFOSTAR WEARS. Bulk & packs only. All rights reserved.
      </div>
    </footer>
  );
}