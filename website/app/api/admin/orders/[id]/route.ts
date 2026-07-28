import { eq } from "drizzle-orm";
import { getDb } from "../../../../../db";
import { orders } from "../../../../../db/schema";
import { requireAdmin } from "../../auth";

const allowedStatuses = new Set(["new", "contacted", "approved", "fulfilled", "cancelled"]);

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  const { id } = await params;
  const orderId = Number(id);
  if (!Number.isInteger(orderId) || orderId < 1) {
    return Response.json({ error: "Invalid order id." }, { status: 400 });
  }

  try {
    const payload = (await request.json()) as { status?: string; adminNote?: string };
    const status = clean(payload.status);
    const adminNote = clean(payload.adminNote);

    if (!allowedStatuses.has(status)) {
      return Response.json({ error: "Invalid order status." }, { status: 400 });
    }

    const db = await getDb();
    const [order] = await db
      .update(orders)
      .set({
        status,
        adminNote,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(orders.id, orderId))
      .returning();

    if (!order) {
      return Response.json({ error: "Order not found." }, { status: 404 });
    }

    return Response.json({ order });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return Response.json({ error: message }, { status: 500 });
  }
}
