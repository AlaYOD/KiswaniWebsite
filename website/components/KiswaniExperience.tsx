"use client";

import Image from "next/image";
import { AnimatePresence, motion, useInView, useMotionTemplate, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  ChevronRight,
  Gauge,
  LampDesk,
  LampFloor,
  Lightbulb,
  Menu,
  Search,
  ShoppingBag,
  SunMedium,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { categories, getCategoryDetail, getCategoryName, getProductCategory, getProductDescription, getProductName, products, type Product } from "../lib/catalog";
import { CinematicIntro } from "./CinematicIntro";
import { CartDrawer, CartTrigger, useCart } from "./CartSystem";
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

export function Header({ language, setLanguage, rootPrefix = "" }: { language: Language; setLanguage: (value: Language) => void; rootPrefix?: string }) {
  const [open, setOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const current = copy[language];
  const links = ["#collections", "#types", "#projects", "#contact"];
  return (
    <motion.header initial={reducedMotion ? false : { opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }} className="sticky top-0 z-50 border-b border-white/10 bg-[#050709]/95 text-white shadow-[0_18px_60px_rgba(0,0,0,0.34)] backdrop-blur-xl">
      <div className="h-[3px] bg-[#FFDA01]" />
      <div className="hidden border-b border-white/[0.07] lg:block">
        <div className="mx-auto flex h-8 max-w-[1440px] items-center justify-between px-8 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#73787C]"><span>{localize(language, "Lighting is the soul of the space", "الإضاءة هي روح المكان", "התאורה היא הנשמה של החלל")}</span><div className="flex items-center gap-7"><a href="tel:+970599671209" className="transition-colors hover:text-[#FFDA01]">+970 599 67 12 09</a><span>{localize(language, "Ramallah · Palestine", "رام الله · فلسطين", "רמאללה · פלסטין")}</span></div></div>
      </div>
      <div className="relative mx-auto flex h-[88px] max-w-[1440px] items-center justify-between px-4 sm:h-[96px] sm:px-8">
        <a href={`${rootPrefix}#top`} aria-label="Kiswani Lights home" className="relative block h-14 w-44 shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFDA01] sm:h-16 sm:w-56"><Image unoptimized src="/images/kiswani-logo-original-white.png" alt="Kiswani Lights" fill priority sizes="(max-width: 640px) 176px, 224px" className="object-contain object-left rtl:object-right" /></a>
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 xl:flex" aria-label="Primary navigation">{current.nav.map((item, index) => <a key={item} href={`${rootPrefix}${links[index]}`} className="group relative py-4 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#A3A7AA] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFDA01]"><span className="me-2 text-[8px] text-[#50555B]">0{index + 1}</span>{item}<span className="absolute inset-x-0 bottom-1 h-px origin-left scale-x-0 bg-[#FFDA01] transition-transform duration-300 group-hover:scale-x-100" /></a>)}</nav>
        <div className="hidden items-center gap-2 xl:flex"><CartTrigger language={language} /><label className="relative"><span className="sr-only">Select language</span><select value={language} onChange={(event) => setLanguage(event.target.value as Language)} className="h-11 appearance-none border border-white/15 bg-[#050709] pe-8 ps-3 text-[10px] font-bold tracking-[0.1em] text-white outline-none transition-colors hover:border-[#FFDA01] focus:border-[#FFDA01]"><option value="en">EN</option><option value="ar">العربية</option><option value="he">עברית</option></select><span aria-hidden="true" className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-[8px] text-[#FFDA01]">▼</span></label><a href={`${rootPrefix}#contact`} className="group inline-flex h-11 items-center gap-3 bg-[#FFDA01] px-5 text-xs font-bold text-[#0F1822] transition-colors hover:bg-[#FFD100]"><span>{current.project}</span><ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a></div>
        <div className="flex items-center gap-2 xl:hidden"><CartTrigger compact language={language} /><button type="button" onClick={() => setOpen(!open)} className="flex h-11 w-11 items-center justify-center border border-white/20 text-white transition-colors hover:border-[#FFDA01] hover:text-[#FFDA01]" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-navigation">{open ? <X size={19} /> : <Menu size={19} />}</button></div>
        <div className="pointer-events-none absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
      <AnimatePresence>{open && <motion.div id="mobile-navigation" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }} className="border-t border-white/10 bg-[#050709] p-4 shadow-2xl xl:hidden"><nav className="grid" aria-label="Mobile navigation">{current.nav.map((item, index) => <a key={item} href={`${rootPrefix}${links[index]}`} onClick={() => setOpen(false)} className="flex items-center justify-between border-b border-white/10 px-2 py-5 text-sm font-semibold text-white transition-colors hover:text-[#FFDA01]"><span>{item}</span><span className="text-[9px] text-[#50555B]">0{index + 1}</span></a>)}</nav><label className="mt-4 block"><span className="sr-only">Select language</span><select value={language} onChange={(event) => setLanguage(event.target.value as Language)} className="h-12 w-full border-0 bg-[#FFDA01] px-4 text-center text-sm font-bold text-[#0F1822] outline-none"><option value="en">English</option><option value="ar">العربية</option><option value="he">עברית</option></select></label></motion.div>}</AnimatePresence>
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
    <section ref={heroRef} id="top" className="relative isolate min-h-[calc(100svh-96px)] overflow-hidden bg-[#070B0E]">
      <AnimatePresence mode="wait">
        <motion.div key={scene.image} initial={reduced ? false : { opacity: 0, scale: 1.025 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} style={{ y: reduced ? 0 : imageParallax }} className="absolute inset-0">
          <Media src={scene.image} alt={getCategoryName(scene, language)} sizes="100vw" priority={active === 0} className="object-center lg:object-[center_48%]" />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,11,14,0.94)_0%,rgba(7,11,14,0.72)_42%,rgba(7,11,14,0.18)_72%,rgba(7,11,14,0.42)_100%)] rtl:bg-[linear-gradient(270deg,rgba(7,11,14,0.94)_0%,rgba(7,11,14,0.72)_42%,rgba(7,11,14,0.18)_72%,rgba(7,11,14,0.42)_100%)]" aria-hidden="true" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(7,11,14,0.88)_0%,transparent_45%)]" aria-hidden="true" />
      <div className="absolute inset-x-5 top-5 bottom-5 border border-white/10 sm:inset-x-8 sm:top-8 sm:bottom-8" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-96px)] max-w-[1440px] items-end px-8 pb-14 pt-28 sm:px-16 sm:pb-20 lg:items-center lg:px-20 lg:py-20">
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
    <motion.a href={`/collections/${category.slug}`} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.22 }} whileHover={{ y: reducedMotion ? 0 : -10 }} onPointerMove={(event) => { if (event.pointerType !== "mouse" || reducedMotion) return; const bounds = event.currentTarget.getBoundingClientRect(); const x = (event.clientX - bounds.left) / bounds.width; const y = (event.clientY - bounds.top) / bounds.height; rotateY.set((x - 0.5) * 5); rotateX.set((0.5 - y) * 5); glowX.set(x * 100); glowY.set(y * 100); }} onPointerLeave={() => { rotateX.set(0); rotateY.set(0); glowX.set(50); glowY.set(50); }} style={{ rotateX: smoothRotateX, rotateY: smoothRotateY, transformPerspective: 1200 }} transition={{ duration: reducedMotion ? 0 : 0.7, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }} className={`group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFDA01] ${index % 2 ? "xl:translate-y-10" : ""}`}>
      <div className="light-sweep relative aspect-[3/4] overflow-hidden bg-[#070B0E] shadow-[0_22px_70px_rgba(7,11,14,0.16)]">
        <Media src={category.image} alt={name} sizes="(max-width: 768px) 100vw, 25vw" className="object-cover object-center transition-transform duration-[1100ms] ease-out group-hover:scale-[1.045]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(7,11,14,0.96)_0%,rgba(7,11,14,0.22)_58%,rgba(7,11,14,0.12)_100%)]" />
        <motion.div aria-hidden="true" style={{ background: glow }} className="absolute inset-0 opacity-0 mix-blend-screen transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5"><span className="text-xs font-semibold tracking-[0.18em] text-white/65">0{index + 1}</span><span className="h-px w-10 bg-[#FFDA01] transition-all duration-500 group-hover:w-16" /></div>
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#FFDA01]">KISWANI / 2026</p><h3 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.035em] text-white">{name}</h3><p className="mt-3 max-w-sm text-sm leading-6 text-white/60">{detail}</p><span className="mt-6 flex h-11 w-11 items-center justify-center border border-white/35 text-white transition-all group-hover:border-[#FFDA01] group-hover:bg-[#FFDA01] group-hover:text-[#0F1822]"><ChevronRight size={17} className={isRtlLanguage(language) ? "rotate-180" : ""} /></span></div>
      </div>
    </motion.a>
  );
}

