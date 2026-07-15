import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/afostar/LegalPage";

export const Route = createFileRoute("/returns")({
  head: () => ({
    meta: [
      { title: "Return & Refund Policy — AFOSTAR WEARS" },
      { name: "description", content: "Wholesale return, refund and replacement terms for AFOSTAR WEARS." },
    ],
  }),
  component: () => (
    <LegalPage
      title="Return & Refund Policy"
      updated="July 2026"
      intro="AFOSTAR WEARS is a wholesale-only brand. Orders ship in fixed packs with a preset size run. Because of the bulk nature of our business, our return policy differs from retail stores — please read carefully before placing an order."
      sections={[
        {
          heading: "1. Wholesale terms",
          body: [
            "All products are sold in sealed packs (typically 4–10 pieces) with a preset size mix.",
            "We do not sell or return single pieces from within a pack.",
            "Prices displayed are per pack in Nigerian Naira (₦).",
          ],
        },
        {
          heading: "2. Eligible returns",
          body: [
            "Damaged or defective packs reported within 48 hours of delivery.",
            "Wrong item shipped (a different SKU than what was ordered).",
            "Missing packs from a multi-pack order.",
          ],
        },
        {
          heading: "3. Non-returnable",
          body: [
            "Change of mind or slow retail sell-through.",
            "Individual pieces from an otherwise intact pack.",
            "Packs opened, washed or altered by the buyer.",
          ],
        },
        {
          heading: "4. Refunds",
          body: "Approved refunds are processed via Paystack to the original payment method within 5–7 business days. Delivery fees are non-refundable except where the fault is ours.",
        },
        {
          heading: "5. How to report",
          body: 'Open your dashboard, tap "Report an Issue" on the order, or message us on WhatsApp at +234 912 288 1673 with your tracking number and clear photos.',
        },
      ]}
    />
  ),
});