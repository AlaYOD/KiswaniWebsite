<?php
/**
 * Static Kiswani catalog data ported from the Next.js application.
 *
 * @package KiswaniLights
 */

if (!defined('ABSPATH')) {
    exit;
}

function kiswani_static_products(): array
{
    static $data = null;
    if ($data === null) {
        $json = <<<'JSON'
[
  {
    "name": "Golden Wall Lamp - 2 Bulb",
    "arabic": "Golden Wall Lamp - 2 Bulb",
    "category": "Decorative",
    "categoryAr": "Decorative",
    "categorySlug": "decorative",
    "code": "KL-GL-001",
    "price": 285,
    "image": "/images/products/kiswani-product-01.jpg",
    "description": "Brush-gold wall lamp with crystal detail and a warm classic profile.",
    "descriptionAr": "Brush-gold wall lamp with crystal detail and a warm classic profile.",
    "specs": [
      [
        "Bulbs",
        "2 bulb"
      ],
      [
        "Socket",
        "E14 socket"
      ],
      [
        "Height",
        "56 cm"
      ],
      [
        "Material",
        "Zinc material + crystals"
      ],
      [
        "Finish",
        "Brush gold"
      ]
    ]
  },
  {
    "name": "Golden Wall Lamp - 6 Bulb",
    "arabic": "Golden Wall Lamp - 6 Bulb",
    "category": "Decorative",
    "categoryAr": "Decorative",
    "categorySlug": "decorative",
    "code": "KL-GL-002",
    "price": 690,
    "image": "/images/products/kiswani-product-02.jpg",
    "description": "Six-light golden chandelier wall lamp with crystal accents.",
    "descriptionAr": "Six-light golden chandelier wall lamp with crystal accents.",
    "specs": [
      [
        "Bulbs",
        "6 bulb"
      ],
      [
        "Socket",
        "E14 socket"
      ],
      [
        "Diameter",
        "62 cm"
      ],
      [
        "Height",
        "64 cm"
      ],
      [
        "Material",
        "Zinc material + crystals"
      ],
      [
        "Finish",
        "Brush gold"
      ]
    ]
  },
  {
    "name": "Golden Wall Lamp - 15 Bulb",
    "arabic": "Golden Wall Lamp - 15 Bulb",
    "category": "Decorative",
    "categoryAr": "Decorative",
    "categorySlug": "decorative",
    "code": "KL-GL-003",
    "price": 1450,
    "image": "/images/products/kiswani-product-03.jpg",
    "description": "Large golden chandelier with layered arms and crystal drops.",
    "descriptionAr": "Large golden chandelier with layered arms and crystal drops.",
    "specs": [
      [
        "Bulbs",
        "10 + 5 bulb"
      ],
      [
        "Socket",
        "E14 socket"
      ],
      [
        "Diameter",
        "94 cm"
      ],
      [
        "Height",
        "71 cm"
      ],
      [
        "Material",
        "Zinc material + crystals"
      ]
    ]
  },
  {
    "name": "Golden Wall Lamp - 8 Bulb Long",
    "arabic": "Golden Wall Lamp - 8 Bulb Long",
    "category": "Decorative",
    "categoryAr": "Decorative",
    "categorySlug": "decorative",
    "code": "KL-GL-004",
    "price": 980,
    "image": "/images/products/kiswani-product-04.jpg",
    "description": "Long eight-light gold chandelier for dining and reception spaces.",
    "descriptionAr": "Long eight-light gold chandelier for dining and reception spaces.",
    "specs": [
      [
        "Bulbs",
        "8 bulb long"
      ],
      [
        "Socket",
        "E14 socket"
      ],
      [
        "Length",
        "103 cm"
      ],
      [
        "Height",
        "62 cm"
      ],
      [
        "Finish",
        "Brush gold"
      ]
    ]
  },
  {
    "name": "Amber Globe Wall Lamp",
    "arabic": "Amber Globe Wall Lamp",
    "category": "Accent",
    "categoryAr": "Accent",
    "categorySlug": "accent",
    "code": "KL-AG-005",
    "price": 220,
    "image": "/images/products/kiswani-product-05.jpg",
    "description": "Black wall lamp with amber glass globe for warm accent lighting.",
    "descriptionAr": "Black wall lamp with amber glass globe for warm accent lighting.",
    "specs": [
      [
        "Diameter",
        "15 cm"
      ],
      [
        "Extension",
        "30 cm"
      ],
      [
        "Socket",
        "E27 socket"
      ],
      [
        "Material",
        "Iron + glass amber"
      ],
      [
        "Body",
        "Black body"
      ]
    ]
  },
  {
    "name": "Travertine Oval Wall Light",
    "arabic": "Travertine Oval Wall Light",
    "category": "Accent",
    "categoryAr": "Accent",
    "categorySlug": "accent",
    "code": "KL-TV-006",
    "price": 260,
    "image": "/images/products/kiswani-product-06.jpg",
    "description": "Natural travertine wall light with a soft halo glow.",
    "descriptionAr": "Natural travertine wall light with a soft halo glow.",
    "specs": [
      [
        "Material",
        "Travertine"
      ],
      [
        "Dimensions",
        "19 cm x 25 cm x 6.5 cm"
      ],
      [
        "Color temperature",
        "3000K"
      ]
    ]
  },
  {
    "name": "Travertine Glass Sconce",
    "arabic": "Travertine Glass Sconce",
    "category": "Accent",
    "categoryAr": "Accent",
    "categorySlug": "accent",
    "code": "KL-TV-007",
    "price": 240,
    "image": "/images/products/kiswani-product-07.jpg",
    "description": "Travertine and glass wall sconce with integrated switch control.",
    "descriptionAr": "Travertine and glass wall sconce with integrated switch control.",
    "specs": [
      [
        "Material",
        "Travertine + glass"
      ],
      [
        "Dimensions",
        "34 cm x 14 cm"
      ],
      [
        "Socket",
        "G9 socket"
      ],
      [
        "Control",
        "With switch control"
      ]
    ]
  },
  {
    "name": "Travertine Cylinder Wall Light",
    "arabic": "Travertine Cylinder Wall Light",
    "category": "Accent",
    "categoryAr": "Accent",
    "categorySlug": "accent",
    "code": "KL-TV-008",
    "price": 210,
    "image": "/images/products/kiswani-product-08.jpg",
    "description": "Cylindrical travertine wall light with up and down illumination.",
    "descriptionAr": "Cylindrical travertine wall light with up and down illumination.",
    "specs": [
      [
        "Material",
        "Travertine + wood"
      ],
      [
        "Diameter",
        "6.5 cm"
      ],
      [
        "Height",
        "23 cm"
      ],
      [
        "Socket",
        "2 x GU10 socket"
      ]
    ]
  },
  {
    "name": "Travertine Block Wall Light",
    "arabic": "Travertine Block Wall Light",
    "category": "Accent",
    "categoryAr": "Accent",
    "categorySlug": "accent",
    "code": "KL-TV-009",
    "price": 230,
    "image": "/images/products/kiswani-product-09.jpg",
    "description": "Rectangular travertine wall light with architectural up and down beams.",
    "descriptionAr": "Rectangular travertine wall light with architectural up and down beams.",
    "specs": [
      [
        "Material",
        "Travertine + wood"
      ],
      [
        "Dimensions",
        "6.5 cm x 6.5 cm x 23 cm"
      ],
      [
        "Socket",
        "2 x GU10 socket"
      ]
    ]
  },
  {
    "name": "Travertine Oval Wall Light - Styled",
    "arabic": "Travertine Oval Wall Light - Styled",
    "category": "Accent",
    "categoryAr": "Accent",
    "categorySlug": "accent",
    "code": "KL-TV-010",
    "price": 260,
    "image": "/images/products/kiswani-product-10.jpg",
    "description": "Styled room view of the travertine oval wall light.",
    "descriptionAr": "Styled room view of the travertine oval wall light.",
    "specs": [
      [
        "Material",
        "Travertine"
      ],
      [
        "Dimensions",
        "19 cm x 25 cm x 6.5 cm"
      ],
      [
        "Color temperature",
        "3000K"
      ]
    ]
  },
  {
    "name": "Travertine Glass Sconce - Styled",
    "arabic": "Travertine Glass Sconce - Styled",
    "category": "Accent",
    "categoryAr": "Accent",
    "categorySlug": "accent",
    "code": "KL-TV-011",
    "price": 240,
    "image": "/images/products/kiswani-product-11.jpg",
    "description": "Styled interior view of the travertine and glass wall sconce.",
    "descriptionAr": "Styled interior view of the travertine and glass wall sconce.",
    "specs": [
      [
        "Material",
        "Travertine + glass"
      ],
      [
        "Socket",
        "G9 socket"
      ],
      [
        "Control",
        "With switch control"
      ]
    ]
  },
  {
    "name": "Travertine Cylinder Wall Light - Styled",
    "arabic": "Travertine Cylinder Wall Light - Styled",
    "category": "Accent",
    "categoryAr": "Accent",
    "categorySlug": "accent",
    "code": "KL-TV-012",
    "price": 210,
    "image": "/images/products/kiswani-product-12.jpg",
    "description": "Styled wall scene for the travertine cylinder light.",
    "descriptionAr": "Styled wall scene for the travertine cylinder light.",
    "specs": [
      [
        "Material",
        "Travertine + wood"
      ],
      [
        "Diameter",
        "6.5 cm"
      ],
      [
        "Height",
        "23 cm"
      ],
      [
        "Socket",
        "2 x GU10 socket"
      ]
    ]
  },
  {
    "name": "Travertine Block Wall Light - Styled",
    "arabic": "Travertine Block Wall Light - Styled",
    "category": "Accent",
    "categoryAr": "Accent",
    "categorySlug": "accent",
    "code": "KL-TV-013",
    "price": 230,
    "image": "/images/products/kiswani-product-13.jpg",
    "description": "Styled wall scene for the rectangular travertine wall light.",
    "descriptionAr": "Styled wall scene for the rectangular travertine wall light.",
    "specs": [
      [
        "Material",
        "Travertine + wood"
      ],
      [
        "Dimensions",
        "6.5 cm x 6.5 cm x 23 cm"
      ],
      [
        "Socket",
        "2 x GU10 socket"
      ]
    ]
  },
  {
    "name": "Resin Capsule Wall Light",
    "arabic": "Resin Capsule Wall Light",
    "category": "Accent",
    "categoryAr": "Accent",
    "categorySlug": "accent",
    "code": "KL-RS-014",
    "price": 290,
    "image": "/images/products/kiswani-product-14.jpg",
    "description": "Slim resin capsule wall light with gold detail and selectable light color.",
    "descriptionAr": "Slim resin capsule wall light with gold detail and selectable light color.",
    "specs": [
      [
        "Material",
        "Resin"
      ],
      [
        "Height",
        "40 cm"
      ],
      [
        "Power",
        "10W"
      ],
      [
        "Color modes",
        "3 CCT"
      ],
      [
        "Finish",
        "Gold"
      ]
    ]
  },
  {
    "name": "Resin Halo Pendant",
    "arabic": "Resin Halo Pendant",
    "category": "Decorative",
    "categoryAr": "Decorative",
    "categorySlug": "decorative",
    "code": "KL-RS-015",
    "price": 760,
    "image": "/images/products/kiswani-product-15.jpg",
    "description": "Circular resin pendant with a luminous stone-like ring.",
    "descriptionAr": "Circular resin pendant with a luminous stone-like ring.",
    "specs": [
      [
        "Material",
        "Resin"
      ],
      [
        "Diameter",
        "50 cm"
      ],
      [
        "Power",
        "45W"
      ],
      [
        "Color modes",
        "3 CCT"
      ],
      [
        "Finish",
        "Gold"
      ]
    ]
  },
  {
    "name": "Resin Linear Pendant",
    "arabic": "Resin Linear Pendant",
    "category": "Decorative",
    "categoryAr": "Decorative",
    "categorySlug": "decorative",
    "code": "KL-RS-016",
    "price": 820,
    "image": "/images/products/kiswani-product-16.jpg",
    "description": "Linear resin pendant with gold hardware and sculptural tube form.",
    "descriptionAr": "Linear resin pendant with gold hardware and sculptural tube form.",
    "specs": [
      [
        "Material",
        "Resin"
      ],
      [
        "Length",
        "120 cm"
      ],
      [
        "Diameter",
        "12 cm"
      ],
      [
        "Power",
        "40W"
      ],
      [
        "Color modes",
        "3 CCT"
      ],
      [
        "Finish",
        "Gold"
      ]
    ]
  },
  {
    "name": "Resin Wave Pendant",
    "arabic": "Resin Wave Pendant",
    "category": "Decorative",
    "categoryAr": "Decorative",
    "categorySlug": "decorative",
    "code": "KL-RS-017",
    "price": 840,
    "image": "/images/products/kiswani-product-17.jpg",
    "description": "Wave-shaped resin pendant with a warm gold suspension system.",
    "descriptionAr": "Wave-shaped resin pendant with a warm gold suspension system.",
    "specs": [
      [
        "Material",
        "Resin"
      ],
      [
        "Length",
        "120 cm"
      ],
      [
        "Diameter",
        "12 cm"
      ],
      [
        "Power",
        "40W"
      ],
      [
        "Color modes",
        "3 CCT"
      ],
      [
        "Finish",
        "Gold"
      ]
    ]
  },
  {
    "name": "Infinity Wall Light Gold",
    "arabic": "Infinity Wall Light Gold",
    "category": "Accent",
    "categoryAr": "Accent",
    "categorySlug": "accent",
    "code": "KL-IN-018",
    "price": 360,
    "image": "/images/products/kiswani-product-18.jpg",
    "description": "Gold infinity-shaped wall light with three color modes.",
    "descriptionAr": "Gold infinity-shaped wall light with three color modes.",
    "specs": [
      [
        "Size",
        "30 cm"
      ],
      [
        "Power",
        "30W"
      ],
      [
        "Color modes",
        "3 colors switch"
      ],
      [
        "Finish",
        "Gold"
      ]
    ]
  },
  {
    "name": "Infinity Wall Light Black",
    "arabic": "Infinity Wall Light Black",
    "category": "Accent",
    "categoryAr": "Accent",
    "categorySlug": "accent",
    "code": "KL-IN-019",
    "price": 360,
    "image": "/images/products/kiswani-product-19.jpg",
    "description": "Black infinity-shaped wall light with sculptural illuminated lines.",
    "descriptionAr": "Black infinity-shaped wall light with sculptural illuminated lines.",
    "specs": [
      [
        "Size",
        "30 cm"
      ],
      [
        "Power",
        "30W"
      ],
      [
        "Color modes",
        "3 colors switch"
      ],
      [
        "Finish",
        "Black"
      ]
    ]
  },
  {
    "name": "Infinity Wall Light - Installed",
    "arabic": "Infinity Wall Light - Installed",
    "category": "Accent",
    "categoryAr": "Accent",
    "categorySlug": "accent",
    "code": "KL-IN-020",
    "price": 360,
    "image": "/images/products/kiswani-product-20.jpg",
    "description": "Installed view of the infinity wall light in a warm interior setting.",
    "descriptionAr": "Installed view of the infinity wall light in a warm interior setting.",
    "specs": [
      [
        "Size",
        "30 cm"
      ],
      [
        "Power",
        "30W"
      ],
      [
        "Color modes",
        "3 colors switch"
      ]
    ]
  },
  {
    "name": "Infinity Wall Light Gold - Styled",
    "arabic": "Infinity Wall Light Gold - Styled",
    "category": "Accent",
    "categoryAr": "Accent",
    "categorySlug": "accent",
    "code": "KL-IN-021",
    "price": 360,
    "image": "/images/products/kiswani-product-21.jpg",
    "description": "Styled room view of the gold infinity wall light.",
    "descriptionAr": "Styled room view of the gold infinity wall light.",
    "specs": [
      [
        "Size",
        "30 cm"
      ],
      [
        "Power",
        "30W"
      ],
      [
        "Color modes",
        "3 colors switch"
      ],
      [
        "Finish",
        "Gold"
      ]
    ]
  },
  {
    "name": "Round Ceiling Pendant - Styled",
    "arabic": "Round Ceiling Pendant - Styled",
    "category": "Decorative",
    "categoryAr": "Decorative",
    "categorySlug": "decorative",
    "code": "KL-RD-022",
    "price": 620,
    "image": "/images/products/kiswani-product-22.jpg",
    "description": "Installed view of a round ceiling pendant over a modern room.",
    "descriptionAr": "Installed view of a round ceiling pendant over a modern room.",
    "specs": [
      [
        "Diameter",
        "60 cm"
      ],
      [
        "Power",
        "60W"
      ],
      [
        "Color temperature",
        "4000K"
      ],
      [
        "Finish",
        "Gold color"
      ]
    ]
  },
  {
    "name": "Classic Fabric Wall Lamp - Styled",
    "arabic": "Classic Fabric Wall Lamp - Styled",
    "category": "Accent",
    "categoryAr": "Accent",
    "categorySlug": "accent",
    "code": "KL-FB-023",
    "price": 190,
    "image": "/images/products/kiswani-product-23.jpg",
    "description": "Classic fabric shade wall lamp shown in a warm residential scene.",
    "descriptionAr": "Classic fabric shade wall lamp shown in a warm residential scene.",
    "specs": [
      [
        "Dimensions",
        "32 cm x 23 cm"
      ],
      [
        "Socket",
        "E27 socket"
      ],
      [
        "Material",
        "Iron + fabric"
      ],
      [
        "Body",
        "Black body"
      ]
    ]
  },
  {
    "name": "Round Halo Pendant - Styled",
    "arabic": "Round Halo Pendant - Styled",
    "category": "Decorative",
    "categoryAr": "Decorative",
    "categorySlug": "decorative",
    "code": "KL-RD-024",
    "price": 620,
    "image": "/images/products/kiswani-product-24.jpg",
    "description": "Styled room view of a glowing round halo pendant.",
    "descriptionAr": "Styled room view of a glowing round halo pendant.",
    "specs": [
      [
        "Diameter",
        "60 cm"
      ],
      [
        "Power",
        "60W"
      ],
      [
        "Color temperature",
        "4000K"
      ],
      [
        "Finish",
        "Gold color"
      ]
    ]
  },
  {
    "name": "Amber Globe Wall Lamp - Styled",
    "arabic": "Amber Globe Wall Lamp - Styled",
    "category": "Accent",
    "categoryAr": "Accent",
    "categorySlug": "accent",
    "code": "KL-AG-025",
    "price": 220,
    "image": "/images/products/kiswani-product-25.jpg",
    "description": "Installed view of the amber globe wall lamp.",
    "descriptionAr": "Installed view of the amber globe wall lamp.",
    "specs": [
      [
        "Diameter",
        "15 cm"
      ],
      [
        "Extension",
        "30 cm"
      ],
      [
        "Socket",
        "E27 socket"
      ],
      [
        "Material",
        "Iron + glass amber"
      ],
      [
        "Body",
        "Black body"
      ]
    ]
  },
  {
    "name": "Classic Fabric Wall Lamp",
    "arabic": "Classic Fabric Wall Lamp",
    "category": "Accent",
    "categoryAr": "Accent",
    "categorySlug": "accent",
    "code": "KL-FB-026",
    "price": 190,
    "image": "/images/products/kiswani-product-26.jpg",
    "description": "Classic black wall lamp with fabric shade and crystal accent.",
    "descriptionAr": "Classic black wall lamp with fabric shade and crystal accent.",
    "specs": [
      [
        "Dimensions",
        "32 cm x 23 cm"
      ],
      [
        "Socket",
        "E27 socket"
      ],
      [
        "Material",
        "Iron + fabric"
      ],
      [
        "Body",
        "Black body"
      ]
    ]
  },
  {
    "name": "Round Halo Pendant Gold",
    "arabic": "Round Halo Pendant Gold",
    "category": "Decorative",
    "categoryAr": "Decorative",
    "categorySlug": "decorative",
    "code": "KL-RD-027",
    "price": 620,
    "image": "/images/products/kiswani-product-27.jpg",
    "description": "Gold round halo pendant with clean architectural illumination.",
    "descriptionAr": "Gold round halo pendant with clean architectural illumination.",
    "specs": [
      [
        "Diameter",
        "60 cm"
      ],
      [
        "Power",
        "60W"
      ],
      [
        "Color temperature",
        "4000K"
      ],
      [
        "Finish",
        "Gold color"
      ]
    ]
  },
  {
    "name": "Round Halo Pendant Black",
    "arabic": "Round Halo Pendant Black",
    "category": "Decorative",
    "categoryAr": "Decorative",
    "categorySlug": "decorative",
    "code": "KL-RD-028",
    "price": 650,
    "image": "/images/products/kiswani-product-28.jpg",
    "description": "Black round halo pendant with a crisp modern profile.",
    "descriptionAr": "Black round halo pendant with a crisp modern profile.",
    "specs": [
      [
        "Diameter",
        "60 cm"
      ],
      [
        "Power",
        "70W"
      ],
      [
        "Color temperature",
        "4000K"
      ],
      [
        "Body",
        "Black body"
      ]
    ]
  },
  {
    "name": "Golden Wall Lamp - Single",
    "arabic": "Golden Wall Lamp - Single",
    "category": "Decorative",
    "categoryAr": "Decorative",
    "categorySlug": "decorative",
    "code": "KL-GL-029",
    "price": 210,
    "image": "/images/products/kiswani-product-29.jpg",
    "description": "Single-bulb golden wall lamp with crystal ornament detail.",
    "descriptionAr": "Single-bulb golden wall lamp with crystal ornament detail.",
    "specs": [
      [
        "Bulbs",
        "1 bulb"
      ],
      [
        "Socket",
        "E14 socket"
      ],
      [
        "Height",
        "56 cm"
      ],
      [
        "Material",
        "Zinc material + crystals"
      ],
      [
        "Finish",
        "Brush gold"
      ]
    ]
  },
  {
    "name": "Alabaster Bowl Pendant",
    "arabic": "Alabaster Bowl Pendant",
    "category": "Decorative",
    "categoryAr": "Decorative",
    "categorySlug": "decorative",
    "code": "KL-AB-030",
    "price": 540,
    "image": "/images/products/kiswani-product-30.jpg",
    "description": "Gold pendant with a soft alabaster bowl form.",
    "descriptionAr": "Gold pendant with a soft alabaster bowl form.",
    "specs": [
      [
        "Material",
        "Iron + resin"
      ],
      [
        "Diameter",
        "50 cm"
      ],
      [
        "Power",
        "12W"
      ],
      [
        "Color temperature",
        "4000K"
      ],
      [
        "Finish",
        "Gold"
      ]
    ]
  },
  {
    "name": "Alabaster Linear Pendant",
    "arabic": "Alabaster Linear Pendant",
    "category": "Decorative",
    "categoryAr": "Decorative",
    "categorySlug": "decorative",
    "code": "KL-AB-031",
    "price": 780,
    "image": "/images/products/kiswani-product-31.jpg",
    "description": "Linear resin pendant with a stone-like illuminated body.",
    "descriptionAr": "Linear resin pendant with a stone-like illuminated body.",
    "specs": [
      [
        "Material",
        "Resin"
      ],
      [
        "Length",
        "100 cm"
      ],
      [
        "Power",
        "30W"
      ],
      [
        "Color modes",
        "3 CCT"
      ],
      [
        "Finish",
        "Gold"
      ]
    ]
  },
  {
    "name": "Spanish Marble Tube Pendant",
    "arabic": "Spanish Marble Tube Pendant",
    "category": "Decorative",
    "categoryAr": "Decorative",
    "categorySlug": "decorative",
    "code": "KL-SM-032",
    "price": 310,
    "image": "/images/products/kiswani-product-32.jpg",
    "description": "Slim Spanish marble tube pendant with warm gold hardware.",
    "descriptionAr": "Slim Spanish marble tube pendant with warm gold hardware.",
    "specs": [
      [
        "Material",
        "Spanish marble"
      ],
      [
        "Dimensions",
        "30 cm x 6 cm diameter"
      ],
      [
        "Power",
        "10W"
      ],
      [
        "Color temperature",
        "3000K"
      ],
      [
        "Finish",
        "Gold"
      ]
    ]
  },
  {
    "name": "Oslo Pendant Light",
    "arabic": "Oslo Pendant Light",
    "category": "Decorative",
    "categoryAr": "Decorative",
    "categorySlug": "decorative",
    "code": "KL-OS-033",
    "price": 890,
    "image": "/images/products/kiswani-product-33.jpg",
    "description": "Oslo pendant with gold base, alabaster-like diffuser, and leather detail.",
    "descriptionAr": "Oslo pendant with gold base, alabaster-like diffuser, and leather detail.",
    "specs": [
      [
        "Base",
        "Gold base"
      ],
      [
        "Light source",
        "LED"
      ],
      [
        "Color temperature",
        "3000K"
      ],
      [
        "Diameter",
        "60 cm ring + 15 cm"
      ],
      [
        "Material",
        "Copy alabaster resin + leather"
      ]
    ]
  },
  {
    "name": "Thuraya Igeholtz Castro",
    "arabic": "Thuraya Igeholtz Castro",
    "category": "Decorative",
    "categoryAr": "Decorative",
    "categorySlug": "decorative",
    "code": "KL-TH-034",
    "price": 1180,
    "image": "/images/products/kiswani-product-34.jpg",
    "description": "Nine-light Castro chandelier with resin shades and a gold frame.",
    "descriptionAr": "Nine-light Castro chandelier with resin shades and a gold frame.",
    "specs": [
      [
        "Material",
        "Copy alabaster resin"
      ],
      [
        "Sockets",
        "9 x G9 socket"
      ],
      [
        "Power",
        "45W / 81W"
      ],
      [
        "Diameter",
        "75 cm"
      ],
      [
        "Height",
        "12 cm + 100 cm"
      ],
      [
        "Finish",
        "Gold color"
      ]
    ]
  },
  {
    "name": "Alabaster Linear Pendant - Installed",
    "arabic": "Alabaster Linear Pendant - Installed",
    "category": "Decorative",
    "categoryAr": "Decorative",
    "categorySlug": "decorative",
    "code": "KL-AB-035",
    "price": 780,
    "image": "/images/products/kiswani-product-35.jpg",
    "description": "Installed view of the alabaster linear pendant over a dining surface.",
    "descriptionAr": "Installed view of the alabaster linear pendant over a dining surface.",
    "specs": [
      [
        "Material",
        "Resin"
      ],
      [
        "Length",
        "100 cm"
      ],
      [
        "Power",
        "30W"
      ],
      [
        "Color modes",
        "3 CCT"
      ],
      [
        "Finish",
        "Gold"
      ]
    ]
  },
  {
    "name": "Thuraya Castro - Installed",
    "arabic": "Thuraya Castro - Installed",
    "category": "Decorative",
    "categoryAr": "Decorative",
    "categorySlug": "decorative",
    "code": "KL-TH-036",
    "price": 1180,
    "image": "/images/products/kiswani-product-36.jpg",
    "description": "Installed view of the Thuraya Castro chandelier in a bright living room.",
    "descriptionAr": "Installed view of the Thuraya Castro chandelier in a bright living room.",
    "specs": [
      [
        "Sockets",
        "9 x G9 socket"
      ],
      [
        "Power",
        "45W / 81W"
      ],
      [
        "Diameter",
        "75 cm"
      ],
      [
        "Finish",
        "Gold color"
      ]
    ]
  },
  {
    "name": "Oslo Pendant Light - Installed",
    "arabic": "Oslo Pendant Light - Installed",
    "category": "Decorative",
    "categoryAr": "Decorative",
    "categorySlug": "decorative",
    "code": "KL-OS-037",
    "price": 890,
    "image": "/images/products/kiswani-product-37.jpg",
    "description": "Installed room view of the Oslo pendant light.",
    "descriptionAr": "Installed room view of the Oslo pendant light.",
    "specs": [
      [
        "Base",
        "Gold base"
      ],
      [
        "Light source",
        "LED"
      ],
      [
        "Color temperature",
        "3000K"
      ],
      [
        "Diameter",
        "60 cm ring + 15 cm"
      ]
    ]
  },
  {
    "name": "Alabaster Bowl Pendant - Installed",
    "arabic": "Alabaster Bowl Pendant - Installed",
    "category": "Decorative",
    "categoryAr": "Decorative",
    "categorySlug": "decorative",
    "code": "KL-AB-038",
    "price": 540,
    "image": "/images/products/kiswani-product-38.jpg",
    "description": "Installed view of the gold alabaster bowl pendant.",
    "descriptionAr": "Installed view of the gold alabaster bowl pendant.",
    "specs": [
      [
        "Material",
        "Iron + resin"
      ],
      [
        "Diameter",
        "50 cm"
      ],
      [
        "Power",
        "12W"
      ],
      [
        "Color temperature",
        "4000K"
      ],
      [
        "Finish",
        "Gold"
      ]
    ]
  },
  {
    "name": "Spanish Marble Oval Pendant",
    "arabic": "Spanish Marble Oval Pendant",
    "category": "Decorative",
    "categoryAr": "Decorative",
    "categorySlug": "decorative",
    "code": "KL-SM-039",
    "price": 330,
    "image": "/images/products/kiswani-product-39.jpg",
    "description": "Oval Spanish marble pendant with gold hardware.",
    "descriptionAr": "Oval Spanish marble pendant with gold hardware.",
    "specs": [
      [
        "Material",
        "Spanish marble"
      ],
      [
        "Dimensions",
        "12 cm diameter x 18 cm"
      ],
      [
        "Socket",
        "G9"
      ],
      [
        "Power",
        "9W / 5W"
      ],
      [
        "Finish",
        "Gold"
      ]
    ]
  },
  {
    "name": "Spanish Marble Round Wall Light",
    "arabic": "Spanish Marble Round Wall Light",
    "category": "Accent",
    "categoryAr": "Accent",
    "categorySlug": "accent",
    "code": "KL-SM-040",
    "price": 280,
    "image": "/images/products/kiswani-product-40.jpg",
    "description": "Round Spanish marble wall light with a warm backlit glow.",
    "descriptionAr": "Round Spanish marble wall light with a warm backlit glow.",
    "specs": [
      [
        "Material",
        "Spanish marble"
      ],
      [
        "Diameter",
        "20 cm"
      ],
      [
        "Power",
        "8W"
      ],
      [
        "Color temperature",
        "3000K"
      ],
      [
        "Finish",
        "Gold"
      ]
    ]
  },
  {
    "name": "Spanish Marble Organic Wall Light",
    "arabic": "Spanish Marble Organic Wall Light",
    "category": "Accent",
    "categoryAr": "Accent",
    "categorySlug": "accent",
    "code": "KL-SM-041",
    "price": 340,
    "image": "/images/products/kiswani-product-41.jpg",
    "description": "Organic Spanish marble wall light with natural veining.",
    "descriptionAr": "Organic Spanish marble wall light with natural veining.",
    "specs": [
      [
        "Material",
        "Spanish marble"
      ],
      [
        "Dimensions",
        "35 cm x 20 cm"
      ],
      [
        "Power",
        "10W"
      ],
      [
        "Color temperature",
        "3000K"
      ],
      [
        "Finish",
        "Gold"
      ]
    ]
  },
  {
    "name": "Spanish Marble Tube Pendant - Installed",
    "arabic": "Spanish Marble Tube Pendant - Installed",
    "category": "Decorative",
    "categoryAr": "Decorative",
    "categorySlug": "decorative",
    "code": "KL-SM-042",
    "price": 310,
    "image": "/images/products/kiswani-product-42.jpg",
    "description": "Installed view of the Spanish marble tube pendant.",
    "descriptionAr": "Installed view of the Spanish marble tube pendant.",
    "specs": [
      [
        "Material",
        "Spanish marble"
      ],
      [
        "Dimensions",
        "30 cm x 6 cm diameter"
      ],
      [
        "Power",
        "10W"
      ],
      [
        "Color temperature",
        "3000K"
      ],
      [
        "Finish",
        "Gold"
      ]
    ]
  },
  {
    "name": "Spanish Marble Oval Pendant - Installed",
    "arabic": "Spanish Marble Oval Pendant - Installed",
    "category": "Decorative",
    "categoryAr": "Decorative",
    "categorySlug": "decorative",
    "code": "KL-SM-043",
    "price": 330,
    "image": "/images/products/kiswani-product-43.jpg",
    "description": "Installed bedroom view of the Spanish marble oval pendant.",
    "descriptionAr": "Installed bedroom view of the Spanish marble oval pendant.",
    "specs": [
      [
        "Material",
        "Spanish marble"
      ],
      [
        "Dimensions",
        "12 cm diameter x 18 cm"
      ],
      [
        "Socket",
        "G9"
      ],
      [
        "Finish",
        "Gold"
      ]
    ]
  },
  {
    "name": "Spanish Marble Round Wall Light - Installed",
    "arabic": "Spanish Marble Round Wall Light - Installed",
    "category": "Accent",
    "categoryAr": "Accent",
    "categorySlug": "accent",
    "code": "KL-SM-044",
    "price": 280,
    "image": "/images/products/kiswani-product-44.jpg",
    "description": "Installed view of the round Spanish marble wall light.",
    "descriptionAr": "Installed view of the round Spanish marble wall light.",
    "specs": [
      [
        "Material",
        "Spanish marble"
      ],
      [
        "Diameter",
        "20 cm"
      ],
      [
        "Power",
        "8W"
      ],
      [
        "Color temperature",
        "3000K"
      ],
      [
        "Finish",
        "Gold"
      ]
    ]
  },
  {
    "name": "Spanish Marble Organic Wall Light - Installed",
    "arabic": "Spanish Marble Organic Wall Light - Installed",
    "category": "Accent",
    "categoryAr": "Accent",
    "categorySlug": "accent",
    "code": "KL-SM-045",
    "price": 340,
    "image": "/images/products/kiswani-product-45.jpg",
    "description": "Installed view of the organic Spanish marble wall light.",
    "descriptionAr": "Installed view of the organic Spanish marble wall light.",
    "specs": [
      [
        "Material",
        "Spanish marble"
      ],
      [
        "Dimensions",
        "35 cm x 20 cm"
      ],
      [
        "Power",
        "10W"
      ],
      [
        "Color temperature",
        "3000K"
      ],
      [
        "Finish",
        "Gold"
      ]
    ]
  }
]
JSON;
        $data = json_decode($json, true);
        if (!is_array($data)) {
            $data = [];
        }
    }
    return $data;
}

