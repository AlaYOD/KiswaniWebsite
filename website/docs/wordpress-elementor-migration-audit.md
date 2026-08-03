# Kiswani Lights Next.js to WordPress Elementor Audit

Date: 2026-08-03

## 1. Route And Page Inventory

| Next.js route | Source | WordPress/Elementor target |
| --- | --- | --- |
| `/` | `app/page.tsx`, `components/KiswaniExperience.tsx` | Elementor page: Home |
| `/collections/[slug]` | `app/collections/[slug]/page.tsx`, `components/CollectionExperience.tsx` | Product collection archive template plus editable collection landing template |
| `/products/[slug]` | `app/products/[slug]/page.tsx`, `components/ProductExperience.tsx` | Product single template |
| `/projects` | `app/projects/page.tsx`, `components/ProjectsPageExperience.tsx`, `components/ProjectsShowcase.tsx` | Elementor page or Projects CPT archive |
| `/about` | `app/about/page.tsx`, `components/InformationPageExperience.tsx` | Elementor page |
| `/support` | `app/support/page.tsx`, `components/InformationPageExperience.tsx` | Elementor page |
| `/privacy` | `app/privacy/page.tsx`, `components/InformationPageExperience.tsx` | Elementor page |
| `/terms` | `app/terms/page.tsx`, `components/InformationPageExperience.tsx` | Elementor page |
| `/checkout` | `app/checkout/page.tsx`, `components/CheckoutExperience.tsx` | Elementor page with custom checkout widget/shortcode |
| `/admin` | `app/admin/page.tsx` | Redirect to order dashboard |
| `/admin/orders` | `app/admin/orders/page.tsx`, `components/AdminOrdersDashboard.tsx` | WordPress admin screen or protected frontend dashboard |
| `/api/orders` | `app/api/orders/route.ts` | Custom WordPress REST route |
| `/api/admin/orders` | `app/api/admin/orders/route.ts` | Custom WordPress REST route requiring capability/auth |
| `/api/admin/orders/[id]` | `app/api/admin/orders/[id]/route.ts` | Custom WordPress REST route for order status/admin notes |
| `/robots.txt` | `app/robots.ts` | WordPress/SEO plugin robots output |
| `/sitemap.xml` | `app/sitemap.ts` | WordPress sitemap/SEO plugin sitemap |

## 2. Component Inventory

Shared global components:

- `Header`: sticky top contact bar, logo/search/action row, desktop product mega menu, mobile drawer, language switcher, cart trigger.
- `LuxuryFooter`: dark footer with logo, statement, Explore links, Important links, contact block, copyright row.
- `Media`: image wrapper with loading skeleton.
- `BrandButton`: yellow/outline button with hover light sweep and magnetic pointer movement.
- `ProductCard`: product card with square image, category, title, price, quantity controls, Add to cart action, mobile list variant.
- `ProductModal`: product quick-view modal with gallery, quantity, specs, and cart/WhatsApp actions.
- `CartProvider`, `CartTrigger`, `CartDrawer`: localStorage cart state, slide-in cart drawer, quantity updates, subtotal.
- `ContactProjectForm`, `ContactProjectDrawer`: WhatsApp enquiry form in a slide-in drawer.
- `CinematicIntro`: first-visit/session intro animation.
- `PageMotionFrame`, `ScrollLightProgress`, `LightBeamCursor`: page transition, scroll progress rail, desktop cursor glow.

Page-specific components:

- Home sections in `KiswaniExperience`: hero, metrics, statement, category cards, visual stories, lighting types, featured products, portfolio strip, featured project, contact CTA.
- Collection page in `CollectionExperience`: hero, sibling navigation, product-map tabs, subcategory chips, collection search, mobile list product grid.
- Product page in `ProductExperience`: breadcrumb, gallery, thumbnails, title/specs/price, quantity selector, add to cart, datasheet download, related products, support CTA.
- Projects page in `ProjectsPageExperience`/`ProjectsShowcase`: project hero and visual project cards.
- Information pages in `InformationPageExperience`: reusable page shell with localized section rows/cards.
- Checkout in `CheckoutExperience`: order summary, editable quantities, customer/delivery form, REST save, WhatsApp handoff, printable invoice.
- Admin orders in `AdminOrdersDashboard`: password/demo unlock, order list, filters, stats, order detail, status/note update.

## 3. Styling And Responsive System

- Tailwind v4 is used through `app/globals.css`; no `tailwind.config.ts` exists.
- Global design tokens:
  - Yellow `#FFDA01`
  - Warm accent/gold `#FFA300`, `#AE6B0D`
  - Ink `#0F1822`
  - Warm black `#1E2722`
  - Dark surfaces `#050709`, `#070B0E`, `#0F151B`
  - Graphite `#50555B`
  - Muted `#A3A7AA`
  - Line `#CCCFCE`
  - Paper `#F4F2ED`
  - Sand `#E9E6DF`
