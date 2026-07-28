import { getDb } from "../../../db";
import { orderItems, orders } from "../../../db/schema";
import { products } from "../../../lib/catalog";

type OrderLinePayload = {
  code?: string;
  quantity?: number;
};

type OrderPayload = {
  name?: string;
  email?: string;
  whatsapp?: string;
  location?: string;
  projectType?: string;
  notes?: string;
  language?: string;
  lines?: OrderLinePayload[];
  whatsappMessage?: string;
};

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function toRouteErrorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : "Unexpected error";
  const detail = error instanceof Error && error.cause instanceof Error ? error.cause.message : "";
  const combined = `${message}\n${detail}`;

  if (combined.includes("no such table") || combined.includes("orders")) {
    return "The orders table is unavailable. Run `npm run db:generate`, deploy the generated migration, and configure the Cloudflare D1 `DB` binding before accepting checkout orders.";
  }

  return message;
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as OrderPayload;
    const name = clean(payload.name);
    const email = clean(payload.email);
    const whatsapp = clean(payload.whatsapp);
    const location = clean(payload.location);
    const projectType = clean(payload.projectType);
    const notes = clean(payload.notes);
    const language = clean(payload.language) || "en";
    const whatsappMessage = clean(payload.whatsappMessage);

    if (!name || !email || !whatsapp || !location) {
      return Response.json(
        { error: "Name, email, WhatsApp number, and location are required." },
        { status: 400 },
      );
    }

    if (!Array.isArray(payload.lines) || payload.lines.length === 0) {
      return Response.json({ error: "Order must include at least one product." }, { status: 400 });
    }

    const preparedItems = payload.lines.map((line) => {
      const product = products.find((item) => item.code === line.code);
      const quantity = Number(line.quantity);

      if (!product || !Number.isInteger(quantity) || quantity < 1) {
        return null;
      }

      return {
        productCode: product.code,
        productName: product.name,
        quantity,
        unitPrice: product.price,
        lineTotal: product.price * quantity,
      };
    });

    if (preparedItems.some((item) => item === null)) {
      return Response.json({ error: "Order contains an invalid product or quantity." }, { status: 400 });
    }

    const items = preparedItems as NonNullable<(typeof preparedItems)[number]>[];
    const totalPieces = items.reduce((total, item) => total + item.quantity, 0);
    const subtotal = items.reduce((total, item) => total + item.lineTotal, 0);

    const db = getDb();
    const [order] = await db
      .insert(orders)
      .values({
        customerName: name,
        customerEmail: email,
        customerWhatsapp: whatsapp,
        customerLocation: location,
        projectType,
        notes,
        language,
        totalPieces,
        subtotal,
        whatsappMessage,
      })
      .returning();

    await db.insert(orderItems).values(items.map((item) => ({ ...item, orderId: order.id })));

    return Response.json({ orderId: order.id }, { status: 201 });
  } catch (error) {
    return Response.json({ error: toRouteErrorMessage(error) }, { status: 500 });
  }
}
