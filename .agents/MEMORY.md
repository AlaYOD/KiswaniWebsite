# 🧠 Kiswani Project Memory Bank

## 📌 Project Architecture & Overview
- **Project Name**: Kiswani Lights (مفروشات وإضاءة الكسواني)
- **Primary Tech Stack**: 
  - **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion, Drizzle ORM.
  - **Backend / Theme**: Custom WordPress theme `kiswani-lights` located in `wordpress/kiswani-lights/`.
- **Multilingual Support**: Arabic (`ar`), English (`en`), Hebrew (`he`), currency formatted in NIS/ILS (`₪`).

## 🗂️ Data & Catalog Structure
- **Product Catalog Data**: Defined in [`website/lib/catalog-products.ts`](file:///d:/Kiswani/website/lib/catalog-products.ts) and [`website/lib/catalog.ts`](file:///d:/Kiswani/website/lib/catalog.ts).

## 💬 WhatsApp Order Integration
- **Target WhatsApp Number**: `970599671209` (+970 599 671 209).
- **Checkout Component**: [`website/components/CheckoutExperience.tsx`](file:///d:/Kiswani/website/components/CheckoutExperience.tsx) submits itemized Arabic & English messages with customer details, item codes, quantities, unit prices, line totals, and grand subtotal.
- **Cart System**: [`website/components/CartSystem.tsx`](file:///d:/Kiswani/website/components/CartSystem.tsx) handles cart drawer state and checkout navigation.

## 🐳 Docker Runtime Environment
- **Docker Compose Config**: [`docker-compose.yml`](file:///d:/Kiswani/docker-compose.yml)
- **WordPress Container**: `kiswani_wordpress` mapped to `http://localhost:8000`.
- **MariaDB Container**: `kiswani_db` mapped to port `3307`.
- **phpMyAdmin Container**: `kiswani_phpmyadmin` mapped to `http://localhost:8085`.
- **Active Theme**: `kiswani-lights` with auto-seeded catalog data.

## 🚀 Recent Progress
- Built formatted WhatsApp order submission logic.
- Applied Arabic localization for checkout forms & cart drawer.
- Implemented quantity selectors (`-` / input / `+`) across product details page, product cards, quick view modals, and cart drawer.
- Validated Next.js production build and verified Vercel deployment at `https://kiswani-website-82jb.vercel.app/`.
- Created Docker Compose environment for local WordPress site, initialized core, activated `kiswani-lights` theme, and verified live runtime at `http://localhost:8000`.
- Integrated Hostinger MCP server (`hostinger-api-mcp`) with OAuth credentials for domain `kiswanilights.com`.
- Packaged WordPress custom theme `kiswani-lights-v2` into zip archive at `d:\Kiswani\kiswani-lights-v2.zip`.


