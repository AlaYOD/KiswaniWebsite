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
  image: string;
  description: string;
  descriptionAr: string;
  specs: Array<[string, string]>;
};

export const categories: Category[] = [
  {
    slug: "decorative",
    name: "Decorative lighting",
    arabic: "الإنارة الديكورية",
    detail: "Statement pieces that give the room its character.",
    detailAr: "قطع مميزة تمنح المكان شخصيته وحضوره.",
    image: "/images/kiswani-decorative-2026.webp",
  },
  {
    slug: "interior",
    name: "Interior lighting",
    arabic: "الإنارة الداخلية",
    detail: "Warm, considered light for everyday living.",
    detailAr: "ضوء دافئ ومدروس لتفاصيل الحياة اليومية.",
    image: "/images/kiswani-hero-2026.webp",
  },
  {
    slug: "technical",
    name: "Technical lighting",
    arabic: "الإنارة التقنية",
    detail: "Precise systems for architectural performance.",
    detailAr: "أنظمة دقيقة للأداء المعماري الاحترافي.",
    image: "/images/kiswani-technical-2026.webp",
  },
  {
    slug: "accent",
    name: "Accent lighting",
    arabic: "الإنارة الجمالية",
    detail: "Focused moments that reveal material and mood.",
    detailAr: "لمسات مركزة تظهر الخامة وتصنع الأجواء.",
    image: "/images/kiswani-accent-2026.webp",
  },
];

