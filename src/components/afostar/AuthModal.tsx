import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, LogIn, UserPlus } from "lucide-react";
import { useAuth } from "@/lib/auth-store";

export function AuthModal() {
  const { isModalOpen, modalMode, closeModal, setModalMode, signIn, signUp } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isModalOpen) {
      setForm({ name: "", email: "", phone: "", password: "" });
      setError(null);
      setLoading(false);
    }
  }, [isModalOpen]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (modalMode === "signin") {
        await signIn(form.email.trim(), form.password);
      } else {
        if (form.name.trim().length < 2) throw new Error("Enter your full name");
        if (form.password.length < 6) throw new Error("Password must be at least 6 characters");
        await signUp(form.name.trim(), form.email.trim(), form.password, form.phone.trim() || undefined);
      }
    } catch (err: any) {
      setError(err?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const isSignup = modalMode === "signup";

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <motion.div
            initial={{ y: 20, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="relative p-6 md:p-8">
              <button
                onClick={closeModal}
                aria-label="Close"
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="text-[11px] uppercase tracking-widest text-neutral-500">
                AFOSTAR Wears
              </div>
              <h2 className="font-display font-bold text-3xl mt-1">
                {isSignup ? "Create an account" : "Welcome back"}
              </h2>
              <p className="text-sm text-neutral-600 mt-1">
                {isSignup
                  ? "Track orders, save addresses and unlock repeat-buyer perks."
                  : "Sign in to view your dashboard and order history."}
              </p>

              <form onSubmit={submit} className="mt-6 space-y-4">
                {isSignup && (
                  <Field
                    label="Full name"
                    value={form.name}
                    onChange={(v) => setForm({ ...form, name: v })}
                    placeholder="e.g. Chika Umeh"
                  />
                )}
                <Field
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                  placeholder="you@example.com"
                />
                {isSignup && (
                  <Field
                    label="Phone (optional)"
                    type="tel"
                    value={form.phone}
                    onChange={(v) => setForm({ ...form, phone: v })}
                    placeholder="+234..."
                  />
                )}
                <Field
                  label="Password"
                  type="password"
                  value={form.password}
                  onChange={(v) => setForm({ ...form, password: v })}
                  placeholder="At least 6 characters"
                />

                {error && (
                  <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black text-white rounded-full py-3.5 font-medium inline-flex items-center justify-center gap-2 hover:bg-neutral-800 disabled:opacity-60"
                >
                  {isSignup ? <UserPlus className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
                  {loading ? "Please wait…" : isSignup ? "Create account" : "Sign in"}
                </button>

                <div className="text-center text-sm text-neutral-600">
                  {isSignup ? "Already have an account?" : "New here?"}{" "}
                  <button
                    type="button"
                    onClick={() => setModalMode(isSignup ? "signin" : "signup")}
                    className="font-medium underline underline-offset-2"
                  >
                    {isSignup ? "Sign in" : "Create one"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-widest text-neutral-500">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full border border-black/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black"
      />
    </label>
  );
}