import { createServerFn } from "@tanstack/react-start"; // 👈 Updated import to react-start
import { db } from "@/db";
import { orders, returnRequests, users } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

/**
 * 1. SECURE CUSTOMER DASHBOARD FETCH
 * Pulls all orders for the logged-in customer
 */
export const getCustomerOrders = createServerFn({ method: "GET" })
  .validator((userId: string) => userId)
  .handler(async ({ data: userId }: { data: string }) => { // 👈 Added explicit types
    return await db
      .select()
      .from(orders)
      .where(eq(orders.userId, userId))
      .orderBy(desc(orders.createdAt));
  });

/**
 * 2. AUTO-VALIDATING RETURN POLICY INITIATION
 * Standard return window is 7 days from delivery.
 */
export const requestReturn = createServerFn({ method: "POST" })
  .validator((data: { orderId: string; reason: string }) => data)
  .handler(async ({ data }: { data: { orderId: string; reason: string } }) => { // 👈 Added explicit types
    const [existingOrder] = await db
      .select()
      .from(orders)
      .where(eq(orders.id, data.orderId))
      .limit(1);

    if (!existingOrder) {
      throw new Error("Order not found.");
    }

    // Return policy verification logic
    const orderDate = new Date(existingOrder.createdAt);
    const today = new Date();
    const differenceInDays = (today.getTime() - orderDate.getTime()) / (1000 * 3600 * 24);

    if (differenceInDays > 7) {
      throw new Error("Returns are only allowed within 7 days of purchase.");
    }

    const returnId = `ret_${Math.random().toString(36).substring(2, 9)}`;

    await db.insert(returnRequests).values({
      id: returnId,
      orderId: data.orderId,
      reason: data.reason,
      status: "pending",
    });

    return { success: true, returnId };
  });

/**
 * 3. ADMIN ONLY DASHBOARD: GET ALL ORDERS
 */
export const getAdminDashboardData = createServerFn({ method: "GET" })
  .validator((adminId: string) => adminId)
  .handler(async ({ data: adminId }: { data: string }) => { // 👈 Added explicit types
    // 1. Authenticate the admin
    const [adminUser] = await db
      .select()
      .from(users)
      .where(eq(users.id, adminId))
      .limit(1);

    if (!adminUser || adminUser.role !== "admin") {
      throw new Error("Unauthorized access. Admin privileges required.");
    }

    // 2. Fetch all site sales and return claims
    const allOrders = await db.select().from(orders).orderBy(desc(orders.createdAt));
    const pendingReturns = await db
      .select()
      .from(returnRequests)
      .where(eq(returnRequests.status, "pending"));

    return {
      allOrders,
      pendingReturns,
    };
  });