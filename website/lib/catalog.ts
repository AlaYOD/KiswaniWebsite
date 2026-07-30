import { products } from "./catalog-products";
export { products } from "./catalog-products";

export type CategorySlug = "decorative" | "interior" | "technical" | "accent";
export type CatalogLanguage = "en" | "ar" | "he";

export type Category = {
  slug: CategorySlug;
  name: string;
  arabic: string;
  detail: string;
  detailAr: string;
  image: string;
};

export type Product = {
  name: string;
  arabic: string;
  category: string;
  categoryAr: string;
  categorySlug: CategorySlug;
  code: string;
  price: number;
  image: string;
  gallery?: string[];
  description: string;
  descriptionAr: string;
  specs: Array<[string, string]>;
};

export function formatPrice(price: number, language: CatalogLanguage = "en") {
  const locale = language === "ar" ? "ar-PS" : language === "he" ? "he-IL" : "en-IL";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: 0,
  }).format(price);
}

export const categories: Category[] = [
  {
    slug: "decorative",
    name: "Decorative lighting",
    arabic: "Ø§Ù„Ø¥Ù†Ø§Ø±Ø© Ø§Ù„Ø¯ÙŠÙƒÙˆØ±ÙŠØ©",
    detail: "Statement pieces that give the room its character.",
    detailAr: "Ù‚Ø·Ø¹ Ù…Ù…ÙŠØ²Ø© ØªÙ…Ù†Ø­ Ø§Ù„Ù…ÙƒØ§Ù† Ø´Ø®ØµÙŠØªÙ‡ ÙˆØ­Ø¶ÙˆØ±Ù‡.",
    image: "/images/editorial/hero-decorative.webp",
  },
  {
    slug: "interior",
    name: "Interior lighting",
    arabic: "Ø§Ù„Ø¥Ù†Ø§Ø±Ø© Ø§Ù„Ø¯Ø§Ø®Ù„ÙŠØ©",
    detail: "Warm, considered light for everyday living.",
    detailAr: "Ø¶ÙˆØ¡ Ø¯Ø§ÙØ¦ ÙˆÙ…Ø¯Ø±ÙˆØ³ Ù„ØªÙØ§ØµÙŠÙ„ Ø§Ù„Ø­ÙŠØ§Ø© Ø§Ù„ÙŠÙˆÙ…ÙŠØ©.",
    image: "/images/editorial/hero-interior.webp",
  },
  {
    slug: "technical",
    name: "Technical lighting",
    arabic: "Ø§Ù„Ø¥Ù†Ø§Ø±Ø© Ø§Ù„ØªÙ‚Ù†ÙŠØ©",
    detail: "Precise systems for architectural performance.",
    detailAr: "Ø£Ù†Ø¸Ù…Ø© Ø¯Ù‚ÙŠÙ‚Ø© Ù„Ù„Ø£Ø¯Ø§Ø¡ Ø§Ù„Ù…Ø¹Ù…Ø§Ø±ÙŠ Ø§Ù„Ø§Ø­ØªØ±Ø§ÙÙŠ.",
    image: "/images/editorial/hero-technical.webp",
  },
  {
    slug: "accent",
    name: "Accent lighting",
    arabic: "Ø§Ù„Ø¥Ù†Ø§Ø±Ø© Ø§Ù„Ø¬Ù…Ø§Ù„ÙŠØ©",
    detail: "Focused moments that reveal material and mood.",
    detailAr: "Ù„Ù…Ø³Ø§Øª Ù…Ø±ÙƒØ²Ø© ØªØ¸Ù‡Ø± Ø§Ù„Ø®Ø§Ù…Ø© ÙˆØªØµÙ†Ø¹ Ø§Ù„Ø£Ø¬ÙˆØ§Ø¡.",
    image: "/images/editorial/hero-accent.webp",
  },
];

