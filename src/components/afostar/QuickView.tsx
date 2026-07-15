import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";
import type { Product } from "@/lib/cart-store";
import { useCart, formatNaira } from "@/lib/cart-store";

type Props = {
  product: Product | null;
  onClose: () => void;
};

export function QuickView({ product, onClose }: Props) {
  const add = useCart((s) => s.add);
  const [index, setIndex] = useState(0);

  const images = product
    ? [product.image, ...(product.gallery ?? [])].filter(Boolean).slice(0, 5)
    : [];
  const sizes = product?.packSizes ?? ["S", "M", "L", "XL", "XXL"];

  useEffect(() => {
    setIndex(0);
  }, [product?.id]);

  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [product, images.length, onClose]);

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 30, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl grid md:grid-cols-2 max-h-[92vh]"
          >
            {/* Gallery side */}
            <div className="relative bg-neutral-100">
              <div className="relative aspect-[4/5] md:aspect-auto md:h-full overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={images[index]}
                    src={images[index]}
                    alt={`${product.name} - ${index + 1}`}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>

                <button
                  aria-label="Previous image"
                  onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  aria-label="Next image"
                  onClick={() => setIndex((i) => (i + 1) % images.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                <span className="absolute top-3 left-3 bg-white/95 text-[10px] uppercase tracking-widest px-2 py-1 rounded-full">
                  Pack of {product.packSize}
                </span>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-2 p-3">
                {images.slice(1).map((src, i) => {
                  const realIndex = i + 1;
                  return (
                    <button
                      key={src}
                      onClick={() => setIndex(realIndex)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition ${
                        index === realIndex ? "border-black" : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img src={src} alt={`thumb ${realIndex}`} className="w-full h-full object-cover" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Details side */}
            <div className="relative p-6 md:p-8 overflow-y-auto">
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-[11px] uppercase tracking-widest text-neutral-500">
                {product.category}
              </div>
              <h2 className="font-display font-bold text-3xl md:text-4xl leading-tight mt-1">
                {product.name}
              </h2>
              <div className="mt-3 flex items-baseline gap-3">
                <span className="font-display font-semibold text-2xl">
                  {formatNaira(product.pricePerPack)}
                </span>
                <span className="text-xs text-neutral-500">per pack of {product.packSize}</span>
              </div>

              <div className="mt-6">
                <div className="text-[11px] uppercase tracking-widest text-neutral-500 mb-3">
                  What's inside this pack
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {sizes.map((s) => (
                    <div
                      key={s}
                      className="aspect-square rounded-lg border border-black/15 flex flex-col items-center justify-center bg-neutral-50"
                    >
                      <span className="font-display font-bold text-lg">{s}</span>
                      <span className="text-[9px] uppercase tracking-widest text-neutral-500">1 pc</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-neutral-500 mt-3">
                  Every pack ships with a mixed size run so you can serve every customer.
                </p>
              </div>

              <div className="mt-8 space-y-3">
                <button
                  onClick={() => {
                    add(product);
                    onClose();
                  }}
                  className="w-full bg-black text-white rounded-full py-4 font-medium inline-flex items-center justify-center gap-2 hover:bg-neutral-800"
                >
                  <Plus className="w-4 h-4" /> Add pack to cart
                </button>
                <p className="text-[11px] text-neutral-500 text-center">
                  Bulk & packs only · Nationwide delivery · Paystack secured
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}