"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, FileText, Headphones, Lightbulb, Mail, MapPin, MessageCircle, Phone, ShieldCheck, Sparkles, type LucideIcon } from "lucide-react";
import { CartDrawer } from "./CartSystem";
import { Header, LuxuryFooter, isRtlLanguage, useStoredLanguage, type Language } from "./KiswaniExperience";

export type InformationPageKind = "about" | "support" | "privacy" | "terms";

type LocalizedText = Record<Language, string>;
type PageSection = { title: LocalizedText; body: LocalizedText };
type PageContent = {
  eyebrow: LocalizedText;
  title: LocalizedText;
  lead: LocalizedText;
  notice?: LocalizedText;
  sections: PageSection[];
};

const text = (en: string, ar: string, he: string): LocalizedText => ({ en, ar, he });

const content: Record<InformationPageKind, PageContent> = {
  about: {
    eyebrow: text("ABOUT KISWANI", "عن كسواني", "אודות KISWANI"),
    title: text("We shape atmosphere through light.", "نصنع إحساس المكان من خلال الضوء.", "אנחנו מעצבים אווירה באמצעות אור."),
    lead: text(
      "Kiswani Lights brings decorative presence, technical precision, and practical project support together for spaces that feel complete.",
      "تجمع كسواني للإنارة بين الحضور الديكوري والدقة التقنية والدعم العملي للمشاريع، لنصنع مساحات تبدو متكاملة.",
      "Kiswani Lights משלבת נוכחות דקורטיבית, דיוק טכני ותמיכה מעשית בפרויקטים כדי ליצור חללים שלמים."
    ),
    sections: [
      {
        title: text("Our point of view", "رؤيتنا", "נקודת המבט שלנו"),
        body: text("Lighting is not an object added at the end of a project. It determines how materials read, how people move, and how a room feels from the first moment.", "الإضاءة ليست قطعة تضاف في نهاية المشروع؛ بل تحدد كيف تظهر الخامات، وكيف يتحرك الناس، وما هو الإحساس الأول الذي يتركه المكان.", "תאורה אינה פריט שמוסיפים בסוף הפרויקט. היא קובעת כיצד חומרים נראים, כיצד אנשים נעים ואיזו תחושה החלל יוצר מהרגע הראשון."),
      },
      {
        title: text("Decorative and technical", "ديكوري وتقني", "דקורטיבי וטכני"),
        body: text("We balance statement fixtures with precise architectural systems. The result is lighting that is expressive where it should be and quiet where performance matters most.", "نوازن بين القطع البارزة والأنظمة المعمارية الدقيقة، لتكون الإضاءة معبّرة حيث يجب وهادئة حيث يكون الأداء هو الأهم.", "אנחנו מאזנים בין גופי תאורה בולטים למערכות אדריכליות מדויקות—אור בעל נוכחות כשצריך ושקט במקום שבו הביצועים חשובים יותר."),
      },
      {
        title: text("A project partner", "شريك في المشروع", "שותפים לפרויקט"),
        body: text("From selecting a fixture to reviewing specifications and availability, our team helps homeowners, designers, contractors, and businesses make confident lighting decisions.", "من اختيار القطعة إلى مراجعة المواصفات والتوفر، يساعد فريقنا أصحاب المنازل والمصممين والمقاولين والشركات على اتخاذ قرارات إنارة واثقة.", "מבחירת גוף התאורה ועד בדיקת מפרטים וזמינות, הצוות שלנו מסייע לבעלי בתים, מעצבים, קבלנים ועסקים לקבל החלטות בטוחות."),
      },
      {
        title: text("Rooted in Ramallah", "من رام الله", "שורשים ברמאללה"),
        body: text("Kiswani serves the local market with a clear international outlook—combining trusted relationships, responsive support, and a contemporary approach to lighting.", "تخدم كسواني السوق المحلي برؤية عالمية واضحة، تجمع بين العلاقات الموثوقة والدعم السريع والمنهج المعاصر في الإضاءة.", "Kiswani משרתת את השוק המקומי עם מבט בינלאומי, יחסים אמינים, שירות זמין וגישה עכשווית לתאורה."),
      },
    ],
  },
  support: {
    eyebrow: text("LIGHTING SUPPORT", "دعم الإضاءة", "תמיכה בתאורה"),
    title: text("Clear answers for every stage of your project.", "إجابات واضحة لكل مرحلة من مشروعك.", "תשובות ברורות לכל שלב בפרויקט."),
    lead: text("Whether you are comparing products, checking specifications, or preparing an order, the Kiswani team is ready to help.", "سواء كنت تقارن المنتجات أو تتحقق من المواصفات أو تجهز طلبك، فريق كسواني جاهز لمساعدتك.", "בין אם אתם משווים מוצרים, בודקים מפרטים או מכינים הזמנה, צוות Kiswani כאן כדי לעזור."),
    sections: [
      { title: text("Choosing the right light", "اختيار الإضاءة المناسبة", "בחירת התאורה הנכונה"), body: text("Tell us about the room, ceiling height, materials, and desired atmosphere. We will help narrow the collection to fixtures that suit the space and its function.", "أخبرنا عن المساحة وارتفاع السقف والخامات والأجواء المطلوبة، وسنساعدك في تحديد القطع الأنسب للمكان واستخدامه.", "ספרו לנו על החלל, גובה התקרה, החומרים והאווירה הרצויה, ונעזור לצמצם את הבחירה לגופים המתאימים." ) },
      { title: text("Specifications and downloads", "المواصفات والملفات", "מפרטים והורדות"), body: text("Product pages include the available technical data and downloadable PDF sheets. Contact us when a specification needs confirmation before tender or installation.", "تتضمن صفحات المنتجات البيانات التقنية المتوفرة وملفات PDF قابلة للتحميل. تواصل معنا لتأكيد أي مواصفة قبل المناقصة أو التركيب.", "דפי המוצר כוללים נתונים טכניים וקובצי PDF זמינים. פנו אלינו לאישור מפרט לפני מכרז או התקנה." ) },
      { title: text("Pricing and availability", "الأسعار والتوفر", "מחירים וזמינות"), body: text("Prices, stock, lead time, and delivery options are confirmed by our team before an order is approved, so you receive current information for your exact request.", "يؤكد فريقنا الأسعار والمخزون ومدة التجهيز وخيارات التوصيل قبل اعتماد الطلب، لتحصل على معلومات محدثة لطلبك.", "מחירים, מלאי, זמני אספקה ואפשרויות משלוח מאושרים על ידי הצוות לפני אישור ההזמנה." ) },
      { title: text("Delivery and installation", "التوصيل والتركيب", "משלוח והתקנה"), body: text("We can clarify packaging, delivery coordination, and the installation information available for each fixture. Electrical installation should always be completed by a qualified professional.", "يمكننا توضيح التغليف وتنسيق التوصيل ومعلومات تركيب كل قطعة. يجب دائماً تنفيذ الأعمال الكهربائية بواسطة فني مؤهل.", "נוכל לסייע בנושאי אריזה, תיאום משלוח ומידע התקנה. עבודות חשמל יש לבצע תמיד באמצעות איש מקצוע מוסמך." ) },
      { title: text("After-order assistance", "الدعم بعد الطلب", "סיוע לאחר ההזמנה"), body: text("Keep your product code and order details ready when contacting us. This helps the team identify the item and respond more quickly.", "احتفظ برمز المنتج وتفاصيل الطلب عند التواصل معنا، فهذا يساعد الفريق على تحديد القطعة والرد بشكل أسرع.", "בעת פנייה אלינו, הכינו את קוד המוצר ופרטי ההזמנה כדי שנוכל לזהות את הפריט ולסייע במהירות." ) },
    ],
  },
  privacy: {
    eyebrow: text("PRIVACY", "الخصوصية", "פרטיות"),
    title: text("Your information, handled with care.", "نتعامل مع معلوماتك بعناية.", "המידע שלכם מטופל באחריות."),
    lead: text("This page explains what information Kiswani Lights may receive through the website and how it is used to support your requests.", "توضح هذه الصفحة المعلومات التي قد تستقبلها كسواني للإنارة عبر الموقع وكيف نستخدمها لخدمة طلباتك.", "עמוד זה מסביר איזה מידע Kiswani Lights עשויה לקבל דרך האתר וכיצד הוא משמש לטיפול בפניות שלכם."),
    notice: text("Last updated: July 2026", "آخر تحديث: يوليو 2026", "עדכון אחרון: יולי 2026"),
    sections: [
      { title: text("Information you provide", "المعلومات التي تقدمها", "מידע שאתם מוסרים"), body: text("When you contact us or prepare an order, you may provide your name, phone number, email, city, project details, delivery information, and the products you are interested in.", "عند التواصل معنا أو تجهيز طلب، قد تقدم الاسم ورقم الهاتف والبريد الإلكتروني والمدينة وتفاصيل المشروع والتوصيل والمنتجات التي تهمك.", "בעת יצירת קשר או הכנת הזמנה, ייתכן שתמסרו שם, טלפון, דוא״ל, עיר, פרטי פרויקט, משלוח ומוצרים שמעניינים אתכם." ) },
      { title: text("How we use information", "كيف نستخدم المعلومات", "כיצד אנו משתמשים במידע"), body: text("We use this information to answer inquiries, prepare quotations, confirm availability, coordinate orders and delivery, improve support, and protect the website from misuse.", "نستخدم هذه المعلومات للرد على الاستفسارات وإعداد العروض وتأكيد التوفر وتنسيق الطلبات والتوصيل وتحسين الدعم وحماية الموقع من سوء الاستخدام.", "אנו משתמשים במידע כדי להשיב לפניות, להכין הצעות, לאשר זמינות, לתאם הזמנות ומשלוחים, לשפר שירות ולהגן על האתר." ) },
      { title: text("Local website storage", "التخزين المحلي في الموقع", "אחסון מקומי באתר"), body: text("The website may store limited preferences on your device, such as language selection, cart contents, and whether the introduction has already been shown. This information supports the browsing experience.", "قد يخزن الموقع تفضيلات محدودة على جهازك، مثل اللغة ومحتويات السلة وما إذا تم عرض المقدمة، وذلك لتحسين تجربة التصفح.", "האתר עשוי לשמור במכשיר העדפות מוגבלות כגון שפה, תוכן הסל והאם פתיח האתר כבר הוצג." ) },
      { title: text("Sharing and service providers", "المشاركة ومقدمو الخدمات", "שיתוף וספקי שירות"), body: text("We do not sell personal information. Information may be shared only with providers needed to operate the website, communicate with you, or fulfill a confirmed request, subject to appropriate safeguards.", "لا نبيع المعلومات الشخصية. قد تتم مشاركة المعلومات فقط مع الجهات اللازمة لتشغيل الموقع أو التواصل معك أو تنفيذ طلب مؤكد، مع الضمانات المناسبة.", "איננו מוכרים מידע אישי. מידע עשוי להיות משותף רק עם ספקים הנדרשים להפעלת האתר, לתקשורת או לביצוע בקשה מאושרת." ) },
      { title: text("Retention and security", "الاحتفاظ والأمان", "שמירה ואבטחה"), body: text("We retain information only as long as reasonably needed for service, operational, and record-keeping purposes. We use reasonable measures to protect it, while no online system can guarantee absolute security.", "نحتفظ بالمعلومات للمدة اللازمة بصورة معقولة للخدمة والتشغيل وحفظ السجلات، ونستخدم إجراءات مناسبة لحمايتها مع عدم إمكانية ضمان أمان مطلق لأي نظام إلكتروني.", "אנו שומרים מידע רק למשך הזמן הנדרש לשירות, תפעול ותיעוד, ונוקטים אמצעים סבירים להגנה עליו, אף שאין מערכת מקוונת בטוחה לחלוטין." ) },
      { title: text("Your choices and contact", "خياراتك والتواصل", "הבחירות שלכם ויצירת קשר"), body: text("You may ask us to review, correct, or delete personal information held in connection with a website inquiry, subject to legitimate record-keeping needs. Contact info@kiswanilights.com.", "يمكنك طلب مراجعة أو تصحيح أو حذف معلوماتك المرتبطة باستفسار عبر الموقع، مع مراعاة متطلبات حفظ السجلات المشروعة. تواصل عبر info@kiswanilights.com.", "ניתן לבקש לעיין, לתקן או למחוק מידע אישי הקשור לפנייה באתר, בכפוף לצורכי תיעוד לגיטימיים. פנו אל info@kiswanilights.com." ) },
    ],
  },
  terms: {
    eyebrow: text("TERMS OF USE", "شروط الاستخدام", "תנאי שימוש"),
    title: text("Clear terms for using the Kiswani website.", "شروط واضحة لاستخدام موقع كسواني.", "תנאים ברורים לשימוש באתר Kiswani."),
    lead: text("These terms govern use of this website and the product inquiry and order-request tools available through it.", "تحكم هذه الشروط استخدام الموقع وأدوات الاستفسار عن المنتجات وطلبات الشراء المتوفرة من خلاله.", "תנאים אלה חלים על השימוש באתר ועל כלי הבירור ובקשות ההזמנה הזמינים בו."),
    notice: text("Last updated: July 2026", "آخر تحديث: يوليو 2026", "עדכון אחרון: יולי 2026"),
    sections: [
      { title: text("Using this website", "استخدام الموقع", "שימוש באתר"), body: text("You may use the website for lawful personal, professional, and project-planning purposes. Do not interfere with its operation, attempt unauthorized access, or use its content in a misleading or harmful way.", "يمكنك استخدام الموقع لأغراض شخصية ومهنية وتخطيط المشاريع بصورة مشروعة. لا يجوز تعطيل تشغيله أو محاولة الوصول غير المصرح أو استخدام المحتوى بصورة مضللة أو ضارة.", "ניתן להשתמש באתר למטרות חוקיות, אישיות, מקצועיות ותכנון פרויקטים. אין לפגוע בפעולתו, לנסות גישה לא מורשית או להשתמש בתוכן באופן מטעה." ) },
      { title: text("Product information", "معلومات المنتجات", "מידע על מוצרים"), body: text("We aim to present product images, descriptions, and specifications accurately. Finishes, color appearance, dimensions, and technical details should be confirmed with the Kiswani team before purchase or installation.", "نسعى لعرض صور المنتجات ووصفها ومواصفاتها بدقة. يجب تأكيد التشطيبات والألوان والأبعاد والتفاصيل التقنية مع فريق كسواني قبل الشراء أو التركيب.", "אנו שואפים להציג תמונות, תיאורים ומפרטים במדויק. יש לאשר גימורים, צבעים, מידות ופרטים טכניים עם צוות Kiswani לפני רכישה או התקנה." ) },
      { title: text("Prices, availability, and requests", "الأسعار والتوفر والطلبات", "מחירים, זמינות ובקשות"), body: text("Website cart and checkout actions create an order request, not an automatically accepted sale. Pricing, availability, quantities, delivery, payment, and lead time are confirmed directly by Kiswani before an order becomes final.", "إجراءات السلة وإتمام الطلب تنشئ طلب شراء وليست عملية بيع مقبولة تلقائياً. تؤكد كسواني السعر والتوفر والكميات والتوصيل والدفع ومدة التجهيز قبل اعتماد الطلب نهائياً.", "פעולות הסל והתשלום יוצרות בקשת הזמנה ולא עסקה מאושרת אוטומטית. מחיר, זמינות, כמויות, משלוח, תשלום וזמן אספקה יאושרו ישירות לפני אישור סופי." ) },
      { title: text("Installation and safe use", "التركيب والاستخدام الآمن", "התקנה ושימוש בטוח"), body: text("Lighting products must be installed and used according to their specifications and applicable safety requirements. Electrical work should be carried out by a qualified professional.", "يجب تركيب واستخدام منتجات الإضاءة وفق مواصفاتها ومتطلبات السلامة المعمول بها، وتنفيذ الأعمال الكهربائية بواسطة فني مؤهل.", "יש להתקין ולהשתמש במוצרי תאורה בהתאם למפרטים ולדרישות הבטיחות. עבודות חשמל יבוצעו בידי איש מקצוע מוסמך." ) },
      { title: text("Intellectual property", "الملكية الفكرية", "קניין רוחני"), body: text("The Kiswani name, logo, website design, text, product presentation, and original media are protected. They may not be copied, modified, or used commercially without permission from the relevant rights holder.", "اسم كسواني وشعارها وتصميم الموقع والنصوص وعرض المنتجات والمواد الأصلية محمية، ولا يجوز نسخها أو تعديلها أو استخدامها تجارياً دون إذن صاحب الحقوق.", "השם והלוגו של Kiswani, עיצוב האתר, הטקסטים, הצגת המוצרים והמדיה המקורית מוגנים ואין להעתיקם או להשתמש בהם מסחרית ללא רשות." ) },
      { title: text("Third-party services", "خدمات الجهات الخارجية", "שירותי צד שלישי"), body: text("The website may link to messaging, maps, downloads, or other third-party services. Their availability and privacy practices are controlled by those providers.", "قد يرتبط الموقع بخدمات مراسلة أو خرائط أو تنزيلات أو خدمات خارجية أخرى، وتخضع إتاحتها وممارسات الخصوصية فيها لمقدميها.", "האתר עשוי לקשר לשירותי הודעות, מפות, הורדות או שירותים חיצוניים. הזמינות ומדיניות הפרטיות שלהם בשליטת הספקים." ) },
      { title: text("Changes and contact", "التغييرات والتواصل", "שינויים ויצירת קשר"), body: text("We may update these terms when the website or services change. The latest version will appear on this page. Questions may be sent to info@kiswanilights.com.", "قد نحدث هذه الشروط عند تغير الموقع أو الخدمات، وستظهر النسخة الأحدث في هذه الصفحة. يمكن إرسال الأسئلة إلى info@kiswanilights.com.", "אנו עשויים לעדכן תנאים אלה כאשר האתר או השירותים משתנים. הגרסה האחרונה תופיע בעמוד זה. שאלות ניתן לשלוח אל info@kiswanilights.com." ) },
    ],
  },
};

