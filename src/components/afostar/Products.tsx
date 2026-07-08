import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";
import { PRODUCTS, CATEGORIES } from "@/lib/products";
import { useCart, formatNaira } from "@/lib/cart-store";
import { QuickView } from "./QuickView";
import type { Product } from "@/lib/cart-store";

export function Products() {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const add = useCart((s) => s.add);
  const [quick, setQuick] = useState<Product | null>(null);

  const filtered = useMemo(
    () => (category === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === category)),
    [category],
  );

  return (
    <section id="shop" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div id="categories" className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs uppercase tracking-widest text-neutral-500 mb-2">The Collection</div>
            <h2 className="font-display font-bold text-4xl md:text-6xl tracking-tight">Shop by category.</h2>
            <p className="mt-3 text-neutral-600 max-w-xl">
              Every product ships in packs. Pack sizes and pricing are shown per item — perfect for
              retailers, resellers and boutique buyers.
            </p>
          </div>
          <div className="text-xs uppercase tracking-widest text-neutral-500">
            {filtered.length} pieces · Bulk only
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 rounded-full text-sm border transition ${
                category === c
                  ? "bg-black text-white border-black"
                  : "border-black/15 hover:border-black/40"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.article
                layout
                key={p.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="group relative bg-neutral-50 rounded-2xl overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setQuick(p)}
                  className="relative aspect-[4/5] overflow-hidden block w-full text-left"
                  aria-label={`Quick view ${p.name}`}
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-[10px] uppercase tracking-widest px-2 py-1 rounded-full">
                    Pack of {p.packSize}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      add(p);
                    }}
                    className="absolute bottom-3 right-3 bg-black text-white rounded-full w-11 h-11 flex items-center justify-center opacity-0 group-hover:opacity-100 md:translate-y-2 md:group-hover:translate-y-0 transition"
                    aria-label={`Add ${p.name}`}
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </button>
                <div className="p-4">
                  <div className="text-[11px] uppercase tracking-widest text-neutral-500">{p.category}</div>
                  <div className="mt-1 font-medium leading-tight">{p.name}</div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-display font-semibold text-lg">{formatNaira(p.pricePerPack)}</span>
                    <button
                      onClick={() => add(p)}
                      className="md:hidden text-xs font-medium bg-black text-white px-3 py-1.5 rounded-full"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      <QuickView product={quick} onClose={() => setQuick(null)} />
    </section>
  );
}