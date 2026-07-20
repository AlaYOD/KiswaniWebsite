"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

const SESSION_KEY = "kiswani-brand-intro-2026";
const INTRO_HOLD = 3.25;
const PROGRESS_DURATION = 3.05;

export function CinematicIntro() {
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);

  const finish = useCallback(() => {
    try {
      window.sessionStorage.setItem(SESSION_KEY, "seen");
    } catch {
      // The introduction still works when storage is unavailable.
    }
    document.body.style.overflow = "";
    setVisible(false);
  }, []);

  useEffect(() => {
    let shouldHide = false;
    try {
      if (window.sessionStorage.getItem(SESSION_KEY) === "seen" || reducedMotion) {
        shouldHide = true;
        if (reducedMotion) window.sessionStorage.setItem(SESSION_KEY, "seen");
      }
    } catch {
      shouldHide = Boolean(reducedMotion);
    }

    if (shouldHide) {
      const frame = window.requestAnimationFrame(() => setVisible(false));
      return () => window.cancelAnimationFrame(frame);
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") finish();
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [finish, reducedMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.section
          role="status"
          aria-live="polite"
          aria-label="Kiswani Lights brand introduction"
          initial={{ y: 0 }}
          animate={{ y: "-100%" }}
          exit={{ opacity: 0 }}
          transition={{ delay: INTRO_HOLD, duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
          onAnimationComplete={finish}
          className="fixed inset-0 z-[100] isolate overflow-hidden bg-[#050709] text-white"
        >
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_47%,rgba(255,218,1,0.09),transparent_31%)]" />
          <div aria-hidden="true" className="absolute inset-4 border border-white/[0.08] sm:inset-7" />
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] bg-[#FFDA01]" />

          <motion.div
            aria-hidden="true"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-1/2 h-px w-[min(76vw,760px)] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-[#FFDA01]/45 to-transparent"
          />

          <div className="relative flex h-full items-center justify-center px-8 py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="flex w-full max-w-3xl flex-col items-center text-center"
            >
              <div className="relative h-28 w-[min(78vw,430px)] sm:h-36">
                <Image
                  src="/images/kiswani-logo-original-white.png"
                  alt="Kiswani Lights"
                  fill
                  priority
                  unoptimized
                  sizes="(max-width: 640px) 78vw, 430px"
                  className="object-contain"
                />
              </div>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.75, delay: 0.72, ease: [0.22, 1, 0.36, 1] }}
                className="mt-9 h-[2px] w-16 origin-center bg-[#FFDA01]"
                aria-hidden="true"
              />

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.88, ease: [0.22, 1, 0.36, 1] }}
                className="mt-7"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#FFDA01] sm:text-xs">
                  Lighting is the soul of the space
                </p>
                <p className="mt-3 text-sm font-medium text-white/65 sm:text-base" dir="rtl">
                  الإضاءة هي روح المكان
                </p>
              </motion.div>
            </motion.div>
          </div>

          <div className="absolute inset-x-7 bottom-7 sm:inset-x-10 sm:bottom-9">
            <div className="flex items-center justify-between text-[8px] font-semibold uppercase tracking-[0.22em] text-white/30 sm:text-[9px]">
              <span>Kiswani Lights</span>
              <span>Est. 2026</span>
            </div>
            <div className="mt-3 h-px overflow-hidden bg-white/10">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: PROGRESS_DURATION, ease: "linear" }}
                className="h-full origin-left bg-[#FFDA01]"
              />
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
