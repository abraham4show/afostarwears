import { createServerFn } from "@tanstack/react-start";
import { db } from "@/db";
import { orders, users } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

/**
 * Fetch all platform orders for the Admin Dashboard
 * This checks the database to make sure the requesting user is an admin!
 */
export const getAllAdminOrders = createServerFn({ method: "GET" })
  .validator((email: string) => email)
  .handler(async ({ data: email }) => {
    try {
      // 1. Verify the user is actually an admin in the DB
      const userRecord = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

      if (!userRecord.length || userRecord[0].role !== "admin") {
        throw new Error("Unauthorized access. Admin only.");
      }

      // 2. Fetch all orders, ordered by latest first
      const allOrders = await db
        .select()
        .from(orders)
        .orderBy(desc(orders.createdAt));

      return { success: true, orders: allOrders };
    } catch (err: any) {
      console.error("Failed to fetch admin orders:", err);
      return { success: false, error: err.message, orders: [] };
    }
  });