import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/afostar/LegalPage";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — AFOSTAR WEARS" },
      { name: "description", content: "How AFOSTAR WEARS collects, uses and protects your data." },
    ],
  }),
  component: () => (
    <LegalPage
      title="Privacy Policy"
      updated="July 2026"
      intro='AFOSTAR WEARS ("we", "us", "our") respects your privacy. This policy explains what information we collect when you use our wholesale storefront, how we use it, and the choices you have.'
      sections={[
        {
          heading: "1. Information we collect",
          body: [
            "Account details: name, email, phone number, and password (stored locally on this MVP build).",
            "Order details: delivery address, items purchased, pack sizes and payment reference.",
            "Technical data: browser, device and basic analytics needed to keep the site reliable.",
          ],
        },
        {
          heading: "2. How we use your information",
          body: [
            "To process wholesale orders, coordinate delivery and provide tracking updates on WhatsApp.",
            "To operate your customer dashboard and show your order history.",
            "To respond to reported issues and process refunds or replacements where appropriate.",
          ],
        },
        {
          heading: "3. Payments",
          body: "Card and bank transfer payments are handled by Paystack. We never see or store your full card details — only the payment reference returned after a successful charge.",
        },
        {
          heading: "4. Sharing",
          body: "We share the minimum information required with our delivery partners (e.g. GIG Logistics) to complete your order. We do not sell your data.",
        },
        {
          heading: "5. Your rights",
          body: "You can request access, correction or deletion of your data at any time by writing to us on WhatsApp at +234 912 288 1673.",
        },
        {
          heading: "6. Contact",
          body: "AFOSTAR WEARS, Oshodi Market, Lagos, Nigeria — @thewholesaleguyinoshodi.",
        },
      ]}
    />
  ),
});