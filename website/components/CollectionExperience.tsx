"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import { useMemo, useState } from "react";
import Link from "next/link";
import { categories, getCategoryDetail, getCategoryName, type Category, type Product } from "../lib/catalog";
import {
  BrandButton,
  Header,
  LuxuryFooter,
  Media,
  ProductCard,
  ProductModal,
  isRtlLanguage,
  localize,
  useStoredLanguage,
} from "./KiswaniExperience";
import { CartDrawer } from "./CartSystem";

export function CollectionExperience({ category, collectionProducts }: { category: Category; collectionProducts: Product[] }) {
  const [language, setLanguage] = useStoredLanguage();
  const [selected, setSelected] = useState<Product | null>(null);
  const [query, setQuery] = useState("");
  const isRtl = isRtlLanguage(language);
  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return collectionProducts;
    return collectionProducts.filter((product) =>
      [product.name, product.arabic, product.code, product.description, product.descriptionAr]
        .join(" ")
        .toLowerCase()
        .includes(value),
    );
  }, [collectionProducts, query]);

  return (
    <div lang={language} dir={isRtl ? "rtl" : "ltr"} className="min-h-screen bg-white text-[#0F1822]">
      <Header language={language} setLanguage={setLanguage} rootPrefix="/" />

      <main>
        <section id="top" className="bg-[#070B0E] px-4 py-4 text-white sm:px-8 sm:py-8">
          <div className="mx-auto grid h-auto max-w-[1440px] overflow-hidden border border-white/10 bg-[#0F151B] lg:h-[720px] lg:grid-cols-[0.88fr_1.12fr]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex min-h-[580px] flex-col justify-between p-8 sm:p-14 lg:h-full lg:min-h-0 lg:p-20"
            >
              <Link href="/#collections" className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#CCCFCE] transition-colors hover:text-[#FFDA01]">
                <ArrowLeft size={17} className={isRtl ? "rotate-180" : ""} />
                {localize(language, "Back to collections", "العودة إلى المجموعات", "חזרה לקולקציות")}
              </Link>

              <div>
                <div className="mb-6 flex items-center gap-4">
                  <span className="h-px w-16 bg-[#FFDA01]" />
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#FFDA01]">
                    {localize(language, "KISWANI COLLECTION", "مجموعة كسواني", "קולקציית KISWANI")}
                  </p>
                </div>
                <h1 className="max-w-3xl text-balance text-5xl font-semibold leading-[0.94] tracking-[-0.06em] sm:text-7xl lg:text-[82px]">
                  {getCategoryName(category, language)}
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-8 text-[#CCCFCE]">
                  {getCategoryDetail(category, language)}
                </p>
                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <BrandButton href="#collection-products">
                    {localize(language, "Browse products", "استعرض المنتجات", "צפייה במוצרים")}
                  </BrandButton>
                  <span className="text-sm text-[#A3A7AA]">
                    {collectionProducts.length} {localize(language, "products", "منتجات", "מוצרים")}
                  </span>
                </div>
              </div>
            </motion.div>

            <div className="relative h-[520px] overflow-hidden sm:h-[620px] lg:h-full lg:min-h-0">
              <Media
                src={category.image}
                alt={getCategoryName(category, language)}
                sizes="(max-width: 1024px) 100vw, 55vw"
                priority
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070B0E]/55 via-transparent to-transparent" aria-hidden="true" />
              <div className="absolute inset-7 border border-white/15 sm:inset-10" aria-hidden="true" />
              <div className="absolute bottom-0 end-0 h-20 w-20 bg-[#FFDA01] sm:h-28 sm:w-28" aria-hidden="true" />
            </div>
          </div>
        </section>

        <nav aria-label="Lighting collections" className="border-b border-white/10 bg-[#070B0E] px-4 sm:px-8">
          <div className="mx-auto flex max-w-[1440px] gap-2 overflow-x-auto py-4">
            {categories.map((item) => (
              <a
                key={item.slug}
                href={`/collections/${item.slug}`}
                aria-current={item.slug === category.slug ? "page" : undefined}
                className={`whitespace-nowrap px-5 py-3 text-sm font-semibold transition-colors ${
                  item.slug === category.slug
                    ? "bg-[#FFDA01] text-[#0F1822]"
                    : "border border-white/15 text-white/60 hover:border-white/50 hover:text-white"
                }`}
              >
                {getCategoryName(item, language)}
              </a>
            ))}
          </div>
        </nav>

        <section id="collection-products" className="bg-white px-4 py-28 sm:px-8 sm:py-40">
          <div className="mx-auto max-w-[1440px]">
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div className="max-w-3xl">
                <div className="mb-5 flex items-center gap-4">
                  <span className="h-px w-14 bg-[#FFDA01]" />
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#50555B]">
                    {localize(language, "ALL PRODUCTS", "جميع المنتجات", "כל המוצרים")}
                  </p>
                </div>
                <h2 className="text-balance text-4xl font-semibold leading-[1.04] tracking-[-0.04em] sm:text-5xl">
                  {localize(language, `Explore ${category.name.toLowerCase()}`, `استكشف ${category.arabic}`, `לגלות את ${getCategoryName(category, language)}`)}
                </h2>
              </div>

              <label className="relative block w-full max-w-md">
                <span className="sr-only">{localize(language, "Search this collection", "ابحث في هذه المجموعة", "חיפוש בקולקציה זו")}</span>
                <Search size={18} className="pointer-events-none absolute start-5 top-1/2 -translate-y-1/2 text-[#73787C]" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={localize(language, "Search by name or code", "ابحث بالاسم أو الرمز", "חיפוש לפי שם או קוד")}
                  className="h-14 w-full border-0 border-b border-[#A3A7AA] bg-transparent pe-5 ps-12 text-sm outline-none placeholder:text-[#73787C] focus:border-[#0F1822] focus:ring-0"
                />
              </label>
            </div>

            <motion.div layout className="mt-16 grid gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              <AnimatePresence mode="popLayout">
                {filtered.map((product) => (
                  <ProductCard key={product.code} product={product} language={language} open={setSelected} />
                ))}
              </AnimatePresence>
            </motion.div>

            {filtered.length === 0 && (
              <div className="mt-12 border border-dashed border-[#A3A7AA] bg-[#CCCFCE]/15 px-6 py-16 text-center">
                <Search className="mx-auto text-[#73787C]" />
                <p className="mt-4 font-medium text-[#50555B]">
                  {localize(language, "No products match your search.", "لا توجد منتجات تطابق البحث.", "לא נמצאו מוצרים התואמים לחיפוש.")}
                </p>
                <button type="button" onClick={() => setQuery("")} className="mt-4 font-bold underline decoration-[#FFDA01] decoration-2 underline-offset-4">
                  {localize(language, "Clear search", "مسح البحث", "ניקוי החיפוש")}
                </button>
              </div>
            )}
          </div>
        </section>

        <section id="contact" className="relative bg-[#FFDA01] px-4 py-24 before:absolute before:inset-x-0 before:top-0 before:h-2 before:bg-[#070B0E] sm:px-8 sm:py-32">
          <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#50555B]">
                {localize(language, "PROJECT SUPPORT", "دعم المشاريع", "תמיכה בפרויקטים")}
              </p>
              <h2 className="mt-5 max-w-4xl text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-6xl">
                {localize(language, "Need help choosing the right light?", "هل تحتاج مساعدة في اختيار الإنارة المناسبة؟", "צריכים עזרה בבחירת התאורה המתאימה?")}
              </h2>
            </div>
            <Link href="/#contact" className="inline-flex min-h-14 items-center justify-center gap-3 bg-[#0F1822] px-8 text-sm font-bold text-white transition-transform hover:-translate-y-1">
              {localize(language, "Talk to Kiswani", "تواصل مع كسواني", "שיחה עם Kiswani")}
              <ArrowRight size={17} className={isRtl ? "rotate-180" : ""} />
            </Link>
          </div>
        </section>
      </main>

      <LuxuryFooter language={language} rootPrefix="/" />

      <AnimatePresence>
        {selected && <ProductModal product={selected} language={language} close={() => setSelected(null)} />}
      </AnimatePresence>
      <CartDrawer language={language} />
    </div>
  );
}
