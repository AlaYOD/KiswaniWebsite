"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, MapPin, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Language = "en" | "ar" | "he";
type ProjectCategory = "residential" | "hospitality" | "retail";
type ProjectFilter = ProjectCategory | "all";

type LocalizedText = Record<Language, string>;

type ProjectStudy = {
  id: string;
  title: LocalizedText;
  category: ProjectCategory;
  location: LocalizedText;
  year: string;
  image: string;
  summary: LocalizedText;
};

const copy: Record<Language, {
  kicker: string;
  title: string;
  body: string;
  all: string;
  categories: Record<ProjectCategory, string>;
  view: string;
  close: string;
  location: string;
  projectType: string;
  year: string;
}> = {
  en: {
    kicker: "PROJECT GALLERY",
    title: "Lighting studies shaped around the space.",
    body: "Explore residential, hospitality, and retail lighting directions where fixture scale, material, and atmosphere are considered together.",
    all: "All projects",
    categories: {
      residential: "Residential",
      hospitality: "Hospitality",
      retail: "Retail",
    },
    view: "View project",
    close: "Close project",
    location: "Location",
    projectType: "Project type",
    year: "Year",
  },
  ar: {
    kicker: "معرض المشاريع",
    title: "دراسات إنارة مصممة حول روح المكان.",
    body: "استكشف اتجاهات إنارة للمنازل والضيافة والتجزئة تجمع بين حجم القطعة والخامات والأجواء في رؤية واحدة.",
    all: "كل المشاريع",
    categories: {
      residential: "سكني",
      hospitality: "ضيافة",
      retail: "تجزئة",
    },
    view: "عرض المشروع",
    close: "إغلاق المشروع",
    location: "الموقع",
    projectType: "نوع المشروع",
    year: "السنة",
  },
  he: {
    kicker: "גלריית פרויקטים",
    title: "מחקרי תאורה שנבנו סביב החלל.",
    body: "גלו כיווני תאורה למגורים, אירוח וקמעונאות שבהם קנה המידה, החומרים והאווירה פועלים יחד.",
    all: "כל הפרויקטים",
    categories: {
      residential: "מגורים",
      hospitality: "אירוח",
      retail: "קמעונאות",
    },
    view: "צפייה בפרויקט",
    close: "סגירת הפרויקט",
    location: "מיקום",
    projectType: "סוג פרויקט",
    year: "שנה",
  },
};

