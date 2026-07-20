"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Minus, Plus, Send, ShoppingBag, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { products, type Product } from "../lib/catalog";
import { CartDrawer, useCart } from "./CartSystem";
import { Header, LuxuryFooter, isRtlLanguage, useStoredLanguage } from "./KiswaniExperience";

export function CheckoutExperience() {
  const [language, setLanguage] = useStoredLanguage();
  const [sent, setSent] = useState(false);
  const { lines, count, remove, update, clear } = useCart();
  const isArabic = language === "ar";
  const isRtl = isRtlLanguage(language);
  const items = useMemo(() => lines.map((line) => ({ line, product: products.find((product) => product.code === line.code) })).filter((item): item is { line: { code: string; quantity: number }; product: Product } => Boolean(item.product)), [lines]);

  const submitOrder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const itemLines = items.map(({ product, line }, index) => `${index + 1}. ${product.name} (${product.code}) × ${line.quantity}`).join("\n");
    const message = [
      "KISWANI LIGHTS — NEW ORDER REQUEST",
      "",
      itemLines,
      "",
      `Customer: ${data.get("name")}`,
      `Phone: ${data.get("phone")}`,
      `Email: ${data.get("email") || "—"}`,
      `City: ${data.get("city")}`,
      `Project type: ${data.get("projectType")}`,
      `Address / details: ${data.get("address") || "—"}`,
      `Notes: ${data.get("notes") || "—"}`,
      "",
      "Please confirm pricing, availability, delivery, and payment options.",
    ].join("\n");
    window.open(`https://wa.me/970599671209?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <div lang={language} dir={isRtl ? "rtl" : "ltr"} className="min-h-screen bg-[#F4F2ED] text-[#0F1822]">
      <Header language={language} setLanguage={setLanguage} rootPrefix="/" />
      <main>
        <section className="border-b border-white/10 bg-[#070B0E] px-4 py-16 text-white sm:px-8 sm:py-24">
          <div className="mx-auto max-w-[1440px]"><Link href="/#products" className="inline-flex items-center gap-2 text-sm font-semibold text-[#A3A7AA] transition-colors hover:text-[#FFDA01]"><ArrowLeft size={17} className={isArabic ? "rotate-180" : ""} />{isArabic ? "متابعة التسوق" : "Continue shopping"}</Link><div className="mt-14 grid items-end gap-10 lg:grid-cols-[1fr_auto]"><div><div className="flex items-center gap-4"><span className="h-[3px] w-14 bg-[#FFDA01]" /><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#FFDA01]">Kiswani checkout</p></div><h1 className="mt-6 text-balance text-5xl font-semibold leading-[0.96] tracking-[-0.06em] sm:text-7xl">{isArabic ? "أكمل طلب الإضاءة." : "Complete your lighting order."}</h1></div><div className="flex h-20 min-w-48 items-center justify-center gap-4 border border-white/15 px-7"><ShoppingBag className="text-[#FFDA01]" /><span className="text-sm text-[#CCCFCE]">{count} {isArabic ? "قطع" : "pieces"}</span></div></div></div>
        </section>

        <section className="px-4 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <div className="flex items-center justify-between"><h2 className="text-3xl font-semibold tracking-[-0.04em]">{isArabic ? "ملخص الطلب" : "Order summary"}</h2>{count > 0 && <button type="button" onClick={clear} className="text-xs font-semibold text-[#73787C] underline underline-offset-4">{isArabic ? "إفراغ" : "Clear"}</button>}</div>
              {items.length === 0 ? <div className="mt-8 border border-dashed border-[#A3A7AA] bg-white p-10 text-center"><ShoppingBag className="mx-auto text-[#73787C]" /><h3 className="mt-5 text-xl font-semibold">{isArabic ? "لا توجد منتجات في السلة" : "Your cart is empty"}</h3><Link href="/#products" className="mt-6 inline-flex min-h-12 items-center justify-center bg-[#FFDA01] px-6 text-sm font-bold">{isArabic ? "استكشف المنتجات" : "Browse products"}</Link></div> : <div className="mt-8 space-y-4">{items.map(({ product, line }) => <motion.article layout key={product.code} className="grid grid-cols-[96px_1fr] gap-5 border-b border-[#CCCFCE] bg-white p-4"><div className="relative h-32 overflow-hidden bg-[#CCCFCE]/20"><Image unoptimized src={product.image} alt="" fill sizes="96px" className="object-cover" /></div><div className="flex min-w-0 flex-col justify-between"><div className="flex items-start justify-between gap-3"><div><p className="text-[10px] font-bold tracking-[0.14em] text-[#73787C]">{product.code}</p><h3 className="mt-1 font-semibold">{isArabic ? product.arabic : product.name}</h3><p className="mt-2 text-xs text-[#73787C]">{isArabic ? "السعر يؤكد عند الطلب" : "Price confirmed with order"}</p></div><button type="button" onClick={() => remove(product.code)} className="p-2 text-[#73787C] hover:text-[#0F1822]" aria-label={`Remove ${product.name}`}><Trash2 size={16} /></button></div><div className="inline-flex w-fit items-center border border-[#A3A7AA]"><button type="button" onClick={() => update(product.code, line.quantity - 1)} className="flex h-9 w-9 items-center justify-center"><Minus size={14} /></button><span className="min-w-8 text-center text-sm font-semibold">{line.quantity}</span><button type="button" onClick={() => update(product.code, line.quantity + 1)} className="flex h-9 w-9 items-center justify-center"><Plus size={14} /></button></div></div></motion.article>)}</div>}
              <div className="mt-7 border-s-4 border-[#FFDA01] bg-[#E9E6DF] p-5 text-sm leading-7 text-[#50555B]">{isArabic ? "سيؤكد مستشار كسواني السعر النهائي، التوفر، مدة التجهيز، التوصيل وطريقة الدفع قبل اعتماد الطلب." : "A Kiswani advisor will confirm final pricing, availability, lead time, delivery, and payment before approving the order."}</div>
            </div>

            <form onSubmit={submitOrder} className="bg-white p-6 shadow-[0_24px_70px_rgba(7,11,14,0.08)] sm:p-10 lg:p-12">
              <div className="h-[3px] w-14 bg-[#FFDA01]" /><h2 className="mt-6 text-3xl font-semibold tracking-[-0.04em]">{isArabic ? "بيانات العميل والتوصيل" : "Customer & delivery details"}</h2><p className="mt-3 text-sm leading-6 text-[#73787C]">{isArabic ? "أدخل معلوماتك وسيفتح واتساب برسالة طلب جاهزة." : "Enter your details and WhatsApp will open with your prepared order."}</p>
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-semibold">{isArabic ? "الاسم الكامل" : "Full name"}<input required name="name" className="h-13 border border-[#CCCFCE] bg-[#F4F2ED]/50 px-4 font-normal outline-none focus:border-[#0F1822]" /></label>
                <label className="grid gap-2 text-sm font-semibold">{isArabic ? "رقم الهاتف" : "Phone number"}<input required name="phone" inputMode="tel" className="h-13 border border-[#CCCFCE] bg-[#F4F2ED]/50 px-4 font-normal outline-none focus:border-[#0F1822]" /></label>
                <label className="grid gap-2 text-sm font-semibold">{isArabic ? "البريد الإلكتروني" : "Email"}<input name="email" type="email" className="h-13 border border-[#CCCFCE] bg-[#F4F2ED]/50 px-4 font-normal outline-none focus:border-[#0F1822]" /></label>
                <label className="grid gap-2 text-sm font-semibold">{isArabic ? "المدينة" : "City"}<input required name="city" className="h-13 border border-[#CCCFCE] bg-[#F4F2ED]/50 px-4 font-normal outline-none focus:border-[#0F1822]" /></label>
                <label className="grid gap-2 text-sm font-semibold sm:col-span-2">{isArabic ? "نوع المشروع" : "Project type"}<select required name="projectType" defaultValue="" className="h-13 border border-[#CCCFCE] bg-[#F4F2ED]/50 px-4 font-normal outline-none focus:border-[#0F1822]"><option value="" disabled>{isArabic ? "اختر نوع المشروع" : "Select project type"}</option><option>Home / Residential</option><option>Office / Commercial</option><option>Hospitality</option><option>Retail</option><option>Other</option></select></label>
                <label className="grid gap-2 text-sm font-semibold sm:col-span-2">{isArabic ? "العنوان أو تفاصيل الموقع" : "Address or site details"}<input name="address" className="h-13 border border-[#CCCFCE] bg-[#F4F2ED]/50 px-4 font-normal outline-none focus:border-[#0F1822]" /></label>
                <label className="grid gap-2 text-sm font-semibold sm:col-span-2">{isArabic ? "ملاحظات" : "Order notes"}<textarea name="notes" rows={4} className="border border-[#CCCFCE] bg-[#F4F2ED]/50 p-4 font-normal outline-none focus:border-[#0F1822]" /></label>
              </div>
              <button disabled={count === 0} type="submit" className="mt-7 inline-flex min-h-15 w-full items-center justify-center gap-3 bg-[#FFDA01] px-7 text-sm font-bold text-[#0F1822] transition-colors hover:bg-[#FFD100] disabled:cursor-not-allowed disabled:bg-[#CCCFCE] disabled:text-[#73787C]"><Send size={17} />{isArabic ? "إرسال الطلب عبر واتساب" : "Send order via WhatsApp"}</button>
              {sent && <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-[#1E2722]"><CheckCircle2 size={17} className="text-[#FFDA01]" />{isArabic ? "تم تجهيز الطلب وفتح واتساب." : "Your order was prepared and WhatsApp opened."}</motion.p>}
            </form>
          </div>
        </section>
      </main>
      <LuxuryFooter language={language} rootPrefix="/" />
      <CartDrawer language={language} />
    </div>
  );
}
