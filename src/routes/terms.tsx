import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/afostar/LegalPage";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — AFOSTAR WEARS" },
      { name: "description", content: "Terms and conditions governing the use of AFOSTAR WEARS." },
    ],
  }),
  component: () => (
    <LegalPage
      title="Terms & Conditions"
      updated="July 2026"
      intro="By using the AFOSTAR WEARS storefront you agree to the terms below. If you do not agree, please do not use the site."
      sections={[
        {
          heading: "1. The service",
          body: "AFOSTAR WEARS operates a wholesale storefront for retailers, resellers and boutique buyers. Orders are fulfilled from our warehouse in Oshodi, Lagos.",
        },
        {
          heading: "2. Accounts",
          body: [
            "You are responsible for keeping your login credentials secure.",
            "You must provide accurate contact and delivery information.",
            "We may suspend accounts that place fraudulent orders or violate these terms.",
          ],
        },
        {
          heading: "3. Pricing & availability",
          body: "Pack prices are shown in NGN and may change without notice. If an item is out of stock after payment, you will be offered a replacement pack or a full refund.",
        },
        {
          heading: "4. Payment",
          body: "Payments are processed by Paystack. Placing an order is an offer to buy; we reserve the right to accept or decline before dispatch.",
        },
        {
          heading: "5. Delivery",
          body: "Delivery windows are estimates. Tracking updates are shared over WhatsApp. Risk passes to you on delivery to the address you provided.",
        },
        {
          heading: "6. Limitation of liability",
          body: "To the fullest extent permitted by law, AFOSTAR WEARS is not liable for indirect or consequential losses arising from use of the site or products purchased.",
        },
        {
          heading: "7. Governing law",
          body: "These terms are governed by the laws of the Federal Republic of Nigeria.",
        },
      ]}
    />
  ),
});