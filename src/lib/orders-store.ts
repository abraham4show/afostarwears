import { create } from "zustand";
import type { CartItem } from "./cart-store";

export type OrderStatus = "new" | "processing" | "shipped" | "delivered" | "cancelled";

export type Order = {
  id: string;
  reference: string;
  userId: string | null;
  total: number;
  name: string;
  phone: string;
  address: string;
  items: CartItem[];
  status: OrderStatus;
  trackingNumber: string;
  createdAt: string;
  issue?: string;
};

const KEY = "afostar.orders";

const read = (): Order[] => {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
};
const write = (orders: Order[]) => localStorage.setItem(KEY, JSON.stringify(orders));

type OrdersState = {
  orders: Order[];
  hydrate: () => void;
  addOrder: (o: Omit<Order, "id" | "createdAt" | "status" | "trackingNumber">) => Order;
  cancelOrder: (id: string) => void;
  reportIssue: (id: string, message: string) => void;
};

export const useOrders = create<OrdersState>((set, get) => ({
  orders: [],
  hydrate: () => set({ orders: read() }),
  addOrder: (o) => {
    const order: Order = {
      ...o,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      status: "new",
      trackingNumber: "AFO-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
    };
    const next = [order, ...get().orders];
    write(next);
    set({ orders: next });
    return order;
  },
  cancelOrder: (id) => {
    const next = get().orders.map((o) => (o.id === id ? { ...o, status: "cancelled" as const } : o));
    write(next);
    set({ orders: next });
  },
  reportIssue: (id, message) => {
    const next = get().orders.map((o) => (o.id === id ? { ...o, issue: message } : o));
    write(next);
    set({ orders: next });
  },
}));