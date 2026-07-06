import { ShoppingBag, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart-store";

export function Navbar() {
  const { items, open, setView } = useCart();
  const count = items.reduce((s, i) => s + i.quantity, 0);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`sticky top-0 z-40 transition-all ${scrolled ? "bg-white/90 backdrop-blur border-b border-black/10" : "bg-transparent"}`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 md:h-20 flex items-center justify-between">
        <button
          onClick={() => setView("shop")}
          className="flex items-center gap-2 font-display font-bold tracking-tight text-lg md:text-xl"
        >
          <span className="w-2 h-2 rounded-full bg-black" />
          AFOSTAR<span className="text-neutral-400 font-normal">·WEARS</span>
        </button>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#shop" className="hover:opacity-60">Shop</a>
          <a href="#categories" className="hover:opacity-60">Categories</a>
          <a href="#about" className="hover:opacity-60">About</a>
          <a href="#contact" className="hover:opacity-60">Contact</a>
        </nav>
        <div className="flex items-center gap-3">
          <button
            onClick={open}
            className="relative flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-full text-sm font-medium hover:bg-neutral-800 transition"
            aria-label="Open cart"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Cart</span>
            {count > 0 && (
              <span className="ml-1 bg-white text-black text-[10px] rounded-full min-w-5 h-5 px-1 flex items-center justify-center font-semibold">
                {count}
              </span>
            )}
          </button>
          <button className="md:hidden p-2" aria-label="Menu">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}