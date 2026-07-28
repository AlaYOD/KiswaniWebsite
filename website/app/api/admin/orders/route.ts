import { desc, inArray } from "drizzle-orm";
import { getDb } from "../../../../db";
import { orderItems, orders } from "../../../../db/schema";
import { requireAdmin } from "../auth";

function toRouteErrorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : "Unexpected error";
  const detail = error instanceof Error && error.cause instanceof Error ? error.cause.message : "";
  const combined = `${message}\n${detail}`;

  if (combined.includes("no such table") || combined.includes("orders")) {
    return "The orders table is unavailable. Generate and apply the D1 migration before opening the admin dashboard.";
  }

  return message;
}

export async function GET(request: Request) {
  const authError = requireAdmin(request);
  if (authError) return authError;

  try {
    const db = getDb();
    const rows = await db.select().from(orders).orderBy(desc(orders.createdAt), desc(orders.id)).limit(100);
    const ids = rows.map((order) => order.id);
    const itemRows = ids.length > 0 ? await db.select().from(orderItems).where(inArray(orderItems.orderId, ids)) : [];

    return Response.json({
      orders: rows.map((order) => ({
        ...order,
        items: itemRows.filter((item) => item.orderId === order.id),
      })),
    });
  } catch (error) {
    return Response.json({ error: toRouteErrorMessage(error) }, { status: 500 });
  }
}
