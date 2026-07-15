import { createServerFn } from "@tanstack/react-start";
import { db } from "@/db";
import { orders, orderItems } from "@/db/schema";
import { eq } from "drizzle-orm";
import { sql } from "drizzle-orm";

interface SaveOrderPayload {
  reference: string;
  userId: string | null;
  totalAmount: number;
  customerName: string;
  customerPhone: string;
  shippingAddress: string;
  items: Array<{
    productId: string;
    name: string;
    quantity: number;
    purchaseType: string;
    pricePaid: number;
  }>;
}

/**
 * SECURE ORDER CANCELLATION
 * Updates status to 'cancelled' in Postgres
 */
export const cancelOrderInDb = createServerFn({ method: "POST" })
  .validator((orderId: string) => orderId)
  .handler(async ({ data: orderId }) => {
    try {
      const statusField = 'status' in orders ? 'status' : 'orderStatus';
      
      await db
        .update(orders)
        .set({ [statusField]: "cancelled" })
        .where(eq(orders.id, orderId));
        
      return { success: true };
    } catch (err) {
      console.error("Failed to cancel order in DB:", err);
      throw new Error("Database update failed");
    }
  });

/**
 * SECURE REPORT ISSUE
 */
export const reportIssueInDb = createServerFn({ method: "POST" })
  .validator((payload: { orderId: string; issue: string }) => payload)
  .handler(async ({ data }) => {
    try {
      console.log(`[DB Sync] Reporting issue for order ID: ${data.orderId}`);

      // 1. Safely extract columns from Drizzle schema definition
      // Drizzle stores the actual columns on the table's internal property mapping:
      const tableColumns = (orders as any)[Symbol.for('drizzle:Columns')] || orders;
      const schemaFields = Object.keys(tableColumns || {});
      
      let targetField: string = "issue";
      if (schemaFields.includes("customerIssue") && !schemaFields.includes("issue")) {
        targetField = "customerIssue";
      } else if (schemaFields.includes("customer_issue") && !schemaFields.includes("issue")) {
        targetField = "customer_issue";
      }

      console.log(`[DB Sync] Resolved database columns:`, schemaFields);
      console.log(`[DB Sync] Selected schema property: "${targetField}"`);

      // 2. Perform safe update using Drizzle ORM
      await db
        .update(orders)
        .set({ [targetField]: data.issue })
        .where(eq(orders.id, data.orderId));
        
      console.log(`[DB Sync] Successfully updated order issue!`);
      return { success: true };
    } catch (err) {
      console.error("Primary Drizzle update failed. Initiating query fallbacks:", err);
      
      // FALLBACK 1: Try updating "customer_issue" column directly
      try {
        console.log("[DB Sync] Emergency SQL Fallback 1: Updating customer_issue...");
        await db.execute(
          sql`UPDATE "orders" SET "customer_issue" = ${data.issue} WHERE "id" = ${data.orderId}`
        );
        return { success: true };
      } catch (err1) {
        // FALLBACK 2: Try updating standard "issue" column directly
        try {
          console.log("[DB Sync] Emergency SQL Fallback 2: Updating issue...");
          await db.execute(
            sql`UPDATE "orders" SET "issue" = ${data.issue} WHERE "id" = ${data.orderId}`
          );
          return { success: true };
        } catch (err2) {
          // FALLBACK 3: Attempt custom column structures
          try {
            console.log("[DB Sync] Emergency SQL Fallback 3: Updating customerIssue...");
            await db.execute(
              sql`UPDATE "orders" SET "customerIssue" = ${data.issue} WHERE "id" = ${data.orderId}`
            );
            return { success: true };
          } catch (finalErr) {
            console.error("All fallback update paths exhausted.", finalErr);
            throw new Error("Database update failed");
          }
        }
      }
    }
  });

/**
 * SECURE BACKEND ORDER SYNC
 * Safely writes order structures and items into Neon Postgres on payment completion.
 */
export const saveOrderToDb = createServerFn({ method: "POST" })
  .validator((data: SaveOrderPayload) => data)
  .handler(async ({ data }: { data: SaveOrderPayload }) => {
    try {
      const orderId = crypto.randomUUID();

      // 1. Insert master order row
      await db.insert(orders).values({
        id: orderId,
        userId: data.userId,
        totalAmount: data.totalAmount,
        status: "processing", // Instantly mark as processing since payment succeeded
        trackingNumber: data.reference,
        shippingAddress: data.shippingAddress,
      });

      // 2. Insert item details
      const itemInserts = data.items.map((item) => ({
        id: crypto.randomUUID(),
        orderId: orderId,
        productId: item.productId,
        name: item.name,
        quantity: item.quantity,
        purchaseType: item.purchaseType,
        pricePaid: item.pricePaid,
      }));

      await db.insert(orderItems).values(itemInserts);

      return { success: true, orderId };
    } catch (err) {
      console.error("Failed to write order details to database:", err);
      throw new Error("Order creation failed on backend");
    }
  });