const projects: ProjectStudy[] = [
  {
    id: "ramallah-dining",
    title: {
      en: "Warm dining residence",
      ar: "إضاءة دافئة لمساحة طعام سكنية",
      he: "פינת אוכל ביתית באור חם",
    },
    category: "residential",
    location: { en: "Ramallah", ar: "رام الله", he: "רמאללה" },
    year: "2026",
    image: "/images/editorial/project-dining.webp",
    summary: {
      en: "A sculptural pendant anchors the dining table while concealed light softens the surrounding joinery and walls.",
      ar: "قطعة معلقة نحتية تحدد مركز طاولة الطعام، مع إنارة مخفية تنعّم الخشب والجدران المحيطة.",
      he: "גוף תלוי פיסולי מעגן את שולחן האוכל, בעוד תאורה נסתרת מרככת את הנגרות והקירות סביבו.",
    },
  },
  {
    id: "bethlehem-lounge",
    title: {
      en: "Sculptural lounge",
      ar: "ردهة بإضاءة نحتية",
      he: "טרקלין עם תאורה פיסולית",
    },
    category: "hospitality",
    location: { en: "Bethlehem", ar: "بيت لحم", he: "בית לחם" },
    year: "2026",
    image: "/images/editorial/story-lounge.webp",
    summary: {
      en: "A low, expressive fixture creates intimacy over the seating group and brings warmth to natural textures.",
      ar: "قطعة معبّرة ومنخفضة تصنع أجواء حميمة فوق جلسة الضيوف وتضيف دفئاً للخامات الطبيعية.",
      he: "גוף נמוך ובעל נוכחות יוצר אינטימיות מעל אזור הישיבה ומחמם את המרקמים הטבעיים.",
    },
  },
  {
    id: "jerusalem-entrance",
    title: {
      en: "Halo entrance hall",
      ar: "مدخل بهالة ضوئية",
      he: "מבואת כניסה עם הילה",
    },
    category: "hospitality",
    location: { en: "Jerusalem", ar: "القدس", he: "ירושלים" },
    year: "2026",
    image: "/images/editorial/hero-interior.webp",
    summary: {
      en: "A suspended ring gives the tall entrance a clear visual center while warm reflected light reveals the timber ceiling.",
      ar: "حلقة معلقة تمنح المدخل المرتفع مركزاً بصرياً واضحاً، ويظهر الضوء المنعكس دفء السقف الخشبي.",
      he: "טבעת תלויה מעניקה למבואה הגבוהה מוקד ברור, ואור מוחזר חושף את חום תקרת העץ.",
    },
  },
  {
    id: "nablus-table",
    title: {
      en: "Linear table lighting",
      ar: "إنارة خطية للطاولات",
      he: "תאורה ליניארית לשולחן",
    },
    category: "retail",
    location: { en: "Nablus", ar: "نابلس", he: "שכם" },
    year: "2026",
    image: "/images/editorial/hero-technical.webp",
    summary: {
      en: "A precise linear fixture distributes comfortable task light while keeping the architectural view calm and uncluttered.",
      ar: "قطعة خطية دقيقة توزع ضوءاً مريحاً للعمل وتحافظ على المشهد المعماري هادئاً وواضحاً.",
      he: "גוף ליניארי מדויק מפזר אור עבודה נוח ושומר על מראה אדריכלי רגוע ונקי.",
    },
  },
  {
    id: "rawabi-living",
    title: {
      en: "Quiet living suite",
      ar: "جناح معيشة هادئ",
      he: "סלון שקט ומאוזן",
    },
    category: "residential",
    location: { en: "Rawabi", ar: "روابي", he: "רוואבי" },
    year: "2026",
    image: "/images/editorial/contact-room.webp",
    summary: {
      en: "Soft ambient layers support everyday living, with a clean pendant forming the room's main point of focus.",
      ar: "طبقات ضوء محيطية ناعمة تدعم تفاصيل الحياة اليومية، مع قطعة معلقة واضحة كنقطة التركيز الرئيسية.",
      he: "שכבות רכות של אור אווירה תומכות בשגרת היום, וגוף תלוי נקי יוצר את מוקד החלל.",
    },
  },
  {
    id: "albireh-stair",
    title: {
      en: "Night circulation",
      ar: "إضاءة الحركة الليلية",
      he: "תנועה לילית מוארת",
    },
    category: "retail",
    location: { en: "Al-Bireh", ar: "البيرة", he: "אל-בירה" },
    year: "2026",
    image: "/images/editorial/story-stair.webp",
    summary: {
      en: "Low-glare wall lighting guides movement along the stair while preserving the darker architectural atmosphere.",
      ar: "إنارة جدارية منخفضة الوهج ترشد الحركة على الدرج وتحافظ على الأجواء المعمارية الداكنة.",
      he: "תאורת קיר ללא סנוור מכוונת את התנועה במדרגות ושומרת על האווירה האדריכלית הכהה.",
    },
  },
];

const projectSpans = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-7",
  "lg:col-span-6",
  "lg:col-span-6",
];

