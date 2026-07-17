import { useEffect, useRef } from "react";

// Read the Vite environment variable
const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

// Log during development to see exactly what your bundler is feeding the app
if (import.meta.env.DEV) {
  console.log("Paystack Key loaded:", PAYSTACK_PUBLIC_KEY);
}

const SCRIPT_SRC = "https://js.paystack.co/v1/inline.js";

declare global {
  interface Window {
    PaystackPop?: {
      setup: (opts: Record<string, unknown>) => { openIframe: () => void };
    };
  }
}

function loadPaystack(): Promise<NonNullable<Window["PaystackPop"]>> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return reject(new Error("no window"));
    if (window.PaystackPop) return resolve(window.PaystackPop);
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${SCRIPT_SRC}"]`,
    );
    if (existing) {
      existing.addEventListener("load", () => resolve(window.PaystackPop!));
      existing.addEventListener("error", () => reject(new Error("script error")));
      return;
    }
    const s = document.createElement("script");
    s.src = SCRIPT_SRC;
    s.async = true;
    s.onload = () => resolve(window.PaystackPop!);
    s.onerror = () => reject(new Error("script error"));
    document.body.appendChild(s);
  });
}

type Props = {
  open: boolean;
  amount: number; // in Naira
  email: string;
  onClose: () => void;
  onSuccess: (reference: string) => void;
};

export function PaymentModal({ open, amount, email, onClose, onSuccess }: Props) {
  const launchedRef = useRef(false);

  useEffect(() => {
    if (!open) {
      launchedRef.current = false;
      return;
    }
    if (launchedRef.current) return;
    launchedRef.current = true;

    let cancelled = false;

    loadPaystack()
      .then((PaystackPop) => {
        if (cancelled) return;
        const handler = PaystackPop.setup({
          key: PAYSTACK_PUBLIC_KEY,
          email: email || "customer@afostarwears.ng",
          amount: Math.round(amount * 100), // kobo
          currency: "NGN",
          ref: "AFS-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
          channels: ["card", "bank", "bank_transfer", "ussd", "qr", "mobile_money"],
          callback: (response: { reference: string }) => {
            onSuccess(response.reference);
          },
          onClose: () => {
            onClose();
          },
        });
        handler.openIframe();
      })
      .catch(() => {
        alert("Unable to load Paystack. Please check your connection and try again.");
        onClose();
      });

    return () => {
      cancelled = true;
    };
  }, [open, amount, email, onClose, onSuccess]);

  return null;
}