const legacyProducts: Array<Omit<Product, "price">> = [
  {
    name: "Halo Chandelier",
    arabic: "Ù‡Ø§Ù„Ùˆ Ø´Ø§Ù†Ø¯Ù„ÙŠØ±",
    category: "Decorative",
    categoryAr: "Ø¯ÙŠÙƒÙˆØ±ÙŠ",
    categorySlug: "decorative",
    code: "KL-HC-120",
    image: "/images/kiswani-decorative-2026.webp",
    description: "Layered glass and warm illumination for a confident, timeless centerpiece.",
    descriptionAr: "Ø·Ø¨Ù‚Ø§Øª Ø²Ø¬Ø§Ø¬ÙŠØ© ÙˆØ¥Ø¶Ø§Ø¡Ø© Ø¯Ø§ÙØ¦Ø© Ù„Ù‚Ø·Ø¹Ø© Ø±Ø¦ÙŠØ³ÙŠØ© ÙˆØ§Ø«Ù‚Ø© ÙˆØ®Ø§Ù„Ø¯Ø©.",
    specs: [["Power", "96W"], ["Color temperature", "3000K"], ["Diameter", "1200mm"], ["Dimming", "Triac / DALI"]],
  },
  {
    name: "Luma Tier",
    arabic: "Ù„ÙˆÙ…Ø§ ØªÙŠØ±",
    category: "Decorative",
    categoryAr: "Ø¯ÙŠÙƒÙˆØ±ÙŠ",
    categorySlug: "decorative",
    code: "KL-LT-860",
    image: "/images/kiswani-decorative-2026.webp",
    description: "A refined tiered chandelier that brings a soft architectural rhythm to reception spaces.",
    descriptionAr: "Ø«Ø±ÙŠØ§ Ø¨Ø·Ø¨Ù‚Ø§Øª Ø£Ù†ÙŠÙ‚Ø© ØªØ¶ÙŠÙ Ø¥ÙŠÙ‚Ø§Ø¹Ø§Ù‹ Ù…Ø¹Ù…Ø§Ø±ÙŠØ§Ù‹ Ù†Ø§Ø¹Ù…Ø§Ù‹ Ù„Ù…Ø³Ø§Ø­Ø§Øª Ø§Ù„Ø§Ø³ØªÙ‚Ø¨Ø§Ù„.",
    specs: [["Light source", "Integrated LED"], ["Color temperature", "3000K"], ["Finish", "Smoke glass"], ["Dimming", "Optional"]],
  },
  {
    name: "Prism Cluster",
    arabic: "Ø¨Ø±ÙŠØ²Ù… ÙƒÙ„Ø³ØªØ±",
    category: "Decorative",
    categoryAr: "Ø¯ÙŠÙƒÙˆØ±ÙŠ",
    categorySlug: "decorative",
    code: "KL-PC-450",
    image: "/images/kiswani-decorative-2026.webp",
    description: "A compact glass composition designed for entrances, lounges, and intimate dining rooms.",
    descriptionAr: "ØªÙƒÙˆÙŠÙ† Ø²Ø¬Ø§Ø¬ÙŠ Ù…Ø¯Ù…Ø¬ Ù„Ù„Ù…Ø¯Ø§Ø®Ù„ ÙˆØ§Ù„ØµØ§Ù„ÙˆÙ†Ø§Øª ÙˆØºØ±Ù Ø§Ù„Ø·Ø¹Ø§Ù… Ø§Ù„Ø­Ù…ÙŠÙ…Ø©.",
    specs: [["Light source", "LED"], ["Color temperature", "3000K"], ["Canopy", "Black"], ["Installation", "Suspended"]],
  },
  {
    name: "Flow Linear",
    arabic: "ÙÙ„Ùˆ Ù„ÙŠÙ†ÙŠØ±",
    category: "Interior",
    categoryAr: "Ø¯Ø§Ø®Ù„ÙŠ",
    categorySlug: "interior",
    code: "KL-FL-240",
    image: "/images/kiswani-hero-2026.webp",
    description: "A flowing pendant that turns the dining table into a calm visual center.",
    descriptionAr: "ØªØ¹Ù„ÙŠÙ‚Ø© Ø§Ù†Ø³ÙŠØ§Ø¨ÙŠØ© ØªØ­ÙˆÙ„ Ø·Ø§ÙˆÙ„Ø© Ø§Ù„Ø·Ø¹Ø§Ù… Ø¥Ù„Ù‰ Ù…Ø±ÙƒØ² Ø¨ØµØ±ÙŠ Ù‡Ø§Ø¯Ø¦ ÙˆÙ…Ù…ÙŠØ².",
    specs: [["Power", "48W"], ["Color temperature", "3000K"], ["CRI", "90+"], ["Finish", "Black"]],
  },
  {
    name: "Orbit Floor",
    arabic: "Ø£ÙˆØ±Ø¨Øª ÙÙ„ÙˆØ±",
    category: "Interior",
    categoryAr: "Ø¯Ø§Ø®Ù„ÙŠ",
    categorySlug: "interior",
    code: "KL-OF-180",
    image: "/images/kiswani-hero-2026.webp",
    description: "A slender floor light for reading corners and softly layered living spaces.",
    descriptionAr: "Ø¥Ù†Ø§Ø±Ø© Ø£Ø±Ø¶ÙŠØ© Ø±Ø´ÙŠÙ‚Ø© Ù„Ø²ÙˆØ§ÙŠØ§ Ø§Ù„Ù‚Ø±Ø§Ø¡Ø© ÙˆØ·Ø¨Ù‚Ø§Øª Ø§Ù„Ø¶ÙˆØ¡ Ø§Ù„Ù‡Ø§Ø¯Ø¦Ø© ÙÙŠ ØºØ±Ù Ø§Ù„Ù…Ø¹ÙŠØ´Ø©.",
    specs: [["Light source", "LED"], ["Color temperature", "3000K"], ["Control", "Foot dimmer"], ["Finish", "Graphite"]],
  },
  {
    name: "Cove Wall",
    arabic: "ÙƒÙˆÙ ÙˆÙˆÙ„",
    category: "Interior",
    categoryAr: "Ø¯Ø§Ø®Ù„ÙŠ",
    categorySlug: "interior",
    code: "KL-CW-320",
    image: "/images/kiswani-hero-2026.webp",
    description: "A quiet wall light that washes textured surfaces with comfortable indirect light.",
    descriptionAr: "Ø¥Ù†Ø§Ø±Ø© Ø¬Ø¯Ø§Ø±ÙŠØ© Ù‡Ø§Ø¯Ø¦Ø© ØªØºÙ…Ø± Ø§Ù„Ø£Ø³Ø·Ø­ Ø§Ù„Ù…Ù„Ù…Ø³ÙŠØ© Ø¨Ø¶ÙˆØ¡ ØºÙŠØ± Ù…Ø¨Ø§Ø´Ø± ÙˆÙ…Ø±ÙŠØ­.",
    specs: [["Power", "12W"], ["Color temperature", "3000K"], ["Beam", "Indirect"], ["Finish", "Warm black"]],
  },
  {
    name: "Axis Seven",
    arabic: "Ø£ÙƒØ³Ø³ Ø³ÙŠÙÙ†",
    category: "Technical",
    categoryAr: "ØªÙ‚Ù†ÙŠ",
    categorySlug: "technical",
    code: "KL-AS-700",
    image: "/images/kiswani-technical-2026.webp",
    description: "Seven suspended light points create an architectural rhythm over long surfaces.",
    descriptionAr: "Ø³Ø¨Ø¹ Ù†Ù‚Ø§Ø· Ø¶ÙˆØ¦ÙŠØ© Ù…Ø¹Ù„Ù‚Ø© ØªØµÙ†Ø¹ Ø¥ÙŠÙ‚Ø§Ø¹Ø§Ù‹ Ù…Ø¹Ù…Ø§Ø±ÙŠØ§Ù‹ ÙÙˆÙ‚ Ø§Ù„Ù…Ø³Ø§Ø­Ø§Øª Ø§Ù„Ø·ÙˆÙŠÙ„Ø©.",
    specs: [["Power", "7 x 8W"], ["Color temperature", "2700K-4000K"], ["CRI", "95"], ["Control", "DALI optional"]],
  },
  {
    name: "Beam Track",
    arabic: "Ø¨ÙŠÙ… ØªØ±Ø§Ùƒ",
    category: "Technical",
    categoryAr: "ØªÙ‚Ù†ÙŠ",
    categorySlug: "technical",
    code: "KL-BT-035",
    image: "/images/kiswani-technical-2026.webp",
    description: "A flexible track spotlight for precise highlights and changing architectural layouts.",
    descriptionAr: "Ø³Ø¨ÙˆØª Ù„Ø§ÙŠØª Ù…Ø±Ù† Ù„Ù„Ù…Ø³Ø§Ø±Ø§ØªØŒ ÙŠÙˆÙÙ‘Ø± Ø¥Ø¨Ø±Ø§Ø²Ø§Ù‹ Ø¯Ù‚ÙŠÙ‚Ø§Ù‹ ÙˆÙŠØªÙƒÙŠÙ Ù…Ø¹ ØªØºÙŠØ± ØªÙˆØ²ÙŠØ¹ Ø§Ù„Ù…ÙƒØ§Ù†.",
    specs: [["Power", "35W"], ["Color temperature", "3000K"], ["CRI", "90+"], ["Beam angle", "24Â°"]],
  },
  {
    name: "Recess Pro",
    arabic: "Ø±ÙŠØ³Ø³ Ø¨Ø±Ùˆ",
    category: "Technical",
    categoryAr: "ØªÙ‚Ù†ÙŠ",
    categorySlug: "technical",
    code: "KL-RP-018",
    image: "/images/kiswani-technical-2026.webp",
    description: "A discreet recessed downlight engineered for visual comfort and consistent performance.",
    descriptionAr: "Ø¯Ø§ÙˆÙ† Ù„Ø§ÙŠØª Ù…Ø®ÙÙŠ Ù…ØµÙ…Ù… Ù„Ù„Ø±Ø§Ø­Ø© Ø§Ù„Ø¨ØµØ±ÙŠØ© ÙˆØ§Ù„Ø£Ø¯Ø§Ø¡ Ø§Ù„Ù…ØªÙˆØ§Ø²Ù†.",
    specs: [["Power", "18W"], ["Color temperature", "3000K"], ["CRI", "90+"], ["Cutout", "95mm"]],
  },
  {
    name: "Aura Pendant",
    arabic: "Ø£ÙˆØ±Ø§ Ø¨Ù†Ø¯Ù†Øª",
    category: "Accent",
    categoryAr: "Ø¬Ù…Ø§Ù„ÙŠ",
    categorySlug: "accent",
    code: "KL-AP-140",
    image: "/images/kiswani-accent-2026.webp",
    description: "A luminous stone-like pendant that creates an intimate pool of bedside light.",
    descriptionAr: "ØªØ¹Ù„ÙŠÙ‚Ø© Ù…Ø¶ÙŠØ¦Ø© Ø¨Ø®Ø§Ù…Ø© Ø´Ø¨ÙŠÙ‡Ø© Ø¨Ø§Ù„Ø­Ø¬Ø± ØªØµÙ†Ø¹ Ø¯Ø§Ø¦Ø±Ø© Ø¶ÙˆØ¡ Ø­Ù…ÙŠÙ…Ø© Ø¨Ø¬Ø§Ù†Ø¨ Ø§Ù„Ø³Ø±ÙŠØ±.",
    specs: [["Power", "12W"], ["Color temperature", "2700K"], ["Material", "Translucent stone"], ["Finish", "Black"]],
  },
  {
    name: "Line Wall",
    arabic: "Ù„Ø§ÙŠÙ† ÙˆÙˆÙ„",
    category: "Accent",
    categoryAr: "Ø¬Ù…Ø§Ù„ÙŠ",
    categorySlug: "accent",
    code: "KL-LW-600",
    image: "/images/kiswani-accent-2026.webp",
    description: "A slim wall line that reveals texture without adding visual noise.",
    descriptionAr: "Ø®Ø· Ø¬Ø¯Ø§Ø±ÙŠ Ø±ÙÙŠØ¹ ÙŠØ¨Ø±Ø² Ø§Ù„Ø®Ø§Ù…Ø© Ù…Ù† Ø¯ÙˆÙ† Ø¶ÙˆØ¶Ø§Ø¡ Ø¨ØµØ±ÙŠØ©.",
    specs: [["Power", "18W"], ["Color temperature", "3000K"], ["Length", "600mm"], ["Light", "Indirect"]],
  },
  {
    name: "Mini Focus",
    arabic: "Ù…ÙŠÙ†ÙŠ ÙÙˆÙƒØ³",
    category: "Accent",
    categoryAr: "Ø¬Ù…Ø§Ù„ÙŠ",
    categorySlug: "accent",
    code: "KL-MF-009",
    image: "/images/kiswani-accent-2026.webp",
    description: "A compact adjustable spotlight for artwork, shelves, and material details.",
    descriptionAr: "Ø³Ø¨ÙˆØª ØµØºÙŠØ± Ù‚Ø§Ø¨Ù„ Ù„Ù„ØªÙˆØ¬ÙŠÙ‡ Ù„Ù„Ø£Ø¹Ù…Ø§Ù„ Ø§Ù„ÙÙ†ÙŠØ© ÙˆØ§Ù„Ø±ÙÙˆÙ ÙˆØªÙØ§ØµÙŠÙ„ Ø§Ù„Ø®Ø§Ù…Ø§Øª.",
    specs: [["Power", "9W"], ["Color temperature", "3000K"], ["CRI", "95"], ["Beam angle", "18Â°"]],
  },
];

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getProductsByCategory(slug: string) {
  return products.filter((product) => product.categorySlug === slug);
}

