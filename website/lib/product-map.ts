export type LocalizedText = { en: string; ar: string; he: string };

export type ProductMapItem = {
  label: LocalizedText;
  search: string;
  image: string;
};

export type ProductMapSection = {
  label: LocalizedText;
  image: string;
  items: ProductMapItem[];
};

export type ProductMapGroup = {
  id: "lighting-fixtures" | "light-bulbs" | "electrical-products" | "i-lite";
  label: LocalizedText;
  description: LocalizedText;
  image: string;
  sections: ProductMapSection[];
};

export const productMapGroups: ProductMapGroup[] = [
  {
    "id": "lighting-fixtures",
    "label": {
      "en": "Lighting fixtures",
      "ar": "تركيبات الإضاءة",
      "he": "גופי תאורה"
    },
    "description": {
      "en": "Interior, exterior, technical systems, outlet, and lighting accessories.",
      "ar": "تركيبات الإضاءة",
      "he": "גופי תאורה"
    },
    "image": "/images/editorial/hero-interior.webp",
    "sections": [
      {
        "label": {
          "en": "Indoor lighting",
          "ar": "الإضاءة الداخلية",
          "he": "תאורת פנים"
        },
        "items": [
          {
            "label": {
              "en": "Ceiling-mounted lighting",
              "ar": "مثبتة على السقف",
              "he": "צמודי תקרה"
            },
            "search": "Ceiling-mounted lighting",
            "image": "/images/editorial/hero-interior.webp"
          },
          {
            "label": {
              "en": "Ceiling lights with remote control",
              "ar": "الهواتف المحمولة + جهاز التحكم عن بعد",
              "he": "צמודי תקרה עם שלט"
            },
            "search": "Ceiling lights with remote control",
            "image": "/images/editorial/hero-interior.webp"
          },
          {
            "label": {
              "en": "Pendant lights",
              "ar": "مصابيح معلقة",
              "he": "מנורות תלייה"
            },
            "search": "Pendant lights",
            "image": "/images/editorial/hero-interior.webp"
          },
          {
            "label": {
              "en": "Wall lights",
              "ar": "مصابيح الحائط",
              "he": "מנורות קיר"
            },
            "search": "Wall lights",
            "image": "/images/editorial/hero-interior.webp"
          },
          {
            "label": {
              "en": "Bathroom lighting",
              "ar": "إضاءة الحمام",
              "he": "תאורה לאמבטיה"
            },
            "search": "Bathroom lighting",
            "image": "/images/editorial/hero-interior.webp"
          },
          {
            "label": {
              "en": "Table lamps",
              "ar": "مصابيح الطاولة",
              "he": "מנורות שולחן"
            },
            "search": "Table lamps",
            "image": "/images/editorial/hero-interior.webp"
          },
          {
            "label": {
              "en": "Floor lamps",
              "ar": "مصابيح أرضية",
              "he": "מנורות עמידה"
            },
            "search": "Floor lamps",
            "image": "/images/editorial/hero-interior.webp"
          },
          {
            "label": {
              "en": "Recessed ceiling lighting",
              "ar": "السقف غائر",
              "he": "שקועי תקרה"
            },
            "search": "Recessed ceiling lighting",
            "image": "/images/editorial/hero-interior.webp"
          },
          {
            "label": {
              "en": "Trimless recessed ceiling lighting",
              "ar": "زخارف السقف الغائرة",
              "he": "שקועי תקרה טרימלס"
            },
            "search": "Trimless recessed ceiling lighting",
            "image": "/images/editorial/hero-interior.webp"
          },
          {
            "label": {
              "en": "Cylinder spotlights",
              "ar": "الأسطوانات",
              "he": "צילינדרים"
            },
            "search": "Cylinder spotlights",
            "image": "/images/editorial/hero-interior.webp"
          },
          {
            "label": {
              "en": "Children room lighting",
              "ar": "إضاءة غرفة الأطفال",
              "he": "תאורה לחדר ילדים"
            },
            "search": "Children room lighting",
            "image": "/images/editorial/hero-interior.webp"
          },
          {
            "label": {
              "en": "Mirrors with lighting",
              "ar": "مرايا مع إضاءة",
              "he": "מראות עם תאורה"
            },
            "search": "Mirrors with lighting",
            "image": "/images/editorial/hero-interior.webp"
          },
          {
            "label": {
              "en": "Chandeliers for high ceilings",
              "ar": "إضاءة السقف العالية",
              "he": "תאורה לתקרה גבוהה"
            },
            "search": "Chandeliers for high ceilings",
            "image": "/images/editorial/hero-interior.webp"
          },
          {
            "label": {
              "en": "Designer lighting fixtures",
              "ar": "تركيبات الإضاءة للمصممين",
              "he": "גופי תאורה למעצבים"
            },
            "search": "Designer lighting fixtures",
            "image": "/images/editorial/hero-interior.webp"
          },
          {
            "label": {
              "en": "Onyx series",
              "ar": "سلسلة أونيكس",
              "he": "סדרת אוניקס"
            },
            "search": "Onyx series",
            "image": "/images/editorial/hero-interior.webp"
          }
        ],
        "image": "/images/editorial/hero-interior.webp"
      },
      {
        "label": {
          "en": "Outdoor lighting",
          "ar": "الإضاءة الخارجية",
          "he": "תאורת חוץ"
        },
        "items": [
          {
            "label": {
              "en": "Garden lighting posts",
              "ar": "أعمدة إنارة الحدائق",
              "he": "עמודי תאורה לגינה"
            },
            "search": "Garden lighting posts",
            "image": "/images/editorial/story-wall.webp"
          },
          {
            "label": {
              "en": "Modern outdoor wall lights",
              "ar": "مصابيح حائط خارجية حديثة",
              "he": "מנורות קיר חוץ מודרני"
            },
            "search": "Modern outdoor wall lights",
            "image": "/images/editorial/story-wall.webp"
          },
          {
            "label": {
              "en": "Classic outdoor wall lights",
              "ar": "مصابيح حائط خارجية كلاسيكية",
              "he": "מנורות קיר חוץ קלאסי"
            },
            "search": "Classic outdoor wall lights",
            "image": "/images/editorial/story-wall.webp"
          },
          {
            "label": {
              "en": "Wall-mounted outdoor lights",
              "ar": "مثبت على الحائط",
              "he": "צמודי חומה"
            },
            "search": "Wall-mounted outdoor lights",
            "image": "/images/editorial/story-wall.webp"
          },
          {
            "label": {
              "en": "Waterproof ceiling lights",
              "ar": "مصابيح السقف المقاومة للماء",
              "he": "מנורות תקרה מוגני מים"
            },
            "search": "Waterproof ceiling lights",
            "image": "/images/editorial/story-wall.webp"
          },
          {
            "label": {
              "en": "Garden spike lights",
              "ar": "مسامير الحديقة",
              "he": "דוקרנים לגינה"
            },
            "search": "Garden spike lights",
            "image": "/images/editorial/story-wall.webp"
          },
          {
            "label": {
              "en": "Recessed floor lights",
              "ar": "أرضية غائرة",
              "he": "שקועי רצפה"
            },
            "search": "Recessed floor lights",
            "image": "/images/editorial/story-wall.webp"
          },
          {
            "label": {
              "en": "Floodlights",
              "ar": "أجهزة العرض",
              "he": "פרוגקטורים"
            },
            "search": "Floodlights",
            "image": "/images/editorial/story-wall.webp"
          },
          {
            "label": {
              "en": "Street lighting",
              "ar": "إنارة الشوارع",
              "he": "תאורת רחוב"
            },
            "search": "Street lighting",
            "image": "/images/editorial/story-wall.webp"
          },
          {
            "label": {
              "en": "Solar garden lighting",
              "ar": "إضاءة الحدائق بالطاقة الشمسية",
              "he": "תאורה סולארית לגינה"
            },
            "search": "Solar garden lighting",
            "image": "/images/editorial/story-wall.webp"
          },
          {
            "label": {
              "en": "Lido collection",
              "ar": "مجموعة ليدو",
              "he": "קולקציית lido"
            },
            "search": "Lido collection",
            "image": "/images/editorial/story-wall.webp"
          }
        ],
        "image": "/images/editorial/story-wall.webp"
      },
      {
        "label": {
          "en": "Technical lighting",
          "ar": "الإضاءة التقنية",
          "he": "תאורה טכנית"
        },
        "items": [
          {
            "label": {
              "en": "LED panels",
              "ar": "لوحات LED",
              "he": "פאנלים לד"
            },
            "search": "LED panels",
            "image": "/images/editorial/hero-technical.webp"
          },
          {
            "label": {
              "en": "Lighting profile",
              "ar": "ملف تعريف الإضاءة",
              "he": "פרופיל תאורה"
            },
            "search": "Lighting profile",
            "image": "/images/editorial/hero-technical.webp"
          },
          {
            "label": {
              "en": "Custom-made lighting profile",
              "ar": "ملف تعريف الإضاءة المصمم حسب الطلب",
              "he": "פרופיל תאורה בייצור לפי מידה"
            },
            "search": "Custom-made lighting profile",
            "image": "/images/editorial/hero-technical.webp"
          },
          {
            "label": {
              "en": "Oshido magnetic lighting system",
              "ar": "نظام الإضاءة المغناطيسية أوشيدو",
              "he": "מערכת תאורה מגנטית אושידו"
            },
            "search": "Oshido magnetic lighting system",
            "image": "/images/editorial/hero-technical.webp"
          },
          {
            "label": {
              "en": "Magnetic track lighting (Sumo)",
              "ar": "نظام الإضاءة المغناطيسية السومو",
              "he": "מערכת תאורה מגנטית סומו"
            },
            "search": "Magnetic track lighting (Sumo)",
            "image": "/images/editorial/hero-technical.webp"
          },
          {
            "label": {
              "en": "Magnetic track lighting (dimmer + CCT)",
              "ar": "نظام الإضاءة المغناطيسية الذكية",
              "he": "מערכת תאורה מגנטית לדימור"
            },
            "search": "Magnetic track lighting (dimmer + CCT)",
            "image": "/images/editorial/hero-technical.webp"
          },
          {
            "label": {
              "en": "Laser magnetic lighting system",
              "ar": "نظام الإضاءة المغناطيسية بالليزر",
              "he": "מערכת תאורה מגנטית לייזר"
            },
            "search": "Laser magnetic lighting system",
            "image": "/images/editorial/hero-technical.webp"
          },
          {
            "label": {
              "en": "Magnetic lighting system modules",
              "ar": "نظام الإضاءة المغناطيسية المعياري",
              "he": "מערכת תאורה מגנטית מודולרית"
            },
            "search": "Magnetic lighting system modules",
            "image": "/images/editorial/hero-technical.webp"
          },
          {
            "label": {
              "en": "Soho magnetic strip lighting system",
              "ar": "نظام إضاءة الشريط المغناطيسي سوهو",
              "he": "מערכת תאורה מגנטית סוהו רצועה"
            },
            "search": "Soho magnetic strip lighting system",
            "image": "/images/editorial/hero-technical.webp"
          },
          {
            "label": {
              "en": "Single-phase track lighting",
              "ar": "قضبان التوصيل - أحادية الطور",
              "he": "פסי צבירה חד פאזי"
            },
            "search": "Single-phase track lighting",
            "image": "/images/editorial/hero-technical.webp"
          },
          {
            "label": {
              "en": "Three-phase track lighting",
              "ar": "قضبان التوصيل - ثلاثية الطور",
              "he": "פסי צבירה תלת פאזי"
            },
            "search": "Three-phase track lighting",
            "image": "/images/editorial/hero-technical.webp"
          },
          {
            "label": {
              "en": "LED strips",
              "ar": "شرائط LED",
              "he": "פסי לד"
            },
            "search": "LED strips",
            "image": "/images/editorial/hero-technical.webp"
          },
          {
            "label": {
              "en": "Recessed wall spotlights",
              "ar": "جدار غائر",
              "he": "שקועי קיר"
            },
            "search": "Recessed wall spotlights",
            "image": "/images/editorial/hero-technical.webp"
          },
          {
            "label": {
              "en": "Spotlights",
              "ar": "البقع",
              "he": "ספוטים"
            },
            "search": "Spotlights",
            "image": "/images/editorial/hero-technical.webp"
          },
          {
            "label": {
              "en": "LED high-bay lights",
              "ar": "أجراس LED",
              "he": "פעמוני לד"
            },
            "search": "LED high-bay lights",
            "image": "/images/editorial/hero-technical.webp"
          }
        ],
        "image": "/images/editorial/hero-technical.webp"
      },
      {
        "label": {
          "en": "Outlet",
          "ar": "مَنفَذ",
          "he": "חיסול"
        },
        "items": [
          {
            "label": {
              "en": "Max outlet",
              "ar": "أوتلت ماكس",
              "he": "חיסול"
            },
            "search": "Max outlet",
            "image": "/images/editorial/hero-accent.webp"
          },
          {
            "label": {
              "en": "Store logo",
              "ar": "شعار المتجر",
              "he": "شعار المتجر"
            },
            "search": "Store logo",
            "image": "/images/editorial/hero-accent.webp"
          }
        ],
        "image": "/images/editorial/hero-accent.webp"
      },
      {
        "label": {
          "en": "Accessories",
          "ar": "مُكَمِّلات",
          "he": "אביזרים"
        },
        "items": [
          {
            "label": {
              "en": "Drivers and power supplies",
              "ar": "برامج التشغيل وإمدادات الطاقة",
              "he": "דרייברים וספקי כח"
            },
            "search": "Drivers and power supplies",
            "image": "/images/editorial/hero-accent.webp"
          },
          {
            "label": {
              "en": "Lamp bases",
              "ar": "قواعد لتركيبات الإضاءة",
              "he": "בסיסים לגופי תאורה"
            },
            "search": "Lamp bases",
            "image": "/images/editorial/hero-accent.webp"
          },
          {
            "label": {
              "en": "LED strips / garlands",
              "ar": "شرائط/أكاليل LED",
              "he": "סרטי לד גרילנדות"
            },
            "search": "LED strips / garlands",
            "image": "/images/editorial/hero-accent.webp"
          },
          {
            "label": {
              "en": "LED emergency lighting",
              "ar": "الإضاءة الطارئة",
              "he": "תאורת חירום"
            },
            "search": "LED emergency lighting",
            "image": "/images/editorial/hero-accent.webp"
          },
          {
            "label": {
              "en": "Night lights",
              "ar": "مصابيح الليل",
              "he": "מנורות לילה"
            },
            "search": "Night lights",
            "image": "/images/editorial/hero-accent.webp"
          },
          {
            "label": {
              "en": "Lampshades",
              "ar": "أباجورات المصابيح",
              "he": "אהילים"
            },
            "search": "Lampshades",
            "image": "/images/editorial/hero-accent.webp"
          },
          {
            "label": {
              "en": "Mosquito killer",
              "ar": "قاتلات البعوض",
              "he": "קטלני יתושים"
            },
            "search": "Mosquito killer",
            "image": "/images/editorial/hero-accent.webp"
          },
          {
            "label": {
              "en": "Pool and swimming pool lighting",
              "ar": "إضاءة حمام السباحة",
              "he": "תאורה לבריכות"
            },
            "search": "Pool and swimming pool lighting",
            "image": "/images/editorial/hero-accent.webp"
          },
          {
            "label": {
              "en": "Electrical cables",
              "ar": "الكابلات الكهربائية",
              "he": "כבלי חשמל"
            },
            "search": "Electrical cables",
            "image": "/images/editorial/hero-accent.webp"
          },
          {
            "label": {
              "en": "Controllers / sensors",
              "ar": "בקרים / חיישנים",
              "he": "סנסורים חיישנים"
            },
            "search": "Controllers / sensors",
            "image": "/images/editorial/hero-accent.webp"
          }
        ],
        "image": "/images/editorial/hero-accent.webp"
      }
    ]
  },
  {
    "id": "light-bulbs",
    "label": {
      "en": "Light bulbs",
      "ar": "المصابيح الكهربائية",
      "he": "נורות"
    },
    "description": {
      "en": "E27, E14, GU10/G9, PAR, filament, fluorescent, and LED bulb families.",
      "ar": "المصابيح الكهربائية",
      "he": "נורות"
    },
    "image": "/images/editorial/hero-accent.webp",
    "sections": [
      {
        "label": {
          "en": "E27 LED bulbs",
          "ar": "مصابيح LED E27",
          "he": "נורות לד E27"
        },
        "items": [
          {
            "label": {
              "en": "E27 LED bulbs",
              "ar": "لامبات لد e27",
              "he": "נורות לד e27"
            },
            "search": "E27 LED bulbs",
            "image": "/images/editorial/hero-accent.webp"
          }
        ],
        "image": "/images/editorial/hero-accent.webp"
      },
      {
        "label": {
          "en": "E14 LED bulb",
          "ar": "مصباح LED E14",
          "he": "נורת לד E14"
        },
        "items": [
          {
            "label": {
              "en": "E14 LED bulbs",
              "ar": "لامبات لد e14",
              "he": "נורת לד e14"
            },
            "search": "E14 LED bulbs",
            "image": "/images/editorial/hero-accent.webp"
          }
        ],
        "image": "/images/editorial/hero-accent.webp"
      },
      {
        "label": {
          "en": "PAR garden bulbs",
          "ar": "مصباح حديقة PAR",
          "he": "נורות PAR לגינה"
        },
        "items": [
          {
            "label": {
              "en": "PAR garden bulbs",
              "ar": "لامبات PAR",
              "he": "נורה לגינה par"
            },
            "search": "PAR garden bulbs",
            "image": "/images/editorial/hero-accent.webp"
          }
        ],
        "image": "/images/editorial/hero-accent.webp"
      },
      {
        "label": {
          "en": "Decorative LED filament bulbs",
          "ar": "لمبات LED المصممة بالفحم",
          "he": "נורות פחם לד"
        },
        "items": [
          {
            "label": {
              "en": "Decorative bulbs",
              "ar": "لامبات ديكور مزخرفه",
              "he": "נורות מעוצבות"
            },
            "search": "Decorative bulbs",
            "image": "/images/editorial/hero-accent.webp"
          }
        ],
        "image": "/images/editorial/hero-accent.webp"
      },
      {
        "label": {
          "en": "LED fluorescent bulbs",
          "ar": "مصباح LED فلورسنت",
          "he": "פלורסנט לד"
        },
        "items": [
          {
            "label": {
              "en": "Neon / fluorescent LED bulbs",
              "ar": "لامبات نيون (لد/فلورسنت)",
              "he": "פלורסנט לד"
            },
            "search": "Neon / fluorescent LED bulbs",
            "image": "/images/editorial/hero-accent.webp"
          }
        ],
        "image": "/images/editorial/hero-accent.webp"
      },
      {
        "label": {
          "en": "Fluorescent bulbs",
          "ar": "مصباح فلورسنت",
          "he": "נורות פלורסנט"
        },
        "items": [
          {
            "label": {
              "en": "Fluorescent bulbs",
              "ar": "لامبات فلورسنت",
              "he": "נורת פלורסנט"
            },
            "search": "Fluorescent bulbs",
            "image": "/images/editorial/hero-accent.webp"
          }
        ],
        "image": "/images/editorial/hero-accent.webp"
      }
    ]
  },
  {
    "id": "electrical-products",
    "label": {
      "en": "Electrical products",
      "ar": "المنتجات الكهربائية",
      "he": "מוצרי חשמל"
    },
    "description": {
      "en": "Kitchen appliances, care devices, scales, irons, winter products, ventilation, and air conditioning.",
      "ar": "المنتجات الكهربائية",
      "he": "מוצרי חשמל"
    },
    "image": "/images/editorial/contact-room.webp",
    "sections": [
      {
        "label": {
          "en": "Kitchen electrical appliances",
          "ar": "الأجهزة الكهربائية للمطبخ",
          "he": "מוצרי חשמל למטבח"
        },
        "items": [
          {
            "label": {
              "en": "Kettles",
              "ar": "غلايات",
              "he": "קומקומים"
            },
            "search": "Kettles",
            "image": "/images/editorial/contact-room.webp"
          },
          {
            "label": {
              "en": "Sandwich toaster",
              "ar": "محمصة الخبز",
              "he": "טוסטר לחיצה"
            },
            "search": "Sandwich toaster",
            "image": "/images/editorial/contact-room.webp"
          },
          {
            "label": {
              "en": "Toasters",
              "ar": "متبعو الحمية الغذائية",
              "he": "מצנמים"
            },
            "search": "Toasters",
            "image": "/images/editorial/contact-room.webp"
          },
          {
            "label": {
              "en": "Blenders",
              "ar": "الخلاطات",
              "he": "בלנדרים"
            },
            "search": "Blenders",
            "image": "/images/editorial/contact-room.webp"
          },
          {
            "label": {
              "en": "Mixers",
              "ar": "الخلاطات",
              "he": "מיקסרים"
            },
            "search": "Mixers",
            "image": "/images/editorial/contact-room.webp"
          },
          {
            "label": {
              "en": "Food processors and choppers",
              "ar": "معالجات الطعام والمفرمات",
              "he": "מעבדי מזון וקוצצים"
            },
            "search": "Food processors and choppers",
            "image": "/images/editorial/contact-room.webp"
          },
          {
            "label": {
              "en": "Toaster oven",
              "ar": "فرن محمصة",
              "he": "טוסטר אובן"
            },
            "search": "Toaster oven",
            "image": "/images/editorial/contact-room.webp"
          },
          {
            "label": {
              "en": "Microwave ovens",
              "ar": "أفران الميكروويف",
              "he": "מיקרוגלים"
            },
            "search": "Microwave ovens",
            "image": "/images/editorial/contact-room.webp"
          },
          {
            "label": {
              "en": "Pizza ovens",
              "ar": "أفران البيتزا",
              "he": "ותנורי פיצה"
            },
            "search": "Pizza ovens",
            "image": "/images/editorial/contact-room.webp"
          },
          {
            "label": {
              "en": "Juicers",
              "ar": "عصارات",
              "he": "מסחטות מיצים"
            },
            "search": "Juicers",
            "image": "/images/editorial/contact-room.webp"
          },
          {
            "label": {
              "en": "Cooking and frying pots",
              "ar": "أواني الطبخ والقلي",
              "he": "סירי בישול וטיגון"
            },
            "search": "Cooking and frying pots",
            "image": "/images/editorial/contact-room.webp"
          },
          {
            "label": {
              "en": "Electric grills and cooktops",
              "ar": "الشوايات والمواقد الكهربائية",
              "he": "גרילים וכיריים חשמליים"
            },
            "search": "Electric grills and cooktops",
            "image": "/images/editorial/contact-room.webp"
          },
          {
            "label": {
              "en": "Shabbat water urns",
              "ar": "موزعات مياه السبت",
              "he": "מיחמי מים לשבת"
            },
            "search": "Shabbat water urns",
            "image": "/images/editorial/contact-room.webp"
          },
          {
            "label": {
              "en": "Kitchen treats and accessories",
              "ar": "الحلويات وإكسسوارات المطبخ",
              "he": "פינוקים ואבזור למטבח"
            },
            "search": "Kitchen treats and accessories",
            "image": "/images/editorial/contact-room.webp"
          }
        ],
        "image": "/images/editorial/contact-room.webp"
      },
      {
        "label": {
          "en": "Care and styling devices",
          "ar": "أجهزة العناية والتصفيف",
          "he": "מכשירי טיפוח ועיצוב"
        },
        "items": [
          {
            "label": {
              "en": "Hair dryers",
              "ar": "مجففات الشعر",
              "he": "מייבשי שיער"
            },
            "search": "Hair dryers",
            "image": "/images/editorial/story-lounge.webp"
          },
          {
            "label": {
              "en": "Hair straightener and curler",
              "ar": "مكواة فرد وتجعيد الشعر",
              "he": "מחליק ומסלסל שיער"
            },
            "search": "Hair straightener and curler",
            "image": "/images/editorial/story-lounge.webp"
          }
        ],
        "image": "/images/editorial/story-lounge.webp"
      },
      {
        "label": {
          "en": "Digital scales",
          "ar": "المقاييس الرقمية",
          "he": "משקלים דיגיטליים"
        },
        "items": [
          {
            "label": {
              "en": "Digital body scale",
              "ar": "المقياس البشري الرقمي",
              "he": "משקל אדם דיגיטלי"
            },
            "search": "Digital body scale",
            "image": "/images/editorial/story-lounge.webp"
          },
          {
            "label": {
              "en": "Digital kitchen scale",
              "ar": "ميزان مطبخ رقمي",
              "he": "משקל מטבח דיגיטלי"
            },
            "search": "Digital kitchen scale",
            "image": "/images/editorial/story-lounge.webp"
          }
        ],
        "image": "/images/editorial/story-lounge.webp"
      },
      {
        "label": {
          "en": "Irons and vacuum cleaners",
          "ar": "مكاوي ومكانس كهربائية",
          "he": "מגהצים ושואבי אבק"
        },
        "items": [
          {
            "label": {
              "en": "Steam irons",
              "ar": "مكاوي البخار",
              "he": "מגהצי אדים"
            },
            "search": "Steam irons",
            "image": "/images/editorial/story-lounge.webp"
          },
          {
            "label": {
              "en": "Steam generator irons",
              "ar": "مكاوي البخار",
              "he": "מגהצי קיטור"
            },
            "search": "Steam generator irons",
            "image": "/images/editorial/story-lounge.webp"
          },
          {
            "label": {
              "en": "Dry iron",
              "ar": "مكواة جافة",
              "he": "מגהץ יבש"
            },
            "search": "Dry iron",
            "image": "/images/editorial/story-lounge.webp"
          }
        ],
        "image": "/images/editorial/story-lounge.webp"
      },
      {
        "label": {
          "en": "Winter electrical products",
          "ar": "المنتجات الكهربائية لفصل الشتاء",
          "he": "מוצרי חשמל לחורף"
        },
        "items": [
          {
            "label": {
              "en": "Heaters",
              "ar": "سخانات",
              "he": "תנורי חימום"
            },
            "search": "Heaters",
            "image": "/images/editorial/story-stair.webp"
          },
          {
            "label": {
              "en": "Radiators",
              "ar": "المشعات",
              "he": "רדיאטורים"
            },
            "search": "Radiators",
            "image": "/images/editorial/story-stair.webp"
          },
          {
            "label": {
              "en": "Fan heaters",
              "ar": "موزعات الحرارة",
              "he": "מפזרי חום"
            },
            "search": "Fan heaters",
            "image": "/images/editorial/story-stair.webp"
          },
          {
            "label": {
              "en": "Bathroom heaters and fan heaters",
              "ar": "سخانات الحمامات والسخانات",
              "he": "מפזרי חום ותנורים לאמבטיה"
            },
            "search": "Bathroom heaters and fan heaters",
            "image": "/images/editorial/story-stair.webp"
          }
        ],
        "image": "/images/editorial/story-stair.webp"
      },
      {
        "label": {
          "en": "Ventilation and air conditioning",
          "ar": "التهوية وتكييف الهواء",
          "he": "אוורור ומיזוג אוויר"
        },
        "items": [
          {
            "label": {
              "en": "Ceiling fans with lighting",
              "ar": "المشجعين",
              "he": "מאווררי תקרה"
            },
            "search": "Ceiling fans with lighting",
            "image": "/images/editorial/project-dining.webp"
          },
          {
            "label": {
              "en": "Air conditioners",
              "ar": "مكيفات الهواء",
              "he": "מזגנים"
            },
            "search": "Air conditioners",
            "image": "/images/editorial/project-dining.webp"
          }
        ],
        "image": "/images/editorial/project-dining.webp"
      }
    ]
  },
  {
    "id": "i-lite",
    "label": {
      "en": "i lite",
      "ar": "اي لايت",
      "he": "i lite"
    },
    "description": {
      "en": "Brand collections for i lite and LEDVISION products.",
      "ar": "اي لايت",
      "he": "i lite"
    },
    "image": "/images/editorial/story-lounge.webp",
    "sections": [
      {
        "label": {
          "en": "I LITE",
          "ar": "I LITE",
          "he": "I LITE"
        },
        "items": [
          {
            "label": {
              "en": "i lite",
              "ar": "i lite",
              "he": "i lite"
            },
            "search": "i lite",
            "image": "/images/editorial/story-lounge.webp"
          }
        ],
        "image": "/images/editorial/story-lounge.webp"
      },
      {
        "label": {
          "en": "LEDVISION",
          "ar": "LEDVISION‏",
          "he": "LEDVISION"
        },
        "items": [
          {
            "label": {
              "en": "LEDVISION",
              "ar": "LEDVISION‏",
              "he": "LEDVISION‏"
            },
            "search": "LEDVISION",
            "image": "/images/editorial/story-lounge.webp"
          }
        ],
        "image": "/images/editorial/story-lounge.webp"
      }
    ]
  }
];