export function ProductCard({ product, language, open }: { product: Product; language: Language; open: (product: Product) => void }) {
  const { add } = useCart();
  const name = getProductName(product, language);
  const category = getProductCategory(product, language);
  const description = getProductDescription(product, language);
  return (
    <motion.article layout initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} whileHover={{ y: -6 }} transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }} className="group overflow-hidden bg-[#F4F2ED] shadow-[0_18px_55px_rgba(7,11,14,0.06)] transition-shadow hover:shadow-[0_26px_80px_rgba(7,11,14,0.14)]">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#CCCFCE]/25"><Media src={product.image} alt={name} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw" className="object-cover object-center transition-transform duration-[1000ms] ease-out group-hover:scale-[1.035]" /><div className="absolute inset-0 bg-gradient-to-t from-[#070B0E]/35 via-transparent to-transparent" /><div className="absolute inset-x-0 top-0 flex items-center justify-between p-5"><span className="bg-[#FFDA01] px-3 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-[#0F1822]">{category}</span><span className="bg-[#070B0E]/85 px-3 py-2 text-[11px] tracking-[0.08em] text-white backdrop-blur-sm">{product.code}</span></div></div>
      <div className="p-5 xl:p-6"><div className="flex items-center justify-between gap-4"><span className="h-px w-12 bg-[#FFDA01]" /><span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#73787C]">KISWANI LIGHTS</span></div><h3 className="mt-6 text-xl font-semibold tracking-[-0.025em] text-[#0F1822] xl:text-2xl">{name}</h3><p className="mt-3 line-clamp-2 text-sm leading-6 text-[#50555B]">{description}</p><div className="mt-4 flex items-center justify-between gap-4"><p className="text-xs font-medium text-[#73787C]">{localize(language, "Price confirmed with order", "السعر يؤكد عند الطلب", "המחיר יאושר בעת ההזמנה")}</p><a href={`/products/${product.code.toLowerCase()}`} className="text-xs font-bold underline decoration-[#FFDA01] decoration-2 underline-offset-4">{localize(language, "Product page", "صفحة المنتج", "עמוד המוצר")}</a></div><div className="mt-6 grid grid-cols-[1fr_auto] gap-2"><button type="button" onClick={() => add(product)} className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#FFDA01] px-4 text-sm font-bold text-[#0F1822] transition-colors hover:bg-[#FFD100]"><ShoppingBag size={16} />{localize(language, "Add to cart", "أضف إلى السلة", "הוספה לסל")}</button><button type="button" onClick={() => open(product)} className="flex h-12 w-12 items-center justify-center bg-[#0F1822] text-white transition-colors hover:bg-[#50555B]" aria-label={copy[language].view}><ArrowUpRight size={16} /></button></div></div>
    </motion.article>
  );
}