export function getProductSlug(product: Product) {
  return product.code.toLowerCase();
}

export function getProductBySlug(slug: string) {
  return products.find((product) => getProductSlug(product) === slug.toLowerCase());
}

export function getProductGallery(product: Product) {
  const suppliedImages = Array.from(new Set([product.image, ...(product.gallery ?? [])]));
  const focusedViews = ["detail", "ambient", "material"].map((view) => `${product.image}?view=${view}`);
  return [...suppliedImages, ...focusedViews].slice(0, 4);
}

export function getRelatedProducts(product: Product) {
  return products.filter((candidate) => candidate.categorySlug === product.categorySlug && candidate.code !== product.code).slice(0, 3);
}

const categoryHebrew: Record<CategorySlug, { name: string; detail: string }> = {
  decorative: { name: "×ª××•×¨×” ×“×§×•×¨×˜×™×‘×™×ª", detail: "×’×•×¤×™ ×ª××•×¨×” ×ž×¨×›×–×™×™× ×©×ž×¢× ×™×§×™× ×œ×—×œ×œ ××•×¤×™ ×•× ×•×›×—×•×ª." },
  interior: { name: "×ª××•×¨×ª ×¤× ×™×", detail: "××•×¨ ×—× ×•×ž×ª×•×›× ×Ÿ ×œ×¤×¨×˜×™× ×©×œ ×—×™×™ ×”×™×•×ž×™×•×." },
  technical: { name: "×ª××•×¨×” ×˜×›× ×™×ª", detail: "×ž×¢×¨×›×•×ª ×ž×“×•×™×§×•×ª ×œ×‘×™×¦×•×¢×™× ××“×¨×™×›×œ×™×™× ×ž×§×¦×•×¢×™×™×." },
  accent: { name: "×ª××•×¨×ª ×”×“×’×©×”", detail: "×ž×•×§×“×™ ××•×¨ ×©×ž×‘×œ×™×˜×™× ×—×•×ž×¨×™× ×•×™×•×¦×¨×™× ××•×•×™×¨×”." },
};

