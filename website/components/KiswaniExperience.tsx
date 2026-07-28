"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useInView, useMotionTemplate, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  Gauge,
  LampDesk,
  LampFloor,
  Lightbulb,
  Mail,
  MapPin,
  Menu,
  Minus,
  Phone,
  Plus,
  Search,
  ShoppingBag,
  SunMedium,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { categories, formatPrice, getCategoryDetail, getCategoryName, getProductCategory, getProductDescription, getProductName, getProductSlug, products, type Category, type Product } from "../lib/catalog";
import { CinematicIntro } from "./CinematicIntro";
import { CartDrawer, CartTrigger, useCart } from "./CartSystem";
import { ContactProjectDrawer } from "./ContactProjectForm";
import { FeaturedProjectExperience, LightingPortfolioStrip } from "./LuxuryEnhancements";

export type Language = "en" | "ar" | "he";

export function isRtlLanguage(language: Language) {
  return language !== "en";
}

export function localize(language: Language, english: string, arabic: string, hebrew: string) {
  return language === "ar" ? arabic : language === "he" ? hebrew : english;
}

export function useStoredLanguage(): [Language, (value: Language) => void] {
  const [language, setLanguageState] = useState<Language>("en");
  useEffect(() => {
    const timer = window.setTimeout(() => {
      const saved = window.localStorage.getItem("kiswani-language");
      if (saved === "en" || saved === "ar" || saved === "he") setLanguageState(saved);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isRtlLanguage(language) ? "rtl" : "ltr";
  }, [language]);
  const setLanguage = (value: Language) => {
    setLanguageState(value);
    window.localStorage.setItem("kiswani-language", value);
  };
  return [language, setLanguage];
}

const heroScenes = [categories[1], categories[0], categories[2], categories[3]];
const heroReveal = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };

const copy = {
  en: {
    nav: ["Collections", "Lighting types", "Projects", "Contact"],
    heroKicker: "KISWANI LIGHTS / 2026",
    heroLead: "Lighting isn’t just",
    heroAccent: "a decorative piece.",
    heroBody: "Lighting is the soul of the space. We select decorative and technical solutions that make every room feel intentional.",
    explore: "Explore lighting",
    project: "Start a project",
    statOne: "High-CRI light",
    statTwo: "Project support",
    statThree: "Decorative + technical",
    statement: "Lighting is the soul of the space.",
    statementBody: "The right fixture does more than illuminate. It gives materials depth, creates a focal point, and changes how the whole space feels.",
    categoryKicker: "LIGHTING COLLECTIONS",
    categoryTitle: "Find the light that belongs in your space.",
    systemsKicker: "A DISTINCTIVE VISUAL LANGUAGE",
    systemsTitle: "Every line has a purpose.",
    systemsBody: "From the product silhouette to the way light lands, Kiswani combines decorative presence with technical precision.",
    productsKicker: "FEATURED LIGHTING",
    productsTitle: "Selected pieces, clearly specified.",
    search: "Search by name, category, or code",
    noResults: "No lighting products match your search.",
    clear: "Clear search",
    projectKicker: "DESIGNING A SPACE?",
    projectTitle: "From the first mood to the final fixture.",
    projectBody: "Share your plan or inspiration. We will help you build a lighting direction that feels complete.",
    projectCta: "Talk to a lighting advisor",
    contactTitle: "Let’s light your next space.",
    contactBody: "Decorative lighting, technical systems, and practical project support in one place.",
    contactCta: "Contact Kiswani",
    view: "View details",
    request: "Request specification",
    close: "Continue browsing",
  },
  ar: {
    nav: ["المجموعات", "أنواع الإنارة", "المشاريع", "تواصل معنا"],
    heroKicker: "كسواني للإنارة / 2026",
    heroLead: "الإضاءة مش بس",
    heroAccent: "قطعة ديكور.",
    heroBody: "الإضاءة هي روح المكان. نختار حلولاً ديكورية وتقنية تجعل كل مساحة مدروسة ومميزة.",
    explore: "استكشف الإنارة",
    project: "ابدأ مشروعك",
    statOne: "دقة ألوان عالية",
    statTwo: "دعم للمشاريع",
    statThree: "حلول ديكورية وتقنية",
    statement: "الإضاءة هي روح المكان.",
    statementBody: "قطعة الإنارة المناسبة لا تضيء المكان فقط؛ بل تظهر الخامات، تصنع نقطة التركيز، وتغيّر إحساس المساحة بالكامل.",
    categoryKicker: "مجموعات الإنارة",
    categoryTitle: "اكتشف الضوء الذي ينتمي إلى مساحتك.",
    systemsKicker: "لغة بصرية مميزة",
    systemsTitle: "كل خط له هدف.",
    systemsBody: "من شكل القطعة إلى طريقة انتشار الضوء، تجمع كسواني بين الحضور الديكوري والدقة التقنية.",
    productsKicker: "إنارة مختارة",
    productsTitle: "قطع مميزة بمواصفات واضحة.",
    search: "ابحث بالاسم أو الفئة أو رقم المنتج",
    noResults: "لا توجد منتجات مطابقة لبحثك.",
    clear: "مسح البحث",
    projectKicker: "بتصمم مساحة جديدة؟",
    projectTitle: "من الفكرة الأولى إلى قطعة الإنارة الأخيرة.",
    projectBody: "شاركنا المخطط أو الإلهام، وسنساعدك في بناء اتجاه إنارة متكامل للمكان.",
    projectCta: "تحدث مع مستشار إنارة",
    contactTitle: "لنضيء مساحتك القادمة.",
    contactBody: "إنارة ديكورية، أنظمة تقنية، ودعم عملي للمشاريع في مكان واحد.",
    contactCta: "تواصل مع كسواني",
    view: "عرض التفاصيل",
    request: "اطلب المواصفات",
    close: "متابعة التصفح",
  },
  he: {
    nav: ["קולקציות", "סוגי תאורה", "פרויקטים", "צור קשר"],
    heroKicker: "KISWANI LIGHTS / 2026",
    heroLead: "תאורה היא לא רק",
    heroAccent: "פריט דקורטיבי.",
    heroBody: "התאורה היא הנשמה של החלל. אנו בוחרים פתרונות דקורטיביים וטכניים שהופכים כל חלל למדויק ומיוחד.",
    explore: "לגלות תאורה",
    project: "התחלת פרויקט",
    statOne: "דיוק צבע גבוה",
    statTwo: "תמיכה בפרויקטים",
    statThree: "דקורטיבי וטכני",
    statement: "התאורה היא הנשמה של החלל.",
    statementBody: "גוף התאורה הנכון לא רק מאיר; הוא מעניק עומק לחומרים, יוצר מוקד ומשנה את התחושה של החלל כולו.",
    categoryKicker: "קולקציות תאורה",
    categoryTitle: "לגלות את האור ששייך לחלל שלך.",
    systemsKicker: "שפה חזותית ייחודית",
    systemsTitle: "לכל קו יש מטרה.",
    systemsBody: "מצורת הגוף ועד פיזור האור, Kiswani משלבת נוכחות דקורטיבית עם דיוק טכני.",
    productsKicker: "תאורה נבחרת",
    productsTitle: "פריטים נבחרים עם מפרט ברור.",
    search: "חיפוש לפי שם, קטגוריה או קוד",
    noResults: "לא נמצאו מוצרי תאורה התואמים לחיפוש.",
    clear: "ניקוי החיפוש",
    projectKicker: "מתכננים חלל?",
    projectTitle: "מהאווירה הראשונה ועד גוף התאורה האחרון.",
    projectBody: "שתפו אותנו בתוכנית או בהשראה ונעזור לבנות כיוון תאורה שלם.",
    projectCta: "שיחה עם יועץ תאורה",
    contactTitle: "בואו נאיר את החלל הבא שלכם.",
    contactBody: "תאורה דקורטיבית, מערכות טכניות ותמיכה מעשית בפרויקטים במקום אחד.",
    contactCta: "יצירת קשר עם Kiswani",
    view: "צפייה בפרטים",
    request: "בקשת מפרט",
    close: "המשך גלישה",
  },
};

export function Media({ src, alt, sizes, priority = false, className = "" }: { src: string; alt: string; sizes: string; priority?: boolean; className?: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      <AnimatePresence>{!loaded && <motion.div exit={{ opacity: 0 }} className="absolute inset-0 z-10 overflow-hidden bg-[#CCCFCE]" aria-hidden="true"><span className="image-skeleton absolute inset-0" /></motion.div>}</AnimatePresence>
      <Image unoptimized src={src} alt={alt} fill sizes={sizes} priority={priority} onLoad={() => setLoaded(true)} className={`object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"} ${className}`} />
    </>
  );
}

export function BrandButton({ children, href, outline = false, dark = false }: { children: React.ReactNode; href: string; outline?: boolean; dark?: boolean }) {
  const reducedMotion = useReducedMotion();
  const magneticX = useMotionValue(0);
  const magneticY = useMotionValue(0);
  const x = useSpring(magneticX, { stiffness: 360, damping: 24, mass: 0.35 });
  const y = useSpring(magneticY, { stiffness: 360, damping: 24, mass: 0.35 });
  const className = outline
    ? dark
      ? "inline-flex min-h-12 items-center justify-center gap-2 border border-white/40 px-6 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white hover:text-[#0F1822] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFDA01]"
      : "inline-flex min-h-12 items-center justify-center gap-2 border border-[#0F1822] px-6 text-sm font-semibold text-[#0F1822] transition-colors hover:bg-[#0F1822] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFDA01]"
    : "inline-flex min-h-12 items-center justify-center gap-2 bg-[#FFDA01] px-6 text-sm font-semibold text-[#0F1822] transition-colors hover:bg-[#FFD100] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0F1822]";
  return (
    <motion.a href={href} onPointerMove={(event) => { if (event.pointerType !== "mouse" || reducedMotion) return; const bounds = event.currentTarget.getBoundingClientRect(); magneticX.set((event.clientX - bounds.left - bounds.width / 2) * 0.12); magneticY.set((event.clientY - bounds.top - bounds.height / 2) * 0.12); }} onPointerLeave={() => { magneticX.set(0); magneticY.set(0); }} style={{ x, y }} whileHover={{ scale: reducedMotion ? 1 : 1.015 }} whileTap={{ scale: 0.98 }} className={`${className} group relative overflow-hidden`}>
      <span aria-hidden="true" className="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/25 transition-transform duration-700 ease-out group-hover:translate-x-[470%]" />
      <span className="relative z-10">{children}</span><ArrowUpRight size={16} aria-hidden="true" className="relative z-10 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </motion.a>
  );
}

function AnimatedMetric({ value, label, index }: { value: string; label: string; index: number }) {
  const target = Number.parseInt(value, 10);
  const suffix = value.replace(String(target), "");
  const metricRef = useRef<HTMLDivElement>(null);
  const visible = useInView(metricRef, { once: true, amount: 0.55 });
  const reducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!visible) return;
    let frame = 0;
    if (reducedMotion) {
      frame = window.requestAnimationFrame(() => setDisplay(target));
      return () => window.cancelAnimationFrame(frame);
    }
    const duration = 900 + index * 130;
    const start = performance.now();
    const tick = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(target * eased));
      if (progress < 1) frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [index, reducedMotion, target, visible]);

  return (
    <motion.div ref={metricRef} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: reducedMotion ? 0 : 0.55, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }} className="flex items-center gap-6 bg-[#070B0E] px-6 py-7 sm:px-8" aria-label={`${value} ${label}`}>
      <span aria-hidden="true" className="min-w-[3.5rem] text-3xl font-light tracking-[-0.04em] text-[#FFDA01]">{display}{suffix}</span><span className="text-xs font-medium uppercase tracking-[0.12em] text-[#A3A7AA]">{label}</span>
    </motion.div>
  );
}

