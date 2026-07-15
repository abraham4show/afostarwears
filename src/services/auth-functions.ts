import { createServerFn } from "@tanstack/react-start";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

interface SyncUserPayload {
  id: string;
  name: string;
  email: string;
  phone?: string;
  customerType?: "consumer" | "retailer" | "wholesaler";
}

/**
 * SECURE USER SYNC
 * Registers a new user in the Postgres database, or returns existing record.
 */
export const syncUserWithDb = createServerFn({ method: "POST" })
  .validator((data: SyncUserPayload) => data)
  .handler(async ({ data }: { data: SyncUserPayload }) => {
    // 1. Check if user already exists
    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.id, data.id))
      .limit(1);

    if (existingUser) {
      return { success: true, user: existingUser, isNew: false };
    }

    // 2. If not, insert them into our Postgres database
    const newUser = {
      id: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      role: "customer", // Default to standard customer
      customerType: data.customerType || "consumer", // Default to consumer
    };

    await db.insert(users).values(newUser);

    return { success: true, user: newUser, isNew: true };
  });