const pageLinks: Array<{ kind: InformationPageKind; label: LocalizedText }> = [
  { kind: "about", label: text("About", "من نحن", "אודות") },
  { kind: "support", label: text("Support", "الدعم", "תמיכה") },
  { kind: "privacy", label: text("Privacy", "الخصوصية", "פרטיות") },
  { kind: "terms", label: text("Terms", "الشروط", "תנאים") },
];

const pageIcons: Record<InformationPageKind, LucideIcon> = {
  about: Sparkles,
  support: Headphones,
  privacy: ShieldCheck,
  terms: FileText,
};

const supportContacts: Array<{ icon: LucideIcon; title: LocalizedText; detail: string; href: string }> = [
  { icon: MessageCircle, title: text("WhatsApp", "واتساب", "WhatsApp"), detail: "+970 599 67 12 09", href: "https://wa.me/970599671209" },
  { icon: Phone, title: text("Call us", "اتصل بنا", "התקשרו אלינו"), detail: "+970 599 67 12 09", href: "tel:+970599671209" },
  { icon: Mail, title: text("Email support", "الدعم عبر البريد", "תמיכה בדוא״ל"), detail: "info@kiswanilights.com", href: "mailto:info@kiswanilights.com" },
  { icon: MapPin, title: text("Showroom", "المعرض", "אולם תצוגה"), detail: "Ramallah · Palestine", href: "https://maps.google.com/?q=Ramallah+Palestine" },
];