function SectionIntro({ kicker, title, dark = false }: { kicker: string; title: string; dark?: boolean }) {
  return (
    <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.45 }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }} className="max-w-4xl">
      <div className="mb-5 flex items-center gap-4"><span className="h-[3px] w-14 bg-[#FFDA01]" /><p className={`brand-kicker text-xs font-bold uppercase tracking-[0.2em] ${dark ? "text-[#FFDA01]" : "text-[#50555B]"}`}>{kicker}</p></div>
      <h2 className={`text-balance text-4xl font-semibold leading-[1.04] tracking-[-0.04em] sm:text-5xl lg:text-6xl ${dark ? "text-white" : "text-[#0F1822]"}`}>{title}</h2>
    </motion.div>
  );
}

export function Header({
  language,
  setLanguage,
  rootPrefix = "",
  onSearch,
}: {
  language: Language;
  setLanguage: (value: Language) => void;
  rootPrefix?: string;
  onSearch?: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [headerSearch, setHeaderSearch] = useState("");
  const [activeMenu, setActiveMenu] = useState<"all" | Category["slug"] | null>(null);
  const reducedMotion = useReducedMotion();
  const pathname = usePathname();
  const categoryLinks: Array<{ label: string; href: string; category?: Category; allCollections?: boolean }> = [
    { label: localize(language, "Shop all", "جميع المنتجات", "כל המוצרים"), href: `${rootPrefix}#products`, allCollections: true },
    { label: localize(language, "Decorative", "إنارة ديكورية", "תאורה דקורטיבית"), href: "/collections/decorative", category: categories[0] },
    { label: localize(language, "Interior", "إنارة داخلية", "תאורת פנים"), href: "/collections/interior", category: categories[1] },
    { label: localize(language, "Technical", "إنارة تقنية", "תאורה טכנית"), href: "/collections/technical", category: categories[2] },
    { label: localize(language, "Accent", "إنارة مميزة", "תאורת אווירה"), href: "/collections/accent", category: categories[3] },
    { label: localize(language, "Projects", "المشاريع", "פרויקטים"), href: "/projects" },
  ];
  const activeCategory = activeMenu && activeMenu !== "all" ? categories.find((category) => category.slug === activeMenu) ?? null : null;
  const activeProducts = activeCategory ? products.filter((product) => product.categorySlug === activeCategory.slug).slice(0, 4) : [];
  const productSlug = pathname.startsWith("/products/") ? pathname.split("/")[2] : "";
  const productCategory = productSlug ? products.find((product) => getProductSlug(product) === productSlug)?.categorySlug : undefined;
  const activeCollectionSlug = pathname.startsWith("/collections/") ? pathname.split("/")[2] : productCategory;
  const isCurrentNavItem = (href: string, category?: Category) => {
    if (category) return activeCollectionSlug === category.slug;
    if (href === "/projects") return pathname === "/projects";
    return href.endsWith("#products") && pathname === "/";
  };

  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = headerSearch.trim();
    if (!value) return;

    setOpen(false);
    if (onSearch) {
      onSearch(value);
      window.setTimeout(() => {
        document.getElementById("products")?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
      }, 0);
      return;
    }

    window.location.assign(`/?search=${encodeURIComponent(value)}#products`);
  };

  const searchForm = (mobile = false) => (
    <form onSubmit={submitSearch} role="search" className={`flex h-11 min-w-0 border border-white/25 bg-[#111315] transition-colors focus-within:border-[#FFDA01] ${mobile ? "w-full" : "w-full max-w-[520px]"}`}>
      <label className="relative min-w-0 flex-1">
        <span className="sr-only">{localize(language, "Search products", "ابحث عن المنتجات", "חיפוש מוצרים")}</span>
        <Search size={18} className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-white/75" aria-hidden="true" />
        <input
          value={headerSearch}
          onChange={(event) => setHeaderSearch(event.target.value)}
          placeholder={localize(language, "Search products", "ابحث عن المنتجات", "חיפוש מוצרים")}
          className="h-full w-full border-0 bg-transparent pe-3 ps-12 text-sm text-white outline-none placeholder:text-white/45"
        />
      </label>
      <button type="submit" className="shrink-0 px-4 text-[10px] font-bold uppercase text-[#FFDA01] transition-colors hover:bg-[#FFDA01] hover:text-[#0F1822] sm:px-6">
        {localize(language, "Search", "بحث", "חיפוש")}
      </button>
    </form>
  );

  return (
    <motion.header
      initial={reducedMotion ? false : { opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 shadow-[0_12px_34px_rgba(0,0,0,0.18)]"
    >
      <div className="bg-[#FFDA01] text-[#0F1822]">
        <div className="mx-auto flex h-9 max-w-[1440px] items-center justify-between gap-4 px-4 text-[9px] font-bold uppercase sm:px-8 sm:text-[10px]">
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <span className="hidden whitespace-nowrap xl:inline">
              {localize(language, "Direct project support · Delivery across Palestine", "دعم مباشر للمشاريع · توصيل في جميع أنحاء فلسطين", "תמיכה ישירה בפרויקטים · משלוחים ברחבי פלסטין")}
            </span>
            <a href="tel:+970599671209" className="inline-flex shrink-0 items-center gap-1.5 transition-opacity hover:opacity-65" aria-label={localize(language, "Call Kiswani Lights", "اتصل بكسواني للإنارة", "התקשרו לקיסוואני תאורה")}>
              <Phone size={11} strokeWidth={2.2} aria-hidden="true" />
              <span dir="ltr">+970 599 67 12 09</span>
            </a>
            <a href="mailto:info@kiswanilights.com" className="hidden shrink-0 items-center gap-1.5 transition-opacity hover:opacity-65 md:inline-flex" aria-label={localize(language, "Email Kiswani Lights", "راسل كسواني للإنارة", "שלחו דוא״ל לקיסוואני תאורה")}>
              <Mail size={11} strokeWidth={2.2} aria-hidden="true" />
              <span className="normal-case">info@kiswanilights.com</span>
            </a>
            <a href="https://www.google.com/maps/search/?api=1&query=Ramallah%2C+Palestine" target="_blank" rel="noreferrer" className="inline-flex min-w-0 items-center gap-1.5 transition-opacity hover:opacity-65" aria-label={localize(language, "View Kiswani location on Google Maps", "اعرض موقع كسواني على خرائط جوجل", "הצגת מיקום קיסוואני במפות Google")}>
              <MapPin size={11} strokeWidth={2.2} className="shrink-0" aria-hidden="true" />
              <span className="truncate">{localize(language, "Ramallah, Palestine", "رام الله، فلسطين", "רמאללה, פלסטין")}</span>
            </a>
          </div>
          <a href={`${rootPrefix}#contact`} className="hidden shrink-0 items-center gap-2 transition-opacity hover:opacity-65 lg:inline-flex">
            {localize(language, "Kiswani for professionals", "كسواني للمحترفين", "Kiswani למקצוענים")}
            <ArrowUpRight size={12} aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="bg-[#111315] text-white">
        <div className="mx-auto grid h-[76px] max-w-[1440px] grid-cols-[1fr_auto] items-center gap-4 px-4 sm:px-8 xl:grid-cols-[250px_minmax(300px,520px)_1fr] xl:gap-8">
          <a href={`${rootPrefix}#top`} aria-label="Kiswani Lights home" className="relative block h-12 w-44 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFDA01] lg:h-14 lg:w-52">
            <Image unoptimized src="/images/kiswani-logo-original-white.png" alt="Kiswani Lights" fill priority sizes="(max-width: 1024px) 176px, 208px" className="object-contain object-left rtl:object-right" />
          </a>

          <div className="hidden xl:block">{searchForm()}</div>

          <div className="flex items-center justify-end gap-2">
            <a href={`${rootPrefix}#contact`} className="hidden h-11 items-center border border-white/25 px-4 text-[10px] font-bold uppercase text-white transition-colors hover:border-[#FFDA01] hover:text-[#FFDA01] xl:inline-flex">
              {localize(language, "Contact", "تواصل معنا", "יצירת קשר")}
            </a>
            <label className="relative hidden xl:block">
              <span className="sr-only">Select language</span>
              <select value={language} onChange={(event) => setLanguage(event.target.value as Language)} className="h-11 appearance-none border border-white/25 bg-[#111315] pe-8 ps-3 text-[10px] font-bold text-white outline-none transition-colors hover:border-[#FFDA01] focus:border-[#FFDA01]">
                <option value="en">EN</option>
                <option value="ar">العربية</option>
                <option value="he">עברית</option>
              </select>
              <ChevronDown size={12} aria-hidden="true" className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-[#FFDA01]" />
            </label>
            <div className="hidden xl:block"><CartTrigger language={language} /></div>
            <div className="flex items-center gap-2 xl:hidden">
              <CartTrigger compact language={language} />
              <button type="button" onClick={() => setOpen(!open)} className="flex h-11 w-11 items-center justify-center border border-white/25 text-white transition-colors hover:border-[#FFDA01] hover:text-[#FFDA01]" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-navigation">
                {open ? <X size={19} /> : <Menu size={19} />}
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 px-4 pb-3 sm:px-8 xl:hidden">
          <div className="mx-auto max-w-[1440px]">{searchForm(true)}</div>
        </div>
      </div>

      <div className="relative hidden xl:block" onMouseLeave={() => setActiveMenu(null)}>
        <nav className="flex h-[52px] items-stretch bg-white text-[#0F1822]" aria-label="Product categories">
          <div className="mx-auto flex w-full max-w-[1440px] items-stretch justify-between px-8">
            {categoryLinks.map(({ label, href, category, allCollections }) => {
              const menuKey = allCollections ? "all" : category?.slug ?? null;
              const expanded = Boolean(menuKey && activeMenu === menuKey);
              const currentPage = isCurrentNavItem(href, category);
              const highlighted = expanded || (currentPage && !activeMenu);
              return (
                <a
                  key={href}
                  href={href}
                  onMouseEnter={() => setActiveMenu(menuKey)}
                  onFocus={() => setActiveMenu(menuKey)}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") setActiveMenu(null);
                  }}
                  aria-expanded={menuKey ? expanded : undefined}
                  aria-controls={menuKey ? "collection-mega-menu" : undefined}
                  aria-current={currentPage ? "page" : undefined}
                  className={`group relative flex min-w-0 items-center justify-center gap-2 px-4 text-[11px] font-bold uppercase transition-colors ${highlighted ? "text-[#8A7400]" : "hover:text-[#8A7400]"}`}
                >
                  <span>{label}</span>
                  {menuKey && <ChevronDown size={12} className={`text-[#9A8100] transition-transform ${expanded ? "rotate-180" : ""}`} aria-hidden="true" />}
                  <span className={`absolute inset-x-4 bottom-0 h-[3px] origin-center bg-[#FFDA01] transition-transform ${highlighted ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </nav>

        <AnimatePresence mode="wait">
          {activeMenu && (
            <motion.div
              key={activeMenu}
              id="collection-mega-menu"
              initial={reducedMotion ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: reducedMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 top-full z-50 border-t border-[#E4E0D8] bg-[#F4F2ED] shadow-[0_28px_55px_rgba(0,0,0,0.22)]"
            >
              {activeMenu === "all" ? (
                <div className="mx-auto grid h-[430px] max-w-[1440px] grid-cols-[0.27fr_0.73fr] border-x border-[#E4E0D8] bg-white">
                  <div className="flex min-w-0 flex-col justify-between bg-[#F4F2ED] px-9 py-9">
                    <div>
                      <p className="text-[10px] font-bold uppercase text-[#8A7400]">
                        {localize(language, "All collections", "كل المجموعات", "כל הקולקציות")}
                      </p>
                      <h2 className="mt-4 text-4xl font-semibold leading-none text-[#0F1822]">
                        {localize(language, "Find the right light for every space.", "اكتشف الإضاءة المناسبة لكل مساحة.", "מצאו את האור הנכון לכל חלל.")}
                      </h2>
                      <p className="mt-5 text-sm leading-6 text-[#73787C]">
                        {localize(language, "Browse decorative, interior, technical, and accent lighting together.", "تصفح الإنارة الديكورية والداخلية والتقنية والمميزة في مكان واحد.", "גלו יחד תאורה דקורטיבית, פנימית, טכנית ותאורת אווירה.")}
                      </p>
                    </div>
                    <a href={`${rootPrefix}#products`} className="group/all flex min-h-12 items-center justify-between border-y border-[#C8C3BA] text-xs font-bold uppercase text-[#8A7400]">
                      <span>{localize(language, "View all products", "عرض جميع المنتجات", "צפייה בכל המוצרים")}</span>
                      <ArrowUpRight size={16} className="transition-transform group-hover/all:-translate-y-0.5 group-hover/all:translate-x-0.5" aria-hidden="true" />
                    </a>
                  </div>

                  <div className="grid min-w-0 grid-cols-4">
                    {categories.map((category) => {
                      const categoryProducts = products.filter((product) => product.categorySlug === category.slug);
                      return (
                        <a key={category.slug} href={`/collections/${category.slug}`} className="group/all-card flex min-w-0 flex-col border-s border-[#E4E0D8] bg-white">
                          <span className="relative block h-[220px] overflow-hidden bg-[#070B0E]">
                            <Image
                              unoptimized
                              src={category.image}
                              alt={getCategoryName(category, language)}
                              fill
                              sizes="18vw"
                              className="object-cover transition-transform duration-700 group-hover/all-card:scale-[1.04]"
                            />
                            <span className="absolute inset-0 bg-[linear-gradient(0deg,rgba(7,11,14,0.68)_0%,transparent_58%)]" aria-hidden="true" />
                            <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-white">
                              <span className="text-lg font-semibold leading-tight">{getCategoryName(category, language)}</span>
                              <ArrowUpRight size={16} className="shrink-0 text-[#FFDA01]" aria-hidden="true" />
                            </span>
                          </span>
                          <span className="flex flex-1 flex-col p-5">
                            <span className="text-[9px] font-bold uppercase text-[#8A7400]">
                              {categoryProducts.length} {localize(language, "products", "منتج", "מוצרים")}
                            </span>
                            <span className="mt-3 grid gap-2">
                              {categoryProducts.slice(0, 3).map((product) => (
                                <span key={product.code} className="truncate border-b border-[#ECE8E1] pb-2 text-xs font-semibold text-[#50555B]">
                                  {getProductName(product, language)}
                                </span>
                              ))}
                            </span>
                          </span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              ) : activeCategory ? (
              <div className="mx-auto grid h-[460px] max-w-[1440px] grid-cols-[0.42fr_0.58fr] border-x border-[#E4E0D8] bg-white">
                <div className="flex min-w-0 flex-col px-12 py-10">
                  <p className="text-[10px] font-bold uppercase text-[#8A7400]">
                    {localize(language, "Lighting collection", "مجموعة إنارة", "קולקציית תאורה")}
                  </p>
                  <h2 className="mt-4 max-w-lg text-4xl font-semibold leading-none text-[#0F1822]">
                    {getCategoryName(activeCategory, language)}
                  </h2>
                  <p className="mt-5 max-w-xl text-sm leading-6 text-[#73787C]">
                    {getCategoryDetail(activeCategory, language)}
                  </p>
                  <a href={`/collections/${activeCategory.slug}`} className="group/link mt-7 flex min-h-11 items-center justify-between border-y border-[#D8D4CC] text-xs font-bold uppercase text-[#8A7400]">
                    <span>{localize(language, "View full collection", "عرض المجموعة كاملة", "צפייה בקולקציה המלאה")}</span>
                    <ArrowUpRight size={15} className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" aria-hidden="true" />
                  </a>
                  <div className="mt-1 grid">
                    {activeProducts.map((product) => (
                      <a key={product.code} href={`/products/${getProductSlug(product)}`} className="flex min-h-10 items-center justify-between border-b border-[#E4E0D8] text-xs font-semibold text-[#0F1822] transition-colors hover:text-[#8A7400]">
                        <span>{getProductName(product, language)}</span>
                        <span className="text-[9px] text-[#A3A7AA]">{product.code}</span>
                      </a>
                    ))}
                  </div>
                </div>

                <a href={`/collections/${activeCategory.slug}`} className="group/image relative isolate block min-w-0 overflow-hidden bg-[#070B0E]">
                  <Image
                    unoptimized
                    src={activeCategory.image}
                    alt={getCategoryName(activeCategory, language)}
                    fill
                    sizes="(min-width: 1280px) 58vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover/image:scale-[1.025]"
                  />
                  <span className="absolute inset-0 bg-[linear-gradient(0deg,rgba(7,11,14,0.84)_0%,rgba(7,11,14,0.08)_62%)]" aria-hidden="true" />
                  <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-8 p-10 text-white">
                    <span>
                      <span className="text-[10px] font-bold uppercase text-[#FFDA01]">
                        {localize(language, "Explore the collection", "استكشف المجموعة", "לגלות את הקולקציה")}
                      </span>
                      <span className="mt-2 block text-3xl font-semibold">{getCategoryName(activeCategory, language)}</span>
                    </span>
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#FFDA01] text-[#0F1822]">
                      <ArrowUpRight size={19} aria-hidden="true" />
                    </span>
                  </span>
                </a>
              </div>
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div id="mobile-navigation" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }} className="border-t border-[#DADADA] bg-white p-4 text-[#0F1822] shadow-2xl xl:hidden">
            <nav className="grid" aria-label="Mobile product categories">
              {categoryLinks.map(({ label, href }, index) => (
                <a key={href} href={href} onClick={() => setOpen(false)} className="flex min-h-12 items-center justify-between border-b border-[#E4E4E4] px-2 text-sm font-semibold transition-colors hover:bg-[#FFDA01]">
                  <span>{label}</span>
                  <span className="text-[9px] text-[#73787C]">0{index + 1}</span>
                </a>
              ))}
            </nav>
            <div className="mt-4 grid grid-cols-[1fr_auto] gap-3">
              <label>
                <span className="sr-only">Select language</span>
                <select value={language} onChange={(event) => setLanguage(event.target.value as Language)} className="h-12 w-full border border-[#0F1822] bg-white px-4 text-sm font-bold text-[#0F1822] outline-none focus:border-[#FFDA01]">
                  <option value="en">English</option>
                  <option value="ar">العربية</option>
                  <option value="he">עברית</option>
                </select>
              </label>
              <a href={`${rootPrefix}#contact`} onClick={() => setOpen(false)} className="inline-flex h-12 items-center justify-center gap-2 bg-[#FFDA01] px-5 text-xs font-bold text-[#0F1822]">
                {localize(language, "Contact", "تواصل", "יצירת קשר")}
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function Hero({ language }: { language: Language }) {
  const reduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imageParallax = useTransform(scrollYProgress, [0, 1], [0, 96]);
  const contentParallax = useTransform(scrollYProgress, [0, 1], [0, 58]);
  const current = copy[language];
  const [active, setActive] = useState(0);
  const scene = heroScenes[active];

  useEffect(() => {
    if (reduced) return;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % heroScenes.length), 6000);
    return () => window.clearInterval(timer);
  }, [reduced]);

  return (
    <section ref={heroRef} id="top" className="relative isolate min-h-[calc(100svh-158px)] overflow-hidden bg-[#070B0E]">
      <AnimatePresence mode="wait">
        <motion.div key={scene.image} initial={reduced ? false : { opacity: 0, scale: 1.025 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} style={{ y: reduced ? 0 : imageParallax }} className="absolute inset-0">
          <Media src={scene.image} alt={getCategoryName(scene, language)} sizes="100vw" priority={active === 0} className="object-center lg:object-[center_48%]" />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,11,14,0.94)_0%,rgba(7,11,14,0.72)_42%,rgba(7,11,14,0.18)_72%,rgba(7,11,14,0.42)_100%)] rtl:bg-[linear-gradient(270deg,rgba(7,11,14,0.94)_0%,rgba(7,11,14,0.72)_42%,rgba(7,11,14,0.18)_72%,rgba(7,11,14,0.42)_100%)]" aria-hidden="true" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(7,11,14,0.88)_0%,transparent_45%)]" aria-hidden="true" />
      <div className="absolute inset-x-5 top-5 bottom-5 border border-white/10 sm:inset-x-8 sm:top-8 sm:bottom-8" aria-hidden="true" />
      <div className="gold-hero-geometry z-10 hidden lg:block" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-158px)] max-w-[1440px] items-end px-8 pb-14 pt-28 sm:px-16 sm:pb-20 lg:items-center lg:px-20 lg:py-20">
        <motion.div initial={reduced ? false : "hidden"} animate="show" variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.11, delayChildren: 0.12 } } }} style={{ y: reduced ? 0 : contentParallax }} className="w-full max-w-[810px]">
          <motion.div variants={heroReveal} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="mb-7 flex items-center gap-4"><motion.span initial={reduced ? false : { scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: reduced ? 0 : 0.3, duration: reduced ? 0 : 0.7 }} className="h-px w-16 origin-left bg-[#FFDA01]" /><p className="brand-kicker text-xs font-semibold uppercase tracking-[0.28em] text-[#FFDA01]">{current.heroKicker}</p></motion.div>
          <motion.h1 variants={heroReveal} transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }} className={`text-balance text-5xl font-semibold leading-[0.92] tracking-[-0.06em] text-white sm:text-7xl lg:text-[92px] ${language === "en" ? "uppercase" : ""}`}><span className="block">{current.heroLead}</span><span className="mt-2 block text-[#FFDA01]">{current.heroAccent}</span></motion.h1>
          <motion.p variants={heroReveal} transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }} className="mt-7 max-w-2xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8">{current.heroBody}</motion.p>
          <motion.div variants={heroReveal} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="mt-9 flex flex-col gap-3 sm:flex-row"><BrandButton href="#collections">{current.explore}</BrandButton><BrandButton href="#contact" outline dark>{current.project}</BrandButton></motion.div>

          <motion.div variants={heroReveal} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="mt-12 grid gap-5 border-t border-white/15 pt-6 sm:grid-cols-[1fr_auto] sm:items-end">
            <div><p className="text-sm font-semibold text-white">{getCategoryName(scene, language)}</p><p className="mt-1 max-w-md text-xs leading-5 text-white/50">{getCategoryDetail(scene, language)}</p></div>
            <div className="flex items-center gap-5"><span className="text-3xl font-light text-white/35">0{active + 1}</span><div className="flex gap-2" aria-label="Hero scenes">{heroScenes.map((item, index) => <button key={item.name} type="button" onClick={() => setActive(index)} className={`h-px transition-all ${index === active ? "w-12 bg-[#FFDA01]" : "w-6 bg-white/35 hover:bg-white"}`} aria-label={`Show ${item.name}`} aria-current={index === active ? "true" : undefined} />)}</div></div>
          </motion.div>
        </motion.div>

        <div className="absolute end-14 top-1/2 hidden -translate-y-1/2 flex-col items-end gap-5 xl:flex">{heroScenes.map((item, index) => <button key={item.name} type="button" onClick={() => setActive(index)} className={`flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.15em] transition-colors ${index === active ? "text-[#FFDA01]" : "text-white/45 hover:text-white"}`}><span>{getCategoryName(item, language)}</span><span className={`h-px transition-all ${index === active ? "w-14 bg-[#FFDA01]" : "w-5 bg-white/35"}`} /></button>)}</div>
      </div>
    </section>
  );
}

