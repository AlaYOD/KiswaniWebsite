"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronRight, Search } from "lucide-react";
import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { categories, getCategoryDetail, getCategoryName, type Category, type Product } from "../lib/catalog";
import { productMapGroups, type LocalizedText, type ProductMapGroup, type ProductMapItem, type ProductMapSection } from "../lib/product-map";
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

type CollectionExperienceProps = {
  category?: Category;
  productMapGroup?: ProductMapGroup;
  collectionProducts: Product[];
  initialCategory?: string;
  initialSubcategory?: string;
};

function localizedText(language: "en" | "ar" | "he", value: LocalizedText) {
  return language === "ar" ? value.ar : language === "he" ? value.he : value.en;
}

function groupHref(group: ProductMapGroup, section?: ProductMapSection, item?: ProductMapItem) {
  const params = new URLSearchParams();
  if (section) params.set("category", section.label.en);
  if (item) params.set("subcategory", item.label.en);
  const query = params.toString();
  return `/collections/${group.id}${query ? `?${query}` : ""}`;
}

function productMatches(product: Product, needle: string) {
  const value = needle.trim().toLowerCase();
  if (!value) return true;
  return [product.name, product.arabic, product.category, product.categoryAr, product.code, product.description, product.descriptionAr]
    .join(" ")
    .toLowerCase()
    .includes(value);
}

