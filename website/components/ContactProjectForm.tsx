"use client";

import { motion } from "framer-motion";
import { CheckCircle2, MessageCircle, Send, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import type { Language } from "./KiswaniExperience";

const WHATSAPP_NUMBER = "970599671209";

const formCopy = {
  en: {
    eyebrow: "PROJECT ENQUIRY",
    title: "Tell us about your space",
    name: "Your name",
    phone: "Phone or WhatsApp",
    projectType: "Project type",
    chooseType: "Choose project type",
    residential: "Residential",
    commercial: "Commercial",
    hospitality: "Hospitality",
    other: "Other",
    message: "Project details",
    messagePlaceholder: "Space, style, timeline, and the lighting you need",
    submit: "Continue in WhatsApp",
    ready: "Your request is ready. Complete sending it in WhatsApp.",
    open: "Open WhatsApp",
    close: "Close contact form",
  },
  ar: {
    eyebrow: "\u0627\u0633\u062a\u0641\u0633\u0627\u0631 \u0639\u0646 \u0645\u0634\u0631\u0648\u0639",
    title: "\u0623\u062e\u0628\u0631\u0646\u0627 \u0639\u0646 \u0645\u0633\u0627\u062d\u062a\u0643",
    name: "\u0627\u0633\u0645\u0643",
    phone: "\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062a\u0641 \u0623\u0648 \u0648\u0627\u062a\u0633\u0627\u0628",
    projectType: "\u0646\u0648\u0639 \u0627\u0644\u0645\u0634\u0631\u0648\u0639",
    chooseType: "\u0627\u062e\u062a\u0631 \u0646\u0648\u0639 \u0627\u0644\u0645\u0634\u0631\u0648\u0639",
    residential: "\u0633\u0643\u0646\u064a",
    commercial: "\u062a\u062c\u0627\u0631\u064a",
    hospitality: "\u0636\u064a\u0627\u0641\u0629",
    other: "\u0622\u062e\u0631",
    message: "\u062a\u0641\u0627\u0635\u064a\u0644 \u0627\u0644\u0645\u0634\u0631\u0648\u0639",
    messagePlaceholder: "\u0627\u0644\u0645\u0633\u0627\u062d\u0629\u060c \u0627\u0644\u0646\u0645\u0637\u060c \u0627\u0644\u062c\u062f\u0648\u0644 \u0627\u0644\u0632\u0645\u0646\u064a\u060c \u0648\u0646\u0648\u0639 \u0627\u0644\u0625\u0636\u0627\u0621\u0629 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629",
    submit: "\u0627\u0644\u0645\u062a\u0627\u0628\u0639\u0629 \u0639\u0628\u0631 \u0648\u0627\u062a\u0633\u0627\u0628",
    ready: "\u0637\u0644\u0628\u0643 \u062c\u0627\u0647\u0632. \u0623\u0643\u0645\u0644 \u0625\u0631\u0633\u0627\u0644\u0647 \u0641\u064a \u0648\u0627\u062a\u0633\u0627\u0628.",
    open: "\u0641\u062a\u062d \u0648\u0627\u062a\u0633\u0627\u0628",
    close: "\u0625\u063a\u0644\u0627\u0642 \u0646\u0645\u0648\u0630\u062c \u0627\u0644\u062a\u0648\u0627\u0635\u0644",
  },
  he: {
    eyebrow: "\u05e4\u05e0\u05d9\u05d9\u05d4 \u05d1\u05e0\u05d5\u05e9\u05d0 \u05e4\u05e8\u05d5\u05d9\u05e7\u05d8",
    title: "\u05e1\u05e4\u05e8\u05d5 \u05dc\u05e0\u05d5 \u05e2\u05dc \u05d4\u05d7\u05dc\u05dc",
    name: "\u05d4\u05e9\u05dd \u05e9\u05dc\u05da",
    phone: "\u05d8\u05dc\u05e4\u05d5\u05df \u05d0\u05d5 WhatsApp",
    projectType: "\u05e1\u05d5\u05d2 \u05d4\u05e4\u05e8\u05d5\u05d9\u05e7\u05d8",
    chooseType: "\u05d1\u05d7\u05d9\u05e8\u05ea \u05e1\u05d5\u05d2 \u05e4\u05e8\u05d5\u05d9\u05e7\u05d8",
    residential: "\u05de\u05d2\u05d5\u05e8\u05d9\u05dd",
    commercial: "\u05de\u05e1\u05d7\u05e8\u05d9",
    hospitality: "\u05d0\u05d9\u05e8\u05d5\u05d7",
    other: "\u05d0\u05d7\u05e8",
    message: "\u05e4\u05e8\u05d8\u05d9 \u05d4\u05e4\u05e8\u05d5\u05d9\u05e7\u05d8",
    messagePlaceholder: "\u05d2\u05d5\u05d3\u05dc \u05d4\u05d7\u05dc\u05dc\u060c \u05e1\u05d2\u05e0\u05d5\u05df\u060c \u05dc\u05d5\u05d7 \u05d6\u05de\u05e0\u05d9\u05dd \u05d5\u05e1\u05d5\u05d2 \u05d4\u05ea\u05d0\u05d5\u05e8\u05d4 \u05d4\u05e0\u05d3\u05e8\u05e9",
    submit: "\u05d4\u05de\u05e9\u05da \u05d1-WhatsApp",
    ready: "\u05d4\u05d1\u05e7\u05e9\u05d4 \u05e9\u05dc\u05da \u05de\u05d5\u05db\u05e0\u05d4. \u05d9\u05e9 \u05dc\u05d4\u05e9\u05dc\u05d9\u05dd \u05d0\u05ea \u05d4\u05e9\u05dc\u05d9\u05d7\u05d4 \u05d1-WhatsApp.",
    open: "\u05e4\u05ea\u05d9\u05d7\u05ea WhatsApp",
    close: "\u05e1\u05d2\u05d9\u05e8\u05ea \u05d8\u05d5\u05e4\u05e1 \u05d9\u05e6\u05d9\u05e8\u05ea \u05e7\u05e9\u05e8",
  },
} as const;

export function ContactProjectForm({ language }: { language: Language }) {
  const current = formCopy[language];
  const [whatsappHref, setWhatsappHref] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const projectType = String(data.get("projectType") ?? "").trim();
    const details = String(data.get("details") ?? "").trim();
    const message = [
      "New Kiswani lighting project enquiry",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Project type: ${projectType}`,
      `Details: ${details}`,
    ].join("\n");
    const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    setWhatsappHref(href);
    window.open(href, "_blank", "noopener,noreferrer");
  }

  const fieldClass =
    "mt-2 min-h-12 w-full border border-[#D5D1C8] bg-[#F7F5F0] px-4 text-sm text-[#0F1822] outline-none transition-colors placeholder:text-[#8A8E91] focus:border-[#FFDA01] focus:ring-1 focus:ring-[#FFDA01]";

  return (
    <form onSubmit={handleSubmit} className="border-t-4 border-[#FFDA01] bg-white p-6 text-[#0F1822] sm:p-8">
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="inline-flex bg-[#FFDA01] px-2 py-1 text-[10px] font-bold uppercase text-[#0F1822]">{current.eyebrow}</p>
          <h3 className="mt-3 text-2xl font-semibold leading-tight sm:text-3xl">{current.title}</h3>
        </div>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#FFDA01] text-[#0F1822]">
          <MessageCircle size={20} aria-hidden="true" />
        </span>
      </div>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <label className="text-xs font-semibold text-[#50555B]">
          {current.name}
          <input name="name" required autoComplete="name" className={fieldClass} />
        </label>
        <label className="text-xs font-semibold text-[#50555B]">
          {current.phone}
          <input name="phone" required type="tel" autoComplete="tel" inputMode="tel" className={fieldClass} />
        </label>
      </div>

      <label className="mt-5 block text-xs font-semibold text-[#50555B]">
        {current.projectType}
        <select name="projectType" required defaultValue="" className={fieldClass}>
          <option value="" disabled>{current.chooseType}</option>
          <option value={current.residential}>{current.residential}</option>
          <option value={current.commercial}>{current.commercial}</option>
          <option value={current.hospitality}>{current.hospitality}</option>
          <option value={current.other}>{current.other}</option>
        </select>
      </label>

      <label className="mt-5 block text-xs font-semibold text-[#50555B]">
        {current.message}
        <textarea
          name="details"
          required
          rows={4}
          placeholder={current.messagePlaceholder}
          className={`${fieldClass} resize-y py-3`}
        />
      </label>

      <button type="submit" className="mt-6 inline-flex min-h-14 w-full items-center justify-center gap-3 bg-[#FFDA01] px-6 text-sm font-bold text-[#0F1822] transition-colors hover:bg-[#FFD100] focus:outline-none focus:ring-2 focus:ring-[#FFDA01] focus:ring-offset-2">
        {current.submit}
        <Send size={17} aria-hidden="true" />
      </button>

      <div aria-live="polite">
        {whatsappHref && (
          <div className="mt-5 border-s-4 border-[#FFDA01] bg-[#F7F5F0] p-4">
            <p className="flex items-start gap-2 text-sm leading-6 text-[#3E454B]">
              <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#0F1822]" aria-hidden="true" />
              <span>{current.ready}</span>
            </p>
            <a href={whatsappHref} target="_blank" rel="noreferrer" className="mt-3 inline-flex min-h-10 items-center gap-2 bg-[#FFDA01] px-4 text-xs font-bold text-[#0F1822] transition-colors hover:bg-[#FFD100]">
              {current.open}
              <MessageCircle size={15} aria-hidden="true" />
            </a>
          </div>
        )}
      </div>
    </form>
  );
}

export function ContactProjectDrawer({
  language,
  onClose,
}: {
  language: Language;
  onClose: () => void;
}) {
  const current = formCopy[language];
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        className="fixed inset-0 z-[90] bg-[#050709]/75 backdrop-blur-sm"
        aria-hidden="true"
      />
      <motion.aside
        role="dialog"
        aria-modal="true"
        aria-label={current.title}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-y-0 right-0 z-[100] w-full max-w-[600px] overflow-y-auto bg-white shadow-[-24px_0_70px_rgba(0,0,0,0.32)]"
      >
        <div className="sticky top-0 z-10 flex h-20 items-center justify-between border-b border-[#E4E0D8] bg-[#070B0E] px-6 text-white sm:px-8">
          <div className="flex items-center gap-4">
            <span className="h-8 w-1 bg-[#FFDA01]" aria-hidden="true" />
            <span className="text-xs font-bold uppercase">Kiswani Lights</span>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label={current.close}
            title={current.close}
            className="flex h-11 w-11 items-center justify-center border border-white/20 text-white transition-colors hover:border-[#FFDA01] hover:text-[#FFDA01] focus:outline-none focus:ring-2 focus:ring-[#FFDA01]"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <ContactProjectForm language={language} />
      </motion.aside>
    </>
  );
}
