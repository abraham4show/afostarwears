/**
 * Contentful CMS service layer.
 * Uses environment variables from .env (see .env.example).
 */

import type { Product } from "@/lib/cart-store";
import { createClient } from "contentful";

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
  packSizes?: string | string[]; // Accept both string and array
};

export type ContentfulEntry<T> = {
  sys: { id: string; createdAt: string; updatedAt: string };
  fields: T;
};

/**
 * Fetches product entries from the real Contentful CDN.
 * Falls back to mock data if env vars are missing or the API fails.
 */
async function fetchProductEntries(): Promise<ContentfulEntry<ContentfulProductFields>[]> {
  const spaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
  const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;

  console.log("🔍 Contentful env check:", {
    spaceId: spaceId ? "✅ set" : "❌ missing",
    accessToken: accessToken ? "✅ set" : "❌ missing",
  });

  if (!spaceId || !accessToken) {
    console.warn("⚠️ Contentful env vars missing – using mock data");
    return getMockEntries();
  }

  const client = createClient({
    space: spaceId,
    accessToken: accessToken,
  });

  try {
    const response = await client.getEntries({
      content_type: "afostarWears",
    });
    console.log(`✅ Contentful returned ${response.items.length} entries`);
    if (response.items.length > 0) {
      console.log("📦 First entry fields:", response.items[0].fields);
    }
    return response.items as unknown as ContentfulEntry<ContentfulProductFields>[];
  } catch (error) {
    console.error("❌ Contentful fetch error:", error);
    // Fallback to mock data so the app never breaks
    return getMockEntries();
  }
}

/**
 * Mock entries (fallback) — built from your static PRODUCTS list.
 */
async function getMockEntries(): Promise<ContentfulEntry<ContentfulProductFields>[]> {
  console.log("📦 Using mock products (static data)");
  await new Promise((r) => setTimeout(r, 60));
  const now = new Date().toISOString();
  const { PRODUCTS } = await import("@/lib/products");
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

/**
 * Normalizes a Contentful entry into the app's Product shape.
 * Handles missing fields and ensures packSizes is always an array.
 */
function normalize(entry: ContentfulEntry<ContentfulProductFields>): Product | null {
  try {
    const f = entry.fields;

    // Validate required fields
    const imageUrl = f.mainImage?.fields?.file?.url;
    if (!imageUrl) {
      console.warn(`⚠️ Product "${f.name || 'Unnamed'}" has no mainImage – skipping`);
      return null;
    }

    // Normalize packSizes: ensure it's always an array
    let packSizes: string[] = [];
    if (f.packSizes) {
      if (Array.isArray(f.packSizes)) {
        packSizes = f.packSizes;
      } else if (typeof f.packSizes === "string") {
        packSizes = [f.packSizes];
      }
    }
    if (packSizes.length === 0) {
      packSizes = ["S", "M", "L", "XL", "XXL"];
    }

    // Ensure pricePerPack and packSize are numbers, fallback to 0/1
    const pricePerPack = typeof f.pricePerPack === 'number' ? f.pricePerPack : 0;
    const packSize = typeof f.packSize === 'number' ? f.packSize : 1;

    return {
      id: entry.sys.id,
      name: f.name || 'Unnamed Product',
      category: f.category || 'Uncategorized',
      pricePerPack,
      packSize,
      image: imageUrl,
      gallery: f.gallery?.map((a) => a.fields.file.url) ?? [],
      packSizes,
    };
  } catch (err) {
    console.error(`❌ Error normalizing entry ${entry.sys.id}:`, err);
    return null;
  }
}
/**
 * Public API: returns an array of products, fetched from Contentful or mock fallback.
 */
export async function getProducts(): Promise<Product[]> {
  const entries = await fetchProductEntries();
  const products = entries
    .map(normalize)
    .filter((p): p is Product => p !== null);

  console.log(`🛍️ Final product list: ${products.length} products`);
  if (products.length === 0) {
    console.warn("⚠️ No products available – check Contentful or fallback.");
  }
  return products;
}

/**
 * Public API: returns a single product by ID, or null if not found.
 */
export async function getProductById(id: string): Promise<Product | null> {
  const all = await getProducts();
  return all.find((p) => p.id === id) ?? null;
}