function t(value: LocalizedText, language: Language) {
  return value[language];
}

export function InformationPageExperience({ kind }: { kind: InformationPageKind }) {
  const [language, setLanguage] = useStoredLanguage();
  const isRtl = isRtlLanguage(language);
  const page = content[kind];
  const PageIcon = pageIcons[kind];

  return (
    <div lang={language} dir={isRtl ? "rtl" : "ltr"} className="min-h-screen bg-white text-[#0F1822]">
      <Header language={language} setLanguage={setLanguage} rootPrefix="/" />
      <main id="top">
        <section className="relative isolate overflow-hidden bg-[#050709] px-4 pb-10 pt-8 text-white sm:px-8 sm:pb-16 sm:pt-12">
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_82%_20%,rgba(255,218,1,0.1),transparent_30%)] rtl:bg-[radial-gradient(circle_at_18%_20%,rgba(255,218,1,0.1),transparent_30%)]" />
          <div className="relative mx-auto max-w-[1440px]">
            <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-6 text-[10px] font-bold uppercase tracking-[0.17em] text-[#73787C]">
              <Link href="/" className="transition-colors hover:text-white">Kiswani Lights</Link><span>/</span><span className="text-[#FFDA01]">{t(page.eyebrow, language)}</span>
            </div>

            <div className="grid min-h-[540px] items-end gap-14 py-16 lg:grid-cols-[1fr_0.34fr] lg:py-24">
              <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}>
                <div className="flex items-center gap-4"><span className="h-[3px] w-14 bg-[#FFDA01]" /><p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#FFDA01]">{t(page.eyebrow, language)}</p></div>
                <h1 className="mt-8 max-w-5xl text-balance text-5xl font-semibold leading-[0.93] tracking-[-0.06em] sm:text-7xl lg:text-[88px]">{t(page.title, language)}</h1>
                <p className="mt-8 max-w-3xl text-base leading-8 text-[#A3A7AA] sm:text-lg">{t(page.lead, language)}</p>
                {page.notice && <p className="mt-7 inline-flex border-s-2 border-[#FFDA01] ps-4 text-xs font-semibold text-[#CCCFCE]">{t(page.notice, language)}</p>}
              </motion.div>

              <motion.div initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.15 }} className="hidden justify-self-end lg:block">
                <div className="relative flex h-56 w-56 items-center justify-center border border-white/10 bg-white/[0.025]"><span className="absolute inset-5 border border-white/[0.07]" /><PageIcon size={68} strokeWidth={1} className="text-[#FFDA01]" /><span className="absolute bottom-6 end-6 text-[10px] font-bold tracking-[0.2em] text-[#50555B]">0{pageLinks.findIndex((item) => item.kind === kind) + 1} / 04</span></div>
              </motion.div>
            </div>

            <nav className="grid border-x border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4" aria-label="Information pages">
              {pageLinks.map((item, index) => <Link key={item.kind} href={`/${item.kind}`} aria-current={item.kind === kind ? "page" : undefined} className={`flex min-h-16 items-center justify-between border-b border-e border-white/10 px-5 text-xs font-bold transition-colors ${item.kind === kind ? "bg-[#FFDA01] text-[#0F1822]" : "text-[#A3A7AA] hover:bg-white/[0.04] hover:text-white"}`}><span>{t(item.label, language)}</span><span className={item.kind === kind ? "text-[#0F1822]/45" : "text-[#50555B]"}>0{index + 1}</span></Link>)}
            </nav>
          </div>
        </section>

        {kind === "about" && (
          <section className="bg-[#E9E6DF] px-4 py-16 sm:px-8 sm:py-24">
            <div className="mx-auto grid max-w-[1440px] overflow-hidden bg-[#0F1822] lg:grid-cols-[1.2fr_0.8fr]">
              <div className="relative min-h-[440px] lg:min-h-[620px]"><Image unoptimized src="/images/kiswani-hero-2026.webp" alt={t(text("Architectural interior illuminated by Kiswani Lights", "مساحة معمارية مضاءة من كسواني", "חלל אדריכלי מואר על ידי Kiswani Lights"), language)} fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" /><span className="absolute inset-0 bg-gradient-to-t from-[#050709]/45 to-transparent" /></div>
              <div className="flex flex-col justify-between p-8 text-white sm:p-12 lg:p-16"><Lightbulb size={48} strokeWidth={1.1} className="text-[#FFDA01]" /><div><p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#FFDA01]">KISWANI / 2026</p><p className="mt-6 text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-5xl">{t(text("Lighting is the soul of the space.", "الإضاءة هي روح المكان.", "התאורה היא הנשמה של החלל."), language)}</p></div></div>
            </div>
          </section>
        )}

        {kind === "support" && (
          <section className="bg-[#F4F2ED] px-4 py-20 sm:px-8 sm:py-28">
            <div className="mx-auto max-w-[1440px]"><div className="mb-10 flex items-center gap-4"><span className="h-[3px] w-14 bg-[#FFDA01]" /><h2 className="text-xs font-bold uppercase tracking-[0.2em]">{t(text("Contact the support team", "تواصل مع فريق الدعم", "יצירת קשר עם צוות התמיכה"), language)}</h2></div><div className="grid gap-px bg-[#CCCFCE] sm:grid-cols-2 xl:grid-cols-4">{supportContacts.map(({ icon: Icon, title, detail, href }, index) => <motion.a key={href} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} whileHover={{ y: -5 }} className="group bg-white p-7 sm:p-8"><div className="flex items-start justify-between"><span className="flex h-12 w-12 items-center justify-center bg-[#FFDA01]"><Icon size={20} /></span><span className="text-[10px] text-[#A3A7AA]">0{index + 1}</span></div><h3 className="mt-8 text-xl font-semibold">{t(title, language)}</h3><p className="mt-3 text-sm text-[#73787C]" dir="ltr">{detail}</p><ArrowUpRight size={17} className="mt-7 text-[#0F1822] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></motion.a>)}</div></div>
          </section>
        )}

        <section className="bg-white px-4 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-[0.32fr_1fr] lg:gap-24">
            <aside className="lg:sticky lg:top-36 lg:h-fit"><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#73787C]">{t(text("On this page", "في هذه الصفحة", "בעמוד זה"), language)}</p><nav className="mt-6 grid border-t border-[#CCCFCE]">{page.sections.map((section, index) => <a key={section.title.en} href={`#section-${index + 1}`} className="flex items-center justify-between border-b border-[#CCCFCE] py-4 text-sm font-medium text-[#50555B] transition-colors hover:text-[#0F1822]"><span>{t(section.title, language)}</span><span className="text-[9px] text-[#A3A7AA]">0{index + 1}</span></a>)}</nav></aside>
            <div className="border-t border-[#0F1822]">{page.sections.map((section, index) => <motion.article id={`section-${index + 1}`} key={section.title.en} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.24 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="scroll-mt-36 grid gap-6 border-b border-[#CCCFCE] py-10 sm:grid-cols-[72px_1fr] sm:py-14"><span className="text-xs font-semibold text-[#A3A7AA]">0{index + 1}</span><div><h2 className="text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">{t(section.title, language)}</h2><p className="mt-5 max-w-3xl text-base leading-8 text-[#50555B]">{t(section.body, language)}</p></div></motion.article>)}</div>
          </div>
        </section>

        <section className="bg-[#FFDA01] px-4 py-20 sm:px-8 sm:py-24">
          <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 lg:flex-row lg:items-end"><div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#50555B]">{t(text("KISWANI SUPPORT", "دعم كسواني", "תמיכת KISWANI"), language)}</p><h2 className="mt-4 max-w-4xl text-balance text-4xl font-semibold leading-[1] tracking-[-0.045em] sm:text-6xl">{t(text("Still need a clear answer? Talk to our team.", "ما زلت تحتاج إجابة واضحة؟ تحدث مع فريقنا.", "עדיין צריכים תשובה ברורה? דברו עם הצוות שלנו."), language)}</h2></div><a href="https://wa.me/970599671209" target="_blank" rel="noreferrer" className="inline-flex min-h-14 items-center justify-center gap-3 bg-[#0F1822] px-7 text-sm font-bold text-white">{t(text("Contact Kiswani", "تواصل مع كسواني", "יצירת קשר עם Kiswani"), language)}<ArrowRight size={17} className={isRtl ? "rotate-180" : ""} /></a></div>
        </section>
      </main>
      <LuxuryFooter language={language} rootPrefix="/" />
      <CartDrawer language={language} />
    </div>
  );
}