- Typography:
  - Local IBM Plex Sans Arabic WOFF2 files, weights 300, 400, 500, 600, 700.
  - Used for Arabic and Latin text.
  - Headings rely on exact Tailwind sizes, tight line heights, and negative tracking in the current app. For Elementor, reproduce with global typography plus custom CSS classes where Elementor cannot set exact values.
- Main content width:
  - Most sections use `max-w-[1440px]` with `px-4 sm:px-8`.
- Key breakpoints in Tailwind classes:
  - `sm` 640px
  - `md` 768px
  - `lg` 1024px
  - `xl` 1280px
- Mobile product collection cards use `max-sm` list-card behavior: row layout, fixed 128px image, smaller typography, compact quantity controls.

## 4. Animation And Interaction Inventory

Must be preserved with CSS/JS or custom Elementor widgets:

- Framer Motion page entrance and section reveal animations using `ease: [0.22, 1, 0.36, 1]`.
- Sticky header entrance and desktop mega menu animation.
- Mobile drawer animation, closed collection accordions by default.
- Hero image rotation every 5.2 seconds, parallax on scroll.
- Animated metrics count-up.
- Category card 3D pointer tilt and glow.
- Light sweep hover overlays.
- Product card hover image scale and border/shadow transition.
- Product modal and cart drawer overlays.
- Scroll progress light rail on desktop.
- Cursor glow on pointer devices.
- Cinematic intro shown once per session.
- Featured project before/after reveal slider.
- Portfolio marquee strip.
- Reduced-motion support must disable nonessential motion.

## 5. Data Inventory

Static data currently lives in TypeScript arrays:

- `lib/catalog-products.ts`: 45 products with name, Arabic name, category, category slug, SKU/code, price, image, description, specs.
- `lib/catalog.ts`: product type definitions, category definitions, price formatting, category/product helpers, related product logic.
- `lib/product-map.ts`: product map groups, sections, subcategory items, localized labels, images, search keywords.

WordPress equivalent:

- Product CPT: `kiswani_product`
- Product collection/category taxonomy: hierarchical taxonomy for product-map groups, sections, subcategories, and category slugs.
- Product fields: SKU/code, price, localized names/descriptions, image/gallery, specs repeater, datasheet, category/group relationships, ordering.
- Project CPT: required if projects should be repeatable/editable instead of static Elementor cards.
- Order CPT/custom table: required for checkout orders and admin dashboard.

## 6. External Integrations And APIs

- WhatsApp links use `https://wa.me/970599671209`.
- Email: `info@kiswanilights.com`.
- Phone: `+970 599 67 12 09`.
- Map target: Ramallah, Palestine.
- Checkout API stores orders in Cloudflare D1 in the Next.js app. WordPress must replace this with custom REST routes backed by WordPress tables/CPTs.
- Admin dashboard currently uses a bearer password from `ADMIN_PASSWORD`; WordPress should use authenticated users with `manage_options` or a custom capability.

## 7. SEO Inventory

- Root metadata in `app/layout.tsx`:
  - Default title `Kiswani Lights`
  - Template `%s | Kiswani Lights`
  - Description for decorative/technical lighting in Ramallah
  - Keywords
  - Open Graph/Twitter image `/og-v2.jpg`
  - Icons from `/images/kiswani-logo.png`
- Page metadata exists for Home, Projects, About, Support, Privacy, Terms, Checkout.
- Dynamic metadata exists for product and collection pages.
- Sitemap currently includes static pages, categories, and products.
- Robots currently allows all and points to the Vercel sitemap URL.
- No explicit JSON-LD structured data was found in the audited files; WordPress implementation should add Organization and Product schema.

## 8. WordPress Content Architecture

Use a Hello Elementor child theme plus a custom plugin:

- Child theme: visual compatibility layer only.
  - Local fonts.
  - Global CSS tokens matching Next.js.
  - Header/footer/mobile menu styling hooks for Elementor templates.
  - Animation utility classes and reduced-motion handling.
- Custom plugin: business logic and reusable dynamic widgets.
  - Register product/project/order CPTs.
  - Register collection taxonomy.
  - Register meta fields.
  - Seed/import products, product-map groups, images, PDFs.
  - REST endpoints for cart checkout/order admin.
  - Elementor widgets for product cards, product grids, collection map tabs, cart trigger/drawer, contact drawer, checkout, and order dashboard.

## 9. Elementor Template Inventory

Global templates:

- Header: sticky top contact bar, main logo/search/action row, product mega menu, mobile drawer.
- Footer: four-column dark footer plus bottom row.

Pages:

- Home page template.
- Projects page template.
- About page template.
- Support page template.
- Privacy page template.
- Terms page template.
- Checkout page template.

Theme Builder templates:

- Product archive / all products.
- Collection taxonomy archive.
- Product single.
- 404 page.
- Search results page.

Reusable Elementor components/widgets:

