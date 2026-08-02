"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Minus, Plus, Printer, ReceiptText, Send, ShoppingBag, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { formatPrice, products, type Product } from "../lib/catalog";
import { CartDrawer, useCart } from "./CartSystem";
import { Header, LuxuryFooter, isRtlLanguage, useStoredLanguage } from "./KiswaniExperience";

type CheckoutLine = { code: string; quantity: number };

type InvoiceLine = {
  code: string;
  name: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
};

type InvoiceSnapshot = {
  orderId: number | null;
  createdAt: string;
  customer: {
    name: string;
    phone: string;
    email: string;
    location: string;
    projectType: string;
    address: string;
    notes: string;
  };
  items: InvoiceLine[];
  totalPieces: number;
  subtotal: number;
};

export function CheckoutExperience() {
  const [language, setLanguage] = useStoredLanguage();
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [invoice, setInvoice] = useState<InvoiceSnapshot | null>(null);
  const { lines, count, remove, update, clear } = useCart();
  const isArabic = language === "ar";
  const isRtl = isRtlLanguage(language);

  const items = useMemo(
    () =>
      lines
        .map((line) => ({ line, product: products.find((product) => product.code === line.code) }))
        .filter((item): item is { line: CheckoutLine; product: Product } => Boolean(item.product)),
    [lines],
  );
  const subtotal = items.reduce((total, { line, product }) => total + product.price * line.quantity, 0);

  const submitOrder = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSent(false);

    const data = new FormData(event.currentTarget);
    const itemLines = items
      .map(({ product, line }, index) => {
        const prodName = isArabic ? (product.arabic || product.name) : product.name;
        const unitPrice = formatPrice(product.price, language);
        const lineTotal = formatPrice(product.price * line.quantity, language);
        return isArabic
          ? `${index + 1}️⃣ *${prodName}*\n   • 🏷️ الرمز: ${product.code}\n   • 📦 الكمية: ${line.quantity}\n   • 💵 سعر القطعة: ${unitPrice}\n   • 💰 الإجمالي: ${lineTotal}`
          : `${index + 1}. *${prodName}* (${product.code})\n   Qty: ${line.quantity} | Unit: ${unitPrice} | Total: ${lineTotal}`;
      })
      .join("\n\n");

    const message = isArabic
      ? [
          "💡 *طلب طلبية جديدة — مفروشات وإضاءة الكسواني*",
          "----------------------------------",
          "👤 *بيانات الزبون:*",
          `• *الاسم:* ${data.get("name")}`,
          `• *رقم الواتساب:* ${data.get("phone")}`,
          data.get("email") ? `• *البريد الإلكتروني:* ${data.get("email")}` : null,
          `• *الموقع:* ${data.get("city")}`,
          `• *نوع المشروع:* ${data.get("projectType")}`,
          data.get("address") ? `• *العنوان:* ${data.get("address")}` : null,
          data.get("notes") ? `• *ملاحظات الطلب:* ${data.get("notes")}` : null,
          "----------------------------------",
          "📦 *تفاصيل المنتجات:*",
          "",
          itemLines,
          "----------------------------------",
          "💰 *ملخص الطلب:*",
          `• *إجمالي عدد القطع:* ${count} قطعة`,
          `• *المجموع الكلي النهائي:* ${formatPrice(subtotal, language)}`,
          "----------------------------------",
          "يرجى تأكيد التوفر، مدة التوريد، والتفاصيل النهائية.",
        ]
          .filter(Boolean)
          .join("\n")
      : [
          "💡 *KISWANI LIGHTS - NEW ORDER REQUEST*",
          "----------------------------------",
          "👤 *CUSTOMER DETAILS:*",
          `• *Name:* ${data.get("name")}`,
          `• *WhatsApp:* ${data.get("phone")}`,
          data.get("email") ? `• *Email:* ${data.get("email")}` : null,
          `• *Location:* ${data.get("city")}`,
          `• *Project Type:* ${data.get("projectType")}`,
          data.get("address") ? `• *Address:* ${data.get("address")}` : null,
          data.get("notes") ? `• *Notes:* ${data.get("notes")}` : null,
          "----------------------------------",
          "📦 *ORDER ITEMS:*",
          "",
          itemLines,
          "----------------------------------",
          "💰 *ORDER SUMMARY:*",
          `• *Total Pieces:* ${count}`,
          `• *Grand Subtotal:* ${formatPrice(subtotal, language)}`,
          "----------------------------------",
          "Please confirm availability, delivery lead time, and final approval.",
        ]
          .filter(Boolean)
          .join("\n");

    setSubmitting(true);

    try {
      const location = [data.get("city"), data.get("address")]
        .map((value) => (typeof value === "string" ? value.trim() : ""))
        .filter(Boolean)
        .join(" - ");
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          whatsapp: data.get("phone"),
          location,
          projectType: data.get("projectType"),
          notes: data.get("notes"),
          language,
          lines,
          whatsappMessage: message,
        }),
      });

      const result = (await response.json().catch(() => null)) as { orderId?: number; error?: string } | null;

      if (!response.ok) {
        throw new Error(result?.error || "Could not save the order. Please try again.");
      }

      setInvoice({
        orderId: typeof result?.orderId === "number" ? result.orderId : null,
        createdAt: new Date().toISOString(),
        customer: {
          name: String(data.get("name") ?? ""),
          phone: String(data.get("phone") ?? ""),
          email: String(data.get("email") ?? ""),
          location: String(data.get("city") ?? ""),
          projectType: String(data.get("projectType") ?? ""),
          address: String(data.get("address") ?? ""),
          notes: String(data.get("notes") ?? ""),
        },
        items: items.map(({ product, line }) => ({
          code: product.code,
          name: isArabic ? product.arabic || product.name : product.name,
          quantity: line.quantity,
          unitPrice: product.price,
          lineTotal: product.price * line.quantity,
        })),
        totalPieces: count,
        subtotal,
      });
      window.open(`https://wa.me/970599671209?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
      setSent(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Could not save the order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div lang={language} dir={isRtl ? "rtl" : "ltr"} className="min-h-screen bg-[#F4F2ED] text-[#0F1822]">
      <Header language={language} setLanguage={setLanguage} rootPrefix="/" />
      <main>
        <section className="border-b border-white/10 bg-[#070B0E] px-4 py-16 text-white sm:px-8 sm:py-24">
          <div className="mx-auto max-w-[1440px]">
            <Link
              href="/#products"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#A3A7AA] transition-colors hover:text-[#FFDA01]"
            >
              <ArrowLeft size={17} className={isArabic ? "rotate-180" : ""} />
              {isArabic ? "متابعة التسوق" : "Continue shopping"}
            </Link>
            <div className="mt-14 grid items-end gap-10 lg:grid-cols-[1fr_auto]">
              <div>
                <div className="flex items-center gap-4">
                  <span className="h-[3px] w-14 bg-[#FFDA01]" />
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#FFDA01]">
                    {isArabic ? "إتمام الطلب — مفروشات وإضاءة الكسواني" : "Kiswani checkout"}
                  </p>
                </div>
                <h1 className="mt-6 text-balance text-5xl font-semibold leading-[0.96] tracking-[-0.06em] sm:text-7xl">
                  {isArabic ? "استكمال طلب الإضاءة الخاص بك" : "Complete your lighting order."}
                </h1>
              </div>
              <div className="flex h-20 min-w-48 items-center justify-center gap-4 border border-white/15 px-7">
                <ShoppingBag className="text-[#FFDA01]" />
                <span className="text-sm text-[#CCCFCE]">{count} {isArabic ? "قطعة" : "pieces"}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-semibold tracking-[-0.04em]">
                  {isArabic ? "ملخص الطلب" : "Order summary"}
                </h2>
                {count > 0 && (
                  <button
                    type="button"
                    onClick={clear}
                    className="text-xs font-semibold text-[#73787C] underline underline-offset-4"
                  >
                    {isArabic ? "تفريغ السلة" : "Clear"}
                  </button>
                )}
              </div>

              {items.length === 0 ? (
                <div className="mt-8 border border-dashed border-[#A3A7AA] bg-white p-10 text-center">
                  <ShoppingBag className="mx-auto text-[#73787C]" />
                  <h3 className="mt-5 text-xl font-semibold">{isArabic ? "سلة التسوق فارغة" : "Your cart is empty"}</h3>
                  <Link href="/#products" className="mt-6 inline-flex min-h-12 items-center justify-center bg-[#FFDA01] px-6 text-sm font-bold">
                    {isArabic ? "تصفح المنتجات" : "Browse products"}
                  </Link>
                </div>
              ) : (
                <div className="mt-8 space-y-4">
                  {items.map(({ product, line }) => {
                    const lineTotal = product.price * line.quantity;

                    return (
                      <motion.article
                        layout
                        key={product.code}
                        className="grid grid-cols-[96px_1fr] gap-5 border-b border-[#CCCFCE] bg-white p-4"
                      >
                        <div className="relative h-32 overflow-hidden bg-[#CCCFCE]/20">
                          <Image unoptimized src={product.image} alt="" fill sizes="96px" className="object-cover" />
                        </div>
                        <div className="flex min-w-0 flex-col justify-between gap-4">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-[10px] font-bold tracking-[0.14em] text-[#73787C]">{product.code}</p>
                              <h3 className="mt-1 font-semibold">{isArabic ? product.arabic : product.name}</h3>
                              <div className="mt-3 grid gap-1 text-xs text-[#73787C]">
                                <span>{isArabic ? "سعر القطعة: " : "Unit: "}{formatPrice(product.price, language)}</span>
                                <strong className="text-sm text-[#0F1822]">{isArabic ? "إجمالي الصنف: " : "Line total: "}{formatPrice(lineTotal, language)}</strong>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => remove(product.code)}
                              className="p-2 text-[#73787C] hover:text-[#0F1822]"
                              aria-label={`Remove ${product.name}`}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <div className="inline-flex w-fit items-center border border-[#A3A7AA]">
                            <button
                              type="button"
                              onClick={() => update(product.code, line.quantity - 1)}
                              className="flex h-9 w-9 items-center justify-center"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="min-w-8 text-center text-sm font-semibold">{line.quantity}</span>
                            <button
                              type="button"
                              onClick={() => update(product.code, line.quantity + 1)}
                              className="flex h-9 w-9 items-center justify-center"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      </motion.article>
                    );
                  })}
                </div>
              )}

              {count > 0 && (
                <div className="mt-7 bg-white p-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#73787C]">{isArabic ? "المجموع المبدئي" : "Initial subtotal"}</span>
                    <strong className="text-2xl tracking-[-0.03em]">{formatPrice(subtotal, language)}</strong>
                  </div>
                  <p className="mt-3 border-s-4 border-[#FFDA01] bg-[#E9E6DF] p-5 text-sm leading-7 text-[#50555B]">
                    {isArabic
                      ? "الأسعار مبدئية ومحسوبة من الكتالوج. سيقوم مستشار الكسواني بتأكيد التوفر، مدة التوريد، التوصيل، والاعتماد النهائي قبل تجهيز الطلب."
                      : "Initial prices are calculated from the catalog. A Kiswani advisor will confirm availability, lead time, delivery, and final approval before processing the order."}
                  </p>
                </div>
              )}
            </div>

            <form onSubmit={submitOrder} className="bg-white p-6 shadow-[0_24px_70px_rgba(7,11,14,0.08)] sm:p-10 lg:p-12">
              <div className="h-[3px] w-14 bg-[#FFDA01]" />
              <h2 className="mt-6 text-3xl font-semibold tracking-[-0.04em]">
                {isArabic ? "بيانات الزبون والتوصيل" : "Customer & delivery details"}
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#73787C]">
                {isArabic
                  ? "أدخل بياناتك وسيتم فتح تطبيق الواتساب مجهزاً بتفاصيل الطلب الكاملة والمجموع ليرسل لصاحب العمل مباشرة."
                  : "Enter your details and WhatsApp will open with your prepared order and calculated subtotal."}
              </p>

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-semibold">
                  {isArabic ? "الاسم الكامل" : "Full name"}
                  <input required name="name" className="h-13 border border-[#CCCFCE] bg-[#F4F2ED]/50 px-4 font-normal outline-none focus:border-[#0F1822]" />
                </label>
                <label className="grid gap-2 text-sm font-semibold">
                  {isArabic ? "رقم الواتساب" : "WhatsApp number"}
                  <input required name="phone" inputMode="tel" className="h-13 border border-[#CCCFCE] bg-[#F4F2ED]/50 px-4 font-normal outline-none focus:border-[#0F1822]" />
                </label>
                <label className="grid gap-2 text-sm font-semibold">
                  {isArabic ? "البريد الإلكتروني" : "Email"}
                  <input required name="email" type="email" className="h-13 border border-[#CCCFCE] bg-[#F4F2ED]/50 px-4 font-normal outline-none focus:border-[#0F1822]" />
                </label>
                <label className="grid gap-2 text-sm font-semibold">
                  {isArabic ? "المدينة / المنطقة" : "Location"}
                  <input required name="city" className="h-13 border border-[#CCCFCE] bg-[#F4F2ED]/50 px-4 font-normal outline-none focus:border-[#0F1822]" />
                </label>
                <label className="grid gap-2 text-sm font-semibold sm:col-span-2">
                  {isArabic ? "نوع المشروع" : "Project type"}
                  <select required name="projectType" defaultValue="" className="h-13 border border-[#CCCFCE] bg-[#F4F2ED]/50 px-4 font-normal outline-none focus:border-[#0F1822]">
                    <option value="" disabled>{isArabic ? "اختر نوع المشروع" : "Select project type"}</option>
                    <option value={isArabic ? "منازل / سكني" : "Home / Residential"}>{isArabic ? "منازل / سكني" : "Home / Residential"}</option>
                    <option value={isArabic ? "مكاتب / تجاري" : "Office / Commercial"}>{isArabic ? "مكاتب / تجاري" : "Office / Commercial"}</option>
                    <option value={isArabic ? "فنادق ومطاعم" : "Hospitality"}>{isArabic ? "فنادق ومطاعم" : "Hospitality"}</option>
                    <option value={isArabic ? "محلات تجارية" : "Retail"}>{isArabic ? "محلات تجارية" : "Retail"}</option>
                    <option value={isArabic ? "أخرى" : "Other"}>{isArabic ? "أخرى" : "Other"}</option>
                  </select>
                </label>
                <label className="grid gap-2 text-sm font-semibold sm:col-span-2">
                  {isArabic ? "العنوان تفصيلياً" : "Address or site details"}
                  <input name="address" className="h-13 border border-[#CCCFCE] bg-[#F4F2ED]/50 px-4 font-normal outline-none focus:border-[#0F1822]" />
                </label>
                <label className="grid gap-2 text-sm font-semibold sm:col-span-2">
                  {isArabic ? "ملاحظات الطلب" : "Order notes"}
                  <textarea name="notes" rows={4} className="border border-[#CCCFCE] bg-[#F4F2ED]/50 p-4 font-normal outline-none focus:border-[#0F1822]" />
                </label>
              </div>

              <button
                disabled={count === 0 || submitting}
                type="submit"
                className="mt-7 inline-flex min-h-15 w-full items-center justify-center gap-3 bg-[#FFDA01] px-7 text-sm font-bold text-[#0F1822] transition-colors hover:bg-[#FFD100] disabled:cursor-not-allowed disabled:bg-[#CCCFCE] disabled:text-[#73787C]"
              >
                <Send size={17} />
                {submitting ? (isArabic ? "جاري حفظ الطلب..." : "Saving order...") : isArabic ? "إرسال الطلب عبر الواتساب" : "Send order via WhatsApp"}
              </button>
              {error && (
                <p className="mt-4 border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
                  {error}
                </p>
              )}
              {sent && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-[#1E2722]"
                >
                  <CheckCircle2 size={17} className="text-[#FFDA01]" />
                  {isArabic ? "تم تجهيز طلبك وفتح تطبيق الواتساب بنجاح!" : "Your order was prepared and WhatsApp opened."}
                </motion.p>
              )}
              {invoice && <ClientInvoice invoice={invoice} language={language} isArabic={isArabic} />}
            </form>
          </div>
        </section>
      </main>
      <LuxuryFooter language={language} rootPrefix="/" />
      <CartDrawer language={language} />
    </div>
  );
}
function ClientInvoice({
  invoice,
  language,
  isArabic,
}: {
  invoice: InvoiceSnapshot;
  language: "en" | "ar" | "he";
  isArabic: boolean;
}) {
  const invoiceNumber = invoice.orderId ? `KL-${String(invoice.orderId).padStart(5, "0")}` : "KL-PENDING";
  const issuedAt = new Intl.DateTimeFormat(language === "ar" ? "ar-PS" : "en-IL", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(invoice.createdAt));
  const labels = isArabic
    ? {
        title: "\u0641\u0627\u062a\u0648\u0631\u0629 \u0627\u0644\u0637\u0644\u0628",
        subtitle: "\u0646\u0633\u062e\u0629 \u0644\u0644\u0632\u0628\u0648\u0646 \u062a\u0648\u0636\u062d \u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a \u0648\u0627\u0644\u0623\u0633\u0639\u0627\u0631 \u0627\u0644\u0645\u0628\u062f\u0626\u064a\u0629.",
        print: "\u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u0641\u0627\u062a\u0648\u0631\u0629",
        invoiceNo: "\u0631\u0642\u0645 \u0627\u0644\u0641\u0627\u062a\u0648\u0631\u0629",
        date: "\u0627\u0644\u062a\u0627\u0631\u064a\u062e",
        status: "\u0627\u0644\u062d\u0627\u0644\u0629",
        statusValue: "\u0628\u0627\u0646\u062a\u0638\u0627\u0631 \u062a\u0623\u0643\u064a\u062f \u0627\u0644\u062a\u0648\u0641\u0631",
        customer: "\u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u0632\u0628\u0648\u0646",
        order: "\u062a\u0641\u0627\u0635\u064a\u0644 \u0627\u0644\u0637\u0644\u0628",
        product: "\u0627\u0644\u0645\u0646\u062a\u062c",
        qty: "\u0627\u0644\u0643\u0645\u064a\u0629",
        unit: "\u0633\u0639\u0631 \u0627\u0644\u0642\u0637\u0639\u0629",
        total: "\u0627\u0644\u0625\u062c\u0645\u0627\u0644\u064a",
        pieces: "\u0625\u062c\u0645\u0627\u0644\u064a \u0627\u0644\u0642\u0637\u0639",
        subtotal: "\u0627\u0644\u0645\u062c\u0645\u0648\u0639 \u0627\u0644\u0645\u0628\u062f\u0626\u064a",
        note: "\u0627\u0644\u0623\u0633\u0639\u0627\u0631 \u0645\u0628\u062f\u0626\u064a\u0629. \u0633\u064a\u062a\u0645 \u062a\u0623\u0643\u064a\u062f \u0627\u0644\u062a\u0648\u0641\u0631 \u0648\u0645\u062f\u0629 \u0627\u0644\u062a\u0648\u0631\u064a\u062f \u0648\u0627\u0644\u062a\u0643\u0644\u0641\u0629 \u0627\u0644\u0646\u0647\u0627\u0626\u064a\u0629 \u0642\u0628\u0644 \u062a\u062c\u0647\u064a\u0632 \u0627\u0644\u0637\u0644\u0628.",
      }
    : {
        title: "Client invoice",
        subtitle: "A client copy with the requested products, quantities, and initial order total.",
        print: "Print invoice",
        invoiceNo: "Invoice no.",
        date: "Date",
        status: "Status",
        statusValue: "Pending availability confirmation",
        customer: "Customer information",
        order: "Order details",
        product: "Product",
        qty: "Qty",
        unit: "Unit",
        total: "Total",
        pieces: "Total pieces",
        subtotal: "Initial subtotal",
        note: "Prices are initial. Kiswani will confirm availability, lead time, delivery, and final approval before processing the order.",
      };

  const customerRows = [
    [isArabic ? "\u0627\u0644\u0627\u0633\u0645" : "Name", invoice.customer.name],
    ["WhatsApp", invoice.customer.phone],
    [isArabic ? "\u0627\u0644\u0628\u0631\u064a\u062f" : "Email", invoice.customer.email],
    [isArabic ? "\u0627\u0644\u0645\u0648\u0642\u0639" : "Location", invoice.customer.location],
    [isArabic ? "\u0627\u0644\u0645\u0634\u0631\u0648\u0639" : "Project", invoice.customer.projectType],
    [isArabic ? "\u0627\u0644\u0639\u0646\u0648\u0627\u0646" : "Address", invoice.customer.address],
    [isArabic ? "\u0645\u0644\u0627\u062d\u0638\u0627\u062a" : "Notes", invoice.customer.notes],
  ].filter(([, value]) => value);

  return (
    <section className="invoice-print-area mt-8 overflow-hidden border border-[#D7D2C8] bg-[#F8F6F1]">
      <div className="bg-[#0F1822] px-5 py-5 text-white sm:px-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center border border-[#FFDA01]/55 bg-[#FFDA01] text-[#0F1822]">
                <ReceiptText size={18} />
              </span>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFDA01]">Kiswani Lights</p>
            </div>
            <h3 className="mt-5 text-3xl font-semibold tracking-[-0.04em]">{labels.title}</h3>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/70">{labels.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex min-h-11 items-center justify-center gap-2 border border-white/20 px-4 text-xs font-bold text-white transition-colors hover:border-[#FFDA01] hover:text-[#FFDA01]"
          >
            <Printer size={16} />
            {labels.print}
          </button>
        </div>
      </div>

      <div className="grid gap-px bg-[#D7D2C8] sm:grid-cols-3">
        {[
          [labels.invoiceNo, invoiceNumber],
          [labels.date, issuedAt],
          [labels.status, labels.statusValue],
        ].map(([label, value]) => (
          <div key={label} className="bg-white p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#73787C]">{label}</p>
            <p className="mt-2 text-sm font-semibold text-[#0F1822]">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[0.72fr_1.28fr]">
        <div>
          <h4 className="border-b border-[#D7D2C8] pb-3 text-sm font-bold uppercase tracking-[0.14em] text-[#0F1822]">
            {labels.customer}
          </h4>
          <dl className="mt-4 grid gap-3">
            {customerRows.map(([label, value]) => (
              <div key={label} className="grid gap-1">
                <dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#73787C]">{label}</dt>
                <dd className="break-words text-sm font-semibold text-[#0F1822]">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="min-w-0">
          <h4 className="border-b border-[#D7D2C8] pb-3 text-sm font-bold uppercase tracking-[0.14em] text-[#0F1822]">
            {labels.order}
          </h4>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-[#D7D2C8] text-start text-[10px] font-bold uppercase tracking-[0.12em] text-[#73787C]">
                  <th className="py-3 text-start">{labels.product}</th>
                  <th className="py-3 text-center">{labels.qty}</th>
                  <th className="py-3 text-end">{labels.unit}</th>
                  <th className="py-3 text-end">{labels.total}</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item) => (
                  <tr key={item.code} className="border-b border-[#ECE8E1]">
                    <td className="py-4 pe-4">
                      <p className="font-semibold text-[#0F1822]">{item.name}</p>
                      <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#73787C]">{item.code}</p>
                    </td>
                    <td className="py-4 text-center font-semibold">{item.quantity}</td>
                    <td className="py-4 text-end">{formatPrice(item.unitPrice, language)}</td>
                    <td className="py-4 text-end font-bold">{formatPrice(item.lineTotal, language)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="ms-auto mt-5 max-w-sm border border-[#D7D2C8] bg-white">
            <div className="flex items-center justify-between border-b border-[#ECE8E1] px-4 py-3 text-sm">
              <span className="text-[#73787C]">{labels.pieces}</span>
              <strong>{invoice.totalPieces}</strong>
            </div>
            <div className="flex items-center justify-between px-4 py-4">
              <span className="text-sm font-semibold text-[#0F1822]">{labels.subtotal}</span>
              <strong className="text-2xl tracking-[-0.03em]">{formatPrice(invoice.subtotal, language)}</strong>
            </div>
          </div>
        </div>
      </div>

      <p className="border-t border-[#D7D2C8] bg-white px-5 py-4 text-xs leading-6 text-[#50555B] sm:px-7">
        {labels.note}
      </p>
    </section>
  );
}
