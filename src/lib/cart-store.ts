import { create } from "zustand";
<<<<<<< HEAD
import { useAuth } from "./auth-store";
=======
>>>>>>> 11f2069fcc43f46632a8f54260f077e6d52388cc

export type Product = {
  id: string;
  name: string;
  category: string;
  pricePerPack: number;
  packSize: number;
  image: string;
  gallery?: string[];
  packSizes?: string[];
};

export type CartItem = {
  product: Product;
  quantity: number; // number of packs
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  view: "shop" | "checkout" | "success";
  lastOrder: {
    reference: string;
    total: number;
    name: string;
    phone: string;
    address: string;
    items: CartItem[];
  } | null;
  open: () => void;
  close: () => void;
  setView: (v: CartState["view"]) => void;
  add: (p: Product) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  setLastOrder: (order: CartState["lastOrder"]) => void;
};

<<<<<<< HEAD
export const useCart = create<CartState>((set, get) => ({
=======
export const useCart = create<CartState>((set) => ({
>>>>>>> 11f2069fcc43f46632a8f54260f077e6d52388cc
  items: [],
  isOpen: false,
  view: "shop",
  lastOrder: null,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
<<<<<<< HEAD
  
  setView: (view) => {
    // 🛡️ Guard Checkout: Verify if customer has an account and is logged in
    if (view === "checkout") {
      const currentUser = useAuth.getState().user;
      
      if (!currentUser) {
        // Stop them, open auth signup/signin modal, and pass a success callback
        useAuth.getState().openModal("signup", () => {
          // Success callback: Once logged in/signed up, immediately switch view to checkout
          set({ view: "checkout" });
        });
        return; // Don't let them access checkout screen yet
      }
    }
    
    set({ view });
  },
  
=======
  setView: (view) => set({ view }),
>>>>>>> 11f2069fcc43f46632a8f54260f077e6d52388cc
  add: (product) =>
    set((state) => {
      const existing = state.items.find((i) => i.product.id === product.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
          ),
          isOpen: true,
        };
      }
      return { items: [...state.items, { product, quantity: 1 }], isOpen: true };
    }),
  remove: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.product.id !== id) })),
  setQty: (id, qty) =>
    set((state) => ({
      items: state.items
        .map((i) => (i.product.id === id ? { ...i, quantity: Math.max(1, qty) } : i))
        .filter((i) => i.quantity > 0),
    })),
  clear: () => set({ items: [] }),
  setLastOrder: (order) => set({ lastOrder: order }),
}));

export const formatNaira = (n: number) =>
  "₦" + n.toLocaleString("en-NG", { maximumFractionDigits: 0 });