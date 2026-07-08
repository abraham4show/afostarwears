import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/afostar/Navbar";
import { Footer } from "@/components/afostar/Footer";
import { Dashboard } from "@/components/afostar/Dashboard";
import { AuthModal } from "@/components/afostar/AuthModal";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Your dashboard — AFOSTAR WEARS" },
      { name: "description", content: "View your account, order history and active shipments." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <main className="bg-white text-black min-h-screen">
      <Navbar />
      <Dashboard />
      <Footer />
      <AuthModal />
    </main>
  );
}