export const products: Product[] = [
  {
    name: "Halo Chandelier",
    arabic: "هالو شاندلير",
    category: "Decorative",
    categoryAr: "ديكوري",
    categorySlug: "decorative",
    code: "KL-HC-120",
    image: "/images/kiswani-decorative-2026.webp",
    description: "Layered glass and warm illumination for a confident, timeless centerpiece.",
    descriptionAr: "طبقات زجاجية وإضاءة دافئة لقطعة رئيسية واثقة وخالدة.",
    specs: [["Power", "96W"], ["Color temperature", "3000K"], ["Diameter", "1200mm"], ["Dimming", "Triac / DALI"]],
  },
  {
    name: "Luma Tier",
    arabic: "لوما تير",
    category: "Decorative",
    categoryAr: "ديكوري",
    categorySlug: "decorative",
    code: "KL-LT-860",
    image: "/images/kiswani-decorative-2026.webp",
    description: "A refined tiered chandelier that brings a soft architectural rhythm to reception spaces.",
    descriptionAr: "ثريا بطبقات أنيقة تضيف إيقاعاً معمارياً ناعماً لمساحات الاستقبال.",
    specs: [["Light source", "Integrated LED"], ["Color temperature", "3000K"], ["Finish", "Smoke glass"], ["Dimming", "Optional"]],
  },
  {
    name: "Prism Cluster",
    arabic: "بريزم كلستر",
    category: "Decorative",
    categoryAr: "ديكوري",
    categorySlug: "decorative",
    code: "KL-PC-450",
    image: "/images/kiswani-decorative-2026.webp",
    description: "A compact glass composition designed for entrances, lounges, and intimate dining rooms.",
    descriptionAr: "تكوين زجاجي مدمج للمداخل والصالونات وغرف الطعام الحميمة.",
    specs: [["Light source", "LED"], ["Color temperature", "3000K"], ["Canopy", "Black"], ["Installation", "Suspended"]],
  },
  {
    name: "Flow Linear",
    arabic: "فلو لينير",
    category: "Interior",
    categoryAr: "داخلي",
    categorySlug: "interior",
    code: "KL-FL-240",
    image: "/images/kiswani-hero-2026.webp",
    description: "A flowing pendant that turns the dining table into a calm visual center.",
    descriptionAr: "تعليقة انسيابية تحول طاولة الطعام إلى مركز بصري هادئ ومميز.",
    specs: [["Power", "48W"], ["Color temperature", "3000K"], ["CRI", "90+"], ["Finish", "Black"]],
  },
  {
    name: "Orbit Floor",
    arabic: "أوربت فلور",
    category: "Interior",
    categoryAr: "داخلي",
    categorySlug: "interior",
    code: "KL-OF-180",
    image: "/images/kiswani-hero-2026.webp",
    description: "A slender floor light for reading corners and softly layered living spaces.",
    descriptionAr: "إنارة أرضية رشيقة لزوايا القراءة وطبقات الضوء الهادئة في غرف المعيشة.",
    specs: [["Light source", "LED"], ["Color temperature", "3000K"], ["Control", "Foot dimmer"], ["Finish", "Graphite"]],
  },
  {
    name: "Cove Wall",
    arabic: "كوف وول",
    category: "Interior",
    categoryAr: "داخلي",
    categorySlug: "interior",
    code: "KL-CW-320",
    image: "/images/kiswani-hero-2026.webp",
    description: "A quiet wall light that washes textured surfaces with comfortable indirect light.",
    descriptionAr: "إنارة جدارية هادئة تغمر الأسطح الملمسية بضوء غير مباشر ومريح.",
    specs: [["Power", "12W"], ["Color temperature", "3000K"], ["Beam", "Indirect"], ["Finish", "Warm black"]],
  },
  {
    name: "Axis Seven",
    arabic: "أكسس سيفن",
    category: "Technical",
    categoryAr: "تقني",
    categorySlug: "technical",
    code: "KL-AS-700",
    image: "/images/kiswani-technical-2026.webp",
    description: "Seven suspended light points create an architectural rhythm over long surfaces.",
    descriptionAr: "سبع نقاط ضوئية معلقة تصنع إيقاعاً معمارياً فوق المساحات الطويلة.",
    specs: [["Power", "7 x 8W"], ["Color temperature", "2700K-4000K"], ["CRI", "95"], ["Control", "DALI optional"]],
  },
  {
    name: "Beam Track",
    arabic: "بيم تراك",
    category: "Technical",
    categoryAr: "تقني",
    categorySlug: "technical",
    code: "KL-BT-035",
    image: "/images/kiswani-technical-2026.webp",
    description: "A flexible track spotlight for precise highlights and changing architectural layouts.",
    descriptionAr: "سبوت لايت مرن للمسارات، يوفّر إبرازاً دقيقاً ويتكيف مع تغير توزيع المكان.",
    specs: [["Power", "35W"], ["Color temperature", "3000K"], ["CRI", "90+"], ["Beam angle", "24°"]],
  },
  {
    name: "Recess Pro",
    arabic: "ريسس برو",
    category: "Technical",
    categoryAr: "تقني",
    categorySlug: "technical",
    code: "KL-RP-018",
    image: "/images/kiswani-technical-2026.webp",
    description: "A discreet recessed downlight engineered for visual comfort and consistent performance.",
    descriptionAr: "داون لايت مخفي مصمم للراحة البصرية والأداء المتوازن.",
    specs: [["Power", "18W"], ["Color temperature", "3000K"], ["CRI", "90+"], ["Cutout", "95mm"]],
  },
  {
    name: "Aura Pendant",
    arabic: "أورا بندنت",
    category: "Accent",
    categoryAr: "جمالي",
    categorySlug: "accent",
    code: "KL-AP-140",
    image: "/images/kiswani-accent-2026.webp",
    description: "A luminous stone-like pendant that creates an intimate pool of bedside light.",
    descriptionAr: "تعليقة مضيئة بخامة شبيهة بالحجر تصنع دائرة ضوء حميمة بجانب السرير.",
    specs: [["Power", "12W"], ["Color temperature", "2700K"], ["Material", "Translucent stone"], ["Finish", "Black"]],
  },
  {
    name: "Line Wall",
    arabic: "لاين وول",
    category: "Accent",
    categoryAr: "جمالي",
    categorySlug: "accent",
    code: "KL-LW-600",
    image: "/images/kiswani-accent-2026.webp",
    description: "A slim wall line that reveals texture without adding visual noise.",
    descriptionAr: "خط جداري رفيع يبرز الخامة من دون ضوضاء بصرية.",
    specs: [["Power", "18W"], ["Color temperature", "3000K"], ["Length", "600mm"], ["Light", "Indirect"]],
  },
  {
    name: "Mini Focus",
    arabic: "ميني فوكس",
    category: "Accent",
    categoryAr: "جمالي",
    categorySlug: "accent",
    code: "KL-MF-009",
    image: "/images/kiswani-accent-2026.webp",
    description: "A compact adjustable spotlight for artwork, shelves, and material details.",
    descriptionAr: "سبوت صغير قابل للتوجيه للأعمال الفنية والرفوف وتفاصيل الخامات.",
    specs: [["Power", "9W"], ["Color temperature", "3000K"], ["CRI", "95"], ["Beam angle", "18°"]],
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
  return [product.image, `${product.image}?view=detail`, `${product.image}?view=ambient`];
}

export function getRelatedProducts(product: Product) {
  return products.filter((candidate) => candidate.categorySlug === product.categorySlug && candidate.code !== product.code).slice(0, 3);
}

const categoryHebrew: Record<CategorySlug, { name: string; detail: string }> = {
  decorative: { name: "תאורה דקורטיבית", detail: "גופי תאורה מרכזיים שמעניקים לחלל אופי ונוכחות." },
  interior: { name: "תאורת פנים", detail: "אור חם ומתוכנן לפרטים של חיי היומיום." },
  technical: { name: "תאורה טכנית", detail: "מערכות מדויקות לביצועים אדריכליים מקצועיים." },
  accent: { name: "תאורת הדגשה", detail: "מוקדי אור שמבליטים חומרים ויוצרים אווירה." },
};

const productDescriptionHebrew: Record<string, string> = {
  "KL-HC-120": "שכבות זכוכית ותאורה חמה ליצירת מוקד מרכזי אלגנטי ועל-זמני.",
  "KL-LT-860": "נברשת שכבות מעודנת שמוסיפה קצב אדריכלי רך לחללי אירוח.",
  "KL-PC-450": "קומפוזיציית זכוכית קומפקטית לכניסות, סלונים ופינות אוכל אינטימיות.",
  "KL-FL-240": "גוף תלוי זורם שהופך את שולחן האוכל למרכז חזותי רגוע.",
  "KL-OF-180": "מנורת רצפה דקה לפינות קריאה ולשכבות אור רכות בסלון.",
  "KL-CW-320": "תאורת קיר שקטה שמאירה משטחים בעלי טקסטורה באור עקיף ונעים.",
  "KL-AS-700": "שבע נקודות אור תלויות יוצרות קצב אדריכלי מעל משטחים ארוכים.",
  "KL-BT-035": "ספוט גמיש למסילה, להדגשה מדויקת ולהתאמה לשינויים בחלל.",
  "KL-RP-018": "דאונלייט שקוע ודיסקרטי לנוחות חזותית ולביצועים עקביים.",
  "KL-AP-140": "גוף תלוי במראה אבן שקופה שיוצר מעגל אור אינטימי לצד המיטה.",
  "KL-LW-600": "קו תאורה דק לקיר שמבליט טקסטורה בלי עומס חזותי.",
  "KL-MF-009": "ספוט קומפקטי מתכוונן ליצירות אמנות, מדפים ופרטי חומר.",
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
