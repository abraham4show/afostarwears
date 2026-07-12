import { motion } from "motion/react";
import { ArrowRight, MapPin, Instagram } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-5 md:px-8 pt-10 md:pt-16 pb-16 md:pb-24 grid md:grid-cols-12 gap-8 md:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="md:col-span-7"
        >
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest bg-neutral-100 text-neutral-700 px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-black" />
            The Wholesale Guy in Oshodi
          </div>
          <h1 className="font-display font-bold text-[13vw] md:text-[7.5rem] leading-[0.9] tracking-tight">
            Your <span className="italic font-light">Premium</span>
            <br />
            Fashion Plug.
          </h1>
          <p className="mt-6 max-w-lg text-neutral-600 text-base md:text-lg leading-relaxed">
            Wholesale streetwear, straight from Oshodi Market — Lagos. Joggers, sneakers,
            denim, vintage and more. <span className="font-semibold text-black">Bulk & packs only.</span>
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#shop"
              className="group inline-flex items-center gap-2 bg-black text-white px-6 py-3.5 rounded-full text-sm font-medium hover:bg-neutral-800 transition"
            >
              Shop Wholesale
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </a>
            <a
              href="#categories"
              className="inline-flex items-center gap-2 border border-black/20 px-6 py-3.5 rounded-full text-sm font-medium hover:bg-neutral-100 transition"
            >
              Browse Categories
            </a>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-6 text-xs text-neutral-500">
            <span className="inline-flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Oshodi Market, Lagos</span>
            <span className="inline-flex items-center gap-1.5"><Instagram className="w-3.5 h-3.5" /> @thewholesaleguyinoshodi</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="md:col-span-5 relative"
        >
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-neutral-100">
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=75"
              alt="AFOSTAR premium streetwear"
              loading="eager"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur rounded-2xl p-4 flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-neutral-500">Bulk & Packs</div>
                <div className="font-display font-semibold text-lg leading-tight">Best prices in Lagos</div>
              </div>
              <div className="text-2xl font-display font-bold">FW26</div>
            </div>
          </div>
        </motion.div>
      </div>
      <div className="border-y border-black/10 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-3 flex items-center gap-8 text-xs uppercase tracking-widest text-neutral-600 overflow-x-auto whitespace-nowrap">
          <span>● Bulk & Packs Only</span>
          <span>● Nationwide Delivery</span>
          <span>● Verified Wholesaler</span>
          <span>● Paystack Secured Checkout</span>
          <span>● Oshodi · Lagos</span>
          <span>● WhatsApp Order Tracking</span>
        </div>
      </div>
    </section>
  );
}