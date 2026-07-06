import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Loader2, CheckCircle2, ShieldCheck, X } from "lucide-react";
import { formatNaira } from "@/lib/cart-store";

type Props = {
  open: boolean;
  amount: number;
  email: string;
  onClose: () => void;
  onSuccess: (reference: string) => void;
};

export function PaymentModal({ open, amount, email, onClose, onSuccess }: Props) {
  const [stage, setStage] = useState<"confirm" | "processing" | "done">("confirm");

  useEffect(() => {
    if (open) setStage("confirm");
  }, [open]);

  const pay = () => {
    setStage("processing");
    // Simulated Paystack processing
    setTimeout(() => {
      const ref = "AFS-" + Math.random().toString(36).slice(2, 10).toUpperCase();
      setStage("done");
      setTimeout(() => onSuccess(ref), 700);
    }, 1800);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            onClick={stage === "confirm" ? onClose : undefined}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="pointer-events-auto w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl">
              <div className="bg-[#0BA4DB] text-white px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2 font-semibold">
                  <ShieldCheck className="w-5 h-5" />
                  Paystack Secure Checkout
                </div>
                {stage === "confirm" && (
                  <button onClick={onClose} aria-label="Close">
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
              <div className="p-6">
                {stage === "confirm" && (
                  <>
                    <div className="text-xs uppercase tracking-widest text-neutral-500">Pay to AFOSTAR WEARS</div>
                    <div className="mt-1 text-neutral-600 text-sm">{email}</div>
                    <div className="mt-4 font-display font-bold text-4xl">{formatNaira(amount)}</div>
                    <div className="mt-6 border rounded-2xl p-4 space-y-3 text-sm">
                      <div className="flex justify-between"><span className="text-neutral-500">Method</span><span>Card · **** 4242</span></div>
                      <div className="flex justify-between"><span className="text-neutral-500">Currency</span><span>NGN</span></div>
                      <div className="flex justify-between"><span className="text-neutral-500">Fee</span><span>Included</span></div>
                    </div>
                    <button
                      onClick={pay}
                      className="mt-6 w-full bg-[#0BA4DB] hover:bg-[#0994c6] text-white font-medium py-4 rounded-full transition"
                    >
                      Pay {formatNaira(amount)}
                    </button>
                    <p className="mt-3 text-[11px] text-neutral-400 text-center">
                      Simulated Paystack demo — no real charge is made.
                    </p>
                  </>
                )}
                {stage === "processing" && (
                  <div className="py-10 flex flex-col items-center text-center">
                    <Loader2 className="w-10 h-10 animate-spin text-[#0BA4DB]" />
                    <div className="mt-4 font-medium">Processing your payment…</div>
                    <div className="text-sm text-neutral-500 mt-1">Please don't close this window.</div>
                  </div>
                )}
                {stage === "done" && (
                  <div className="py-10 flex flex-col items-center text-center">
                    <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                    <div className="mt-3 font-display font-bold text-2xl">Payment Successful</div>
                    <div className="text-sm text-neutral-500 mt-1">Redirecting to your order…</div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}