- Brand button.
- Section intro.
- Category card.
- Product card.
- Visual story card.
- Project card.
- CTA band.
- Product map section card.
- Subcategory item tab.
- Contact form/drawer.
- Cart drawer.

## 10. Required Plugins

Required:

- Elementor: page/template editing.
- Elementor Pro: Theme Builder, dynamic tags/forms/popups are required for full editable header/footer/templates unless replaced by custom code.
- Advanced Custom Fields: structured editable fields for products/projects/content settings, unless fields are fully registered in the custom plugin.
- SEO plugin such as Rank Math or Yoast SEO: editable titles, descriptions, canonical URLs, Open Graph, sitemap controls.

Optional:

- WP Rocket or LiteSpeed Cache: production caching/performance, depending on host.
- WebP/AVIF optimizer if the host does not provide image optimization.

Avoid:

- Heavy menu builders, slider plugins, form plugins, and ecommerce plugins unless Elementor Pro or the custom plugin cannot meet the requirement.

## 11. Required CPTs And Fields

Products:

- `code`, `price`, `name_ar`, `name_he`, `category_label`, `category_label_ar`, `category_slug`, `short_description`, `description_ar`, `gallery`, `datasheet`, `specs` repeater, `featured`, `sort_order`.

Collections/taxonomy:

- `name_en`, `name_ar`, `name_he`, `description_en`, `description_ar`, `description_he`, `image`, `map_group_id`, `map_section_id`, `search_terms`, `sort_order`.

Projects:

- `title_en/ar/he`, `summary_en/ar/he`, `image`, `location`, `project_type`, `linked_products`, `sort_order`.

Orders:

- Customer name, email, WhatsApp, location, project type, notes, language, total pieces, subtotal, status, admin note, WhatsApp message, line items.

Site settings:

- Phone, email, showroom/location text, WhatsApp number, social links, map link, footer statement, language labels.

## 12. Migration And Implementation Plan

1. Freeze Next.js visual reference by capturing screenshots at 1920, 1440, 1366, 1024, 768, 480, 390, and 360 widths.
2. Create Hello Elementor child theme and Kiswani custom plugin.
3. Copy exact assets and fonts into the child theme/plugin asset package.
4. Register CPTs/taxonomies/meta and seed the current product/catalog data.
5. Build global Elementor settings: colors, typography, layout width, breakpoints.
6. Build Elementor Header and Footer templates.
7. Build Home page template section by section.
8. Build collection archive and product archive templates.
9. Build product single template with gallery/spec/download/cart behavior.
10. Build projects and information pages.
11. Build checkout and order admin flows as custom Elementor widgets/shortcodes.
12. Add SEO metadata/schema support.
13. Run screenshot comparison against the Next.js reference at all requested widths.
14. Fix diffs, package child theme and plugin, and document editing/deployment instructions.

## 13. Known Technical Limitations

- Elementor cannot reproduce all Framer Motion interactions with native controls. Exact matches for cursor glow, scroll rail, 3D tilt, hero rotation, before/after reveal, cart drawer, and product modal require custom JavaScript/CSS or custom Elementor widgets.
- Elementor editable content and pixel-perfect highly interactive React behavior are competing constraints. Static text/images can be fully editable in Elementor; product grids, cart, collection filters, checkout, and admin orders should be dynamic custom widgets with editable styling controls.
- The current native WordPress theme in `wordpress/kiswani-lights` is not the final Elementor architecture. It can be used as a catalog/data reference but should not be treated as the Elementor deliverable.

## Implementation Progress - Elementor Package 0.2.0

Created an installable Elementor-oriented WordPress package under `website/wordpress-elementor`.

New child theme work:
- Bumped `Hello Kiswani Child` to `0.2.0`.
- Added REST configuration for checkout JavaScript.
- Expanded Kiswani global CSS for header, mega menu, mobile menu, homepage sections, collection templates, product detail, checkout, admin, footer, and mobile list product cards.
- Replaced the starter JavaScript with language sync, drawer controls, localStorage cart, checkout summary rendering, quantity controls, REST order submission, and WhatsApp handoff.

New core plugin work:
- Bumped `Kiswani Elementor Core` to `0.2.0`.
- Added shared frontend helpers for language, asset URLs, taxonomy labels, collection product retrieval, product-card rendering, and checkout product payloads.
- Added Elementor widgets: Header, Home Sections, Collection Page, Product Detail, Checkout, Admin Orders, Footer.
- Registered all widgets under the Elementor `Kiswani Lights` category.

Validation:
- PHP lint passed in Docker for all plugin and child-theme PHP files.

Remaining before final pixel-perfect launch:
- Install Elementor/Elementor Pro and Hello Elementor in the target WordPress host.
- Create the Theme Builder templates and pages using the new widgets.
- Run visual comparison against the existing Next.js website at all required breakpoints.
- Tune final spacing/font rendering after screenshots are available from the actual WordPress Elementor runtime.
