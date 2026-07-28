"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, LampDesk, LampFloor, Lightbulb, MapPin, MoveHorizontal, SunMedium, ThermometerSun } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { getProductSlug, products } from "../lib/catalog";
import type { Language } from "./KiswaniExperience";

const temperatures = {
  warm: { label: "Warm", arabic: "دافئ", kelvin: "2700K", overlay: "rgba(255, 174, 58, 0.18)", filter: "sepia(0.18) saturate(1.18)" },
  natural: { label: "Natural", arabic: "طبيعي", kelvin: "3500K", overlay: "rgba(255, 218, 1, 0.055)", filter: "saturate(1.02)" },
  cool: { label: "Cool", arabic: "بارد", kelvin: "5000K", overlay: "rgba(176, 213, 255, 0.17)", filter: "saturate(0.88) contrast(1.02)" },
} as const;

type Temperature = keyof typeof temperatures;

function BrandEdgeOrnament({ side }: { side: "start" | "end" }) {
  const icons = [Lightbulb, LampDesk, LampFloor];
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-y-0 z-0 hidden w-24 overflow-hidden xl:block ${side === "start" ? "start-0" : "end-0"}`}>
      <span className={`absolute inset-y-0 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent ${side === "start" ? "start-8" : "end-8"}`} />
      <span className={`absolute top-[12%] h-20 w-px rotate-[28deg] bg-[#FFDA01]/65 ${side === "start" ? "start-14" : "end-14"}`} />
      <span className={`absolute top-[26%] h-10 w-10 rotate-45 border border-white/10 ${side === "start" ? "start-3" : "end-3"}`} />
      <span className={`absolute bottom-[18%] h-24 w-px -rotate-[28deg] bg-[#FFDA01]/45 ${side === "start" ? "start-14" : "end-14"}`} />
      <div className="absolute inset-y-[18%] inset-x-0 flex flex-col items-center justify-around">
        {icons.map((Icon, index) => <motion.span key={index} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 0.46, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.65, delay: index * 0.12 }} className="flex h-12 w-12 items-center justify-center border border-white/10 bg-[#050709]"><Icon size={20} strokeWidth={1.1} className={index === 1 ? "text-[#FFDA01]" : "text-white"} /></motion.span>)}
      </div>
      <div className={`absolute bottom-[7%] flex items-center gap-2 ${side === "start" ? "start-3 rotate-90" : "end-3 -rotate-90"}`}><span className="h-px w-10 bg-[#FFDA01]" /><span className="whitespace-nowrap text-[8px] font-bold uppercase tracking-[0.24em] text-white/35">KISWANI / LIGHT</span></div>
    </div>
  );
}

