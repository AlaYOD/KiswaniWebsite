"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, CheckCircle2, ChevronLeft, ChevronRight, DraftingCompass, Lightbulb, Quote, Ruler } from "lucide-react";
import { useState } from "react";
import { CartDrawer } from "./CartSystem";
import { ContactProjectDrawer } from "./ContactProjectForm";
import {
  Header,
  LuxuryFooter,
  Media,
  isRtlLanguage,
  localize,
  useStoredLanguage,
  type Language,
} from "./KiswaniExperience";
import { ProjectsShowcase } from "./ProjectsShowcase";

type LocalizedText = Record<Language, string>;

const text = (en: string, ar: string, he: string): LocalizedText => ({ en, ar, he });

const pageCopy = {
  eyebrow: text("KISWANI PROJECTS / 2026", "مشاريع كسواني / 2026", "הפרויקטים של KISWANI / 2026"),
  title: text("Lighting projects", "مشاريع الإنارة", "פרויקטי תאורה"),
  lead: text(
    "Residential, hospitality, and retail spaces shaped through decorative presence, technical precision, and careful control of atmosphere.",
    "مساحات سكنية وضيافة وتجارية نصنع هويتها من خلال الحضور الديكوري والدقة التقنية والتحكم المدروس بالأجواء.",
    "חללי מגורים, אירוח ומסחר המעוצבים באמצעות נוכחות דקורטיבית, דיוק טכני ושליטה מוקפדת באווירה.",
  ),
  gallery: text("Explore projects", "استكشف المشاريع", "לצפייה בפרויקטים"),
  start: text("Start your project", "ابدأ مشروعك", "התחלת פרויקט"),
  processEyebrow: text("OUR PROJECT APPROACH", "منهجية عملنا", "תהליך העבודה שלנו"),
  processTitle: text(
    "From the first plan to the final lighting scene.",
    "من المخطط الأول إلى مشهد الإضاءة النهائي.",
    "מהתכנית הראשונה ועד לסצנת התאורה הסופית.",
  ),
  processBody: text(
    "Every project begins with the space. We align fixture scale, technical performance, and atmosphere before selecting the final products.",
    "كل مشروع يبدأ من فهم المساحة. نوازن بين حجم القطع والأداء التقني والأجواء قبل اختيار المنتجات النهائية.",
    "כל פרויקט מתחיל בחלל. אנו מאזנים בין קנה המידה של הגופים, הביצועים הטכניים והאווירה לפני בחירת המוצרים.",
  ),
  testimonialsEyebrow: text("PROJECT FEEDBACK", "آراء حول المشاريع", "משוב על פרויקטים"),
  testimonialsTitle: text("What project partners value.", "ما يقدّره شركاؤنا في المشاريع.", "מה ששותפי הפרויקט מעריכים."),
  ctaTitle: text("Planning a space that needs the right light?", "تخطط لمساحة تحتاج الإضاءة المناسبة؟", "מתכננים חלל שזקוק לאור הנכון?"),
  ctaBody: text("Share the plan, dimensions, or inspiration with our project team.", "شارك المخطط أو الأبعاد أو الإلهام مع فريق المشاريع.", "שתפו את צוות הפרויקטים בתכנית, במידות או בהשראה."),
} as const;

const processSteps = [
  {
    icon: Ruler,
    title: text("Read the space", "فهم المساحة", "הבנת החלל"),
    body: text(
      "We review dimensions, materials, ceiling conditions, and how people use the space.",
      "نراجع الأبعاد والخامات وحالة السقف وطريقة استخدام الناس للمساحة.",
      "אנו בוחנים מידות, חומרים, תנאי תקרה ואופן השימוש בחלל.",
    ),
  },
  {
    icon: DraftingCompass,
    title: text("Build the lighting direction", "بناء اتجاه الإنارة", "בניית כיוון התאורה"),
    body: text(
      "Decorative and technical layers are balanced around focus, comfort, and visual rhythm.",
      "نوازن بين الطبقات الديكورية والتقنية وفق نقاط التركيز والراحة والإيقاع البصري.",
      "השכבות הדקורטיביות והטכניות מאוזנות סביב מיקוד, נוחות וקצב חזותי.",
    ),
  },
  {
    icon: Lightbulb,
    title: text("Specify with confidence", "اختيار المواصفات بثقة", "מפרט בביטחון"),
    body: text(
      "Fixtures, output, temperature, and controls are resolved into a practical final selection.",
      "نحدد القطع وشدة الإضاءة وحرارة اللون وأنظمة التحكم ضمن اختيار نهائي عملي.",
      "הגופים, עוצמת האור, הטמפרטורה והבקרה מתגבשים לבחירה סופית ומעשית.",
    ),
  },
] as const;