function CategoryCard({ category, index, language }: { category: (typeof categories)[number]; index: number; language: Language }) {
  const reducedMotion = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const smoothRotateX = useSpring(rotateX, { stiffness: 240, damping: 24, mass: 0.4 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 240, damping: 24, mass: 0.4 });
  const glow = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255,218,1,0.28), transparent 38%)`;
  const name = getCategoryName(category, language);
  const detail = getCategoryDetail(category, language);
  return (
    <motion.a href={`/collections/${category.slug}`} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.22 }} whileHover={{ y: reducedMotion ? 0 : -10 }} onPointerMove={(event) => { if (event.pointerType !== "mouse" || reducedMotion) return; const bounds = event.currentTarget.getBoundingClientRect(); const x = (event.clientX - bounds.left) / bounds.width; const y = (event.clientY - bounds.top) / bounds.height; rotateY.set((x - 0.5) * 5); rotateX.set((0.5 - y) * 5); glowX.set(x * 100); glowY.set(y * 100); }} onPointerLeave={() => { rotateX.set(0); rotateY.set(0); glowX.set(50); glowY.set(50); }} style={{ rotateX: smoothRotateX, rotateY: smoothRotateY, transformPerspective: 1200 }} transition={{ duration: reducedMotion ? 0 : 0.7, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }} className={`group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFDA01] ${index % 2 ? "xl:translate-y-4" : ""}`}>
      <div className="gold-image-corners light-sweep relative aspect-[4/5] overflow-hidden bg-[#070B0E] shadow-[0_22px_70px_rgba(7,11,14,0.16)]">
        <Media src={category.image} alt={name} sizes="(max-width: 768px) 100vw, 25vw" className="object-cover object-center transition-transform duration-[1100ms] ease-out group-hover:scale-[1.045]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(7,11,14,0.96)_0%,rgba(7,11,14,0.22)_58%,rgba(7,11,14,0.12)_100%)]" />
        <motion.div aria-hidden="true" style={{ background: glow }} className="absolute inset-0 opacity-0 mix-blend-screen transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5"><span className="text-xs font-semibold tracking-[0.18em] text-white/65">0{index + 1}</span><span className="h-px w-10 bg-[#FFDA01] transition-all duration-500 group-hover:w-16" /></div>
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#FFDA01]">KISWANI / 2026</p><h3 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.035em] text-white">{name}</h3><p className="mt-3 max-w-sm text-sm leading-6 text-white/60">{detail}</p><span className="mt-6 flex h-11 w-11 items-center justify-center border border-white/35 text-white transition-all group-hover:border-[#FFDA01] group-hover:bg-[#FFDA01] group-hover:text-[#0F1822]"><ChevronRight size={17} className={isRtlLanguage(language) ? "rotate-180" : ""} /></span></div>
      </div>
    </motion.a>
  );
}

function VisualStories({ language }: { language: Language }) {
  const stories = [
    {
      href: "/collections/decorative",
      image: "/images/editorial/story-lounge.webp",
      label: localize(language, "Sculptural light for shared spaces", "ضوء نحتي للمساحات المشتركة", "אור פיסולי לחללים משותפים"),
      detail: localize(language, "Dining & lounge", "غرف الطعام والجلوس", "פינות אוכל וסלון"),
    },
    {
      href: "/collections/technical",
      image: "/images/editorial/story-stair.webp",
      label: localize(language, "Guidance after dark", "إضاءة ترشدك بعد الغروب", "הכוונה לאחר החשכה"),
      detail: localize(language, "Stairs & circulation", "السلالم والممرات", "מדרגות ומעברים"),
    },
    {
      href: "/collections/accent",
      image: "/images/editorial/story-wall.webp",
      label: localize(language, "Layers of ambient light", "طبقات من الإضاءة المحيطية", "שכבות של אור אווירה"),
      detail: localize(language, "Walls & quiet corners", "الجدران والزوايا الهادئة", "קירות ופינות שקטות"),
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#F4F2ED] px-4 py-16 sm:px-8 sm:py-24">
      <div className="gold-section-rail" aria-hidden="true" />
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.62fr] lg:items-end">
          <SectionIntro
            kicker={localize(language, "LIGHT IN REAL SPACES", "الضوء في مساحات حقيقية", "אור בחללים אמיתיים")}
            title={localize(language, "One fixture can change the rhythm of the whole room.", "قطعة إنارة واحدة قادرة على تغيير إيقاع المكان كله.", "גוף תאורה אחד יכול לשנות את הקצב של החלל כולו.")}
          />
          <motion.p initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7, delay: 0.1 }} className="max-w-xl text-base leading-8 text-[#50555B] lg:justify-self-end">
            {localize(language, "Explore warm, believable interiors where the fixture, materials, and atmosphere work as one composition.", "اكتشف مساحات دافئة وواقعية تتكامل فيها قطعة الإنارة والخامات والأجواء ضمن مشهد واحد.", "גלו חללים חמים ואמינים שבהם גוף התאורה, החומרים והאווירה פועלים כקומפוזיציה אחת.")}
          </motion.p>
        </div>

        <div className="mt-10 grid gap-3 lg:grid-cols-[1.45fr_0.55fr]">
          <motion.a href={stories[0].href} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }} className="gold-image-corners group light-sweep relative min-h-[420px] overflow-hidden bg-[#070B0E] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFDA01] sm:min-h-[540px]">
            <Media src={stories[0].image} alt={stories[0].label} sizes="(max-width: 1024px) 100vw, 68vw" className="object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-[1.035]" />
            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(5,7,9,0.9)_0%,rgba(5,7,9,0.05)_62%)]" />
            <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-8 p-7 text-white sm:p-10">
              <div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#FFDA01]">{stories[0].detail}</p><h3 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight sm:text-5xl">{stories[0].label}</h3></div>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-white/35 transition-colors group-hover:border-[#FFDA01] group-hover:bg-[#FFDA01] group-hover:text-[#0F1822]"><ArrowUpRight size={19} /></span>
            </div>
          </motion.a>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {stories.slice(1).map((story, index) => (
              <motion.a key={story.image} href={story.href} initial={{ opacity: 0, x: index === 0 ? 24 : -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.24 }} transition={{ duration: 0.7, delay: 0.08 + index * 0.08, ease: [0.22, 1, 0.36, 1] }} className="gold-image-corners group relative min-h-[280px] overflow-hidden bg-[#070B0E] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFDA01] sm:min-h-[340px] lg:min-h-0">
                <Media src={story.image} alt={story.label} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 32vw" className="object-cover object-center transition-transform duration-[1000ms] ease-out group-hover:scale-[1.045]" />
                <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(5,7,9,0.92)_0%,transparent_66%)]" />
                <div className="absolute inset-x-0 bottom-0 z-10 p-6 text-white sm:p-7"><p className="text-[9px] font-bold uppercase tracking-[0.17em] text-[#FFDA01]">{story.detail}</p><div className="mt-3 flex items-end justify-between gap-4"><h3 className="max-w-sm text-2xl font-semibold leading-tight">{story.label}</h3><ArrowUpRight size={18} className="shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></div></div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProductCard({ product, language, open }: { product: Product; language: Language; open: (product: Product) => void }) {
  const { add } = useCart();
  const [quantity, setQuantity] = useState(1);
  const name = getProductName(product, language);
  const category = getProductCategory(product, language);
  const description = getProductDescription(product, language);
  return (
    <motion.article layout initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} whileHover={{ y: -6 }} transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }} className="group flex h-full flex-col overflow-hidden bg-[#F4F2ED] shadow-[0_18px_55px_rgba(7,11,14,0.06)] transition-shadow hover:shadow-[0_26px_80px_rgba(7,11,14,0.14)]">
      <div className="flex flex-1 flex-col">
        <div className="relative aspect-[4/3] overflow-hidden bg-[#CCCFCE]/25"><Media src={product.image} alt={name} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw" className="object-cover object-center transition-transform duration-[1000ms] ease-out group-hover:scale-[1.035]" /><div className="absolute inset-0 bg-gradient-to-t from-[#070B0E]/35 via-transparent to-transparent" /><div className="absolute inset-x-0 top-0 flex items-center justify-between p-4"><span className="bg-[#FFDA01] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#0F1822]">{category}</span><span className="bg-[#070B0E]/85 px-3 py-1.5 text-[11px] tracking-[0.08em] text-white backdrop-blur-sm">{product.code}</span></div></div>
        <div className="p-4 pb-0 xl:p-5 xl:pb-0">
          <div className="flex items-center justify-between gap-4"><span className="h-px w-12 bg-[#FFDA01]" /><span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#73787C]">KISWANI LIGHTS</span></div>
          <h3 className="mt-4 line-clamp-2 h-16 text-xl font-semibold leading-8 tracking-[-0.025em] text-[#0F1822] xl:text-2xl">{name}</h3>
          <p className="mt-2 line-clamp-2 h-10 text-sm leading-5 text-[#50555B]">{description}</p>
          <div className="mt-3 flex items-baseline justify-between gap-2">
            <div>
              <p className="text-lg font-bold tracking-[-0.02em] text-[#0F1822]">{formatPrice(product.price, language)}</p>
              <p className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.12em] text-[#73787C]">{localize(language, "Initial price", "Initial price", "Initial price")}</p>
            </div>
            {quantity > 1 && (
              <span className="text-xs font-bold text-[#0F1822]">
                {localize(language, "Total: ", "الإجمالي: ", "סה\"כ: ")}{formatPrice(product.price * quantity, language)}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="px-4 pb-4 pt-0 xl:px-5 xl:pb-5">
        <div className="mt-3 flex items-center justify-between gap-3">
          <span className="text-[11px] font-bold uppercase text-[#73787C]">{localize(language, "Qty", "الكمية", "כמות")}:</span>
          <div className="inline-flex items-center border border-[#CCCFCE] bg-white">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="flex h-8 w-8 items-center justify-center text-[#0F1822] hover:bg-[#F4F2ED]"
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>
            <input
              type="number"
              min="1"
              max="999"
              value={quantity}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                if (!isNaN(val) && val > 0) setQuantity(val);
              }}
              className="w-10 text-center text-xs font-semibold text-[#0F1822] outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="flex h-8 w-8 items-center justify-center text-[#0F1822] hover:bg-[#F4F2ED]"
              aria-label="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-[1fr_auto] gap-2">
          <button type="button" onClick={() => add(product, quantity)} className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#FFDA01] px-4 text-sm font-bold text-[#0F1822] transition-colors hover:bg-[#FFD100]"><ShoppingBag size={16} />{localize(language, "Add to cart", "أضف إلى السلة", "הוספה לסל")}</button>
          <button type="button" onClick={() => open(product)} className="flex h-12 w-12 items-center justify-center bg-[#0F1822] text-white transition-colors hover:bg-[#50555B]" aria-label={copy[language].view}><ArrowUpRight size={16} /></button>
        </div>
      </div>
    </motion.article>
  );
}

export function ProductModal({ product, language, close }: { product: Product; language: Language; close: () => void }) {
  const { add } = useCart();
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && close();
    document.addEventListener("keydown", onKey); document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [close]);
  const current = copy[language];
  const name = getProductName(product, language);
  const description = getProductDescription(product, language);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => event.target === event.currentTarget && close()} className="fixed inset-0 z-[70] flex items-end justify-center bg-[#0F1822]/80 sm:items-center sm:p-6">
      <motion.div role="dialog" aria-modal="true" aria-labelledby="product-title" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} className="relative grid max-h-[92vh] w-full max-w-5xl overflow-y-auto bg-white sm:grid-cols-[0.92fr_1.08fr]">
        <button type="button" onClick={close} autoFocus className="absolute end-4 top-4 z-20 flex h-11 w-11 items-center justify-center bg-[#FFDA01] text-[#0F1822]" aria-label="Close product details"><X size={18} /></button>
        <div className="relative min-h-[380px] bg-[#CCCFCE]/25 sm:min-h-[680px]"><Media src={product.image} alt={name} sizes="(max-width: 640px) 100vw, 46vw" className="object-top" /></div>
        <div className="p-7 sm:p-10 lg:p-12"><div className="h-[3px] w-14 bg-[#FFDA01]" /><p className="mt-7 text-xs font-bold tracking-[0.16em] text-[#73787C]">{product.code}</p><h2 id="product-title" className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[#0F1822]">{name}</h2><div className="mt-5 flex items-end justify-between gap-5 border-b border-[#CCCFCE] pb-5"><div><p className="text-3xl font-bold tracking-[-0.04em] text-[#0F1822]">{formatPrice(product.price, language)}</p><p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#73787C]">{localize(language, "Initial price", "Initial price", "Initial price")}</p></div>{quantity > 1 && <div className="text-end"><p className="text-sm font-bold text-[#0F1822]">{formatPrice(product.price * quantity, language)}</p><p className="text-[10px] text-[#73787C]">{localize(language, "Total for quantity", "إجمالي السعر", "סה\"כ לכמות")}</p></div>}</div><p className="mt-5 leading-7 text-[#50555B]">{description}</p><div className="mt-8 border border-[#CCCFCE]"><table className="w-full text-sm"><caption className="sr-only">Technical specifications</caption><tbody>{product.specs.map(([label, value]) => <tr key={label} className="border-b border-[#CCCFCE] last:border-0"><th scope="row" className="bg-[#CCCFCE]/20 px-4 py-4 text-start font-medium text-[#50555B]">{label}</th><td className="px-4 py-4 text-end font-semibold text-[#0F1822]">{value}</td></tr>)}</tbody></table></div><p className="mt-6 text-sm text-[#73787C]">{localize(language, "Initial catalog price. Availability, delivery, and final approval are confirmed before processing.", "Initial catalog price. Availability, delivery, and final approval are confirmed before processing.", "Initial catalog price. Availability, delivery, and final approval are confirmed before processing.")}</p>
        <div className="mt-6 flex items-center justify-between gap-4 border-t border-[#CCCFCE] pt-4">
          <span className="text-xs font-bold text-[#0F1822]">{localize(language, "Quantity:", "الكمية المطلوبة:", "כמות:")}</span>
          <div className="inline-flex items-center border border-[#CCCFCE] bg-white">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="flex h-9 w-9 items-center justify-center text-[#0F1822] hover:bg-[#F4F2ED]"
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>
            <input
              type="number"
              min="1"
              max="999"
              value={quantity}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                if (!isNaN(val) && val > 0) setQuantity(val);
              }}
              className="w-12 text-center text-sm font-semibold text-[#0F1822] outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="flex h-9 w-9 items-center justify-center text-[#0F1822] hover:bg-[#F4F2ED]"
              aria-label="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
        <div className="mt-4 grid gap-3"><button type="button" onClick={() => { add(product, quantity); close(); }} className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#FFDA01] px-6 text-sm font-bold text-[#0F1822]"><ShoppingBag size={16} />{localize(language, "Add to cart", "أضف إلى السلة", "הוספה לסל")}</button><button type="button" onClick={close} className="min-h-12 border border-[#0F1822] px-6 text-sm font-bold text-[#0F1822]">{current.close}</button></div></div>
      </motion.div>
    </motion.div>
  );
}

function LightingTypes({ language }: { language: Language }) {
  const current = copy[language];
  const sectionRef = useRef<HTMLElement>(null);
  const illuminated = useInView(sectionRef, { amount: 0.28 });
  const reducedMotion = useReducedMotion();
  const types = [
    [Lightbulb, localize(language, "Light sources", "مصادر الضوء", "מקורות אור"), localize(language, "Color temperature and clarity for every use.", "حرارة لون ووضوح مناسب لكل استخدام.", "טמפרטורת צבע ובהירות לכל שימוש.")],
    [LampDesk, localize(language, "Decorative pieces", "إنارة ديكورية", "גופי תאורה דקורטיביים"), localize(language, "Visual presence that gives the space character.", "حضور بصري يصنع شخصية المكان.", "נוכחות חזותית שמעניקה לחלל אופי.")],
    [LampFloor, localize(language, "Functional lighting", "إنارة وظيفية", "תאורה פונקציונלית"), localize(language, "Useful light without visual noise.", "ضوء عملي بدون ضوضاء بصرية.", "אור שימושי ללא עומס חזותי.")],
    [Gauge, localize(language, "Technical control", "تحكم تقني", "שליטה טכנית"), localize(language, "Precision, visual comfort, and reliable output.", "دقة، راحة بصرية، وأداء موثوق.", "דיוק, נוחות חזותית וביצועים אמינים.")],
  ] as const;
  return (
    <section ref={sectionRef} id="types" className="relative isolate overflow-hidden bg-[#070B0E] px-4 py-16 text-white sm:px-8 sm:py-24">
      <motion.div aria-hidden="true" animate={{ opacity: illuminated ? 0.24 : 0 }} transition={{ duration: reducedMotion ? 0 : 1.4 }} className="absolute inset-0 bg-[radial-gradient(circle_at_88%_18%,rgba(255,218,1,0.28),transparent_30%)]" />

      <div aria-hidden="true" className="pointer-events-none absolute end-0 top-0 z-20 hidden h-[560px] w-[360px] lg:block">
        <motion.div animate={{ scaleY: illuminated ? 1 : 0 }} transition={{ duration: reducedMotion ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }} className="absolute left-1/2 top-0 h-28 w-px -translate-x-1/2 origin-top bg-[#73787C]" />
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: illuminated ? 0 : -20, opacity: illuminated ? 1 : 0 }} transition={{ delay: reducedMotion ? 0 : 0.3, duration: reducedMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }} className="absolute left-1/2 top-24 z-20 -translate-x-1/2">
          <div className="mx-auto h-3 w-20 rounded-b-lg bg-[#151C19]" />
          <div className="h-20 w-32 bg-[#1E2722] shadow-[0_16px_36px_rgba(0,0,0,0.5)] [clip-path:polygon(25%_0,75%_0,100%_100%,0_100%)]" />
          <motion.div animate={{ backgroundColor: illuminated ? "#FFDA01" : "#3A403D", opacity: illuminated ? [0.28, 1, 0.42, 1] : 0.28, boxShadow: illuminated ? ["0 0 0 rgba(255,218,1,0)", "0 0 34px rgba(255,218,1,0.9)", "0 0 12px rgba(255,218,1,0.2)", "0 0 54px rgba(255,218,1,0.72)"] : "0 0 0 rgba(255,218,1,0)" }} transition={{ duration: reducedMotion ? 0 : 1.2, times: [0, 0.16, 0.3, 1] }} className="mx-auto -mt-1 h-12 w-9 rounded-b-[50%] rounded-t-lg border border-white/15" />
        </motion.div>
        <motion.div animate={{ opacity: illuminated ? [0, 0.12, 0.03, 0.48] : 0, scaleY: illuminated ? 1 : 0.8 }} transition={{ duration: reducedMotion ? 0 : 1.4, times: [0, 0.18, 0.32, 1] }} className="absolute left-1/2 top-[184px] h-[370px] w-[330px] -translate-x-1/2 origin-top bg-[linear-gradient(180deg,rgba(255,218,1,0.28),rgba(255,218,1,0.06)_65%,transparent)] blur-[8px] [clip-path:polygon(44%_0,56%_0,100%_100%,0_100%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px]">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div className="lg:sticky lg:top-36 lg:self-start"><SectionIntro dark kicker={current.systemsKicker} title={current.systemsTitle} /><p className="mt-5 max-w-lg text-base leading-7 text-[#A3A7AA]">{current.systemsBody}</p></div>
          <div className="grid border-l border-t border-white/10 sm:grid-cols-2">
            {types.map(([Icon, title, body], index) => (
              <motion.div key={title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }} whileHover={{ backgroundColor: "rgba(255,218,1,0.055)" }} className="relative overflow-hidden border-b border-r border-white/10 bg-[#070B0E] p-6 sm:p-7">
                <motion.div aria-hidden="true" animate={{ opacity: illuminated ? 1 : 0 }} transition={{ delay: reducedMotion ? 0 : 0.5 + index * 0.09, duration: reducedMotion ? 0 : 0.8 }} className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,218,1,0.045),transparent_48%)]" />
                <div className="relative flex items-start justify-between"><Icon size={42} strokeWidth={1.15} className="text-[#FFDA01]" /><span className="text-xs tracking-[0.18em] text-[#73787C]">0{index + 1}</span></div><h3 className="relative mt-8 text-2xl font-semibold tracking-[-0.025em]">{title}</h3><p className="relative mt-3 text-sm leading-6 text-[#A3A7AA]">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WallSconceMotion() {
  const fixtureRef = useRef<HTMLDivElement>(null);
  const active = useInView(fixtureRef, { amount: 0.35 });
  const reducedMotion = useReducedMotion();
  const duration = reducedMotion ? 0 : 1.1;

  return (
    <div ref={fixtureRef} aria-hidden="true" className="pointer-events-none absolute left-0 top-[18%] z-20 hidden h-[440px] w-[290px] xl:block">
      <motion.div animate={{ opacity: active ? 0.48 : 0, scaleY: active ? 1 : 0.72 }} transition={{ duration }} className="absolute left-[66px] top-8 h-40 w-56 -translate-x-1/2 origin-bottom bg-[linear-gradient(180deg,rgba(255,218,1,0.03),rgba(255,218,1,0.2))] blur-[9px] [clip-path:polygon(0_0,100%_0,54%_100%,46%_100%)]" />
      <motion.div animate={{ opacity: active ? 0.38 : 0, scaleY: active ? 1 : 0.72 }} transition={{ delay: reducedMotion ? 0 : 0.2, duration }} className="absolute left-[66px] top-[192px] h-52 w-60 -translate-x-1/2 origin-top bg-[linear-gradient(180deg,rgba(255,218,1,0.2),transparent_78%)] blur-[10px] [clip-path:polygon(46%_0,54%_0,100%_100%,0_100%)]" />
      <div className="absolute left-0 top-40 h-24 w-5 bg-[#0F1822] shadow-[8px_10px_30px_rgba(15,24,34,0.2)]" />
      <div className="absolute left-5 top-[188px] h-2 w-9 bg-[#50555B]" />
      <motion.div animate={{ opacity: active ? [0.22, 1, 0.4, 1] : 0.2, boxShadow: active ? ["0 0 0 rgba(255,218,1,0)", "0 0 30px rgba(255,218,1,0.85)", "0 0 10px rgba(255,218,1,0.2)", "0 0 42px rgba(255,218,1,0.62)"] : "0 0 0 rgba(255,218,1,0)" }} transition={{ duration: reducedMotion ? 0 : 1.2, times: [0, 0.15, 0.3, 1] }} className="absolute left-12 top-[174px] h-9 w-9 rounded-full border border-[#0F1822]/20 bg-[#FFDA01]" />
      <div className="absolute left-9 top-[162px] h-16 w-16 rounded-full border border-[#0F1822]/20 bg-white/20 backdrop-blur-sm" />
    </div>
  );
}

function TrackLightsMotion() {
  const fixtureRef = useRef<HTMLDivElement>(null);
  const active = useInView(fixtureRef, { amount: 0.3 });
  const reducedMotion = useReducedMotion();
  const angles = [-18, 0, 18];

  return (
    <div ref={fixtureRef} aria-hidden="true" className="pointer-events-none absolute end-6 top-0 z-0 hidden h-[520px] w-[560px] xl:block">
      <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: active ? 1 : 0 }} transition={{ duration: reducedMotion ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }} className="absolute end-0 top-7 h-1 w-[460px] origin-right bg-[#0F1822]" />
      {angles.map((angle, index) => (
        <div key={angle} className="absolute top-7 h-[470px] w-36" style={{ right: 28 + index * 142 }}>
          <motion.div animate={{ scaleY: active ? 1 : 0 }} transition={{ delay: reducedMotion ? 0 : 0.18 + index * 0.1, duration: reducedMotion ? 0 : 0.55 }} className="mx-auto h-10 w-px origin-top bg-[#50555B]" />
          <motion.div animate={{ opacity: active ? 1 : 0, rotate: active ? angle : angle - 25 }} transition={{ delay: reducedMotion ? 0 : 0.3 + index * 0.12, duration: reducedMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }} className="mx-auto w-40 origin-top">
            <div className="relative mx-auto h-14 w-9 rounded-b-2xl bg-[#1E2722] shadow-lg"><span className="absolute inset-x-1 bottom-1 h-3 rounded-full bg-[#FFDA01]" /></div>
            <motion.div animate={{ opacity: active ? [0, 0.34, 0.08, 0.25] : 0, scaleY: active ? 1 : 0.75 }} transition={{ delay: reducedMotion ? 0 : 0.15 + index * 0.04, duration: reducedMotion ? 0 : 1.15, times: [0, 0.2, 0.35, 1] }} className="mx-auto -mt-1 h-[350px] w-40 origin-top bg-[linear-gradient(180deg,rgba(255,218,1,0.22),rgba(255,218,1,0.03)_72%,transparent)] blur-[7px] [clip-path:polygon(43%_0,57%_0,100%_100%,0_100%)]" />
          </motion.div>
        </div>
      ))}
    </div>
  );
}

export function LuxuryFooter({ language, rootPrefix = "" }: { language: Language; rootPrefix?: string }) {
  const navigation = [
    [localize(language, "Collections", "المجموعات", "קולקציות"), `${rootPrefix}#collections`],
    [localize(language, "Lighting types", "أنواع الإضاءة", "סוגי תאורה"), `${rootPrefix}#types`],
    [localize(language, "Products", "المنتجات", "מוצרים"), `${rootPrefix}#products`],
    [localize(language, "Projects", "المشاريع", "פרויקטים"), "/projects"],
  ];
  const information = [
    [localize(language, "About us", "من نحن", "אודות"), "/about"],
    [localize(language, "Support", "الدعم", "תמיכה"), "/support"],
    [localize(language, "Privacy policy", "سياسة الخصوصية", "מדיניות פרטיות"), "/privacy"],
    [localize(language, "Terms of use", "شروط الاستخدام", "תנאי שימוש"), "/terms"],
  ];
  return (
    <footer className="relative overflow-hidden bg-[#050709] px-4 pb-8 pt-0 text-white sm:px-8">
      <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-x-0 top-0 h-1 origin-left bg-[#FFDA01]" />
      <div className="relative z-10 mx-auto max-w-[1440px] pt-20 sm:pt-28">
        <div className="grid gap-16 border-b border-white/10 pb-20 md:grid-cols-2 lg:grid-cols-[1.2fr_0.48fr_0.56fr_0.6fr] lg:gap-14 xl:gap-20">
          <div>
            <div className="relative h-24 w-72 sm:h-28 sm:w-80"><Image unoptimized src="/images/kiswani-logo-original-white.png" alt="Kiswani Lights" fill sizes="320px" className="object-contain object-left rtl:object-right" /></div>
            <motion.p initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.7 }} className="mt-10 max-w-3xl text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.05em] sm:text-5xl lg:text-6xl">{localize(language, "Lighting is not decoration. It is the soul of the space.", "الإضاءة ليست مجرد قطعة ديكور، بل هي روح المكان.", "תאורה אינה קישוט. היא הנשמה של החלל.")}</motion.p>
            <div className="mt-10 flex items-center gap-4"><span className="h-[3px] w-16 bg-[#FFDA01]" /><span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#73787C]">Decorative · Technical · Architectural</span></div>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFDA01]">{localize(language, "Explore", "استكشف", "לגלות")}</p>
            <nav className="mt-7 grid gap-1" aria-label="Footer navigation">{navigation.map(([label, href], index) => <a key={label} href={href} className="group flex items-center justify-between border-b border-white/[0.07] py-4 text-sm text-[#A3A7AA] transition-colors hover:text-white"><span>{label}</span><span className="text-[9px] text-[#50555B] transition-colors group-hover:text-[#FFDA01]">0{index + 1}</span></a>)}</nav>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFDA01]">{localize(language, "Important links", "روابط مهمة", "קישורים חשובים")}</p>
            <nav className="mt-7 grid gap-1" aria-label={localize(language, "Important links", "روابط مهمة", "קישורים חשובים")}>{information.map(([label, href], index) => <a key={label} href={href} className="group flex items-center justify-between border-b border-white/[0.07] py-4 text-sm text-[#A3A7AA] transition-colors hover:text-white"><span>{label}</span><span className="text-[9px] text-[#50555B] transition-colors group-hover:text-[#FFDA01]">0{index + 1}</span></a>)}</nav>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFDA01]">{localize(language, "Contact", "تواصل", "יצירת קשר")}</p>
            <div className="mt-7 grid gap-5 text-sm text-[#A3A7AA]"><a href="mailto:info@kiswanilights.com" className="transition-colors hover:text-white">info@kiswanilights.com</a><a href="tel:+970599671209" className="transition-colors hover:text-white">+970 599 67 12 09</a><p>Ramallah<br />Palestine</p></div>
            <a href={`${rootPrefix}#contact`} className="group mt-9 inline-flex min-h-12 items-center gap-4 border border-white/15 px-5 text-xs font-bold transition-colors hover:border-[#FFDA01]"><span>{localize(language, "Start a project", "ابدأ مشروعك", "התחלת פרויקט")}</span><ArrowUpRight size={15} className="text-[#FFDA01] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a>
          </div>
        </div>
        <div className="flex flex-col gap-5 py-7 text-[10px] uppercase tracking-[0.15em] text-[#50555B] sm:flex-row sm:items-center sm:justify-between"><span>© 2026 Kiswani Lights</span><div className="flex flex-wrap gap-5"><a href="/checkout" className="transition-colors hover:text-[#FFDA01]">{localize(language, "Checkout", "إتمام الطلب", "לתשלום")}</a><a href="/privacy" className="transition-colors hover:text-[#FFDA01]">{localize(language, "Privacy", "الخصوصية", "פרטיות")}</a><a href="/terms" className="transition-colors hover:text-[#FFDA01]">{localize(language, "Terms", "الشروط", "תנאים")}</a><span>{localize(language, "Ramallah, Palestine", "رام الله، فلسطين", "רמאללה, פלסטין")}</span></div></div>
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-10 start-1/2 -translate-x-1/2 whitespace-nowrap text-[15vw] font-bold leading-none tracking-[-0.08em] text-white/[0.018]">KISWANI</div>
    </footer>
  );
}