export function KineticLightSculpture({ language }: { language: Language }) {
  const isArabic = language === "ar";
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const visible = useInView(sectionRef, { once: true, amount: 0.2 });
  const [illuminated, setIlluminated] = useState(true);
  const tiltX = useMotionValue(-4);
  const tiltY = useMotionValue(8);
  const smoothX = useSpring(tiltX, { stiffness: 150, damping: 22, mass: 0.55 });
  const smoothY = useSpring(tiltY, { stiffness: 150, damping: 22, mass: 0.55 });
  const bulbs = [
    { left: "16%", top: "43%", z: 82, size: 26 },
    { left: "31%", top: "25%", z: 54, size: 20 },
    { left: "50%", top: "15%", z: 96, size: 30 },
    { left: "69%", top: "27%", z: 62, size: 22 },
    { left: "82%", top: "48%", z: 74, size: 25 },
  ];

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden bg-[#050709] px-4 py-24 text-white sm:px-8 sm:py-32 lg:py-40">
      <BrandEdgeOrnament side="start" />
      <BrandEdgeOrnament side="end" />
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_72%_48%,rgba(255,218,1,0.09),transparent_28%)]" />
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.6)_1px,transparent_1px)] [background-size:72px_72px]" />
      <motion.span aria-hidden="true" initial={{ scaleX: 0 }} animate={visible ? { scaleX: 1 } : undefined} transition={{ duration: reducedMotion ? 0 : 1.2, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-transparent via-[#FFDA01] to-transparent" />

      <div className="relative z-10 mx-auto grid max-w-[1440px] items-center gap-14 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={visible ? { opacity: 1, y: 0 } : undefined} transition={{ duration: reducedMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}>
          <div className="flex items-center gap-4"><span className="h-[3px] w-14 bg-[#FFDA01]" /><p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#FFDA01]">{isArabic ? "منحوتة ضوئية تفاعلية" : "INTERACTIVE LIGHT SCULPTURE"}</p></div>
          <h2 className="mt-7 max-w-2xl text-balance text-5xl font-semibold leading-[0.94] tracking-[-0.055em] sm:text-6xl lg:text-7xl">{isArabic ? "هندسة تتحرك. وضوء يبدو حيّاً." : "Geometry in motion. Light that feels alive."}</h2>
          <p className="mt-7 max-w-xl text-base leading-8 text-[#A3A7AA]">{isArabic ? "حرّك المؤشر فوق المنحوتة لترى العمق من كل زاوية، ثم شغّل الضوء أو أطفئه لتتغيّر الشخصية بالكامل." : "Move across the sculpture to explore its depth from every angle, then switch the light on or off to change its character completely."}</p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <motion.button type="button" onClick={() => setIlluminated((value) => !value)} whileTap={{ scale: 0.97 }} aria-pressed={illuminated} className={`inline-flex min-h-14 items-center gap-3 px-6 text-sm font-bold transition-colors ${illuminated ? "bg-[#FFDA01] text-[#0F1822]" : "border border-white/20 bg-transparent text-white hover:border-[#FFDA01]"}`}><SunMedium size={18} />{illuminated ? (isArabic ? "الإضاءة تعمل" : "Light is on") : (isArabic ? "تشغيل الإضاءة" : "Turn light on")}</motion.button>
            <span className="text-xs leading-6 text-[#73787C]">{isArabic ? "تفاعل ثلاثي الأبعاد على الكمبيوتر" : "3D pointer interaction on desktop"}</span>
          </div>
        </motion.div>

        <div onPointerMove={(event) => { if (event.pointerType !== "mouse" || reducedMotion) return; const bounds = event.currentTarget.getBoundingClientRect(); const x = (event.clientX - bounds.left) / bounds.width - 0.5; const y = (event.clientY - bounds.top) / bounds.height - 0.5; tiltY.set(x * 20); tiltX.set(-y * 14); }} onPointerLeave={() => { tiltX.set(-4); tiltY.set(8); }} className="relative min-h-[500px] cursor-grab overflow-hidden border border-white/10 bg-[#080D11] active:cursor-grabbing sm:min-h-[640px] [perspective:1200px]">
          <motion.div animate={{ opacity: illuminated ? 0.42 : 0.05, scale: illuminated ? 1 : 0.72 }} transition={{ duration: reducedMotion ? 0 : 0.8 }} style={{ x: "-50%" }} className="pointer-events-none absolute left-1/2 top-[16%] h-[62%] w-[62%] rounded-full bg-[#FFDA01]/20 blur-[80px]" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-8 border border-white/[0.08] sm:inset-12" aria-hidden="true" />
          <span className="absolute end-5 top-5 text-[9px] font-bold uppercase tracking-[0.2em] text-[#50555B]">X / Y / Z</span>

          <motion.div initial={reducedMotion ? false : { opacity: 0, scale: 0.72, rotateX: -18 }} animate={visible ? { opacity: 1, scale: 1, rotateX: 0 } : undefined} transition={{ duration: reducedMotion ? 0 : 1.1, delay: reducedMotion ? 0 : 0.15, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-[10%] flex items-center justify-center [transform-style:preserve-3d]">
            <motion.div style={{ rotateX: smoothX, rotateY: smoothY, transformStyle: "preserve-3d" }} className="relative h-[330px] w-[330px] sm:h-[440px] sm:w-[440px]">
              <motion.div animate={reducedMotion ? undefined : { rotateY: [0, 360] }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }} className="absolute inset-0 [transform-style:preserve-3d]">
                <div className="absolute inset-[7%] rounded-[50%] border border-white/25 shadow-[inset_0_0_24px_rgba(255,255,255,0.06)]" style={{ transform: "rotateX(66deg) rotateZ(8deg) translateZ(46px)" }} />
                <div className="absolute inset-[16%] rounded-[50%] border-2 border-[#FFDA01]/70 shadow-[0_0_28px_rgba(255,218,1,0.16)]" style={{ transform: "rotateX(72deg) rotateZ(-34deg) translateZ(-6px)" }} />
                <div className="absolute inset-[25%] rounded-[50%] border border-white/35" style={{ transform: "rotateX(58deg) rotateZ(58deg) translateZ(72px)" }} />
                <div className="absolute left-1/2 top-[12%] h-[58%] w-3 bg-[linear-gradient(90deg,#0B0F12,#50555B,#111719)] shadow-[0_18px_34px_rgba(0,0,0,0.5)]" style={{ transform: "translateX(-50%) translateZ(34px)" }} />
                <div className="absolute left-1/2 top-[62%] h-20 w-20 rounded-full border border-white/20 bg-[radial-gradient(circle_at_36%_30%,#73787C,#101719_64%)] shadow-[0_18px_40px_rgba(0,0,0,0.5)]" style={{ transform: "translateX(-50%) translateZ(38px)" }} />
                {bulbs.map((bulb, index) => <div key={index} className="absolute" style={{ left: bulb.left, top: bulb.top, transform: `translateZ(${bulb.z}px)` }}><motion.span animate={{ opacity: illuminated ? [0.72, 1, 0.82] : 0.2, scale: illuminated ? [0.96, 1.06, 1] : 0.88, boxShadow: illuminated ? "0 0 28px 8px rgba(255,218,1,0.45)" : "0 0 0 rgba(255,218,1,0)" }} transition={{ duration: reducedMotion ? 0 : 2.6 + index * 0.18, repeat: reducedMotion ? 0 : Infinity, repeatType: "mirror", delay: index * 0.13 }} className={`block rounded-full border border-white/30 ${illuminated ? "bg-[#FFDA01]" : "bg-[#50555B]"}`} style={{ width: bulb.size, height: bulb.size }} /></div>)}
              </motion.div>

              <motion.div animate={{ opacity: illuminated ? 0.28 : 0, scaleY: illuminated ? 1 : 0.72 }} transition={{ duration: reducedMotion ? 0 : 0.8 }} className="absolute left-1/2 top-[62%] h-[52%] w-[72%] origin-top bg-[linear-gradient(180deg,rgba(255,218,1,0.38),transparent_78%)] blur-xl [clip-path:polygon(44%_0,56%_0,100%_100%,0_100%)]" style={{ x: "-50%", z: -30 }} />
            </motion.div>
          </motion.div>

          <motion.div animate={{ opacity: illuminated ? 0.46 : 0.14, scaleX: illuminated ? 1 : 0.72 }} transition={{ duration: reducedMotion ? 0 : 0.8 }} style={{ x: "-50%" }} className="absolute bottom-[9%] left-1/2 h-6 w-[46%] rounded-[50%] bg-[#FFDA01]/35 blur-xl" aria-hidden="true" />
          <div className="absolute bottom-5 start-5 flex items-center gap-3"><span className={`h-2 w-2 rounded-full ${illuminated ? "bg-[#FFDA01] shadow-[0_0_12px_rgba(255,218,1,.8)]" : "bg-[#50555B]"}`} /><span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#73787C]">{illuminated ? "ILLUMINATED" : "STANDBY"}</span></div>
        </div>
      </div>
    </section>
  );
}

export function PageMotionFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  return (
    <AnimatePresence mode="wait" initial>
      <motion.div key={pathname} initial={reducedMotion ? false : { opacity: 0, y: 14, clipPath: "inset(0 0 3% 0)" }} animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }} exit={reducedMotion ? undefined : { opacity: 0, y: -8 }} transition={{ duration: reducedMotion ? 0 : 0.48, ease: [0.22, 1, 0.36, 1] }}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export function FeaturedProjectExperience({ language }: { language: Language }) {
  const isArabic = language === "ar";
  const [reveal, setReveal] = useState(64);
  const [temperature, setTemperature] = useState<Temperature>("warm");
  const [sliderFocused, setSliderFocused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const visible = useInView(sectionRef, { amount: 0.16, once: true });
  const reducedMotion = useReducedMotion();
  const activeTemperature = temperatures[temperature];
  const featuredProducts = [products[3], products[6], products[8]];

  return (
    <section ref={sectionRef} id="projects" className="relative isolate overflow-hidden bg-[#050709] px-4 py-24 text-white sm:px-8 sm:py-32 lg:py-40">
      <motion.div aria-hidden="true" initial={{ scaleX: 0 }} animate={visible ? { scaleX: 1 } : undefined} transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-x-0 top-0 h-1 origin-left bg-[#FFDA01]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_28%,rgba(255,218,1,0.08),transparent_32%)]" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[1440px]">
        <div className="mb-14 grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <div className="flex items-center gap-4"><span className="h-[3px] w-14 bg-[#FFDA01]" /><p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#FFDA01]">{isArabic ? "مشروع مميز" : "FEATURED PROJECT"}</p></div>
            <h2 className="mt-6 text-balance text-5xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-6xl lg:text-7xl">{isArabic ? "شاهد كيف يغيّر الضوء إحساس المكان." : "See how light changes the feeling of space."}</h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-[#A3A7AA] lg:justify-self-end">{isArabic ? "اسحب الخط للمقارنة بين المشهد الهادئ قبل تشغيل الإنارة والنتيجة المعمارية النهائية، ثم جرّب درجات حرارة الضوء المختلفة." : "Drag the line to compare the quiet space before illumination with the final architectural scene, then explore how color temperature changes the atmosphere."}</p>
        </div>

        <div className="relative overflow-hidden border border-white/10 bg-[#0F1822] shadow-[0_45px_140px_rgba(0,0,0,0.44)]">
          <div className="relative min-h-[580px] sm:min-h-[720px] lg:min-h-[820px]">
            <motion.div initial={reducedMotion ? false : { scale: 1.085 }} animate={visible ? { scale: 1.025 } : undefined} transition={{ duration: reducedMotion ? 0 : 10, ease: "easeOut" }} className="absolute inset-0">
              <Image unoptimized src="/images/editorial/project-dining.webp" alt={isArabic ? "مشروع إنارة داخلي قبل تشغيل الإضاءة" : "Interior lighting project before illumination"} fill sizes="100vw" className="object-cover object-center brightness-[0.42] saturate-[0.58]" />
            </motion.div>

            <motion.div initial={reducedMotion ? false : { scale: 1.085 }} animate={visible ? { scale: 1.025 } : undefined} transition={{ duration: reducedMotion ? 0 : 10, ease: "easeOut" }} className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - reveal}% 0 0)` }}>
              <Image unoptimized src="/images/editorial/project-dining.webp" alt={isArabic ? "مشروع إنارة داخلي بعد تشغيل الإضاءة" : "Interior lighting project after illumination"} fill sizes="100vw" className="object-cover object-center transition-[filter] duration-700" style={{ filter: activeTemperature.filter }} />
              <div className="absolute inset-0 transition-colors duration-700 mix-blend-soft-light" style={{ backgroundColor: activeTemperature.overlay }} aria-hidden="true" />
            </motion.div>

            <div className="absolute inset-y-0 z-20 w-px bg-white shadow-[0_0_28px_rgba(255,218,1,0.95)]" style={{ left: `${reveal}%` }} aria-hidden="true"><span className={`absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#FFDA01] bg-[#050709] text-[#FFDA01] shadow-[0_0_42px_rgba(255,218,1,0.3)] transition-shadow ${sliderFocused ? "ring-4 ring-white ring-offset-4 ring-offset-[#050709]" : ""}`}><MoveHorizontal size={19} /></span></div>
            <input dir="ltr" type="range" min="8" max="92" value={reveal} onChange={(event) => setReveal(Number(event.target.value))} onFocus={() => setSliderFocused(true)} onBlur={() => setSliderFocused(false)} className="project-reveal-slider absolute inset-0 z-30 h-full w-full cursor-ew-resize opacity-0" aria-label={isArabic ? "حرّك للمقارنة قبل وبعد الإضاءة" : "Move to compare before and after lighting"} />

            <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-between p-6 text-[10px] font-bold uppercase tracking-[0.2em] sm:p-9"><span className="border border-white/15 bg-[#050709]/72 px-4 py-3 backdrop-blur-md">{isArabic ? "قبل" : "BEFORE"}</span><span className="bg-[#FFDA01] px-4 py-3 text-[#0F1822]">{isArabic ? "بعد" : "AFTER"}</span></div>
            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#050709]/80 via-transparent to-[#050709]/12" aria-hidden="true" />

            <div className="pointer-events-none absolute inset-x-5 bottom-5 z-20 grid gap-3 sm:inset-x-9 sm:bottom-9 md:grid-cols-3">
              {[
                [MapPin, isArabic ? "الموقع" : "Location", isArabic ? "إقامة خاصة، رام الله" : "Private residence, Ramallah"],
                [SunMedium, isArabic ? "نوع المشروع" : "Project type", isArabic ? "إنارة داخلية ومعمارية" : "Interior & architectural"],
                [ThermometerSun, isArabic ? "درجة الضوء" : "Lighting scene", activeTemperature.kelvin],
              ].map(([Icon, label, value]) => {
                const ItemIcon = Icon as typeof MapPin;
                return <div key={String(label)} className="border border-white/10 bg-[#050709]/72 p-5 backdrop-blur-md"><ItemIcon size={18} className="text-[#FFDA01]" /><p className="mt-4 text-[9px] font-bold uppercase tracking-[0.18em] text-[#73787C]">{String(label)}</p><p className="mt-1 text-sm font-semibold text-white">{String(value)}</p></div>;
              })}
            </div>
          </div>
        </div>

        <div className="grid border-x border-b border-white/10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="border-b border-white/10 p-7 sm:p-10 lg:border-b-0 lg:border-e">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#73787C]">{isArabic ? "اختر حرارة الضوء" : "SELECT LIGHT TEMPERATURE"}</p>
            <div className="mt-5 grid grid-cols-3 gap-2" role="group" aria-label={isArabic ? "درجة حرارة الضوء" : "Light temperature"}>
              {(Object.keys(temperatures) as Temperature[]).map((key) => {
                const option = temperatures[key];
                const active = key === temperature;
                return <button key={key} type="button" onClick={() => setTemperature(key)} aria-pressed={active} className={`min-h-16 border px-3 text-start transition-all ${active ? "border-[#FFDA01] bg-[#FFDA01] text-[#0F1822]" : "border-white/10 text-[#A3A7AA] hover:border-white/35 hover:text-white"}`}><span className="block text-xs font-bold">{isArabic ? option.arabic : option.label}</span><span className="mt-1 block text-[10px] opacity-60">{option.kelvin}</span></button>;
              })}
            </div>
          </div>

          <div className="p-7 sm:p-10">
            <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
              <div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#73787C]">{isArabic ? "المنتجات المستخدمة" : "PRODUCTS USED"}</p><div className="mt-5 flex flex-wrap gap-2">{featuredProducts.map((product) => <a key={product.code} href={`/products/${getProductSlug(product)}`} className="border border-white/10 px-4 py-3 text-xs font-semibold text-[#CCCFCE] transition-colors hover:border-[#FFDA01] hover:text-white">{isArabic ? product.arabic : product.name}</a>)}</div></div>
              <a href={`/products/${getProductSlug(featuredProducts[0])}`} className="group inline-flex min-h-14 shrink-0 items-center justify-center gap-3 bg-[#FFDA01] px-6 text-sm font-bold text-[#0F1822] transition-colors hover:bg-[#FFD100]">{isArabic ? "تفاصيل المشروع والمنتجات" : "Project & product details"}<ArrowUpRight size={17} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function LightingPortfolioStrip({ language }: { language: Language }) {
  const isArabic = language === "ar";
  const items = isArabic
    ? ["ديكوري", "معماري", "إنارة تقنية", "تحكم DALI", "تعتيم TRIAC", "CRI 90+", "إنارة خارجية"]
    : ["DECORATIVE", "ARCHITECTURAL", "TECHNICAL LIGHTING", "DALI CONTROL", "TRIAC DIMMING", "CRI 90+", "OUTDOOR LIGHTING"];
  return (
    <section className="overflow-hidden border-y border-[#CCCFCE] bg-[#F4F2ED] py-7" aria-label={isArabic ? "مجموعات وتقنيات الإنارة" : "Lighting collections and technologies"}>
      <div className="mx-auto flex max-w-[1440px] items-center gap-8 px-4 sm:px-8">
        <div className="shrink-0 border-e border-[#A3A7AA] pe-8"><p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#73787C]">{isArabic ? "مجموعات وتقنيات" : "COLLECTIONS & TECHNOLOGY"}</p></div>
        <div className="min-w-0 flex-1 overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,black_5%,black_95%,transparent)]">
          <div className="luxury-marquee-track flex w-max gap-8 pe-8 hover:[animation-play-state:paused]">{[...items, ...items].map((item, index) => <span key={`${item}-${index}`} aria-hidden={index >= items.length} className="flex shrink-0 items-center gap-8 text-xs font-bold tracking-[0.1em] text-[#50555B]"><span>{item}</span><span className="h-1.5 w-1.5 rounded-full bg-[#FFDA01]" /></span>)}</div>
        </div>
      </div>
    </section>
  );
}

export function ScrollLightProgress() {
  const { scrollYProgress } = useScroll();
  const reducedMotion = useReducedMotion();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });
  const dotTop = useTransform(progress, [0, 1], ["0%", "100%"]);

  if (reducedMotion) return null;
  return (
    <div aria-hidden="true" className="pointer-events-none fixed end-5 top-1/2 z-[115] hidden h-40 w-3 -translate-y-1/2 xl:block">
      <span className="absolute start-1/2 top-0 h-full w-px -translate-x-1/2 bg-[#A3A7AA]/30" />
      <motion.span style={{ scaleY: progress }} className="absolute start-1/2 top-0 h-full w-px -translate-x-1/2 origin-top bg-[#FFDA01] shadow-[0_0_12px_rgba(255,218,1,0.65)]" />
      <motion.span style={{ top: dotTop }} className="absolute start-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#0F1822] bg-[#FFDA01] shadow-[0_0_18px_rgba(255,218,1,0.8)]" />
    </div>
  );
}

export function LightBeamCursor() {
  const reducedMotion = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const smoothX = useSpring(x, { stiffness: 420, damping: 34, mass: 0.35 });
  const smoothY = useSpring(y, { stiffness: 420, damping: 34, mass: 0.35 });
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [interactive, setInteractive] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine) and (min-width: 1024px)");
    const update = () => setEnabled(media.matches && !reducedMotion);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [reducedMotion]);

  useEffect(() => {
    if (!enabled) return;
    const move = (event: PointerEvent) => { x.set(event.clientX); y.set(event.clientY); setVisible(true); };
    const over = (event: PointerEvent) => setInteractive(Boolean((event.target as Element | null)?.closest("a, button, input, [role='button']")));
    const leave = () => setVisible(false);
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    return () => { window.removeEventListener("pointermove", move); document.removeEventListener("pointerover", over); document.documentElement.removeEventListener("mouseleave", leave); };
  }, [enabled, x, y]);

  if (!enabled) return null;
  return (
    <motion.div aria-hidden="true" className="pointer-events-none fixed z-[120] -translate-x-1/2 -translate-y-1/2" style={{ left: smoothX, top: smoothY }} animate={{ opacity: visible ? 1 : 0 }}>
      <motion.span animate={{ width: interactive ? 58 : 34, height: interactive ? 58 : 34, opacity: interactive ? 0.8 : 0.46 }} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#FFDA01] shadow-[0_0_24px_rgba(255,218,1,0.28)]" />
      <span className="block h-1.5 w-1.5 rounded-full bg-[#FFDA01] shadow-[0_0_14px_5px_rgba(255,218,1,0.36)]" />
    </motion.div>
  );
}
