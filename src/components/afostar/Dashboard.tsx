import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, LogOut, Package, AlertTriangle, XCircle, Clock, CheckCircle2, Truck } from "lucide-react";
import { useAuth } from "@/lib/auth-store";
import { useOrders, type Order, type OrderStatus } from "@/lib/orders-store";
import { formatNaira } from "@/lib/cart-store";

type SortKey = "date" | "total" | "status";

const STATUS_META: Record<OrderStatus, { label: string; className: string; Icon: any }> = {
  new: { label: "New", className: "bg-blue-100 text-blue-700", Icon: Clock },
  processing: { label: "Processing", className: "bg-amber-100 text-amber-700", Icon: Package },
  shipped: { label: "Shipped", className: "bg-indigo-100 text-indigo-700", Icon: Truck },
  delivered: { label: "Delivered", className: "bg-emerald-100 text-emerald-700", Icon: CheckCircle2 },
  cancelled: { label: "Cancelled", className: "bg-neutral-200 text-neutral-600", Icon: XCircle },
};

export function Dashboard() {
  const { user, signOut, openModal, hydrate } = useAuth();
  const { orders, hydrate: hydrateOrders, cancelOrder, reportIssue } = useOrders();
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortAsc, setSortAsc] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState<Order | null>(null);
  const [issueFor, setIssueFor] = useState<Order | null>(null);
  const [issueText, setIssueText] = useState("");

  useEffect(() => {
    hydrate();
    hydrateOrders();
  }, [hydrate, hydrateOrders]);

  const userOrders = useMemo(
    () => (user ? orders.filter((o) => o.userId === user.id) : []),
    [orders, user],
  );

  const newOrders = useMemo(
    () => userOrders.filter((o) => o.status === "new" || o.status === "processing"),
    [userOrders],
  );

  const sorted = useMemo(() => {
    const arr = [...userOrders];
    arr.sort((a, b) => {
      let cmp = 0;
      if (sortKey === "date") cmp = a.createdAt.localeCompare(b.createdAt);
      if (sortKey === "total") cmp = a.total - b.total;
      if (sortKey === "status") cmp = a.status.localeCompare(b.status);
      return sortAsc ? cmp : -cmp;
    });
    return arr;
  }, [userOrders, sortKey, sortAsc]);

  const toggleSort = (k: SortKey) => {
    if (k === sortKey) setSortAsc((v) => !v);
    else {
      setSortKey(k);
      setSortAsc(false);
    }
  };

  if (!user) {
    return (
      <section className="max-w-3xl mx-auto px-5 md:px-8 py-24 text-center">
        <h2 className="font-display font-bold text-3xl">Sign in to view your dashboard</h2>
        <p className="mt-3 text-neutral-600">
          Your orders, tracking numbers and account details live here.
        </p>
        <div className="mt-6 flex gap-3 justify-center">
          <button
            onClick={() => openModal("signin")}
            className="bg-black text-white rounded-full px-6 py-3 text-sm font-medium"
          >
            Sign in
          </button>
          <Link
            to="/"
            className="border border-black/15 rounded-full px-6 py-3 text-sm font-medium hover:bg-neutral-100"
          >
            Back to shop
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-5 md:px-8 py-10 md:py-14">
      <div className="flex items-center justify-between gap-4 mb-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-black">
          <ArrowLeft className="w-4 h-4" /> Back to shop
        </Link>
        <button
          onClick={signOut}
          className="inline-flex items-center gap-2 text-sm border border-black/15 rounded-full px-4 py-2 hover:bg-neutral-100"
        >
          <LogOut className="w-4 h-4" /> Sign out
        </button>
      </div>

      {/* Account overview */}
      <div className="grid md:grid-cols-3 gap-5 mb-10">
        <div className="md:col-span-2 bg-neutral-50 rounded-3xl p-6 md:p-8">
          <div className="text-[11px] uppercase tracking-widest text-neutral-500">Account overview</div>
          <h1 className="font-display font-bold text-3xl md:text-4xl mt-1">
            Hi {user.name.split(" ")[0]} 👋
          </h1>
          <p className="text-neutral-600 mt-2 text-sm">
            Member since {new Date(user.createdAt).toLocaleDateString("en-NG", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <div className="mt-6 grid sm:grid-cols-2 gap-4 text-sm">
            <Info label="Email" value={user.email} />
            <Info label="Phone" value={user.phone ?? "—"} />
            <Info label="Orders placed" value={String(userOrders.length)} />
            <Info
              label="Lifetime spend"
              value={formatNaira(userOrders.reduce((s, o) => s + o.total, 0))}
            />
          </div>
        </div>
        <div className="bg-black text-white rounded-3xl p-6 md:p-8">
          <div className="text-[11px] uppercase tracking-widest text-white/60">Recent activity</div>
          <ul className="mt-4 space-y-3 text-sm">
            {userOrders.slice(0, 4).map((o) => (
              <li key={o.id} className="flex items-center justify-between gap-3">
                <span className="truncate">#{o.trackingNumber}</span>
                <span className="text-white/60 text-xs">
                  {new Date(o.createdAt).toLocaleDateString()}
                </span>
              </li>
            ))}
            {userOrders.length === 0 && (
              <li className="text-white/60">No orders yet — start shopping to see activity.</li>
            )}
          </ul>
        </div>
      </div>

      {/* New orders */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-bold text-2xl">New & active orders</h2>
          <span className="text-xs uppercase tracking-widest text-neutral-500">
            {newOrders.length} active
          </span>
        </div>
        {newOrders.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-black/15 p-8 text-center text-sm text-neutral-500">
            No active orders — new orders will appear here first.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {newOrders.map((o) => (
              <NewOrderCard key={o.id} order={o} />
            ))}
          </div>
        )}
      </div>

      {/* Order history */}
      <div>
        <h2 className="font-display font-bold text-2xl mb-4">Order history</h2>
        <div className="overflow-x-auto rounded-2xl border border-black/10">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-left text-[11px] uppercase tracking-widest text-neutral-500">
              <tr>
                <Th>Order</Th>
                <Th onClick={() => toggleSort("date")} active={sortKey === "date"} asc={sortAsc}>
                  Date
                </Th>
                <Th>Tracking</Th>
                <Th onClick={() => toggleSort("total")} active={sortKey === "total"} asc={sortAsc}>
                  Total
                </Th>
                <Th onClick={() => toggleSort("status")} active={sortKey === "status"} asc={sortAsc}>
                  Status
                </Th>
                <Th className="text-right">Actions</Th>
              </tr>
            </thead>
            <tbody>
              {sorted.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-neutral-500">
                    No orders yet.
                  </td>
                </tr>
              )}
              {sorted.map((o) => {
                const meta = STATUS_META[o.status];
                return (
                  <tr key={o.id} className="border-t border-black/5">
                    <td className="px-4 py-3 font-medium">#{o.reference.slice(-6).toUpperCase()}</td>
                    <td className="px-4 py-3 text-neutral-600">
                      {new Date(o.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs">{o.trackingNumber}</td>
                    <td className="px-4 py-3 font-medium">{formatNaira(o.total)}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] uppercase tracking-widest px-2 py-1 rounded-full ${meta.className}`}
                      >
                        <meta.Icon className="w-3 h-3" /> {meta.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex gap-2">
                        <button
                          onClick={() => {
                            setIssueFor(o);
                            setIssueText(o.issue ?? "");
                          }}
                          className="text-xs border border-black/15 rounded-full px-3 py-1.5 hover:bg-neutral-100 inline-flex items-center gap-1"
                        >
                          <AlertTriangle className="w-3 h-3" /> Report
                        </button>
                        <button
                          disabled={o.status === "cancelled" || o.status === "delivered"}
                          onClick={() => setConfirmCancel(o)}
                          className="text-xs bg-black text-white rounded-full px-3 py-1.5 hover:bg-neutral-800 inline-flex items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          <XCircle className="w-3 h-3" /> Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirm cancel modal */}
      <ConfirmModal
        open={!!confirmCancel}
        title="Cancel this order?"
        description={`Order ${confirmCancel?.trackingNumber ?? ""} will be marked as cancelled. Our team will follow up on WhatsApp for any refunds.`}
        confirmLabel="Yes, cancel order"
        onCancel={() => setConfirmCancel(null)}
        onConfirm={() => {
          if (confirmCancel) cancelOrder(confirmCancel.id);
          setConfirmCancel(null);
        }}
      />

      {/* Issue modal */}
      <AnimatePresence>
        {issueFor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/60 flex items-center justify-center p-4"
            onClick={() => setIssueFor(null)}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-md"
            >
              <h3 className="font-display font-bold text-2xl">Report an issue</h3>
              <p className="text-sm text-neutral-600 mt-1">
                Order {issueFor.trackingNumber}. Describe the problem and our team will follow up.
              </p>
              <textarea
                rows={4}
                value={issueText}
                onChange={(e) => setIssueText(e.target.value)}
                placeholder="e.g. Wrong size mix, missing item, damaged package…"
                className="mt-4 w-full border border-black/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black"
              />
              <div className="mt-5 flex gap-3 justify-end">
                <button
                  onClick={() => setIssueFor(null)}
                  className="border border-black/15 rounded-full px-5 py-2.5 text-sm"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    if (issueFor && issueText.trim()) {
                      reportIssue(issueFor.id, issueText.trim());
                    }
                    setIssueFor(null);
                  }}
                  className="bg-black text-white rounded-full px-5 py-2.5 text-sm"
                >
                  Submit report
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-widest text-neutral-500">{label}</div>
      <div className="font-medium mt-1">{value}</div>
    </div>
  );
}

function Th({
  children,
  onClick,
  active,
  asc,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  asc?: boolean;
  className?: string;
}) {
  return (
    <th className={`px-4 py-3 font-medium ${className}`}>
      {onClick ? (
        <button onClick={onClick} className="inline-flex items-center gap-1 hover:text-black">
          {children}
          {active && <span className="text-black">{asc ? "▲" : "▼"}</span>}
        </button>
      ) : (
        children
      )}
    </th>
  );
}

function NewOrderCard({ order }: { order: Order }) {
  const meta = STATUS_META[order.status];
  return (
    <div className="bg-white border border-black/10 rounded-2xl p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-widest text-neutral-500">
            {new Date(order.createdAt).toLocaleString()}
          </div>
          <div className="font-display font-semibold text-lg mt-1">
            {order.items.reduce((s, i) => s + i.quantity, 0)} packs · {formatNaira(order.total)}
          </div>
        </div>
        <span
          className={`inline-flex items-center gap-1 text-[11px] uppercase tracking-widest px-2 py-1 rounded-full ${meta.className}`}
        >
          <meta.Icon className="w-3 h-3" /> {meta.label}
        </span>
      </div>
      <div className="text-xs text-neutral-500">
        Tracking <span className="font-mono">{order.trackingNumber}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {order.items.slice(0, 4).map((i) => (
          <img
            key={i.product.id}
            src={i.product.image}
            alt=""
            className="w-12 h-12 rounded-lg object-cover border border-black/10"
          />
        ))}
      </div>
    </div>
  );
}

function ConfirmModal({
  open,
  title,
  description,
  confirmLabel,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] bg-black/60 flex items-center justify-center p-4"
          onClick={onCancel}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-sm"
          >
            <h3 className="font-display font-bold text-xl">{title}</h3>
            <p className="text-sm text-neutral-600 mt-2">{description}</p>
            <div className="mt-5 flex gap-3 justify-end">
              <button
                onClick={onCancel}
                className="border border-black/15 rounded-full px-5 py-2.5 text-sm"
              >
                Keep order
              </button>
              <button
                onClick={onConfirm}
                className="bg-red-600 text-white rounded-full px-5 py-2.5 text-sm hover:bg-red-700"
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}