const testimonials = [
  {
    quote: text(
      "The team translated our mood references into a clear fixture direction. Every recommendation felt connected to the architecture, not added after it.",
      "حوّل الفريق صور الإلهام التي شاركناها إلى اتجاه واضح لاختيار القطع. كل توصية بدت مرتبطة بالعمارة وليست إضافة لاحقة.",
      "הצוות תרגם את תמונות ההשראה שלנו לכיוון ברור לבחירת גופי התאורה. כל המלצה הרגישה מחוברת לאדריכלות ולא כתוספת מאוחרת.",
    ),
    source: text("Residential client", "عميل سكني", "לקוח מגורים"),
    location: text("Ramallah", "رام الله", "רמאללה"),
    image: "/images/editorial/project-dining.webp",
  },
  {
    quote: text(
      "Specifications were presented clearly, and the balance between decorative pieces and technical light made coordination much easier.",
      "قُدّمت المواصفات بوضوح، وجعل التوازن بين القطع الديكورية والإنارة التقنية عملية التنسيق أسهل بكثير.",
      "המפרטים הוצגו בצורה ברורה, והאיזון בין גופים דקורטיביים לתאורה טכנית הפך את התיאום לפשוט הרבה יותר.",
    ),
    source: text("Interior designer", "مصممة داخلية", "מעצבת פנים"),
    location: text("Bethlehem", "بيت لحم", "בית לחם"),
    image: "/images/editorial/story-lounge.webp",
  },
  {
    quote: text(
      "Kiswani helped us keep the retail space visually strong without sacrificing comfortable light for staff and customers.",
      "ساعدتنا كسواني في الحفاظ على حضور بصري قوي للمساحة التجارية من دون التضحية براحة الإضاءة للموظفين والعملاء.",
      "Kiswani עזרה לנו לשמור על נוכחות חזותית חזקה בחלל המסחרי בלי לוותר על אור נוח לצוות וללקוחות.",
    ),
    source: text("Retail project team", "فريق مشروع تجاري", "צוות פרויקט מסחרי"),
    location: text("Nablus", "نابلس", "שכם"),
    image: "/images/editorial/hero-technical.webp",
  },
] as const;

