"use client";

import Image from "next/image";
import { CheckCircle2, ClipboardList, LogOut, MessageCircle, RefreshCw, Search, Shield, ShoppingBag } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

type AdminOrderItem = {
  id: number;
  orderId: number;
  productCode: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
};

type AdminOrder = {
  id: number;
  customerName: string;
  customerEmail: string;
  customerWhatsapp: string;
  customerLocation: string;
  projectType: string;
  notes: string;
  language: string;
  totalPieces: number;
  subtotal: number;
  status: OrderStatus;
  adminNote: string;
  whatsappMessage: string;
  createdAt: string;
  updatedAt: string;
  items: AdminOrderItem[];
};

type OrderStatus = "new" | "contacted" | "approved" | "fulfilled" | "cancelled";

const statuses: Array<{ value: OrderStatus; label: string }> = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "approved", label: "Approved" },
  { value: "fulfilled", label: "Fulfilled" },
  { value: "cancelled", label: "Cancelled" },
];

const statusClass: Record<OrderStatus, string> = {
  new: "border-[#FFDA01] bg-[#FFDA01] text-[#0F1822]",
  contacted: "border-[#A3A7AA] bg-white text-[#0F1822]",
  approved: "border-emerald-200 bg-emerald-50 text-emerald-800",
  fulfilled: "border-[#0F1822] bg-[#0F1822] text-white",
  cancelled: "border-red-200 bg-red-50 text-red-700",
};

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-IL", {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function AdminOrdersDashboard() {
  const [password, setPassword] = useState(() =>
    typeof window === "undefined" ? "" : window.sessionStorage.getItem("kiswani-admin-password") ?? "",
  );
  const [savedPassword, setSavedPassword] = useState(() =>
    typeof window === "undefined" ? "" : window.sessionStorage.getItem("kiswani-admin-password") ?? "",
  );
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return orders.filter((order) => {
      const matchesStatus = statusFilter === "all" || order.status === statusFilter;
      const text = [
        order.id,
        order.customerName,
        order.customerEmail,
        order.customerWhatsapp,
        order.customerLocation,
        order.projectType,
        order.status,
        ...order.items.map((item) => `${item.productCode} ${item.productName}`),
      ]
        .join(" ")
        .toLowerCase();

      return matchesStatus && (!needle || text.includes(needle));
    });
  }, [orders, query, statusFilter]);

  const selected = filtered.find((order) => order.id === selectedId) ?? filtered[0] ?? null;

  const stats = useMemo(() => {
    const expectedMoney = orders.reduce((sum, order) => sum + order.subtotal, 0);
    const totalIncome = orders
      .filter((order) => order.status === "fulfilled")
      .reduce((sum, order) => sum + order.subtotal, 0);
    const newOrders = orders.filter((order) => order.status === "new").length;
    return [
      { label: "Orders", value: String(orders.length) },
      { label: "New", value: String(newOrders) },
      { label: "Expected money", value: formatPrice(expectedMoney) },
      { label: "Total income", value: formatPrice(totalIncome) },
    ];
  }, [orders]);

  const loadOrders = useCallback(async (secret = savedPassword) => {
    if (!secret) return;
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/admin/orders", {
        headers: { Authorization: `Bearer ${secret}` },
      });
      const result = (await response.json().catch(() => null)) as { orders?: AdminOrder[]; error?: string } | null;

      if (!response.ok) throw new Error(result?.error || "Could not load orders.");

      setOrders(result?.orders ?? []);
      setSelectedId((current) => current ?? result?.orders?.[0]?.id ?? null);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Could not load orders.");
    } finally {
      setLoading(false);
    }
  }, [savedPassword]);

  function unlock(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = password.trim();
    if (!value) return;
    window.sessionStorage.setItem("kiswani-admin-password", value);
    setSavedPassword(value);
    void loadOrders(value);
  }

  function logout() {
    window.sessionStorage.removeItem("kiswani-admin-password");
    setSavedPassword("");
    setPassword("");
    setOrders([]);
    setSelectedId(null);
    setError("");
    setMessage("");
  }

  async function updateOrder(order: AdminOrder, status: OrderStatus, adminNote: string) {
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(`/api/admin/orders/${order.id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${savedPassword}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status, adminNote }),
      });
      const result = (await response.json().catch(() => null)) as { order?: AdminOrder; error?: string } | null;

      if (!response.ok) throw new Error(result?.error || "Could not update order.");

      setOrders((current) =>
        current.map((item) =>
          item.id === order.id
            ? {
                ...item,
                status: result?.order?.status ?? status,
                adminNote: result?.order?.adminNote ?? adminNote,
                updatedAt: result?.order?.updatedAt ?? new Date().toISOString(),
              }
            : item,
        ),
      );
      setMessage(`Order #${order.id} updated.`);
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : "Could not update order.");
    } finally {
      setSaving(false);
    }
  }

  if (!savedPassword) {
    return (
      <main className="min-h-screen bg-[#070B0E] px-4 py-10 text-white sm:px-8">
        <section className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-[1180px] items-center gap-10 lg:grid-cols-[1fr_420px]">
          <div>
            <div className="relative h-20 w-64">
              <Image unoptimized src="/images/kiswani-logo-original-white.png" alt="Kiswani Lights" fill sizes="256px" className="object-contain object-left" />
            </div>
            <div className="mt-16 flex items-center gap-4">
              <span className="h-[3px] w-14 bg-[#FFDA01]" />
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#FFDA01]">Admin dashboard</p>
            </div>
            <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[0.96] tracking-[-0.06em] sm:text-7xl">
              Manage checkout orders.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-[#A3A7AA]">
              Review customer details, order items, subtotals, and follow-up status from one private console.
            </p>
          </div>

          <form onSubmit={unlock} className="border border-white/10 bg-white p-7 text-[#0F1822] shadow-[0_24px_70px_rgba(0,0,0,0.28)] sm:p-9">
            <Shield className="text-[#FFDA01]" size={34} strokeWidth={1.5} />
            <h2 className="mt-6 text-2xl font-semibold tracking-[-0.03em]">Admin access</h2>
            <p className="mt-2 text-sm leading-6 text-[#73787C]">Enter the password configured as `ADMIN_PASSWORD`.</p>
            <label className="mt-7 grid gap-2 text-sm font-semibold">
              Password
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                autoComplete="current-password"
                className="h-13 border border-[#CCCFCE] bg-[#F4F2ED]/50 px-4 font-normal outline-none focus:border-[#0F1822]"
              />
            </label>
            <button type="submit" className="mt-6 inline-flex min-h-13 w-full items-center justify-center gap-3 bg-[#FFDA01] px-5 text-sm font-bold text-[#0F1822]">
              <Shield size={17} />
              Open dashboard
            </button>
            {error && <p className="mt-4 border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</p>}
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F4F2ED] text-[#0F1822]">
      <header className="border-b border-white/10 bg-[#070B0E] px-4 py-6 text-white sm:px-8">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-5">
            <div className="relative h-14 w-44 shrink-0">
              <Image unoptimized src="/images/kiswani-logo-original-white.png" alt="Kiswani Lights" fill sizes="176px" className="object-contain object-left" />
            </div>
            <div className="hidden h-10 w-px bg-white/10 sm:block" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFDA01]">Admin</p>
              <h1 className="mt-1 text-2xl font-semibold tracking-[-0.04em]">Orders dashboard</h1>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => void loadOrders()}
              disabled={loading}
              className="inline-flex min-h-11 items-center gap-2 border border-white/15 px-4 text-xs font-bold text-white transition-colors hover:border-[#FFDA01] disabled:opacity-50"
            >
              <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
            <button type="button" onClick={logout} className="inline-flex min-h-11 items-center gap-2 border border-white/15 px-4 text-xs font-bold text-white transition-colors hover:border-[#FFDA01]">
              <LogOut size={15} />
              Lock
            </button>
          </div>
        </div>
      </header>

      <section className="px-4 py-8 sm:px-8 sm:py-10">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="border border-[#CCCFCE] bg-white p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#73787C]">{stat.label}</p>
                <p className="mt-3 text-3xl font-semibold tracking-[-0.04em]">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-8 xl:grid-cols-[0.82fr_1.18fr]">
            <section className="min-w-0">
              <div className="grid gap-3 bg-white p-4 sm:grid-cols-[1fr_auto]">
                <label className="relative block">
                  <span className="sr-only">Search orders</span>
                  <Search size={17} className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-[#73787C]" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search name, phone, location, product code"
                    className="h-12 w-full border border-[#CCCFCE] bg-[#F4F2ED]/50 pe-4 ps-11 text-sm outline-none focus:border-[#0F1822]"
                  />
                </label>
                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value as OrderStatus | "all")}
                  className="h-12 border border-[#CCCFCE] bg-[#F4F2ED]/50 px-4 text-sm font-semibold outline-none focus:border-[#0F1822]"
                >
                  <option value="all">All statuses</option>
                  {statuses.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-4 grid gap-3">
                {filtered.map((order) => (
                  <button
                    key={order.id}
                    type="button"
                    onClick={() => setSelectedId(order.id)}
                    className={`grid gap-4 border bg-white p-5 text-start transition-colors hover:border-[#0F1822] ${
                      selected?.id === order.id ? "border-[#0F1822]" : "border-[#CCCFCE]"
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#73787C]">Order #{order.id}</p>
                        <h2 className="mt-1 text-xl font-semibold tracking-[-0.03em]">{order.customerName}</h2>
                      </div>
                      <span className={`border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${statusClass[order.status]}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="grid gap-2 text-sm text-[#50555B]">
                      <span>{order.customerWhatsapp}</span>
                      <span>{order.customerLocation}</span>
                      <span>{formatDate(order.createdAt)}</span>
                    </div>
                    <div className="flex items-center justify-between border-t border-[#CCCFCE] pt-4 text-sm">
                      <span>{order.totalPieces} pieces</span>
                      <strong>{formatPrice(order.subtotal)}</strong>
                    </div>
                  </button>
                ))}

                {!loading && filtered.length === 0 && (
                  <div className="border border-dashed border-[#A3A7AA] bg-white p-10 text-center">
                    <ClipboardList className="mx-auto text-[#73787C]" />
                    <p className="mt-4 font-semibold">No orders match this view.</p>
                  </div>
                )}
              </div>
            </section>

            <section className="min-w-0 bg-white">
              {selected ? (
                <OrderDetail key={selected.id} order={selected} saving={saving} onSave={updateOrder} />
              ) : (
                <div className="grid min-h-[520px] place-items-center border border-dashed border-[#A3A7AA] p-10 text-center">
                  <div>
                    <ShoppingBag className="mx-auto text-[#73787C]" />
                    <p className="mt-4 font-semibold">Select an order to manage it.</p>
                  </div>
                </div>
              )}
            </section>
          </div>

          {(error || message) && (
            <div className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-xl">
              <p className={`border p-4 text-sm font-semibold shadow-[0_18px_60px_rgba(15,24,34,0.18)] ${error ? "border-red-200 bg-red-50 text-red-700" : "border-emerald-200 bg-emerald-50 text-emerald-800"}`}>
                {error || message}
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function OrderDetail({
  order,
  saving,
  onSave,
}: {
  order: AdminOrder;
  saving: boolean;
  onSave: (order: AdminOrder, status: OrderStatus, adminNote: string) => Promise<void>;
}) {
  const [status, setStatus] = useState<OrderStatus>(order.status);
  const [adminNote, setAdminNote] = useState(order.adminNote);

  const whatsappHref = `https://wa.me/${order.customerWhatsapp.replace(/[^\d]/g, "")}`;

  return (
    <div className="border border-[#CCCFCE]">
      <div className="border-b border-[#CCCFCE] p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#73787C]">Order #{order.id}</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">{order.customerName}</h2>
            <p className="mt-2 text-sm text-[#73787C]">{formatDate(order.createdAt)}</p>
          </div>
          <span className={`border px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] ${statusClass[order.status]}`}>
            {order.status}
          </span>
        </div>

        <div className="mt-8 grid gap-px bg-[#CCCFCE] sm:grid-cols-2">
          <InfoBlock label="Email" value={order.customerEmail} />
          <InfoBlock label="WhatsApp" value={order.customerWhatsapp} />
          <InfoBlock label="Location" value={order.customerLocation} />
          <InfoBlock label="Project type" value={order.projectType || "Not provided"} />
        </div>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex min-h-12 items-center gap-2 bg-[#FFDA01] px-5 text-sm font-bold text-[#0F1822]"
        >
          <MessageCircle size={17} />
          Open WhatsApp
        </a>
      </div>

      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_320px]">
        <div>
          <h3 className="text-lg font-semibold tracking-[-0.02em]">Products</h3>
          <div className="mt-4 divide-y divide-[#CCCFCE] border-y border-[#CCCFCE]">
            {order.items.map((item) => (
              <div key={item.id} className="grid gap-3 py-4 sm:grid-cols-[1fr_auto] sm:items-center">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#73787C]">{item.productCode}</p>
                  <p className="mt-1 font-semibold">{item.productName}</p>
                  <p className="mt-1 text-sm text-[#73787C]">
                    {item.quantity} x {formatPrice(item.unitPrice)}
                  </p>
                </div>
                <strong>{formatPrice(item.lineTotal)}</strong>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4">
            <TextPanel title="Customer notes" text={order.notes || "No notes added by the customer."} />
            <TextPanel title="Prepared WhatsApp message" text={order.whatsappMessage || "No message saved."} />
          </div>
        </div>

        <aside>
          <div className="border border-[#CCCFCE] bg-[#F4F2ED]/60 p-5">
            <h3 className="text-lg font-semibold tracking-[-0.02em]">Manage order</h3>
            <div className="mt-5 grid gap-4">
              <label className="grid gap-2 text-sm font-semibold">
                Status
                <select
                  value={status}
                  onChange={(event) => setStatus(event.target.value as OrderStatus)}
                  className="h-12 border border-[#CCCFCE] bg-white px-4 font-normal outline-none focus:border-[#0F1822]"
                >
                  {statuses.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-sm font-semibold">
                Internal note
                <textarea
                  value={adminNote}
                  onChange={(event) => setAdminNote(event.target.value)}
                  rows={6}
                  className="resize-none border border-[#CCCFCE] bg-white p-4 font-normal outline-none focus:border-[#0F1822]"
                  placeholder="Add follow-up details for the team"
                />
              </label>
              <button
                type="button"
                disabled={saving}
                onClick={() => void onSave(order, status, adminNote)}
                className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#0F1822] px-5 text-sm font-bold text-white transition-colors hover:bg-[#1E2722] disabled:cursor-not-allowed disabled:bg-[#A3A7AA]"
              >
                <CheckCircle2 size={17} />
                {saving ? "Saving..." : "Save changes"}
              </button>
            </div>
          </div>

          <div className="mt-4 border border-[#CCCFCE] p-5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#73787C]">Total pieces</span>
              <strong>{order.totalPieces}</strong>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-[#CCCFCE] pt-3 text-sm">
              <span className="text-[#73787C]">Subtotal</span>
              <strong className="text-xl tracking-[-0.03em]">{formatPrice(order.subtotal)}</strong>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white p-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#73787C]">{label}</p>
      <p className="mt-2 break-words text-sm font-semibold">{value}</p>
    </div>
  );
}

function TextPanel({ title, text }: { title: string; text: string }) {
  return (
    <div className="border border-[#CCCFCE] p-5">
      <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-[#73787C]">{title}</h3>
      <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-7 text-[#50555B]">{text}</p>
    </div>
  );
}
