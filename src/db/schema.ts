import { pgTable, text, timestamp, integer, doublePrecision } from "drizzle-orm/pg-core";

// 1. Users Table (Handles Admins, Wholesalers, and Retail Customers)
export const users = pgTable("users", {
  id: text("id").primaryKey(), // We can use Clerk ID, Auth0, or a custom UUID
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  phone: text("phone"),
  role: text("role").default("customer").notNull(), // "customer" or "admin"
  customerType: text("customer_type").default("consumer").notNull(), // "consumer", "retailer", "wholesaler"
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 2. Orders Table
export const orders = pgTable("orders", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
  totalAmount: doublePrecision("total_amount").notNull(),
  status: text("status").default("pending").notNull(), // "pending", "processing", "shipped", "delivered"
  trackingNumber: text("tracking_number"),
  shippingAddress: text("shipping_address").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  customerIssue: text("customer_issue"),
});

// 3. Order Items Table (Handles both Pack Purchases and Single Items)
export const orderItems = pgTable("order_items", {
  id: text("id").primaryKey(),
  orderId: text("order_id").references(() => orders.id, { onDelete: "cascade" }),
  productId: text("product_id").notNull(), // Contentful Product ID
  name: text("name").notNull(),
  quantity: integer("quantity").notNull(),
  purchaseType: text("purchase_type").notNull(), // "single" or "pack"
  pricePaid: doublePrecision("price_paid").notNull(), // The price paid per unit/pack at time of order
});

// 4. Return Requests Table (With Auto-Validation Rules)
export const returnRequests = pgTable("return_requests", {
  id: text("id").primaryKey(),
  orderId: text("order_id").references(() => orders.id, { onDelete: "cascade" }),
  reason: text("reason").notNull(),
  status: text("status").default("pending").notNull(), // "pending", "approved", "declined"
  adminNotes: text("admin_notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});