export function ProductModal({ product, language, close }: { product: Product; language: Language; close: () => void }) {
  const { add } = useCart();
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
        <div className="p-7 sm:p-10 lg:p-12"><div className="h-[3px] w-14 bg-[#FFDA01]" /><p className="mt-7 text-xs font-bold tracking-[0.16em] text-[#73787C]">{product.code}</p><h2 id="product-title" className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[#0F1822]">{name}</h2><p className="mt-5 leading-7 text-[#50555B]">{description}</p><div className="mt-8 border border-[#CCCFCE]"><table className="w-full text-sm"><caption className="sr-only">Technical specifications</caption><tbody>{product.specs.map(([label, value]) => <tr key={label} className="border-b border-[#CCCFCE] last:border-0"><th scope="row" className="bg-[#CCCFCE]/20 px-4 py-4 text-start font-medium text-[#50555B]">{label}</th><td className="px-4 py-4 text-end font-semibold text-[#0F1822]">{value}</td></tr>)}</tbody></table></div><p className="mt-6 text-sm text-[#73787C]">{localize(language, "Our team will confirm price and availability before approval.", "سيؤكد فريقنا السعر والتوفر قبل اعتماد الطلب.", "הצוות שלנו יאשר מחיר וזמינות לפני אישור ההזמנה.")}</p><div className="mt-6 grid gap-3"><button type="button" onClick={() => { add(product); close(); }} className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#FFDA01] px-6 text-sm font-bold text-[#0F1822]"><ShoppingBag size={16} />{localize(language, "Add to cart", "أضف إلى السلة", "הוספה לסל")}</button><button type="button" onClick={close} className="min-h-12 border border-[#0F1822] px-6 text-sm font-bold text-[#0F1822]">{current.close}</button></div></div>
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
    <section ref={sectionRef} id="types" className="relative isolate overflow-hidden bg-[#070B0E] px-4 py-28 text-white sm:px-8 sm:py-40">
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
        <div className="grid gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
          <div className="lg:sticky lg:top-36 lg:self-start"><SectionIntro dark kicker={current.systemsKicker} title={current.systemsTitle} /><p className="mt-8 max-w-lg text-base leading-8 text-[#A3A7AA]">{current.systemsBody}</p></div>
          <div className="grid border-l border-t border-white/10 sm:grid-cols-2">
            {types.map(([Icon, title, body], index) => (
              <motion.div key={title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }} whileHover={{ backgroundColor: "rgba(255,218,1,0.055)" }} className="relative overflow-hidden border-b border-r border-white/10 bg-[#070B0E] p-8 sm:p-10">
                <motion.div aria-hidden="true" animate={{ opacity: illuminated ? 1 : 0 }} transition={{ delay: reducedMotion ? 0 : 0.5 + index * 0.09, duration: reducedMotion ? 0 : 0.8 }} className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,218,1,0.045),transparent_48%)]" />
                <div className="relative flex items-start justify-between"><Icon size={46} strokeWidth={1.15} className="text-[#FFDA01]" /><span className="text-xs tracking-[0.18em] text-[#73787C]">0{index + 1}</span></div><h3 className="relative mt-14 text-2xl font-semibold tracking-[-0.025em]">{title}</h3><p className="relative mt-4 text-sm leading-7 text-[#A3A7AA]">{body}</p>
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
    [localize(language, "Projects", "المشاريع", "פרויקטים"), `${rootPrefix}#projects`],
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
  const current = copy[language];
  const filtered = useMemo(() => { const value = query.trim().toLowerCase(); return value ? products.filter((product) => [product.name, product.arabic, product.category, product.categoryAr, product.code].join(" ").toLowerCase().includes(value)) : products.slice(0, 8); }, [query]);
  return (
    <div lang={language} dir={isRtlLanguage(language) ? "rtl" : "ltr"} className="min-h-screen bg-white text-[#0F1822]">
      <CinematicIntro />
      <Header language={language} setLanguage={setLanguage} />
      <main>
        <Hero language={language} />

        <section className="border-y border-white/10 bg-[#070B0E] px-4 py-3 text-white sm:px-8"><div className="mx-auto grid max-w-[1440px] gap-px bg-white/10 sm:grid-cols-3">{[["90+", current.statOne], ["48H", current.statTwo], ["360°", current.statThree]].map(([value, label], index) => <AnimatedMetric key={label} value={value} label={label} index={index} />)}</div></section>

        <section className="overflow-hidden bg-[#F4F2ED] px-4 py-28 sm:px-8 sm:py-40"><div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[0.24fr_1.2fr_0.72fr] lg:items-start"><motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}><span className="text-6xl font-light tracking-[-0.06em] text-[#A3A7AA]">02</span><motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.15 }} className="mt-6 h-px w-20 origin-left bg-[#FFDA01]" /></motion.div><motion.p initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }} className="brand-statement text-balance text-4xl font-semibold uppercase leading-[1.01] tracking-[-0.055em] text-[#0F1822] sm:text-6xl lg:text-7xl">{current.statement}</motion.p><motion.p initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.45 }} transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }} className="max-w-xl text-lg leading-8 text-[#50555B] lg:border-s lg:border-[#A3A7AA] lg:ps-10">{current.statementBody}</motion.p></div></section>

        <section id="collections" className="relative isolate overflow-hidden bg-[#E9E6DF] px-4 py-28 sm:px-8 sm:py-40"><WallSconceMotion /><div className="relative z-10 mx-auto max-w-[1440px]"><SectionIntro kicker={current.categoryKicker} title={current.categoryTitle} /><div className="mt-16 grid gap-3 pb-10 sm:grid-cols-2 xl:grid-cols-4">{categories.map((category, index) => <CategoryCard key={category.name} category={category} index={index} language={language} />)}</div></div></section>

        <LightingTypes language={language} />
        <section id="products" className="relative isolate overflow-hidden bg-white px-4 py-28 sm:px-8 sm:py-40"><TrackLightsMotion /><div className="relative z-10 mx-auto max-w-[1440px]"><div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end"><SectionIntro kicker={current.productsKicker} title={current.productsTitle} /><label className="relative block w-full max-w-md"><span className="sr-only">{current.search}</span><Search size={18} className="pointer-events-none absolute start-5 top-1/2 -translate-y-1/2 text-[#73787C]" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={current.search} className="h-14 w-full border-0 border-b border-[#A3A7AA] bg-transparent pe-5 ps-12 text-sm text-[#0F1822] outline-none placeholder:text-[#73787C] focus:border-[#0F1822] focus:ring-0" /></label></div><motion.div layout className="mt-16 grid gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"><AnimatePresence mode="popLayout">{filtered.map((product) => <ProductCard key={product.code} product={product} language={language} open={setSelected} />)}</AnimatePresence></motion.div>{filtered.length === 0 && <div className="mt-12 border border-dashed border-[#A3A7AA] bg-[#CCCFCE]/15 px-6 py-16 text-center"><Search className="mx-auto text-[#73787C]" /><p className="mt-4 font-medium text-[#50555B]">{current.noResults}</p><button type="button" onClick={() => setQuery("")} className="mt-4 font-bold underline decoration-[#FFDA01] decoration-2 underline-offset-4">{current.clear}</button></div>}</div></section>

        <LightingPortfolioStrip language={language} />
        <FeaturedProjectExperience language={language} />

        <section id="contact" className="relative overflow-hidden bg-[#FFDA01] px-4 py-28 before:absolute before:inset-x-0 before:top-0 before:h-2 before:bg-[#070B0E] sm:px-8 sm:py-40"><div className="relative z-10 mx-auto grid max-w-[1440px] items-end gap-14 lg:grid-cols-[1fr_auto]"><div><div className="mb-10 flex h-16 w-16 items-center justify-center border border-[#0F1822]"><SunMedium size={30} strokeWidth={1.2} /></div><h2 className="max-w-5xl text-balance text-5xl font-semibold leading-[0.94] tracking-[-0.065em] sm:text-7xl lg:text-8xl">{current.contactTitle}</h2><p className="mt-8 max-w-2xl text-lg leading-8 text-[#0F1822]/70">{current.contactBody}</p></div><motion.a href="mailto:info@kiswanilights.com" whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }} className="inline-flex min-h-16 items-center justify-center gap-3 bg-[#070B0E] px-9 text-sm font-bold text-white shadow-[0_18px_40px_rgba(7,11,14,0.2)]">{current.contactCta}<ArrowUpRight size={17} /></motion.a></div></section>
      </main>

      <LuxuryFooter language={language} />

      <AnimatePresence>{selected && <ProductModal product={selected} language={language} close={() => setSelected(null)} />}</AnimatePresence>
      <CartDrawer language={language} />
    </div>
  );
}