const productDescriptionHebrew: Record<string, string> = {
  "KL-HC-120": "×©×›×‘×•×ª ×–×›×•×›×™×ª ×•×ª××•×¨×” ×—×ž×” ×œ×™×¦×™×¨×ª ×ž×•×§×“ ×ž×¨×›×–×™ ××œ×’× ×˜×™ ×•×¢×œ-×–×ž× ×™.",
  "KL-LT-860": "× ×‘×¨×©×ª ×©×›×‘×•×ª ×ž×¢×•×“× ×ª ×©×ž×•×¡×™×¤×” ×§×¦×‘ ××“×¨×™×›×œ×™ ×¨×š ×œ×—×œ×œ×™ ××™×¨×•×—.",
  "KL-PC-450": "×§×•×ž×¤×•×–×™×¦×™×™×ª ×–×›×•×›×™×ª ×§×•×ž×¤×§×˜×™×ª ×œ×›× ×™×¡×•×ª, ×¡×œ×•× ×™× ×•×¤×™× ×•×ª ××•×›×œ ××™× ×˜×™×ž×™×•×ª.",
  "KL-FL-240": "×’×•×£ ×ª×œ×•×™ ×–×•×¨× ×©×”×•×¤×š ××ª ×©×•×œ×—×Ÿ ×”××•×›×œ ×œ×ž×¨×›×– ×—×–×•×ª×™ ×¨×’×•×¢.",
  "KL-OF-180": "×ž× ×•×¨×ª ×¨×¦×¤×” ×“×§×” ×œ×¤×™× ×•×ª ×§×¨×™××” ×•×œ×©×›×‘×•×ª ××•×¨ ×¨×›×•×ª ×‘×¡×œ×•×Ÿ.",
  "KL-CW-320": "×ª××•×¨×ª ×§×™×¨ ×©×§×˜×” ×©×ž××™×¨×” ×ž×©×˜×—×™× ×‘×¢×œ×™ ×˜×§×¡×˜×•×¨×” ×‘××•×¨ ×¢×§×™×£ ×•× ×¢×™×.",
  "KL-AS-700": "×©×‘×¢ × ×§×•×“×•×ª ××•×¨ ×ª×œ×•×™×•×ª ×™×•×¦×¨×•×ª ×§×¦×‘ ××“×¨×™×›×œ×™ ×ž×¢×œ ×ž×©×˜×—×™× ××¨×•×›×™×.",
  "KL-BT-035": "×¡×¤×•×˜ ×’×ž×™×© ×œ×ž×¡×™×œ×”, ×œ×”×“×’×©×” ×ž×“×•×™×§×ª ×•×œ×”×ª××ž×” ×œ×©×™× ×•×™×™× ×‘×—×œ×œ.",
  "KL-RP-018": "×“××•× ×œ×™×™×˜ ×©×§×•×¢ ×•×“×™×¡×§×¨×˜×™ ×œ× ×•×—×•×ª ×—×–×•×ª×™×ª ×•×œ×‘×™×¦×•×¢×™× ×¢×§×‘×™×™×.",
  "KL-AP-140": "×’×•×£ ×ª×œ×•×™ ×‘×ž×¨××” ××‘×Ÿ ×©×§×•×¤×” ×©×™×•×¦×¨ ×ž×¢×’×œ ××•×¨ ××™× ×˜×™×ž×™ ×œ×¦×“ ×”×ž×™×˜×”.",
  "KL-LW-600": "×§×• ×ª××•×¨×” ×“×§ ×œ×§×™×¨ ×©×ž×‘×œ×™×˜ ×˜×§×¡×˜×•×¨×” ×‘×œ×™ ×¢×•×ž×¡ ×—×–×•×ª×™.",
  "KL-MF-009": "×¡×¤×•×˜ ×§×•×ž×¤×§×˜×™ ×ž×ª×›×•×•× ×Ÿ ×œ×™×¦×™×¨×•×ª ××ž× ×•×ª, ×ž×“×¤×™× ×•×¤×¨×˜×™ ×—×•×ž×¨.",
};

export function getCategoryName(category: Category, language: CatalogLanguage) {
  if (language === "ar") return category.arabic;
  if (language === "he") return categoryHebrew[category.slug].name;
  return category.name;
}

export function getCategoryDetail(category: Category, language: CatalogLanguage) {
  if (language === "ar") return category.detailAr;
  if (language === "he") return categoryHebrew[category.slug].detail;
  return category.detail;
}

export function getProductName(product: Product, language: CatalogLanguage) {
  return language === "ar" ? product.arabic : product.name;
}

export function getProductCategory(product: Product, language: CatalogLanguage) {
  if (language === "ar") return product.categoryAr;
  if (language === "he") return categoryHebrew[product.categorySlug].name;
  return product.category;
}

export function getProductDescription(product: Product, language: CatalogLanguage) {
  if (language === "ar") return product.descriptionAr;
  if (language === "he") return productDescriptionHebrew[product.code] ?? product.description;
  return product.description;
}
