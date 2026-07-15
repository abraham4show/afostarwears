import { AnimatePresence, motion } from "motion/react";
import { Minus, Plus, X, Trash2, ArrowRight } from "lucide-react";
import { useCart, formatNaira } from "@/lib/cart-store";

export function CartDrawer() {
  const { isOpen, close, items, setQty, remove, setView } = useCart();
  const subtotal = items.reduce((s, i) => s + i.product.pricePerPack * i.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[440px] bg-white z-50 flex flex-col shadow-2xl"
          >
            <header className="flex items-center justify-between px-6 py-5 border-b">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-neutral-500">Your Bag</div>
                <div className="font-display font-bold text-xl">Wholesale Cart</div>
              </div>
              <button onClick={close} className="p-2 hover:bg-neutral-100 rounded-full" aria-label="Close cart">
                <X className="w-5 h-5" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-neutral-500 py-16">
                  <div className="text-5xl mb-3">🛍️</div>
                  <p>Your cart is empty.</p>
                  <button
                    onClick={close}
                    className="mt-4 text-sm underline underline-offset-4"
                  >
                    Browse the collection
                  </button>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((i) => (
                    <li key={i.product.id} className="flex gap-4">
                      <img
                        src={i.product.image}
                        alt={i.product.name}
                        className="w-20 h-24 object-cover rounded-xl bg-neutral-100"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between gap-2">
                          <div>
                            <div className="text-[10px] uppercase tracking-widest text-neutral-500">
                              {i.product.category} · Pack of {i.product.packSize}
                            </div>
                            <div className="font-medium leading-tight">{i.product.name}</div>
                          </div>
                          <button
                            onClick={() => remove(i.product.id)}
                            className="text-neutral-400 hover:text-black"
                            aria-label="Remove"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="inline-flex items-center border border-black/15 rounded-full">
                            <button
                              onClick={() => setQty(i.product.id, i.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center"
                              aria-label="Decrease"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-sm font-medium w-6 text-center">{i.quantity}</span>
                            <button
                              onClick={() => setQty(i.product.id, i.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center"
                              aria-label="Increase"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="font-display font-semibold">
                            {formatNaira(i.product.pricePerPack * i.quantity)}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <footer className="border-t px-6 py-5 space-y-4 bg-neutral-50">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-600">Subtotal</span>
                  <span className="font-display font-bold text-xl">{formatNaira(subtotal)}</span>
                </div>
                <p className="text-[11px] text-neutral-500 leading-relaxed">
                  Delivery fees are calculated at checkout. All sales in bulk & packs only.
                </p>
                <button
                  onClick={() => {
                    close();
                    setView("checkout");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="w-full bg-black text-white py-4 rounded-full font-medium inline-flex items-center justify-center gap-2 hover:bg-neutral-800 transition"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </button>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}