"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getProductName, products, type Product } from "../lib/catalog";
import type { Language } from "./KiswaniExperience";

const cartText = (language: Language, english: string, arabic: string, hebrew: string) => language === "ar" ? arabic : language === "he" ? hebrew : english;

type CartLine = { code: string; quantity: number };

type CartContextValue = {
  lines: CartLine[];
  count: number;
  isOpen: boolean;
  add: (product: Product) => void;
  remove: (code: string) => void;
  update: (code: string, quantity: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
};

const STORAGE_KEY = "kiswani-shopping-cart";
const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved) setLines(JSON.parse(saved));
      } catch {
        // Cart still works for the current page when storage is unavailable.
      }
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // Ignore storage failures.
    }
  }, [hydrated, lines]);

  const value = useMemo<CartContextValue>(() => ({
    lines,
    count: lines.reduce((total, line) => total + line.quantity, 0),
    isOpen,
    add: (product) => {
      setLines((current) => {
        const existing = current.find((line) => line.code === product.code);
        return existing
          ? current.map((line) => line.code === product.code ? { ...line, quantity: line.quantity + 1 } : line)
          : [...current, { code: product.code, quantity: 1 }];
      });
      setIsOpen(true);
    },
    remove: (code) => setLines((current) => current.filter((line) => line.code !== code)),
    update: (code, quantity) => setLines((current) => quantity <= 0 ? current.filter((line) => line.code !== code) : current.map((line) => line.code === code ? { ...line, quantity } : line)),
    clear: () => setLines([]),
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  }), [isOpen, lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}

export function CartTrigger({ compact = false, language = "en" }: { compact?: boolean; language?: Language }) {
  const { count, open } = useCart();
  return (
    <button type="button" onClick={open} aria-label={cartText(language, `Open shopping cart with ${count} items`, `فتح سلة التسوق وفيها ${count} قطع`, `פתיחת סל הקניות עם ${count} פריטים`)} className={`relative inline-flex items-center justify-center border border-white/25 text-white transition-colors hover:border-[#FFDA01] hover:text-[#FFDA01] ${compact ? "h-11 w-11" : "h-11 gap-2 px-4 text-xs font-bold"}`}>
      <ShoppingBag size={18} aria-hidden="true" />
      {!compact && <span>{cartText(language, "Cart", "السلة", "סל")}</span>}
      {count > 0 && <motion.span key={count} initial={{ scale: 0.6 }} animate={{ scale: 1 }} className="absolute -end-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-[#FFDA01] px-1 text-[10px] font-bold text-[#0F1822]">{count}</motion.span>}
    </button>
  );
}

export function CartDrawer({ language }: { language: Language }) {
  const { lines, count, isOpen, close, remove, update, clear } = useCart();
  const isRtl = language !== "en";
  const items = lines.map((line) => ({ line, product: products.find((product) => product.code === line.code) })).filter((item): item is { line: CartLine; product: Product } => Boolean(item.product));

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [close, isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[90] bg-[#070B0E]/75 backdrop-blur-sm" onMouseDown={(event) => event.target === event.currentTarget && close()}>
          <motion.aside role="dialog" aria-modal="true" aria-labelledby="cart-title" initial={{ x: isRtl ? "-100%" : "100%" }} animate={{ x: 0 }} exit={{ x: isRtl ? "-100%" : "100%" }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-y-0 end-0 flex w-full max-w-lg flex-col bg-[#F4F2ED] text-[#0F1822] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#CCCFCE] px-6 py-6 sm:px-8">
              <div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#73787C]">Kiswani store</p><h2 id="cart-title" className="mt-1 text-3xl font-semibold tracking-[-0.04em]">{cartText(language, "Your cart", "سلة الطلب", "הסל שלך")}</h2></div>
              <button type="button" onClick={close} className="flex h-11 w-11 items-center justify-center bg-[#0F1822] text-white" aria-label="Close cart"><X size={18} /></button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8">
              {items.length === 0 ? (
                <div className="flex min-h-80 flex-col items-center justify-center text-center"><span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFDA01]"><ShoppingBag size={26} /></span><h3 className="mt-6 text-2xl font-semibold">{cartText(language, "Your cart is empty", "السلة فارغة", "הסל שלך ריק")}</h3><p className="mt-3 max-w-xs text-sm leading-6 text-[#73787C]">{cartText(language, "Add the lighting pieces you love and we will confirm price and availability.", "أضف قطع الإضاءة التي تناسب مشروعك وسنساعدك في تأكيد السعر والتوفر.", "הוסיפו את גופי התאורה שאהבתם ואנו נאשר מחיר וזמינות.")}</p></div>
              ) : (
                <div className="space-y-4">
                  {items.map(({ line, product }) => (
                    <motion.article layout key={product.code} className="grid grid-cols-[88px_1fr] gap-4 border-b border-[#CCCFCE] pb-5">
                      <div className="relative h-28 overflow-hidden bg-[#CCCFCE]/30"><Image unoptimized src={product.image} alt="" fill sizes="88px" className="object-cover" /></div>
                      <div className="min-w-0"><div className="flex items-start justify-between gap-3"><div><p className="text-[10px] font-semibold tracking-[0.12em] text-[#73787C]">{product.code}</p><h3 className="mt-1 font-semibold">{getProductName(product, language)}</h3></div><button type="button" onClick={() => remove(product.code)} className="p-2 text-[#73787C] hover:text-[#0F1822]" aria-label={`Remove ${product.name}`}><Trash2 size={16} /></button></div><p className="mt-2 text-xs text-[#73787C]">{cartText(language, "Price confirmed with order", "السعر يؤكد عند الطلب", "המחיר יאושר בעת ההזמנה")}</p><div className="mt-3 inline-flex items-center border border-[#A3A7AA]"><button type="button" onClick={() => update(product.code, line.quantity - 1)} className="flex h-9 w-9 items-center justify-center" aria-label="Decrease quantity"><Minus size={14} /></button><span className="min-w-8 text-center text-sm font-semibold">{line.quantity}</span><button type="button" onClick={() => update(product.code, line.quantity + 1)} className="flex h-9 w-9 items-center justify-center" aria-label="Increase quantity"><Plus size={14} /></button></div></div>
                    </motion.article>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-[#CCCFCE] bg-white px-6 py-6 sm:px-8">
              {count > 0 && <><div className="flex items-center justify-between text-sm"><span className="text-[#73787C]">{cartText(language, "Total pieces", "إجمالي القطع", "סך הפריטים")}</span><strong>{count}</strong></div><p className="mt-3 text-xs leading-5 text-[#73787C]">{cartText(language, "Kiswani will confirm pricing, availability, and delivery before the order is approved.", "سيؤكد فريق كسواني الأسعار والتوفر وخيارات التوصيل قبل اعتماد الطلب.", "צוות Kiswani יאשר מחיר, זמינות ואפשרויות משלוח לפני אישור ההזמנה.")}</p><a href="/checkout" onClick={close} className="mt-5 flex min-h-14 items-center justify-center gap-3 bg-[#FFDA01] px-6 text-sm font-bold text-[#0F1822]">{cartText(language, "Continue to checkout", "متابعة إتمام الطلب", "המשך לתשלום")}<ArrowRight size={17} className={isRtl ? "rotate-180" : ""} /></a><button type="button" onClick={clear} className="mt-3 w-full py-3 text-xs font-semibold text-[#73787C] underline underline-offset-4">{cartText(language, "Clear cart", "إفراغ السلة", "ריקון הסל")}</button></>}
              {count === 0 && <button type="button" onClick={close} className="flex min-h-14 w-full items-center justify-center bg-[#0F1822] px-6 text-sm font-bold text-white">{cartText(language, "Continue shopping", "متابعة التسوق", "המשך בקניות")}</button>}
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
