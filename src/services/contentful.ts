/**
 * Contentful CMS service layer.
 *
 * Right now this returns local mock data shaped like a Contentful
 * `getEntries()` payload. To switch to the real API in VS Code:
 *
 * 1. Add these to your `.env` (see `.env.example`):
 *      VITE_CONTENTFUL_SPACE_ID=...
 *      VITE_CONTENTFUL_ACCESS_TOKEN=...
 * 2. `bun add contentful`
 * 3. Replace the body of `fetchProductEntries()` with:
 *
 *      import { createClient } from "contentful";
 *      const client = createClient({
 *        space: import.meta.env.VITE_CONTENTFUL_SPACE_ID!,
 *        accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN!,
 *      });
 *      const res = await client.getEntries({ content_type: "product" });
 *      return res.items as unknown as ContentfulEntry<ContentfulProductFields>[];
 *
 * The rest of the app only ever calls `getProducts()`, which normalizes
 * the Contentful payload into the app's `Product` shape — so no other
 * files need to change when you flip the switch.
 */

import type { Product } from "@/lib/cart-store";
import { PRODUCTS } from "@/lib/products";

export type ContentfulAsset = {
  sys: { id: string };
  fields: { file: { url: string }; title?: string };
};

export type ContentfulProductFields = {
  name: string;
  slug: string;
  category: string;
  pricePerPack: number;
  packSize: number;
  mainImage: ContentfulAsset;
  gallery?: ContentfulAsset[];
  packSizes?: string[];
};

export type ContentfulEntry<T> = {
  sys: { id: string; createdAt: string; updatedAt: string };
  fields: T;
};

/**
 * Mock — returns a Contentful-shaped payload built from the static list.
 * Swap this function to hit the real Contentful CDN.
 */
async function fetchProductEntries(): Promise<ContentfulEntry<ContentfulProductFields>[]> {
  await new Promise((r) => setTimeout(r, 60)); // simulate network
  const now = new Date().toISOString();
  return PRODUCTS.map((p) => ({
    sys: { id: p.id, createdAt: now, updatedAt: now },
    fields: {
      name: p.name,
      slug: p.id,
      category: p.category,
      pricePerPack: p.pricePerPack,
      packSize: p.packSize,
      mainImage: {
        sys: { id: `${p.id}-main` },
        fields: { file: { url: p.image }, title: p.name },
      },
      gallery: (p.gallery ?? []).map((url, i) => ({
        sys: { id: `${p.id}-g${i}` },
        fields: { file: { url } },
      })),
      packSizes: p.packSizes,
    },
  }));
}

function normalize(entry: ContentfulEntry<ContentfulProductFields>): Product {
  const f = entry.fields;
  return {
    id: entry.sys.id,
    name: f.name,
    category: f.category,
    pricePerPack: f.pricePerPack,
    packSize: f.packSize,
    image: f.mainImage.fields.file.url,
    gallery: f.gallery?.map((a) => a.fields.file.url) ?? [],
    packSizes: f.packSizes ?? ["S", "M", "L", "XL", "XXL"],
  };
}

export async function getProducts(): Promise<Product[]> {
  const entries = await fetchProductEntries();
  return entries.map(normalize);
}

export async function getProductById(id: string): Promise<Product | null> {
  const all = await getProducts();
  return all.find((p) => p.id === id) ?? null;
}