export function KiswaniExperience() {
  const [language, setLanguage] = useStoredLanguage();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const current = copy[language];
  const filtered = useMemo(() => { const value = query.trim().toLowerCase(); return value ? products.filter((product) => [product.name, product.arabic, product.category, product.categoryAr, product.code].join(" ").toLowerCase().includes(value)) : products.slice(0, 8); }, [query]);

  useEffect(() => {
    const requestedSearch = new URLSearchParams(window.location.search).get("search");
    const shouldOpenContact = window.location.hash === "#contact";
    if (!requestedSearch && !shouldOpenContact) return;

    const timer = window.setTimeout(() => {
      if (requestedSearch) setQuery(requestedSearch);
      if (shouldOpenContact) setContactOpen(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const closeContact = () => {
    setContactOpen(false);
    if (window.location.hash === "#contact") {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    }
  };

  const handleContactNavigation = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest<HTMLAnchorElement>('a[href$="#contact"]');
    if (!link) return;
    event.preventDefault();
    setContactOpen(true);
  };

  return (
    <div onClick={handleContactNavigation} lang={language} dir={isRtlLanguage(language) ? "rtl" : "ltr"} className="min-h-screen bg-white text-[#0F1822]">
      <CinematicIntro />
      <Header language={language} setLanguage={setLanguage} onSearch={setQuery} />
      <main>
        <Hero language={language} />

        <section className="border-y border-white/10 bg-[#070B0E] px-4 py-3 text-white sm:px-8"><div className="mx-auto grid max-w-[1440px] gap-px bg-white/10 sm:grid-cols-3">{[["90+", current.statOne], ["48H", current.statTwo], ["360°", current.statThree]].map(([value, label], index) => <AnimatedMetric key={label} value={value} label={label} index={index} />)}</div></section>
        <div className="gold-motif-divider" aria-hidden="true"><span /></div>

        <section className="overflow-hidden bg-[#F4F2ED] px-4 py-16 sm:px-8 sm:py-24"><div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[0.24fr_1.2fr_0.72fr] lg:items-start"><motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}><span className="text-6xl font-light tracking-[-0.06em] text-[#A3A7AA]">02</span><motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.15 }} className="mt-4 h-px w-20 origin-left bg-[#FFDA01]" /></motion.div><motion.p initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }} className="brand-statement text-balance text-4xl font-semibold uppercase leading-[1.01] tracking-[-0.055em] text-[#0F1822] sm:text-6xl lg:text-7xl">{current.statement}</motion.p><motion.p initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.45 }} transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }} className="max-w-xl text-lg leading-8 text-[#50555B] lg:border-s lg:border-[#A3A7AA] lg:ps-8">{current.statementBody}</motion.p></div></section>

        <section id="collections" className="relative isolate overflow-hidden bg-[#E9E6DF] px-4 py-16 sm:px-8 sm:py-24"><WallSconceMotion /><div className="relative z-10 mx-auto max-w-[1440px]"><SectionIntro kicker={current.categoryKicker} title={current.categoryTitle} /><div className="mt-10 grid gap-3 pb-4 sm:grid-cols-2 xl:grid-cols-4">{categories.map((category, index) => <CategoryCard key={category.name} category={category} index={index} language={language} />)}</div></div></section>

        <VisualStories language={language} />

        <LightingTypes language={language} />
        <section id="products" className="relative isolate overflow-hidden bg-white px-4 py-16 sm:px-8 sm:py-24"><TrackLightsMotion /><div className="relative z-10 mx-auto max-w-[1440px]"><div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end"><SectionIntro kicker={current.productsKicker} title={current.productsTitle} /><label className="relative block w-full max-w-md"><span className="sr-only">{current.search}</span><Search size={18} className="pointer-events-none absolute start-5 top-1/2 -translate-y-1/2 text-[#73787C]" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={current.search} className="h-14 w-full border-0 border-b border-[#A3A7AA] bg-transparent pe-5 ps-12 text-sm text-[#0F1822] outline-none placeholder:text-[#73787C] focus:border-[#0F1822] focus:ring-0" /></label></div><motion.div layout className="mt-10 grid auto-rows-fr gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"><AnimatePresence mode="popLayout">{filtered.map((product) => <ProductCard key={product.code} product={product} language={language} open={setSelected} />)}</AnimatePresence></motion.div>{filtered.length === 0 && <div className="mt-10 border border-dashed border-[#A3A7AA] bg-[#CCCFCE]/15 px-6 py-12 text-center"><Search className="mx-auto text-[#73787C]" /><p className="mt-4 font-medium text-[#50555B]">{current.noResults}</p><button type="button" onClick={() => setQuery("")} className="mt-4 font-bold underline decoration-[#FFDA01] decoration-2 underline-offset-4">{current.clear}</button></div>}</div></section>

        <LightingPortfolioStrip language={language} />
        <FeaturedProjectExperience language={language} />

        <section id="contact" className="relative isolate min-h-[520px] overflow-hidden bg-[#070B0E] px-4 py-16 text-white sm:px-8 sm:py-24">
          <Media src="/images/editorial/contact-room.webp" alt={localize(language, "Warmly lit living space", "مساحة معيشة بإضاءة دافئة", "חלל מגורים בתאורה חמה")} sizes="100vw" className="object-cover object-center" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,7,9,0.94)_0%,rgba(5,7,9,0.78)_48%,rgba(5,7,9,0.22)_100%)] rtl:bg-[linear-gradient(270deg,rgba(5,7,9,0.94)_0%,rgba(5,7,9,0.78)_48%,rgba(5,7,9,0.22)_100%)]" />
          <div className="absolute inset-5 border border-white/15 sm:inset-8" aria-hidden="true" />
          <div className="gold-contact-geometry z-10 hidden lg:block" aria-hidden="true" />
          <div className="relative z-10 mx-auto flex min-h-[360px] max-w-[1440px] items-end">
            <div className="max-w-4xl">
              <div className="mb-6 flex h-14 w-14 items-center justify-center bg-[#FFDA01] text-[#0F1822]"><SunMedium size={27} strokeWidth={1.2} /></div>
              <h2 className="text-balance text-5xl font-semibold leading-[0.94] sm:text-7xl lg:text-8xl">{current.contactTitle}</h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">{current.contactBody}</p>
              <motion.button type="button" onClick={() => setContactOpen(true)} whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }} className="mt-7 inline-flex min-h-14 items-center justify-center gap-3 bg-[#FFDA01] px-8 text-sm font-bold text-[#0F1822] shadow-[0_18px_40px_rgba(7,11,14,0.28)] transition-colors hover:bg-[#FFD100]">{current.contactCta}<ArrowUpRight size={17} /></motion.button>
            </div>
          </div>
        </section>
      </main>

      <LuxuryFooter language={language} />

      <AnimatePresence>{selected && <ProductModal product={selected} language={language} close={() => setSelected(null)} />}</AnimatePresence>
      <AnimatePresence>{contactOpen && <ContactProjectDrawer language={language} onClose={closeContact} />}</AnimatePresence>
      <CartDrawer language={language} />
    </div>
  );
}
