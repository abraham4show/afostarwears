import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useMemo } from "react";
import { Eye, EyeOff } from "lucide-react";
import { 
  ShieldCheck, TrendingUp, ShoppingBag, 
  AlertTriangle, XCircle, MessageSquare 
} from "lucide-react";
import { useAuth } from "@/lib/auth-store";
import { formatNaira } from "@/lib/cart-store";
import { getAllAdminOrders } from "@/services/admin-functions";
import { Navbar } from "@/components/afostar/Navbar";
import { Footer } from "@/components/afostar/Footer";


export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Portal — AFOSTAR WEARS" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

type AdminOrder = {
  id: string;
  userId: string | null;
  totalAmount: string | number;
  status: string;
  trackingNumber: string | null;
  shippingAddress: string;
  createdAt: string | Date;
  updated_at?: string | Date;
  issue?: string | null;
  customerIssue?: string | null;
  customerPhone?: string;
  phone?: string; // ⚡ Added fallback property from schema fields
};

function AdminPage() {
  return (
    <main className="bg-white text-black min-h-screen">
      <Navbar />
      <AdminDashboard />
      <Footer />
    </main>
  );
}

function AdminDashboard() {
  const authState = useAuth() as any;
  const user = authState.user;
  const isAuthLoading = authState.loading || authState.isLoading || false;
  
  const navigate = useNavigate();
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [fetching, setFetching] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [filter, setFilter] = useState<"all" | "issues" | "cancelled" | "new">("all");
const [showRevenue, setShowRevenue] = useState(true);
  useEffect(() => {
    async function verifyAdminAndLoad() {
      if (isAuthLoading) return;
      
      if (!user || !user.email) {
        console.log("No logged-in user session found. Prompting sign in.");
        
        authState.openModal("signin", () => {
          navigate({ to: "/admin" });
        });
        
        navigate({ to: "/" });
        return;
      }

      setFetching(true);
      console.log("Checking admin status on server for:", user.email);
      
      const res = await getAllAdminOrders({ data: user.email });
      
      if (res.success && res.orders) {
        console.log("Access granted by server DB!", res.orders);
        setIsAdmin(true);
        setOrders(res.orders as unknown as AdminOrder[]);
      } else {
        console.error("Server database security check failed:", res.error);
        setIsAdmin(false);
        navigate({ to: "/" });
      }
      setFetching(false);
    }

    verifyAdminAndLoad();
  }, [user, isAuthLoading, navigate, authState]);

  // Calculations for stats
  const stats = useMemo(() => {
    const totalSales = orders
      .filter((o) => o.status?.toLowerCase() !== "cancelled")
      .reduce((sum, o) => sum + Number(o.totalAmount), 0);

    const activeIssues = orders.filter((o) => {
  const issueText = o.customerIssue || o.issue;
  return issueText && issueText.trim() !== "";
}).length;
    const cancelledCount = orders.filter((o) => o.status?.toLowerCase() === "cancelled").length;

    return {
      totalSales,
      orderCount: orders.length,
      activeIssues,
      cancelledCount,
    };
  }, [orders]);

  // Filter logic (supports casing differences like "New" vs "new")
  const filteredOrders = useMemo(() => {
  return orders.filter((o) => {
    const statusLower = (o.status || "").toLowerCase();
    
    if (filter === "issues") {
      const issueText = o.customerIssue || o.issue;
      return issueText && issueText.trim() !== "";
    }
    
    if (filter === "cancelled") return statusLower === "cancelled";
    if (filter === "new") return statusLower === "new" || statusLower === "processing";
    return true;
  });
}, [orders, filter]);

  if (isAuthLoading || fetching || isAdmin === null) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-neutral-500 font-medium">Verifying credentials with database...</p>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-5 md:px-8 py-10">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-neutral-100 text-neutral-800 text-xs font-semibold px-2.5 py-1 rounded-full mb-3">
            <ShieldCheck className="w-3.5 h-3.5" /> AFOSTAR Administrative Portal
          </div>
          <h1 className="font-display font-bold text-3xl md:text-4xl">Platform Operations</h1>
          <p className="text-neutral-500 text-sm mt-1">Manage physical shipments, client cancellations, and issue complaints.</p>
        </div>
        <button 
          onClick={() => {
            if (user?.email) {
              setFetching(true);
              getAllAdminOrders({ data: user.email }).then((res) => {
                if (res.success && res.orders) setOrders(res.orders as unknown as AdminOrder[]);
                setFetching(false);
              });
            }
          }}
          className="bg-black hover:bg-neutral-800 text-white text-xs font-medium px-4 py-2.5 rounded-full transition"
        >
          Refresh Live Data
        </button>
      </div>

      {/* Analytics Overview Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <div className="bg-neutral-50 border border-neutral-100 rounded-3xl p-6">
  <div className="flex items-center justify-between">
    <span className="text-[11px] uppercase tracking-widest text-neutral-500 font-medium">
      Gross Revenue
    </span>
    <div className="flex items-center gap-2">
      {/* Eye Toggle Button */}
      <button
        onClick={() => setShowRevenue(!showRevenue)}
        className="text-neutral-400 hover:text-neutral-600 transition-colors p-1 rounded-md hover:bg-neutral-100"
        title={showRevenue ? "Hide revenue" : "Show revenue"}
        type="button"
      >
        {showRevenue ? (
          <EyeOff className="w-4 h-4" />
        ) : (
          <Eye className="w-4 h-4" />
        )}
      </button>
      <TrendingUp className="w-4 h-4 text-emerald-600" />
    </div>
  </div>
  
  {/* Conditional rendering of the amount */}
  <h2 className="text-2xl font-bold font-display mt-2">
    {showRevenue ? formatNaira(stats.totalSales) : "₦ ••••••"}
  </h2>
  
  <p className="text-xs text-neutral-400 mt-1">Excludes cancelled orders</p>
</div>

        <div className="bg-neutral-50 border border-neutral-100 rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-widest text-neutral-500 font-medium">Total Orders</span>
            <ShoppingBag className="w-4 h-4 text-black" />
          </div>
          <h2 className="text-2xl font-bold font-display mt-2">{stats.orderCount}</h2>
          <p className="text-xs text-neutral-400 mt-1">All processed sales</p>
        </div>

        <div className="bg-neutral-50 border border-neutral-100 rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-widest text-neutral-500 font-medium">Reported Issues</span>
            <AlertTriangle className="w-4 h-4 text-amber-600 animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold font-display mt-2 text-amber-600">{stats.activeIssues}</h2>
          <p className="text-xs text-amber-500/80 mt-1">Customers requesting help</p>
        </div>

        <div className="bg-neutral-50 border border-neutral-100 rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-widest text-neutral-500 font-medium">Cancellations</span>
            <XCircle className="w-4 h-4 text-neutral-500" />
          </div>
          <h2 className="text-2xl font-bold font-display mt-2 text-neutral-500">{stats.cancelledCount}</h2>
          <p className="text-xs text-neutral-400 mt-1">Marked as void</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-6 border-b border-neutral-100 pb-4">
        {(["all", "new", "issues", "cancelled"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition ${
              filter === t 
                ? "bg-black text-white" 
                : "bg-neutral-50 hover:bg-neutral-100 text-neutral-600"
            }`}
          >
            {t === "all" && "All Orders"}
            {t === "new" && "New & Processing"}
            {t === "issues" && `Pending Issues (${stats.activeIssues})`}
            {t === "cancelled" && "Cancellations"}
          </button>
        ))}
      </div>

      {/* Orders Table Display */}
      <div className="bg-white border border-neutral-200/60 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-neutral-50 text-[10px] uppercase tracking-widest text-neutral-500 border-b border-neutral-100">
              <tr>
                <th className="px-6 py-4 font-semibold">Order ID</th>
                <th className="px-6 py-4 font-semibold">Destination Address</th>
                <th className="px-6 py-4 font-semibold">Total Paid</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Report / Issue</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-16 text-neutral-400">
                    No orders match your selected filter criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((o) => {
  // ⚡ Dynamic fallback evaluation to ensure real numbers are captured
  const rawPhone = o.customerPhone || o.phone || "";
  const cleanedPhone = rawPhone.replace(/\D/g, "");
  
  // Construct WhatsApp Link ONLY if we have a valid phone number length
  // (Standard mobile numbers in Nigeria/internationally are at least 7-11 digits)
  const hasValidPhone = cleanedPhone.length >= 7;
  
  const whatsappLink = hasValidPhone 
    ? `https://wa.me/${cleanedPhone.startsWith("0") ? "234" + cleanedPhone.slice(1) : cleanedPhone}`
    : null; 

                  return (
                    <tr key={o.id} className="hover:bg-neutral-50/50 transition duration-150">
                      <td className="px-6 py-4 font-semibold font-mono text-xs">
                        #{o.id ? o.id.slice(-6).toUpperCase() : "UNKNOWN"}
                      </td>
                      <td className="px-6 py-4 max-w-xs truncate" title={o.shippingAddress}>
                        {o.shippingAddress || "No Address Provided"}
                      </td>
                      <td className="px-6 py-4 font-medium text-black">
                        {formatNaira(Number(o.totalAmount))}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full ${
                          o.status?.toLowerCase() === "cancelled" ? "bg-neutral-100 text-neutral-500" :
                          o.status?.toLowerCase() === "delivered" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" :
                          o.status?.toLowerCase() === "shipped" ? "bg-indigo-50 text-indigo-700 border border-indigo-100" :
                          "bg-blue-50 text-blue-700 border border-blue-100"
                        }`}>
                          {o.status}
                        </span>
                      </td>
                     {/* Find this column in your Admin Dashboard Orders Table */}
<td className="px-6 py-4 text-sm text-neutral-600">
  {/* Checks both customerIssue and the fallback issue property */}
  {o.customerIssue || o.issue ? (
    <span className="inline-block bg-red-100 text-red-700 px-2 py-1 rounded-md font-medium text-xs">
      ⚠️ {o.customerIssue || o.issue}
    </span>
  ) : (
    <span className="text-neutral-400 italic">None reported</span>
  )}
</td>
                      <td className="px-6 py-4 text-right">
                        <div className="inline-flex gap-2">
                         {whatsappLink ? (
  <a 
    href={whatsappLink} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm font-medium"
  >
    Chat WA
  </a>
) : (
  <span className="text-gray-400 text-sm cursor-not-allowed italic">
    No Phone Saved
  </span>
)}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}