export function ProjectsPageExperience() {
  const [language, setLanguage] = useStoredLanguage();
  const [contactOpen, setContactOpen] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const current = (value: LocalizedText) => value[language];
  const testimonial = testimonials[testimonialIndex];
  const PreviousIcon = isRtlLanguage(language) ? ChevronRight : ChevronLeft;
  const NextIcon = isRtlLanguage(language) ? ChevronLeft : ChevronRight;

  const closeContact = () => setContactOpen(false);
  const handleContactNavigation = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest<HTMLAnchorElement>('a[href$="#contact"]');
    if (!link) return;
    event.preventDefault();
    setContactOpen(true);
  };

  return (
    <div
      onClick={handleContactNavigation}
      lang={language}
      dir={isRtlLanguage(language) ? "rtl" : "ltr"}
      className="min-h-screen bg-white text-[#0F1822]"
    >
      <Header language={language} setLanguage={setLanguage} rootPrefix="/" />

      <main>
        <section id="top" className="relative isolate h-[calc(100svh-210px)] min-h-[520px] max-h-[720px] overflow-hidden bg-[#070B0E] text-white">
          <Media
            src="/images/editorial/project-dining.webp"
            alt={localize(language, "Warm architectural dining project", "مشروع إنارة دافئ لمساحة طعام", "פרויקט תאורה אדריכלי חם לפינת אוכל")}
            sizes="100vw"
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,7,9,0.96)_0%,rgba(5,7,9,0.68)_48%,rgba(5,7,9,0.18)_78%)] rtl:bg-[linear-gradient(270deg,rgba(5,7,9,0.96)_0%,rgba(5,7,9,0.68)_48%,rgba(5,7,9,0.18)_78%)]" />
          <div className="absolute inset-5 border border-white/15 sm:inset-8" aria-hidden="true" />
          <div className="gold-hero-geometry z-10 hidden lg:block" aria-hidden="true" />

          <div className="relative z-10 mx-auto flex h-full max-w-[1440px] items-end px-8 pb-12 pt-20 sm:px-16 sm:pb-16 lg:items-center lg:px-20">
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-[860px]"
            >
              <div className="flex items-center gap-4">
                <span className="h-[3px] w-14 bg-[#FFDA01]" />
                <p className="text-[10px] font-bold uppercase text-[#FFDA01]">{current(pageCopy.eyebrow)}</p>
              </div>
              <h1 className="mt-6 text-balance text-5xl font-semibold leading-[0.92] sm:text-7xl lg:text-[88px]">
                {current(pageCopy.title)}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-white/72 sm:text-lg sm:leading-8">
                {current(pageCopy.lead)}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#projects" className="inline-flex min-h-13 items-center justify-center gap-3 bg-[#FFDA01] px-7 text-sm font-bold text-[#0F1822] transition-colors hover:bg-[#FFD100]">
                  {current(pageCopy.gallery)}
                  <ArrowDown size={17} aria-hidden="true" />
                </a>
                <button type="button" onClick={() => setContactOpen(true)} className="inline-flex min-h-13 items-center justify-center gap-3 border border-white/35 px-7 text-sm font-bold text-white transition-colors hover:border-white hover:bg-white hover:text-[#0F1822]">
                  {current(pageCopy.start)}
                  <ArrowUpRight size={17} aria-hidden="true" />
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        <ProjectsShowcase language={language} />

        <section className="overflow-hidden bg-[#070B0E] px-4 py-16 text-white sm:px-8 sm:py-24">
          <div className="mx-auto grid max-w-[1440px] border border-white/10 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="relative min-h-[340px] overflow-hidden bg-[#111719] sm:min-h-[440px] lg:min-h-[520px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={testimonial.image}
                  initial={reducedMotion ? false : { opacity: 0, scale: 1.025 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reducedMotion ? 0 : 0.55 }}
                  className="absolute inset-0"
                >
                  <Media
                    src={testimonial.image}
                    alt={current(testimonial.source)}
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover object-center"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(5,7,9,0.82)_0%,rgba(5,7,9,0.04)_68%)]" aria-hidden="true" />
              <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-6 p-6 sm:p-8">
                <div>
                  <p className="text-[10px] font-bold uppercase text-[#FFDA01]">{current(pageCopy.testimonialsEyebrow)}</p>
                  <p className="mt-2 text-xl font-semibold">{current(testimonial.location)}</p>
                </div>
                <span className="text-xs text-white/55">0{testimonialIndex + 1} / 0{testimonials.length}</span>
              </div>
            </div>

            <div className="flex min-w-0 flex-col justify-between p-6 sm:p-10 lg:p-12">
              <div>
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="text-[10px] font-bold uppercase text-[#FFDA01]">{current(pageCopy.testimonialsEyebrow)}</p>
                    <h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight sm:text-5xl">{current(pageCopy.testimonialsTitle)}</h2>
                  </div>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#FFDA01] text-[#0F1822]">
                    <Quote size={20} aria-hidden="true" />
                  </span>
                </div>

                <div className="mt-8 min-h-[190px] sm:min-h-[210px]">
                  <AnimatePresence mode="wait">
                    <motion.blockquote
                      key={`${testimonialIndex}-${language}`}
                      initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: reducedMotion ? 0 : 0.38 }}
                      className="text-balance text-2xl font-medium leading-[1.35] text-white/90 sm:text-3xl"
                    >
                      “{current(testimonial.quote)}”
                    </motion.blockquote>
                  </AnimatePresence>
                </div>
              </div>

              <div className="flex flex-col justify-between gap-6 border-t border-white/15 pt-6 sm:flex-row sm:items-end">
                <div>
                  <p className="text-sm font-bold text-white">{current(testimonial.source)}</p>
                  <p className="mt-1 text-xs text-[#A3A7AA]">{current(testimonial.location)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setTestimonialIndex((index) => (index - 1 + testimonials.length) % testimonials.length)}
                    aria-label={localize(language, "Previous testimonial", "الرأي السابق", "המלצה קודמת")}
                    title={localize(language, "Previous testimonial", "الرأي السابق", "המלצה קודמת")}
                    className="flex h-11 w-11 items-center justify-center border border-white/25 text-white transition-colors hover:border-[#FFDA01] hover:text-[#FFDA01]"
                  >
                    <PreviousIcon size={18} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setTestimonialIndex((index) => (index + 1) % testimonials.length)}
                    aria-label={localize(language, "Next testimonial", "الرأي التالي", "המלצה הבאה")}
                    title={localize(language, "Next testimonial", "الرأي التالي", "המלצה הבאה")}
                    className="flex h-11 w-11 items-center justify-center bg-[#FFDA01] text-[#0F1822] transition-colors hover:bg-[#FFD100]"
                  >
                    <NextIcon size={18} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#F4F2ED] px-4 py-16 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-[1440px]">
            <div className="grid gap-8 border-b border-[#CCCFCE] pb-10 lg:grid-cols-[1fr_0.62fr] lg:items-end">
              <div>
                <div className="flex items-center gap-4">
                  <span className="h-[3px] w-14 bg-[#FFDA01]" />
                  <p className="text-[10px] font-bold uppercase text-[#50555B]">{current(pageCopy.processEyebrow)}</p>
                </div>
                <h2 className="mt-5 max-w-4xl text-balance text-4xl font-semibold leading-[1.02] sm:text-5xl lg:text-6xl">
                  {current(pageCopy.processTitle)}
                </h2>
              </div>
              <p className="max-w-xl text-base leading-7 text-[#50555B] lg:justify-self-end">{current(pageCopy.processBody)}</p>
            </div>

            <div className="grid border-s border-t border-[#CCCFCE] md:grid-cols-3">
              {processSteps.map(({ icon: Icon, title, body }, index) => (
                <motion.div
                  key={title.en}
                  initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: reducedMotion ? 0 : 0.55, delay: index * 0.08 }}
                  className="border-b border-e border-[#CCCFCE] bg-white p-6 sm:p-8"
                >
                  <div className="flex items-start justify-between">
                    <span className="flex h-12 w-12 items-center justify-center bg-[#FFDA01]"><Icon size={21} aria-hidden="true" /></span>
                    <span className="text-xs text-[#A3A7AA]">0{index + 1}</span>
                  </div>
                  <h3 className="mt-7 text-2xl font-semibold">{current(title)}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#73787C]">{current(body)}</p>
                  <CheckCircle2 size={18} className="mt-6 text-[#0F1822]" aria-hidden="true" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#FFDA01] px-4 py-12 text-[#0F1822] sm:px-8 sm:py-16">
          <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-7 lg:flex-row lg:items-end">
            <div>
              <h2 className="max-w-4xl text-balance text-3xl font-semibold leading-tight sm:text-5xl">{current(pageCopy.ctaTitle)}</h2>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-[#3E454B] sm:text-base">{current(pageCopy.ctaBody)}</p>
            </div>
            <button type="button" onClick={() => setContactOpen(true)} className="inline-flex min-h-14 shrink-0 items-center justify-center gap-3 bg-[#0F1822] px-7 text-sm font-bold text-white transition-colors hover:bg-[#303A43]">
              {current(pageCopy.start)}
              <ArrowUpRight size={17} aria-hidden="true" />
            </button>
          </div>
        </section>
      </main>

      <LuxuryFooter language={language} rootPrefix="/" />
      <AnimatePresence>{contactOpen && <ContactProjectDrawer language={language} onClose={closeContact} />}</AnimatePresence>
      <CartDrawer language={language} />
    </div>
  );
}
