"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Download, FileText, MessageCircle, Minus, Plus, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { formatPrice, getProductCategory, getProductDescription, getProductGallery, getProductName, getProductSlug, getRelatedProducts, type Product } from "../lib/catalog";
import { CartDrawer, useCart } from "./CartSystem";
import { Header, LuxuryFooter, isRtlLanguage, localize, useStoredLanguage } from "./KiswaniExperience";

export function ProductExperience({ product }: { product: Product }) {
  const [language, setLanguage] = useStoredLanguage();
  const gallery = getProductGallery(product);
  const [selectedImage, setSelectedImage] = useState(gallery[0]);
  const [quantity, setQuantity] = useState(1);
  const selectedImageIndex = gallery.indexOf(selectedImage);
  const { add } = useCart();
  const isRtl = isRtlLanguage(language);
  const isArabic = language === "ar";
  const name = getProductName(product, language);
  const category = getProductCategory(product, language);
  const description = getProductDescription(product, language);
  const related = getRelatedProducts(product);
  const message = encodeURIComponent(`Hello Kiswani Lights, I am interested in ${product.name} (${product.code}). Initial catalog price: ${formatPrice(product.price, "en")}.`);

  return (
    <div lang={language} dir={isRtl ? "rtl" : "ltr"} className="min-h-screen bg-white text-[#0F1822]">
      <Header language={language} setLanguage={setLanguage} rootPrefix="/" />

      <main id="top">
        <section className="bg-[#050709] px-4 pb-5 pt-4 text-white sm:px-8 sm:pb-8 sm:pt-6">
          <div className="mx-auto flex max-w-[1440px] items-center gap-2 overflow-x-auto pb-4 text-xs text-[#73787C] hide-scrollbar">
            <Link href="/" className="transition-colors hover:text-white">{localize(language, "Home", "الرئيسية", "בית")}</Link><span>/</span>
            <a href={`/collections/${product.categorySlug}`} className="transition-colors hover:text-white">{category}</a><span>/</span>
            <span className="whitespace-nowrap text-[#FFDA01]">{name}</span>
          </div>

          <div className="mx-auto grid max-w-[1440px] overflow-hidden border border-white/10 bg-[#0B1015] lg:grid-cols-[1.14fr_0.86fr]">
            <div className="p-3 sm:p-5">
              <div className="relative min-h-[500px] overflow-hidden bg-[#151A1D] sm:min-h-[680px] lg:min-h-[790px]">
                <AnimatePresence mode="wait">
                  <motion.div key={selectedImage} initial={{ opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0">
                    <Image unoptimized src={selectedImage} alt={`${name} - ${localize(language, "product view", "صورة المنتج", "תצוגת מוצר")}`} fill priority sizes="(max-width: 1024px) 100vw, 57vw" className={`object-cover ${selectedImageIndex === 0 ? "object-center" : selectedImageIndex === 1 ? "scale-[1.2] object-[58%_42%]" : "scale-[1.13] object-[28%_55%]"}`} />
                  </motion.div>
                </AnimatePresence>
                <div className="pointer-events-none absolute inset-7 border border-white/15" aria-hidden="true" />
                <span className="absolute start-7 top-7 bg-[#FFDA01] px-4 py-3 text-[10px] font-bold tracking-[0.12em] text-[#0F1822]">{product.code}</span>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-3">
                {gallery.map((image, index) => <button key={image} type="button" onClick={() => setSelectedImage(image)} aria-label={`${localize(language, "View image", "عرض الصورة", "צפייה בתמונה")} ${index + 1}`} aria-pressed={selectedImage === image} className={`relative aspect-[16/10] overflow-hidden border-2 transition-colors ${selectedImage === image ? "border-[#FFDA01]" : "border-transparent hover:border-white/35"}`}><Image unoptimized src={image} alt="" fill sizes="20vw" className={`object-cover ${index === 0 ? "object-center" : index === 1 ? "scale-[1.2] object-[58%_42%]" : "scale-[1.13] object-[28%_55%]"}`} /><span className="absolute inset-0 bg-[#050709]/10" /></button>)}
              </div>
            </div>

            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="flex flex-col justify-between p-8 sm:p-12 lg:p-14 xl:p-16">
              <div>
                <a href={`/collections/${product.categorySlug}`} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#FFDA01]"><ArrowLeft size={15} className={isRtl ? "rotate-180" : ""} />{category}</a>
                <h1 className="mt-8 text-balance text-5xl font-semibold leading-[0.94] tracking-[-0.055em] sm:text-6xl xl:text-7xl">{name}</h1>
                <p className="mt-7 max-w-xl text-base leading-8 text-[#A3A7AA]">{description}</p>
                <div className="mt-8 flex flex-wrap items-end justify-between gap-4 border-y border-white/10 py-6">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#73787C]">{localize(language, "Initial catalog price", "Initial catalog price", "Initial catalog price")}</p>
                    <p className="mt-2 text-4xl font-bold tracking-[-0.04em] text-white">{formatPrice(product.price, language)}</p>
                  </div>
                  <p className="max-w-xs text-xs leading-5 text-[#A3A7AA]">{localize(language, "Calculated in cart by quantity before final approval.", "Calculated in cart by quantity before final approval.", "Calculated in cart by quantity before final approval.")}</p>
                </div>

                <div className="mt-9 grid grid-cols-2 gap-px bg-white/10 border border-white/10">
                  {product.specs.slice(0, 4).map(([label, value]) => <div key={label} className="bg-[#0B1015] p-5"><p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#73787C]">{label}</p><p className="mt-2 text-sm font-semibold text-white">{value}</p></div>)}
                </div>

                <div className="mt-8 flex items-start gap-3 border-s-2 border-[#FFDA01] ps-5"><Check size={17} className="mt-0.5 shrink-0 text-[#FFDA01]" /><p className="text-sm leading-6 text-[#A3A7AA]">{localize(language, "Initial price, availability, and delivery timing are confirmed with the Kiswani team before final approval.", "السعر الأولي والتوفر وموعد التسليم يتم تأكيدها مع فريق كسواني قبل اعتماد الطلب النهائي.", "מחיר ראשוני, זמינות וזמן אספקה יאושרו עם צוות Kiswani לפני אישור סופי.")}</p></div>
              </div>

              <div className="mt-8 border-t border-white/10 pt-6">
                <label htmlFor="product-qty" className="block text-xs font-bold uppercase tracking-[0.18em] text-[#73787C]">
                  {localize(language, "Select Quantity", "الكمية المطلوبة", "בחירת כמות")}
                </label>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
                  <div className="inline-flex items-center border border-white/20 bg-[#151A1D]">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="flex h-12 w-12 items-center justify-center text-white transition-colors hover:bg-white/10"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={16} />
                    </button>
                    <input
                      id="product-qty"
                      type="number"
                      min="1"
                      max="999"
                      value={quantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        if (!isNaN(val) && val > 0) setQuantity(val);
                      }}
                      className="w-16 bg-transparent text-center text-base font-bold text-white outline-none focus:text-[#FFDA01] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="flex h-12 w-12 items-center justify-center text-white transition-colors hover:bg-white/10"
                      aria-label="Increase quantity"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  {quantity > 1 && (
                    <div className="text-end">
                      <span className="block text-[10px] font-bold uppercase tracking-[0.12em] text-[#73787C]">
                        {localize(language, "Total Price", "إجمالي السعر", "סה\"כ מחיר")}
                      </span>
                      <span className="text-lg font-bold text-[#FFDA01]">{formatPrice(product.price * quantity, language)}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 grid gap-3">
                <motion.button type="button" onClick={() => add(product, quantity)} whileTap={{ scale: 0.985 }} className="inline-flex min-h-15 items-center justify-center gap-3 bg-[#FFDA01] px-7 text-sm font-bold text-[#0F1822] transition-colors hover:bg-[#FFD100]"><ShoppingBag size={18} />{localize(language, "Add to project cart", "أضف إلى سلة الطلب", "הוספה לסל הפרויקט")}</motion.button>
                <div className="grid grid-cols-2 gap-3">
                  <a href={`/downloads/${product.code}.pdf`} download className="inline-flex min-h-13 items-center justify-center gap-2 border border-white/15 px-4 text-xs font-bold text-white transition-colors hover:border-[#FFDA01]"><Download size={16} />{localize(language, "Datasheet PDF", "ملف المواصفات", "מפרט PDF")}</a>
                  <a href={`https://wa.me/970599671209?text=${message}`} target="_blank" rel="noreferrer" className="inline-flex min-h-13 items-center justify-center gap-2 border border-white/15 px-4 text-xs font-bold text-white transition-colors hover:border-[#FFDA01]"><MessageCircle size={16} />{localize(language, "Ask about it", "استفسر الآن", "בירור עכשיו")}</a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="bg-[#F4F2ED] px-4 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
            <div>
              <div className="flex items-center gap-4"><span className="h-[3px] w-14 bg-[#FFDA01]" /><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#50555B]">{isArabic ? "بيانات المنتج" : "PRODUCT DATA"}</p></div>
              <h2 className="mt-6 text-4xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-5xl">{isArabic ? "تفاصيل دقيقة لقرار واثق." : "Precise details for a confident decision."}</h2>
              <p className="mt-6 max-w-lg leading-7 text-[#73787C]">{isArabic ? "راجع المواصفات الأساسية وحمّل ورقة البيانات لمشاركتها مع المصمم أو المقاول." : "Review the essential specifications and download the data sheet to share with your designer or contractor."}</p>
              <a href={`/downloads/${product.code}.pdf`} download className="mt-8 inline-flex min-h-13 items-center gap-3 bg-[#0F1822] px-6 text-sm font-bold text-white"><FileText size={17} className="text-[#FFDA01]" />{isArabic ? "تحميل ملف PDF" : "Download specification PDF"}</a>
            </div>

            <div className="border-t border-[#A3A7AA]">
              {product.specs.map(([label, value], index) => <div key={label} className="grid grid-cols-[auto_1fr_auto] items-center gap-5 border-b border-[#CCCFCE] py-6"><span className="text-[10px] font-semibold text-[#A3A7AA]">0{index + 1}</span><span className="text-sm font-medium text-[#50555B]">{label}</span><strong className="text-sm text-[#0F1822]">{value}</strong></div>)}
              <div className="mt-8 grid gap-4 bg-white p-7 sm:grid-cols-3">
                {[isArabic ? "دعم الاختيار" : "Selection support", isArabic ? "تأكيد التوفر" : "Availability check", isArabic ? "مساعدة التركيب" : "Installation guidance"].map((item) => <div key={item} className="flex items-start gap-3"><span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FFDA01]"><Check size={12} /></span><span className="text-xs font-semibold leading-5">{item}</span></div>)}
              </div>
            </div>
          </div>
        </section>

        {related.length > 0 && <section className="bg-white px-4 py-24 sm:px-8 sm:py-32"><div className="mx-auto max-w-[1440px]"><div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#73787C]">{isArabic ? "قد يناسبك أيضاً" : "RELATED LIGHTING"}</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">{isArabic ? "من المجموعة نفسها" : "From the same collection"}</h2></div><a href={`/collections/${product.categorySlug}`} className="inline-flex items-center gap-2 text-sm font-bold">{isArabic ? "عرض المجموعة" : "View collection"}<ArrowRight size={16} className={isArabic ? "rotate-180" : ""} /></a></div><div className="mt-12 grid gap-5 md:grid-cols-3">{related.map((item) => <motion.a key={item.code} href={`/products/${getProductSlug(item)}`} whileHover={{ y: -7 }} className="group block bg-[#F4F2ED]"><div className="relative aspect-[4/3] overflow-hidden"><Image unoptimized src={item.image} alt={isArabic ? item.arabic : item.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.035]" /><span className="absolute end-5 top-5 flex h-11 w-11 items-center justify-center bg-[#FFDA01]"><ArrowUpRight size={16} /></span></div><div className="p-6"><p className="text-[10px] font-semibold tracking-[0.15em] text-[#73787C]">{item.code}</p><h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">{isArabic ? item.arabic : item.name}</h3></div></motion.a>)}</div></div></section>}

        <section id="contact" className="bg-[#FFDA01] px-4 py-20 sm:px-8 sm:py-24"><div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 lg:flex-row lg:items-end"><div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#50555B]">{isArabic ? "دعم المشاريع" : "PROJECT SUPPORT"}</p><h2 className="mt-4 max-w-4xl text-4xl font-semibold leading-[1] tracking-[-0.04em] sm:text-6xl">{isArabic ? "هل تريد هذه القطعة ضمن مخطط إنارة متكامل؟" : "Want this fixture in a complete lighting plan?"}</h2></div><a href={`https://wa.me/970599671209?text=${message}`} target="_blank" rel="noreferrer" className="inline-flex min-h-14 items-center justify-center gap-3 bg-[#0F1822] px-7 text-sm font-bold text-white">{isArabic ? "تحدث مع مستشار" : "Talk to an advisor"}<ArrowUpRight size={17} /></a></div></section>
      </main>

      <LuxuryFooter language={language} rootPrefix="/" />
      <CartDrawer language={language} />
    </div>
  );
}
