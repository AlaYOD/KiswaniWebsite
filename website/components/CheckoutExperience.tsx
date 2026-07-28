"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Minus, Plus, Send, ShoppingBag, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { formatPrice, products, type Product } from "../lib/catalog";
import { CartDrawer, useCart } from "./CartSystem";
import { Header, LuxuryFooter, isRtlLanguage, useStoredLanguage } from "./KiswaniExperience";

type CheckoutLine = { code: string; quantity: number };

export function CheckoutExperience() {
  const [language, setLanguage] = useStoredLanguage();
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
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

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(result?.error || "Could not save the order. Please try again.");
      }

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
            </form>
          </div>
        </section>
      </main>
      <LuxuryFooter language={language} rootPrefix="/" />
      <CartDrawer language={language} />
    </div>
  );
}