function kiswani_static_categories(): array
{
    static $data = null;
    if ($data === null) {
        $json = <<<'JSON'
[
  {
    "slug": "decorative",
    "name": "Decorative lighting",
    "arabic": "Ø§Ù„Ø¥Ù†Ø§Ø±Ø© Ø§Ù„Ø¯ÙŠÙƒÙˆØ±ÙŠØ©",
    "detail": "Statement pieces that give the room its character.",
    "detailAr": "Ù‚Ø·Ø¹ Ù…Ù…ÙŠØ²Ø© ØªÙ…Ù†Ø­ Ø§Ù„Ù…ÙƒØ§Ù† Ø´Ø®ØµÙŠØªÙ‡ ÙˆØ­Ø¶ÙˆØ±Ù‡.",
    "image": "/images/editorial/hero-decorative.webp"
  },
  {
    "slug": "interior",
    "name": "Interior lighting",
    "arabic": "Ø§Ù„Ø¥Ù†Ø§Ø±Ø© Ø§Ù„Ø¯Ø§Ø®Ù„ÙŠØ©",
    "detail": "Warm, considered light for everyday living.",
    "detailAr": "Ø¶ÙˆØ¡ Ø¯Ø§ÙØ¦ ÙˆÙ…Ø¯Ø±ÙˆØ³ Ù„ØªÙØ§ØµÙŠÙ„ Ø§Ù„Ø­ÙŠØ§Ø© Ø§Ù„ÙŠÙˆÙ…ÙŠØ©.",
    "image": "/images/editorial/hero-interior.webp"
  },
  {
    "slug": "technical",
    "name": "Technical lighting",
    "arabic": "Ø§Ù„Ø¥Ù†Ø§Ø±Ø© Ø§Ù„ØªÙ‚Ù†ÙŠØ©",
    "detail": "Precise systems for architectural performance.",
    "detailAr": "Ø£Ù†Ø¸Ù…Ø© Ø¯Ù‚ÙŠÙ‚Ø© Ù„Ù„Ø£Ø¯Ø§Ø¡ Ø§Ù„Ù…Ø¹Ù…Ø§Ø±ÙŠ Ø§Ù„Ø§Ø­ØªØ±Ø§ÙÙŠ.",
    "image": "/images/editorial/hero-technical.webp"
  },
  {
    "slug": "accent",
    "name": "Accent lighting",
    "arabic": "Ø§Ù„Ø¥Ù†Ø§Ø±Ø© Ø§Ù„Ø¬Ù…Ø§Ù„ÙŠØ©",
    "detail": "Focused moments that reveal material and mood.",
    "detailAr": "Ù„Ù…Ø³Ø§Øª Ù…Ø±ÙƒØ²Ø© ØªØ¸Ù‡Ø± Ø§Ù„Ø®Ø§Ù…Ø© ÙˆØªØµÙ†Ø¹ Ø§Ù„Ø£Ø¬ÙˆØ§Ø¡.",
    "image": "/images/editorial/hero-accent.webp"
  }
]
JSON;
        $data = json_decode($json, true);
        if (!is_array($data)) {
            $data = [];
        }
    }
    return $data;
}

function kiswani_static_product_map_groups(): array
{
    static $data = null;
    if ($data === null) {
        $json = <<<'JSON'
[
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
]
JSON;
        $data = json_decode($json, true);
        if (!is_array($data)) {
            $data = [];
        }
    }
    return $data;
}