export function ProjectsShowcase({ language }: { language: Language }) {
  const current = copy[language];
  const [filter, setFilter] = useState<ProjectFilter>("all");
  const [selected, setSelected] = useState<ProjectStudy | null>(null);
  const reducedMotion = useReducedMotion();

  const visibleProjects = useMemo(
    () => filter === "all" ? projects : projects.filter((project) => project.category === filter),
    [filter],
  );

  useEffect(() => {
    if (!selected) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selected]);

  const filters: Array<{ value: ProjectFilter; label: string }> = [
    { value: "all", label: current.all },
    { value: "residential", label: current.categories.residential },
    { value: "hospitality", label: current.categories.hospitality },
    { value: "retail", label: current.categories.retail },
  ];

  return (
    <>
      <section id="projects" className="relative overflow-hidden bg-white px-4 py-16 sm:px-8 sm:py-24">
        <div className="gold-section-rail" aria-hidden="true" />
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.62fr] lg:items-end">
            <div>
              <div className="mb-5 flex items-center gap-4"><span className="h-[3px] w-14 bg-[#AE6B0D]" /><p className="text-xs font-bold uppercase text-[#AE6B0D]">{current.kicker}</p></div>
              <h2 className="max-w-4xl text-balance text-4xl font-semibold leading-[1.04] text-[#0F1822] sm:text-5xl lg:text-6xl">{current.title}</h2>
            </div>
            <p className="max-w-xl text-base leading-8 text-[#50555B] lg:justify-self-end">{current.body}</p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label={current.kicker}>
            {filters.map((item) => {
              const active = filter === item.value;
              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setFilter(item.value)}
                  aria-pressed={active}
                  className={`min-h-11 border px-5 text-xs font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#AE6B0D] ${active ? "border-[#0F1822] bg-[#0F1822] text-white" : "border-[#CCCFCE] bg-white text-[#50555B] hover:border-[#AE6B0D] hover:text-[#0F1822]"}`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <motion.div layout className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-12">
            <AnimatePresence mode="popLayout">
              {visibleProjects.map((project, index) => (
                <motion.button
                  layout
                  key={project.id}
                  type="button"
                  onClick={() => setSelected(project)}
                  initial={{ opacity: 0, y: reducedMotion ? 0 : 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: reducedMotion ? 1 : 0.98 }}
                  transition={{ duration: reducedMotion ? 0 : 0.48, ease: [0.22, 1, 0.36, 1] }}
                  className={`gold-image-corners group relative min-h-[320px] overflow-hidden bg-[#070B0E] text-start focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFDA01] md:min-h-[380px] ${projectSpans[index % projectSpans.length]}`}
                  aria-label={`${current.view}: ${project.title[language]}`}
                >
                  <Image src={project.image} alt={project.title[language]} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 58vw" className="object-cover object-center transition-transform duration-[1000ms] ease-out group-hover:scale-[1.035]" />
                  <span className="absolute inset-0 bg-[linear-gradient(0deg,rgba(5,7,9,0.94)_0%,rgba(5,7,9,0.08)_66%)]" aria-hidden="true" />
                  <span className="absolute inset-x-0 bottom-0 z-10 p-7 text-white sm:p-8">
                    <span className="flex items-center gap-2 text-xs font-semibold text-[#FFDA01]"><MapPin size={14} />{project.location[language]} / {project.year}</span>
                    <span className="mt-3 flex items-end justify-between gap-5"><span className="text-2xl font-semibold leading-tight sm:text-3xl">{project.title[language]}</span><span className="flex h-11 w-11 shrink-0 items-center justify-center border border-white/35 transition-colors group-hover:border-[#FFDA01] group-hover:bg-[#FFDA01] group-hover:text-[#0F1822]"><ArrowUpRight size={18} /></span></span>
                    <span className="mt-3 block text-sm text-white/60">{current.categories[project.category]}</span>
                  </span>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <motion.div
            role="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.28 }}
            className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-[#050709]/90 p-4 backdrop-blur-sm sm:p-8"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setSelected(null);
            }}
          >
            <motion.section
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-dialog-title"
              initial={reducedMotion ? false : { opacity: 0, y: 24, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: 16, scale: 0.99 }}
              transition={{ duration: reducedMotion ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="relative grid w-full max-w-[1280px] overflow-hidden bg-white shadow-[0_40px_140px_rgba(0,0,0,0.46)] lg:grid-cols-[1.25fr_0.75fr]"
            >
              <button type="button" onClick={() => setSelected(null)} autoFocus className="absolute end-4 top-4 z-20 flex h-12 w-12 items-center justify-center bg-[#FFDA01] text-[#0F1822] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white" aria-label={current.close}><X size={20} /></button>
              <div className="relative min-h-[420px] bg-[#070B0E] sm:min-h-[620px]"><Image src={selected.image} alt={selected.title[language]} fill sizes="(max-width: 1024px) 100vw, 64vw" className="object-cover object-center" /></div>
              <div className="flex flex-col justify-between p-7 sm:p-10 lg:p-12">
                <div>
                  <div className="flex items-center gap-4"><span className="h-px w-12 bg-[#AE6B0D]" /><p className="text-xs font-bold uppercase text-[#AE6B0D]">{current.categories[selected.category]}</p></div>
                  <h2 id="project-dialog-title" className="mt-6 text-4xl font-semibold leading-tight text-[#0F1822] sm:text-5xl">{selected.title[language]}</h2>
                  <p className="mt-6 text-base leading-8 text-[#50555B]">{selected.summary[language]}</p>
                </div>
                <dl className="mt-10 grid gap-px bg-[#CCCFCE] sm:grid-cols-3 lg:grid-cols-1">
                  {[
                    [current.location, selected.location[language]],
                    [current.projectType, current.categories[selected.category]],
                    [current.year, selected.year],
                  ].map(([label, value]) => (
                    <div key={label} className="bg-[#F4F2ED] p-4"><dt className="text-[10px] font-bold uppercase text-[#73787C]">{label}</dt><dd className="mt-2 text-sm font-semibold text-[#0F1822]">{value}</dd></div>
                  ))}
                </dl>
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
