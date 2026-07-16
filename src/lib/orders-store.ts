import { create } from "zustand";
import type { CartItem } from "./cart-store";
<<<<<<< HEAD
import { saveOrderToDb, cancelOrderInDb, reportIssueInDb } from "@/services/order-functions";
=======
>>>>>>> 11f2069fcc43f46632a8f54260f077e6d52388cc

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
<<<<<<< HEAD

=======
>>>>>>> 11f2069fcc43f46632a8f54260f077e6d52388cc
const write = (orders: Order[]) => localStorage.setItem(KEY, JSON.stringify(orders));

type OrdersState = {
  orders: Order[];
  hydrate: () => void;
<<<<<<< HEAD
  addOrder: (o: Omit<Order, "id" | "createdAt" | "status" | "trackingNumber">) => Promise<Order>;
  cancelOrder: (id: string) => Promise<void>;
  reportIssue: (id: string, message: string) => Promise<void>;
=======
  addOrder: (o: Omit<Order, "id" | "createdAt" | "status" | "trackingNumber">) => Order;
  cancelOrder: (id: string) => void;
  reportIssue: (id: string, message: string) => void;
>>>>>>> 11f2069fcc43f46632a8f54260f077e6d52388cc
};

export const useOrders = create<OrdersState>((set, get) => ({
  orders: [],
  hydrate: () => set({ orders: read() }),
<<<<<<< HEAD

  addOrder: async (o) => {
    const trackingNo = o.reference;

    try {
      const response = await saveOrderToDb({
        data: {
          reference: trackingNo,
          userId: o.userId,
          totalAmount: o.total,
          customerName: o.name,
          customerPhone: o.phone,
          shippingAddress: o.address,
          items: o.items.map((i) => ({
            productId: i.product.id,
            name: i.product.name,
            quantity: i.quantity,
            purchaseType: "pack",
            pricePaid: i.product.pricePerPack,
          })),
        },
      });

      if (response && response.success && response.orderId) {
        const dbOrder: Order = {
          ...o,
          id: response.orderId, 
          createdAt: new Date().toISOString(),
          status: "new",
          trackingNumber: trackingNo,
        };

        const next = [dbOrder, ...get().orders];
        write(next);
        set({ orders: next });
        return dbOrder;
      }
    } catch (err) {
      console.warn("Neon sync failed; saving fallback locally.", err);
    }

    const fallbackOrder: Order = {
=======
  addOrder: (o) => {
    const order: Order = {
>>>>>>> 11f2069fcc43f46632a8f54260f077e6d52388cc
      ...o,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      status: "new",
<<<<<<< HEAD
      trackingNumber: trackingNo,
    };
    const next = [fallbackOrder, ...get().orders];
    write(next);
    set({ orders: next });
    return fallbackOrder;
  },

  cancelOrder: async (id) => {
    const targetOrder = get().orders.find((o) => o.id === id);
    
    // Fallback: If we have a local ID, use the tracking number/reference for DB lookup
    const orderIdentifierForDb = id.includes("-") 
      ? id 
      : (targetOrder?.trackingNumber || targetOrder?.reference || id);

    // 🚀 FIXED: Passing ONLY the plain string ID as expected by cancelOrderInDb
    try {
      await cancelOrderInDb({ data: orderIdentifierForDb });
    } catch (err) {
      console.error("Could not sync cancellation to cloud database", err);
    }

=======
      trackingNumber: "AFO-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
    };
    const next = [order, ...get().orders];
    write(next);
    set({ orders: next });
    return order;
  },
  cancelOrder: (id) => {
>>>>>>> 11f2069fcc43f46632a8f54260f077e6d52388cc
    const next = get().orders.map((o) => (o.id === id ? { ...o, status: "cancelled" as const } : o));
    write(next);
    set({ orders: next });
  },
<<<<<<< HEAD

  reportIssue: async (id, message) => {
    const targetOrder = get().orders.find((o) => o.id === id);

    // Fallback: If we have a local ID, use the tracking number/reference for DB lookup
    const orderIdentifierForDb = id.includes("-") 
      ? id 
      : (targetOrder?.trackingNumber || targetOrder?.reference || id);

    // 🚀 FIXED: Removed the 'reference' property. Passing ONLY 'orderId' and 'issue'
    try {
      await reportIssueInDb({ 
        data: { 
          orderId: orderIdentifierForDb, 
          issue: message 
        } 
      });
    } catch (err) {
      console.error("Could not sync issue reporting to cloud database", err);
    }

=======
  reportIssue: (id, message) => {
>>>>>>> 11f2069fcc43f46632a8f54260f077e6d52388cc
    const next = get().orders.map((o) => (o.id === id ? { ...o, issue: message } : o));
    write(next);
    set({ orders: next });
  },
}));