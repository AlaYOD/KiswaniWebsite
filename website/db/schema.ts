import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const orders = sqliteTable("orders", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerWhatsapp: text("customer_whatsapp").notNull(),
  customerLocation: text("customer_location").notNull(),
  projectType: text("project_type").notNull().default(""),
  notes: text("notes").notNull().default(""),
  language: text("language").notNull().default("en"),
  totalPieces: integer("total_pieces").notNull(),
  subtotal: integer("subtotal").notNull(),
  status: text("status").notNull().default("new"),
  adminNote: text("admin_note").notNull().default(""),
  whatsappMessage: text("whatsapp_message").notNull().default(""),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const orderItems = sqliteTable("order_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  orderId: integer("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  productCode: text("product_code").notNull(),
  productName: text("product_name").notNull(),
  quantity: integer("quantity").notNull(),
  unitPrice: integer("unit_price").notNull(),
  lineTotal: integer("line_total").notNull(),
});