export function CollectionExperience({ category, productMapGroup, collectionProducts, initialCategory, initialSubcategory }: CollectionExperienceProps) {
  const [language, setLanguage] = useStoredLanguage();
  const [selected, setSelected] = useState<Product | null>(null);
  const [query, setQuery] = useState("");
  const isRtl = isRtlLanguage(language);
  const activeSection = productMapGroup
    ? productMapGroup.sections.find((section) => section.label.en === initialCategory) ?? productMapGroup.sections[0]
    : undefined;
  const activeItem = activeSection?.items.find((item) => item.label.en === initialSubcategory);

  const collectionName = productMapGroup ? localizedText(language, productMapGroup.label) : category ? getCategoryName(category, language) : "";
  const collectionDetail = productMapGroup ? localizedText(language, productMapGroup.description) : category ? getCategoryDetail(category, language) : "";
  const collectionImage = productMapGroup?.image ?? category?.image ?? "/images/editorial/hero-interior.webp";
  const collectionKicker = productMapGroup ? localize(language, "PRODUCT COLLECTION", "PRODUCT COLLECTION", "PRODUCT COLLECTION") : localize(language, "KISWANI COLLECTION", "KISWANI COLLECTION", "KISWANI COLLECTION");

  const scopedProducts = useMemo(() => {
    let base = collectionProducts;
    if (productMapGroup && activeItem) {
      const matched = collectionProducts.filter((product) => productMatches(product, activeItem.search) || productMatches(product, activeItem.label.en));
      if (matched.length) base = matched;
    } else if (productMapGroup && activeSection) {
      const sectionNeedles = activeSection.items.flatMap((item) => [item.search, item.label.en]);
      const matched = collectionProducts.filter((product) => sectionNeedles.some((needle) => productMatches(product, needle)));
      if (matched.length) base = matched;
    }

    const value = query.trim().toLowerCase();
    if (!value) return base;
    return base.filter((product) =>
      [product.name, product.arabic, product.code, product.description, product.descriptionAr, product.category, product.categoryAr]
        .join(" ")
        .toLowerCase()
        .includes(value),
    );
  }, [collectionProducts, productMapGroup, activeSection, activeItem, query]);

  return (
    <div lang={language} dir={isRtl ? "rtl" : "ltr"} className="min-h-screen bg-white text-[#0F1822]">
      <Header language={language} setLanguage={setLanguage} rootPrefix="/" />

      <main>
        <section id="top" className="bg-[#070B0E] px-4 py-4 text-white sm:px-8 sm:py-8">
          <div className="mx-auto grid h-auto max-w-[1440px] overflow-hidden border border-white/10 bg-[#0F151B] lg:h-[720px] lg:grid-cols-[0.88fr_1.12fr]">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="flex min-h-[580px] flex-col justify-between p-8 sm:p-14 lg:h-full lg:min-h-0 lg:p-20">
              <Link href="/#collections" className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#CCCFCE] transition-colors hover:text-[#FFDA01]">
                <ArrowLeft size={17} className={isRtl ? "rotate-180" : ""} />
                {localize(language, "Back to collections", "Back to collections", "Back to collections")}
              </Link>

              <div>
                <div className="mb-6 flex items-center gap-4">
                  <span className="h-px w-16 bg-[#FFDA01]" />
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#FFDA01]">{collectionKicker}</p>
                </div>
                <h1 className="max-w-3xl text-balance text-5xl font-semibold leading-[0.94] tracking-[-0.06em] sm:text-7xl lg:text-[82px]">{collectionName}</h1>
                <p className="mt-6 max-w-xl text-lg leading-8 text-[#CCCFCE]">{collectionDetail}</p>
                {productMapGroup && activeSection && (
                  <div className="mt-7 inline-flex flex-wrap items-center gap-2 border-y border-white/10 py-3 text-xs font-semibold text-[#CCCFCE]">
                    <span>{localizedText(language, activeSection.label)}</span>
                    {activeItem && (
                      <>
                        <ChevronRight size={14} className="rtl:rotate-180" />
                        <span className="text-[#FFDA01]">{localizedText(language, activeItem.label)}</span>
                      </>
                    )}
                  </div>
                )}
                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <BrandButton href="#collection-products">{localize(language, "Browse products", "Browse products", "Browse products")}</BrandButton>
                  <span className="text-sm text-[#A3A7AA]">{scopedProducts.length} {localize(language, "products", "products", "products")}</span>
                </div>
              </div>
            </motion.div>

            <div className="relative h-[520px] overflow-hidden sm:h-[620px] lg:h-full lg:min-h-0">
              <Media src={collectionImage} alt={collectionName} sizes="(max-width: 1024px) 100vw, 55vw" priority className="object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070B0E]/55 via-transparent to-transparent" aria-hidden="true" />
              <div className="absolute inset-7 border border-white/15 sm:inset-10" aria-hidden="true" />
              <div className="absolute bottom-0 end-0 h-20 w-20 bg-[#FFDA01] sm:h-28 sm:w-28" aria-hidden="true" />
            </div>
          </div>
        </section>

        <nav aria-label="Collections" className="border-b border-white/10 bg-[#070B0E] px-4 sm:px-8">
          <div className="hide-scrollbar mx-auto flex max-w-[1440px] gap-2 overflow-x-auto py-4">
            {(productMapGroup ? productMapGroups : categories).map((item) => {
              const isProductMap = "sections" in item;
              const href = isProductMap ? groupHref(item) : `/collections/${item.slug}`;
              const active = isProductMap ? item.id === productMapGroup?.id : item.slug === category?.slug;
              const label = isProductMap ? localizedText(language, item.label) : getCategoryName(item, language);
              return (
                <Link key={href} href={href} aria-current={active ? "page" : undefined} className={`whitespace-nowrap px-5 py-3 text-sm font-semibold transition-colors ${active ? "bg-[#FFDA01] text-[#0F1822]" : "border border-white/15 text-white/60 hover:border-white/50 hover:text-white"}`}>
                  {label}
                </Link>
              );
            })}
          </div>
        </nav>

        {productMapGroup && activeSection && (
          <section className="bg-[#F4F2ED] px-4 py-10 sm:px-8 sm:py-14">
            <div className="mx-auto max-w-[1440px]">
              <div className="mb-6 flex items-end justify-between gap-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8A7400]">{localize(language, "Category tabs", "Category tabs", "Category tabs")}</p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">{collectionName}</h2>
                </div>
              </div>

              <div className="hide-scrollbar flex gap-3 overflow-x-auto pb-3">
                {productMapGroup.sections.map((section) => {
                  const active = section.label.en === activeSection.label.en;
                  return (
                    <Link key={section.label.en} href={groupHref(productMapGroup, section)} className={`group/section relative h-44 min-w-[260px] overflow-hidden border transition-all sm:min-w-[310px] ${active ? "border-[#FFDA01] shadow-[0_18px_45px_rgba(15,24,34,0.18)]" : "border-white hover:border-[#FFDA01]"}`}>
                      <Image unoptimized src={section.image} alt={localizedText(language, section.label)} fill sizes="320px" className="object-cover transition-transform duration-700 group-hover/section:scale-[1.04]" />
                      <span className="absolute inset-0 bg-[linear-gradient(0deg,rgba(7,11,14,0.82)_0%,rgba(7,11,14,0.08)_72%)]" />
                      <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white">
                        <span className="text-lg font-semibold leading-tight">{localizedText(language, section.label)}</span>
                        <span className={`h-9 w-9 shrink-0 ${active ? "bg-[#FFDA01] text-[#0F1822]" : "bg-white/10 text-[#FFDA01]"} flex items-center justify-center`}><ArrowRight size={15} className={isRtl ? "rotate-180" : ""} /></span>
                      </span>
                    </Link>
                  );
                })}
              </div>

              <div className="mt-7 border-y border-[#D8D4CC] py-5">
                <div className="hide-scrollbar flex gap-2 overflow-x-auto pb-1">
                  <Link href={groupHref(productMapGroup, activeSection)} className={`whitespace-nowrap px-4 py-3 text-sm font-bold transition-colors ${!activeItem ? "bg-[#0F1822] text-white" : "bg-white text-[#50555B] hover:text-[#0F1822]"}`}>{localize(language, "All", "All", "All")}</Link>
                  {activeSection.items.map((item) => {
                    const active = item.label.en === activeItem?.label.en;
                    return (
                      <Link key={item.label.en} href={groupHref(productMapGroup, activeSection, item)} className={`group/item flex min-w-[210px] items-center gap-3 border bg-white p-2 transition-all ${active ? "border-[#0F1822] shadow-[0_12px_30px_rgba(15,24,34,0.12)]" : "border-transparent hover:border-[#FFDA01]"}`}>
                        <span className="relative h-14 w-16 shrink-0 overflow-hidden bg-[#070B0E]"><Image unoptimized src={item.image} alt="" fill sizes="64px" className="object-cover" /></span>
                        <span className="min-w-0 text-sm font-semibold leading-tight text-[#0F1822]">{localizedText(language, item.label)}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        )}

        <section id="collection-products" className="bg-white px-4 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-[1440px]">
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div className="max-w-3xl">
                <div className="mb-5 flex items-center gap-4"><span className="h-px w-14 bg-[#FFDA01]" /><p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#50555B]">{localize(language, "PRODUCTS", "PRODUCTS", "PRODUCTS")}</p></div>
                <h2 className="text-balance text-4xl font-semibold leading-[1.04] tracking-[-0.04em] sm:text-5xl">
                  {activeItem ? localizedText(language, activeItem.label) : activeSection ? localizedText(language, activeSection.label) : collectionName}
                </h2>
              </div>

              <label className="relative block w-full max-w-md">
                <span className="sr-only">{localize(language, "Search this collection", "Search this collection", "Search this collection")}</span>
                <Search size={18} className="pointer-events-none absolute start-5 top-1/2 -translate-y-1/2 text-[#73787C]" />
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={localize(language, "Search by name or code", "Search by name or code", "Search by name or code")} className="h-14 w-full border-0 border-b border-[#A3A7AA] bg-transparent pe-5 ps-12 text-sm outline-none placeholder:text-[#73787C] focus:border-[#0F1822] focus:ring-0" />
              </label>
            </div>

            <motion.div layout className="mt-16 grid auto-rows-fr gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              <AnimatePresence mode="popLayout">{scopedProducts.map((product) => <ProductCard key={product.code} product={product} language={language} open={setSelected} />)}</AnimatePresence>
            </motion.div>

            {scopedProducts.length === 0 && (
              <div className="mt-12 border border-dashed border-[#A3A7AA] bg-[#CCCFCE]/15 px-6 py-16 text-center">
                <Search className="mx-auto text-[#73787C]" />
                <p className="mt-4 font-medium text-[#50555B]">{localize(language, "No products match your search.", "No products match your search.", "No products match your search.")}</p>
                <button type="button" onClick={() => setQuery("")} className="mt-4 font-bold underline decoration-[#FFDA01] decoration-2 underline-offset-4">{localize(language, "Clear search", "Clear search", "Clear search")}</button>
              </div>
            )}
          </div>
        </section>

        <section id="contact" className="relative bg-[#FFDA01] px-4 py-24 before:absolute before:inset-x-0 before:top-0 before:h-2 before:bg-[#070B0E] sm:px-8 sm:py-32">
          <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#50555B]">{localize(language, "PROJECT SUPPORT", "PROJECT SUPPORT", "PROJECT SUPPORT")}</p><h2 className="mt-5 max-w-4xl text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-6xl">{localize(language, "Need help choosing the right light?", "Need help choosing the right light?", "Need help choosing the right light?")}</h2></div>
            <Link href="/#contact" className="inline-flex min-h-14 items-center justify-center gap-3 bg-[#0F1822] px-8 text-sm font-bold text-white transition-transform hover:-translate-y-1">{localize(language, "Talk to Kiswani", "Talk to Kiswani", "Talk to Kiswani")}<ArrowRight size={17} className={isRtl ? "rotate-180" : ""} /></Link>
          </div>
        </section>
      </main>

      <LuxuryFooter language={language} rootPrefix="/" />
      <AnimatePresence>{selected && <ProductModal product={selected} language={language} close={() => setSelected(null)} />}</AnimatePresence>
      <CartDrawer language={language} />
    </div>
  );
}
