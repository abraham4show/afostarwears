import { motion } from "motion/react";
import { CheckCircle2, MessageCircle, Home } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useCart, formatNaira } from "@/lib/cart-store";

const WA_NUMBER = "2349122881673";

export function Success() {
  const { lastOrder, setView } = useCart();

  const waUrl = useMemo(() => {
    if (!lastOrder) return "#";
    const lines = [
      "*AFOSTAR WEARS - NEW PAID ORDER*",
      "----------------------------------",
      `*Customer:* ${lastOrder.name}`,
      `*Phone:* ${lastOrder.phone}`,
      `*Delivery Address:* ${lastOrder.address}`,
      "----------------------------------",
      "*Items Ordered:*",
      ...lastOrder.items.map(
        (i) =>
          `- ${i.product.name} x ${i.quantity} Packs - ${formatNaira(i.product.pricePerPack * i.quantity)}`,
      ),
      "----------------------------------",
      `*Total Paid via Paystack:* ${formatNaira(lastOrder.total)}`,
      `*Reference:* ${lastOrder.reference}`,
      "*Status:* PAYMENT CONFIRMED ✅",
    ].join("\n");
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines)}`;
  }, [lastOrder]);

  useEffect(() => {
    if (!lastOrder) return;
    // Gently prompt the user — open WhatsApp in a new tab after a short delay
    const t = setTimeout(() => {
      window.open(waUrl, "_blank", "noopener");
    }, 1200);
    return () => clearTimeout(t);
  }, [waUrl, lastOrder]);

  if (!lastOrder) {
    return (
      <section className="max-w-2xl mx-auto px-5 py-24 text-center">
        <h2 className="font-display font-bold text-3xl">No recent order found</h2>
        <button
          onClick={() => setView("shop")}
          className="mt-6 bg-black text-white rounded-full px-6 py-3 text-sm"
        >
          Back to shop
        </button>
      </section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto px-5 md:px-8 py-14 md:py-20"
    >
      <div className="bg-white border rounded-3xl p-8 md:p-10 shadow-sm text-center">
        <div className="mx-auto w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
          <CheckCircle2 className="w-9 h-9 text-emerald-600" />
        </div>
        <h1 className="mt-5 font-display font-bold text-3xl md:text-4xl">Payment Successful</h1>
        <p className="mt-2 text-neutral-600">
          Thank you {lastOrder.name.split(" ")[0]} — your order has been confirmed.
        </p>

        <div className="mt-6 bg-neutral-50 rounded-2xl p-5 text-left text-sm space-y-2">
          <div className="flex justify-between"><span className="text-neutral-500">Reference</span><span className="font-mono">{lastOrder.reference}</span></div>
          <div className="flex justify-between"><span className="text-neutral-500">Total paid</span><span className="font-semibold">{formatNaira(lastOrder.total)}</span></div>
          <div className="flex justify-between"><span className="text-neutral-500">Items</span><span>{lastOrder.items.reduce((s, i) => s + i.quantity, 0)} packs</span></div>
          <div className="flex justify-between"><span className="text-neutral-500">Delivery</span><span className="text-right max-w-[220px] truncate">{lastOrder.address}</span></div>
        </div>

        <p className="mt-6 text-sm text-neutral-600">
          To finalize delivery tracking, please send your order details on WhatsApp.
        </p>

        <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20c15c] text-white font-medium px-6 py-3.5 rounded-full transition"
          >
            <MessageCircle className="w-4 h-4" /> Send order on WhatsApp
          </a>
          <button
            onClick={() => setView("shop")}
            className="inline-flex items-center justify-center gap-2 border border-black/15 px-6 py-3.5 rounded-full text-sm font-medium hover:bg-neutral-100"
          >
            <Home className="w-4 h-4" /> Continue shopping
          </button>
        </div>
      </div>
    </motion.section>
  );
}