import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/afostar/Navbar";
import { Hero } from "@/components/afostar/Hero";
import { Products } from "@/components/afostar/Products";
import { CartDrawer } from "@/components/afostar/CartDrawer";
import { Checkout } from "@/components/afostar/Checkout";
import { Success } from "@/components/afostar/Success";
import { Footer } from "@/components/afostar/Footer";
import { AuthModal } from "@/components/afostar/AuthModal";
import { useCart } from "@/lib/cart-store";

export const Route = createFileRoute("/")({
  component: Index,
});

function AboutStrip() {
  return (
    <section id="about" className="bg-neutral-50 py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-5 md:px-8 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <div className="text-xs uppercase tracking-widest text-neutral-500 mb-2">About</div>
          <h2 className="font-display font-bold text-4xl md:text-5xl leading-tight">
            Straight from the busiest market in West Africa.
          </h2>
          <p className="mt-4 text-neutral-600">
            AFOSTAR WEARS is the trusted wholesale plug for retailers, resellers and boutique
            owners across Nigeria. We move premium streetwear in packs — from joggers to sneakers,
            denim to vintage — at prices that make sense for real business.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-neutral-700">
            <li>● Bulk & Packs Only — no single-piece sales.</li>
            <li>● Nationwide delivery via GIG & partners.</li>
            <li>● Secure Paystack payments in NGN.</li>
            <li>● Order tracking via WhatsApp.</li>
          </ul>
        </div>
        <div className="aspect-[4/5] rounded-3xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=70"
            alt="AFOSTAR wholesale"
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function Index() {
  const view = useCart((s) => s.view);
  return (
    <main className="bg-white text-black min-h-screen">
      <Navbar />
      {view === "shop" && (
        <>
          <Hero />
          <Products />
          <AboutStrip />
        </>
      )}
      {view === "checkout" && <Checkout />}
      {view === "success" && <Success />}
      <Footer />
      <CartDrawer />
      <AuthModal />
    </main>
  );
}
