import { useState } from "react";
import { motion } from "motion/react";
import { z } from "zod";
import { ArrowLeft, Lock } from "lucide-react";
import { useCart, formatNaira } from "@/lib/cart-store";
import { PaymentModal } from "./PaymentModal";

const schema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(80),
  phone: z
    .string()
    .trim()
    .regex(/^(\+?234|0)[0-9]{10}$/i, "Enter a valid Nigerian phone number"),
  email: z.string().trim().email("Enter a valid email"),
  address: z.string().trim().min(8, "Enter your delivery address").max(200),
  city: z.string().trim().min(2).max(60),
  shipping: z.enum(["gig", "pickup", "sameday"]),
});

const SHIPPING: Record<string, { label: string; note: string; fee: number }> = {
  gig: { label: "GIG Logistics (Nationwide)", note: "2–4 business days", fee: 4500 },
  sameday: { label: "Same-day Lagos delivery", note: "Within Lagos only", fee: 6000 },
  pickup: { label: "Pickup at Oshodi Market", note: "Ready in 24 hours", fee: 0 },
};

export function Checkout() {
  const { items, setView, clear, setLastOrder } = useCart();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "Lagos",
    shipping: "gig" as "gig" | "sameday" | "pickup",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [payOpen, setPayOpen] = useState(false);

  const subtotal = items.reduce((s, i) => s + i.product.pricePerPack * i.quantity, 0);
  const shippingFee = SHIPPING[form.shipping].fee;
  const total = subtotal + shippingFee;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        errs[i.path[0] as string] = i.message;
      });
      setErrors(errs);
      return;
    }
    setErrors({});
    setPayOpen(true);
  };

  const onSuccess = (reference: string) => {
    const order = {
      reference,
      total,
      name: form.name,
      phone: form.phone,
      address: `${form.address}, ${form.city}`,
      items: [...items],
    };
    setLastOrder(order);
    clear();
    setPayOpen(false);
    setView("success");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const field = (name: keyof typeof form, label: string, type = "text", placeholder = "") => (
    <label className="block">
      <span className="text-[11px] uppercase tracking-widest text-neutral-500">{label}</span>
      <input
        type={type}
        value={form[name] as string}
        onChange={(e) => setForm({ ...form, [name]: e.target.value })}
        placeholder={placeholder}
        className="mt-1 w-full border border-black/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition"
      />
      {errors[name] && <span className="text-xs text-red-600 mt-1 block">{errors[name]}</span>}
    </label>
  );

  if (items.length === 0) {
    return (
      <section className="max-w-3xl mx-auto px-5 md:px-8 py-24 text-center">
        <h2 className="font-display font-bold text-3xl">Your cart is empty</h2>
        <p className="mt-3 text-neutral-600">Add a few packs to get started.</p>
        <button
          onClick={() => setView("shop")}
          className="mt-6 bg-black text-white rounded-full px-6 py-3 text-sm font-medium"
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
      className="max-w-6xl mx-auto px-5 md:px-8 py-10 md:py-14"
    >
      <button
        onClick={() => setView("shop")}
        className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-black mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Back to shop
      </button>

      <div className="grid lg:grid-cols-5 gap-10">
        <form onSubmit={submit} className="lg:col-span-3 space-y-8">
          <div>
            <div className="text-xs uppercase tracking-widest text-neutral-500">Checkout</div>
            <h1 className="font-display font-bold text-4xl md:text-5xl">Delivery details.</h1>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {field("name", "Full name", "text", "e.g. Adaeze Okafor")}
            {field("phone", "Phone number", "tel", "+234...")}
            {field("email", "Email address", "email", "you@example.com")}
            {field("city", "City", "text")}
          </div>
          <label className="block">
            <span className="text-[11px] uppercase tracking-widest text-neutral-500">Delivery address</span>
            <textarea
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              rows={3}
              placeholder="House number, street, area..."
              className="mt-1 w-full border border-black/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black"
            />
            {errors.address && <span className="text-xs text-red-600 mt-1 block">{errors.address}</span>}
          </label>

          <div>
            <div className="text-[11px] uppercase tracking-widest text-neutral-500 mb-3">Shipping method</div>
            <div className="space-y-2">
              {(Object.keys(SHIPPING) as Array<keyof typeof SHIPPING>).map((k) => (
                <label
                  key={k}
                  className={`flex items-center justify-between border rounded-xl px-4 py-3 cursor-pointer transition ${
                    form.shipping === k ? "border-black bg-neutral-50" : "border-black/15"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      className="accent-black"
                      checked={form.shipping === k}
                      onChange={() => setForm({ ...form, shipping: k as any })}
                    />
                    <div>
                      <div className="font-medium text-sm">{SHIPPING[k].label}</div>
                      <div className="text-xs text-neutral-500">{SHIPPING[k].note}</div>
                    </div>
                  </div>
                  <div className="font-medium text-sm">
                    {SHIPPING[k].fee === 0 ? "Free" : formatNaira(SHIPPING[k].fee)}
                  </div>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-4 rounded-full font-medium inline-flex items-center justify-center gap-2 hover:bg-neutral-800"
          >
            <Lock className="w-4 h-4" /> Pay {formatNaira(total)} with Paystack
          </button>
        </form>

        <aside className="lg:col-span-2 lg:sticky lg:top-24 h-fit bg-neutral-50 rounded-3xl p-6 space-y-5">
          <div className="font-display font-bold text-xl">Order summary</div>
          <ul className="space-y-4">
            {items.map((i) => (
              <li key={i.product.id} className="flex gap-3">
                <img src={i.product.image} alt="" className="w-14 h-16 rounded-lg object-cover" />
                <div className="flex-1 text-sm">
                  <div className="font-medium leading-tight">{i.product.name}</div>
                  <div className="text-xs text-neutral-500">
                    {i.quantity} × Pack of {i.product.packSize}
                  </div>
                </div>
                <div className="text-sm font-medium">
                  {formatNaira(i.product.pricePerPack * i.quantity)}
                </div>
              </li>
            ))}
          </ul>
          <div className="border-t pt-4 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-neutral-500">Subtotal</span><span>{formatNaira(subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-neutral-500">Shipping</span><span>{shippingFee ? formatNaira(shippingFee) : "Free"}</span></div>
            <div className="flex justify-between font-display font-bold text-lg pt-2">
              <span>Total</span><span>{formatNaira(total)}</span>
            </div>
          </div>
        </aside>
      </div>

      <PaymentModal
        open={payOpen}
        amount={total}
        email={form.email}
        onClose={() => setPayOpen(false)}
        onSuccess={onSuccess}
      />
    </motion.section>
  );
}