# WordPress vs Next.js Pixel-Parity Discrepancy Report

Date: 2026-08-03
Scope: Current Docker WordPress/Elementor implementation at `http://127.0.0.1:8000` compared against the current Next.js source in `D:\Kiswani\website`.
Status: Audit phase only. No pixel-correction edits have been applied as part of this report.

## Audit Inputs

- Next.js source: `app/`, `components/`, `lib/`, `public/`.
- Current WordPress package: `wordpress-elementor/hello-kiswani-child` and `wordpress-elementor/kiswani-elementor-core`.
- Current Docker WordPress: active `hello-kiswani-child` theme and active `kiswani-elementor-core` plugin.
- Initial WordPress screenshots captured under `.audit/screenshots/` for home, collection, product, and checkout at 1440 and 390 widths.
- Fresh Next.js dev server was started on port `3001`, but Chrome headless could not capture the Vinext dev server reliably even though PowerShell HTTP fetch succeeded. Next screenshot files captured through Chrome for that server are browser error pages and must not be used as visual evidence. Correction phase must recapture source screenshots through a browser setup that can access the source server.

## Current Docker State Evidence

Rendered Docker checks:

| Page | URL | Status | Current evidence |
|---|---|---:|---|
| Home | `/` | 200 | Contains `kiswani-header`, 5 rendered `<section>` elements |
| Collection | `/collections/lighting-fixtures/` | 200 | Contains `kiswani-header`, 3 rendered `<section>` elements, 98 images, 92 buttons |
| Product | `/products/kl-sm-045-2/` | 200 | Contains `kiswani-header` and `kiswani-product-detail`, 2 rendered `<section>` elements |
| Checkout | `/checkout/` | 200 | Contains `kiswani-header`, 2 rendered `<section>` elements |
| Projects | `/projects/` | 200 | Does not contain the new Kiswani header, no matching project page structure |
| About | `/about/` | 404 | Missing WordPress page/template |
| Support | `/support/` | 404 | Missing WordPress page/template |

## Exact Next.js Design Token Reference

Source files:

- `app/globals.css`
- `app/fonts.css`
- `components/KiswaniExperience.tsx`
- `components/CollectionExperience.tsx`
- `components/ProductExperience.tsx`
- `components/CheckoutExperience.tsx`
- `components/ProjectsPageExperience.tsx`
- `components/InformationPageExperience.tsx`

### Colors

From `app/globals.css`:

| Token | Value |
|---|---:|
| `--background` | `#ffffff` |
| `--foreground` | `#0f1822` |
| `--primary`, `--kiswani-yellow` | `#ffda01` |
| `--accent`, `--kiswani-yellow-warm` | `#ffa300` |
| `--kiswani-gold` | `#ae6b0d` |
| `--kiswani-ink` | `#0f1822` |
| `--kiswani-warm-black` | `#1e2722` |
| `--kiswani-graphite` | `#50555b` |
| `--kiswani-muted` | `#a3a7aa` |
| `--kiswani-line` | `#cccfce` |
| `--kiswani-canvas` | `#ffffff` |

Frequent section colors from source:

- Deep black: `#050709`
- Dark panel: `#070B0E`
- Header dark: `#111315`
- Ink: `#0F1822`
- Paper: `#F4F2ED`
- Sand: `#E9E6DF`
- Lines: `#E4E0D8`, `#D8D4CC`, `#CCCFCE`

### Typography

From `app/fonts.css`:

- Font family: `IBM Plex Sans Arabic`
- Loaded weights: `300`, `400`, `500`, `600`, `700`
- Separate Arabic and Latin WOFF2 files per weight
- `font-display: swap`
- Body fallback: `IBM Plex Sans Arabic`, `Segoe UI`, `Arial`, `sans-serif`

Important Next.js typography examples:

- Header nav: `text-[11px] font-bold uppercase`
- Header utility/contact text: `text-[10px] font-bold uppercase`
- Section kicker: `text-xs font-bold uppercase tracking-[0.2em]`
- Homepage statement: `text-4xl sm:text-6xl lg:text-7xl`, `leading-[1.01]`, `tracking-[-0.055em]`
- Contact heading: `text-5xl sm:text-7xl lg:text-8xl`, `leading-[0.94]`
- Product title: `text-4xl sm:text-5xl xl:text-6xl`, `leading-[0.98]`, `tracking-[-0.05em]`

### Layout And Breakpoints

Next.js uses Tailwind responsive prefixes and arbitrary values:

- Global max content width: `max-w-[1440px]`
- Main horizontal padding: `px-4 sm:px-8`
- Major vertical section padding: commonly `py-16 sm:py-24`, `py-20 sm:py-28`, `py-24 sm:py-32`
- Tailwind breakpoints implied by classes: `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px
- Header desktop nav is only visible at `xl`; mobile drawer is used below `xl`
- Product grids: `sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4`
- Collection hero: `lg:h-[720px] lg:grid-cols-[0.88fr_1.12fr]`
- Product hero: `lg:grid-cols-[1.14fr_0.86fr]`
- Checkout grid: `lg:grid-cols-[0.85fr_1.15fr] lg:gap-20`

### Motion And Interaction

Next.js relies on Framer Motion and custom React state:

- Easing used repeatedly: `[0.22, 1, 0.36, 1]`
- Header mega menu: `AnimatePresence`, opacity/y transition, duration `0.24`
- Mobile drawer: x slide transition, duration `0.34`, same easing
- Product gallery: `AnimatePresence mode="wait"`, opacity/scale transition, duration `0.55`
- Product cards: layout animation and hover y/image scale
- Contact drawer, product modal, cart drawer: modal/drawer React interactions
- Reduced motion support via `useReducedMotion` and global `prefers-reduced-motion`

## Root Causes Of WordPress Differences

1. The WordPress implementation is currently a scaffold of custom widgets, not a 1:1 port of the React component tree.
2. Multiple Next.js components were replaced by simplified PHP markup instead of matching the exact source structure.
3. Framer Motion interactions were mostly omitted and replaced with static CSS hover states.
4. Elementor shortcodes and fallback templates were used for Docker preview, but the final Elementor Theme Builder templates are not yet built.
5. WordPress has seeded duplicate product data: current Docker count showed `90` products, while the Next.js catalog source has `45` products.
6. Several routes required by the Next.js site are missing in WordPress or are handled by default WordPress/Hello output.
7. WordPress CSS includes broad compressed global rules in one file, which does not map cleanly to source components.
8. Some WordPress values are approximations, such as `clamp(...)` heading sizes, `min-height: calc(100dvh - 180px)`, and category card heights, rather than exact Tailwind/arbitrary source values.
9. Current WordPress header, home, collection, product, and checkout widgets expose limited Elementor controls, so much visible text and imagery is still hardcoded.

## Discrepancy List

### 1. Home Page: Missing Intro Overlay

- Classification: Critical
- Next.js behavior: `KiswaniExperience` renders `<CinematicIntro />` before the header. It is a full-screen Framer Motion intro using `fixed inset-0 z-[100]`, dark background, logo/light animation, reduced-motion handling.
- Current WordPress behavior: No intro overlay or equivalent animation exists.
- Cause: `Kiswani_Home_Sections_Widget` starts directly at `<main class="kiswani-home">`; no widget/shortcode for `CinematicIntro` exists.
- Required correction: Create a `Kiswani Cinematic Intro` custom Elementor widget or integrate the intro in the global page shell with the same DOM, timing, z-index, image assets, and reduced-motion behavior.
- Target files/templates: `components/CinematicIntro.tsx`, `wordpress-elementor/kiswani-elementor-core/includes/widgets/`, `wordpress-elementor/hello-kiswani-child/assets/js/kiswani-elementor.js`, homepage Elementor template.

### 2. Home Page: Section Order Is Incomplete

- Classification: Critical
- Next.js behavior: Home sequence is `CinematicIntro`, `Header`, `Hero`, metrics, `gold-motif-divider`, statement section, collections with `WallSconceMotion`, `VisualStories`, `LightingTypes`, products with `TrackLightsMotion`, `LightingPortfolioStrip`, `FeaturedProjectExperience`, contact image band, `LuxuryFooter`, product modal, contact drawer, cart drawer.
- Current WordPress behavior: Home renders header, hero, metrics, collections, products, contact band, footer. The statement, divider, visual stories, lighting types, portfolio strip, featured project, contact image background treatment, product modal, contact drawer, and cart drawer are missing.
- Cause: `Kiswani_Home_Sections_Widget` intentionally simplified the homepage instead of porting each component.
- Required correction: Split missing Next.js sections into custom Elementor widgets or a richer home widget that preserves editability but uses the exact source structure and CSS classes.
- Target files/templates: `components/KiswaniExperience.tsx`, `components/LuxuryEnhancements.tsx`, `wordpress-elementor/kiswani-elementor-core/includes/widgets/class-kiswani-home-sections-widget.php`, homepage Elementor page.

### 3. Home Hero: Different Copy And Layout

- Classification: Major
- Next.js behavior: Hero uses localized copy from `copy[language]`: `heroLead`, `heroAccent`, and `heroBody`, with the English line beginning `Lighting isn't just` and accent `a decorative piece.` The hero contains rotating scene/category treatment and motion effects.
- Current WordPress behavior: Hero hardcodes `Lighting is not decoration. It is the soul of the space.` and a generic paragraph. It uses a single static image and simplified overlay.
- Cause: PHP widget does not use the Next.js `Hero` component structure or localized copy object.
- Required correction: Port the exact `Hero` JSX structure and copy model. Expose copy/images in Elementor controls or dynamic options without changing the rendered structure.
- Target files/templates: `components/KiswaniExperience.tsx` Hero function, `class-kiswani-home-sections-widget.php`.

### 4. Header: Desktop Structure Does Not Match

- Classification: Critical
- Next.js behavior: Header has utility/contact bar, 76px main row, logo at `h-[52px]`, `sm:h-14`, `lg:h-[60px]`, search hidden until `xl`, contact CTA, language select, cart trigger, and product nav at `h-[52px]`. Content max width is `1440px`, with `px-4 sm:px-8` and `xl:grid-cols-[250px_minmax(300px,520px)_1fr]`.
- Current WordPress behavior: Header uses `min-height: 34px` top bar, `min-height: 92px` main row, logo width `clamp(178px,18vw,258px)`, search width `min(32vw,430px)`, and product nav min-height `54px`. Text and controls differ.
- Cause: `Kiswani_Header_Widget` is a custom approximation, not the Next.js Header markup and Tailwind values.
- Required correction: Rebuild `Kiswani_Header_Widget` to match the exact Next.js Header DOM hierarchy, dimensions, icon controls, text, active states, and `xl` breakpoint behavior.
- Target files/templates: `components/KiswaniExperience.tsx` Header, `class-kiswani-header-widget.php`, `assets/css/kiswani-elementor.css`, header Elementor template.

### 5. Header: Mega Menu Is Structurally Different

- Classification: Critical
- Next.js behavior: Desktop mega menu has special `activeMenu === "all"` layout: `h-[430px]`, `grid-cols-[0.27fr_0.73fr]`, four product-map cards with images. Product-group menus use `h-[460px]`, `grid-cols-[0.34fr_0.66fr]`, horizontal scroll columns, section images, item lists, and Framer Motion open/close animation.
- Current WordPress behavior: Mega menu is a generic 3-column white dropdown with text-only columns. No `all` menu layout, no product-map cards, no horizontal section scroller, no matching animation.
- Cause: WordPress header widget collapsed all menu structures into one generic `.kiswani-mega-menu`.
- Required correction: Implement separate `all` and group mega menu render paths matching the React source. Use term data for editability but output source-matching markup.
- Target files/templates: `class-kiswani-header-widget.php`, `assets/css/kiswani-elementor.css`, `assets/js/kiswani-elementor.js`.

### 6. Header: Mobile Drawer Does Not Match

- Classification: Major
- Next.js behavior: Below `xl`, mobile drawer slides from inline start with `w-[min(92vw,430px)]`, dark 72px top row, logo, close icon button, image-backed collection cards, nested animated accordions, and overlay `fixed inset-0 z-40 bg-[#0F1822]/45 backdrop-blur-[1px]`.
- Current WordPress behavior: Mobile drawer is a plain white panel using native `<details>`, text-only nested lists, full dark overlay, and a text `Close` button. Accordions are closed by default, but visual structure is not source-matching.
- Cause: Current implementation chose simpler semantic markup and omitted the Next.js drawer/card visual system.
- Required correction: Rebuild drawer markup and CSS to match Next.js, preserving closed-by-default state while adding image cards and slide transition. Add body scroll locking.
- Target files/templates: `class-kiswani-header-widget.php`, `assets/css/kiswani-elementor.css`, `assets/js/kiswani-elementor.js`.

### 7. Home Statement Section Missing

- Classification: Critical
- Next.js behavior: After metrics/divider, source renders a statement section with `bg-[#F4F2ED] px-4 py-16 sm:px-8 sm:py-24`, grid `lg:grid-cols-[0.24fr_1.2fr_0.72fr]`, numeric `02`, headline `brand-statement`, and body with `lg:border-s`.
- Current WordPress behavior: No equivalent section exists.
- Cause: Omitted from home widget.
- Required correction: Add exact statement section widget or source-matching block inside home widget with Elementor-editable localized text.
- Target files/templates: `class-kiswani-home-sections-widget.php`, homepage Elementor page.

### 8. Home Collections Section Lacks Motion Fixture

- Classification: Major
- Next.js behavior: Collections section uses `bg-[#E9E6DF]`, `WallSconceMotion`, `SectionIntro`, and `CategoryCard` with motion and exact category card behavior.
- Current WordPress behavior: Static category card grid in `bg-[#F4F2ED]`; no `WallSconceMotion`, different background, different card min-height and content treatment.
- Cause: Widget and CSS use simplified `.kiswani-category-grid` rather than ported `CategoryCard` and fixture motion.
- Required correction: Port `CategoryCard` and `WallSconceMotion` structures and responsive rules.
- Target files/templates: `components/KiswaniExperience.tsx`, `class-kiswani-home-sections-widget.php`, CSS/JS.

### 9. Home VisualStories Missing

- Classification: Critical
- Next.js behavior: `VisualStories language={language}` appears between collections and lighting types.
- Current WordPress behavior: No section exists.
- Cause: No WordPress widget/template for `VisualStories`.
- Required correction: Create `Kiswani Visual Stories` Elementor widget from the source component with editable images/copy.
- Target files/templates: `components/KiswaniExperience.tsx`, new widget file.

### 10. Home LightingTypes Missing

- Classification: Critical
- Next.js behavior: `LightingTypes language={language}` renders a dark technical/visual-language section with animated fixture elements and interactive illumination state.
- Current WordPress behavior: No section exists.
- Cause: Omitted from home widget.
- Required correction: Port `LightingTypes` as custom widget, including stateful toggle and reduced-motion handling.
- Target files/templates: `components/KiswaniExperience.tsx`, new widget file, JS.

### 11. Home Portfolio And Featured Project Missing

- Classification: Critical
- Next.js behavior: `LightingPortfolioStrip` and `FeaturedProjectExperience` appear after products.
- Current WordPress behavior: No equivalent project/inspiration strips on homepage.
- Cause: `LuxuryEnhancements.tsx` components were not implemented in WordPress.
- Required correction: Create widgets for both sections and use project data/images matching source.
- Target files/templates: `components/LuxuryEnhancements.tsx`, homepage Elementor page.

### 12. Product Cards Do Not Match

- Classification: Major
- Next.js behavior: `ProductCard` is a Framer Motion card with localized text, product modal open handler, layout animation, image skeleton, hover motion, and grid classes `auto-rows-fr gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4`.
- Current WordPress behavior: Product cards are static `<article>` links, always navigate to product detail, include hardcoded `Add to cart`, and use `min-height: 530px`, `gap: 1rem`, mobile row layout below 640.
- Cause: Shared PHP renderer `kiswani_render_product_card()` does not match `ProductCard` and lacks modal/open behavior.
- Required correction: Replace PHP card renderer with source-matching structure and behavior. Decide whether card opens modal on home and navigates on archive according to each source page.
- Target files/templates: `components/KiswaniExperience.tsx` ProductCard/ProductModal, `frontend-helpers.php`, CSS, JS.

### 13. Product Modal Missing

- Classification: Critical
- Next.js behavior: Home and collection pages can open `ProductModal` with gallery/details and `AnimatePresence`.
- Current WordPress behavior: Product cards navigate to product pages; no product modal exists.
- Cause: Modal component was not ported.
- Required correction: Build custom modal widget/JS using exact Next.js modal markup and transitions, or configure page-specific card behavior to open the modal.
- Target files/templates: `components/KiswaniExperience.tsx`, `assets/js/kiswani-elementor.js`, card renderer.

### 14. Contact Drawer Missing

- Classification: Critical
- Next.js behavior: Contact anchors are intercepted by `handleContactNavigation` and open `ContactProjectDrawer` with overlay, sticky dark header, form fields, WhatsApp handoff, and animation.
- Current WordPress behavior: Contact CTA links directly to WhatsApp or static band. No drawer/form parity.
- Cause: `ContactProjectForm.tsx` was not ported.
- Required correction: Port contact drawer as custom widget/JS and ensure `#contact` links open it like React source.
- Target files/templates: `components/ContactProjectForm.tsx`, `assets/js/kiswani-elementor.js`, homepage/collection/product widgets.

### 15. Cart Drawer Missing

- Classification: Critical
- Next.js behavior: Global `CartDrawer` and `CartTrigger` exist on all major pages, with compact/mobile variants and cart state from `CartSystem`.
- Current WordPress behavior: Header has a cart link/count and checkout localStorage logic, but no matching drawer UI.
- Cause: `CartSystem.tsx` was approximated as basic JS and checkout summary only.
- Required correction: Port `CartTrigger` and `CartDrawer` markup/interactions; maintain WordPress REST checkout compatibility.
- Target files/templates: `components/CartSystem.tsx`, `class-kiswani-header-widget.php`, JS.

### 16. Collection Page: Hero And Tabs Differ

- Classification: Major
- Next.js behavior: Collection hero has `bg-[#070B0E] px-4 py-4 sm:px-8 sm:py-8`, inner grid `lg:h-[720px] lg:grid-cols-[0.88fr_1.12fr]`, copy area `min-h-[580px] p-8 sm:p-14 lg:p-20`, image panel with border overlay and yellow square. Product-map tabs use large image-backed cards `sm:h-44 sm:min-w-[310px]`, with active `shadow-[0_18px_45px_rgba(15,24,34,0.18)]`.
- Current WordPress behavior: Collection hero uses `.kiswani-collection-hero` with generic `padding:1rem`, `min-height:620px`, `grid-template-columns:.9fr 1.1fr`, and tabs use `height:160px` static cards. It also renders 98 images and many buttons due seeded taxonomy/product duplication.
- Cause: CSS/PHP approximates structure and seeded data is duplicated.
- Required correction: Match exact `CollectionExperience` markup and Tailwind values. Fix seed/upsert logic to prevent duplicate products and terms.
- Target files/templates: `components/CollectionExperience.tsx`, `class-kiswani-collection-page-widget.php`, `seed.php`, CSS.

### 17. Collection Page: Dynamic Filtering Search Behavior Differs

- Classification: Major
- Next.js behavior: Collection search is React state, live filters `scopedProducts` without page reload, and selection uses `category` and `subcategory` query values in English labels.
- Current WordPress behavior: Search submits GET `q` and reloads. Section/item query uses term slugs, not exact source label values. Results are generated server-side.
- Cause: WordPress implementation chose server-side query and term slugs.
- Required correction: Either port live JS filtering using product payload or intentionally document unavoidable query-value difference. For pixel parity, use same visible behavior and query parameter semantics as source.
- Target files/templates: `CollectionExperience.tsx`, `class-kiswani-collection-page-widget.php`, JS.

### 18. Product Detail: Wrong Product URL And Duplicate Seed Data

- Classification: Critical
- Next.js behavior: Product slug is `product.code.toLowerCase()`, for example `/products/kl-sm-045`.
- Current WordPress behavior: Docker product example is `/products/kl-sm-045-2/`, indicating duplicate slug insertion. Docker count showed 90 products vs 45 in source.
- Cause: Seed/upsert did not prevent duplicates after previous runs or changed post slugs; WordPress generated `-2` suffix.
- Required correction: Make seed idempotent by unique `_kiswani_code`, clean duplicates, and preserve slug exactly equal to lowercase code.
- Target files/templates: `seed.php`, migration cleanup script, WordPress database.

### 19. Product Detail: Gallery And Related Products Incomplete

- Classification: Major
- Next.js behavior: Product detail has breadcrumb, large gallery with selectable thumbnails, quantity selector, total price, specs preview, datasheet, WhatsApp, product data section, related products, and yellow project support CTA.
- Current WordPress behavior: Product detail has main image, maybe thumbnails if meta exists, summary, specs, actions, and data section. It lacks exact thumbnail button behavior, quantity selector, total price, related product section, and final support CTA parity.
- Cause: `Kiswani_Product_Detail_Widget` is a simplified PHP render and does not use `getRelatedProducts()` equivalent.
- Required correction: Port full `ProductExperience` structure including related products and quantity interactions.
- Target files/templates: `components/ProductExperience.tsx`, `class-kiswani-product-detail-widget.php`, JS.

### 20. Checkout Page: Cart State And Invoice Differ

- Classification: Major
- Next.js behavior: Checkout is a React cart experience with editable quantities, remove/clear actions, server POST to `/api/orders`, WhatsApp handoff, success/error states, and `ClientInvoice` print area.
- Current WordPress behavior: Basic localStorage cart summary and REST order submission exist, but there is no matching invoice print area and the cart UI/spacing is simplified.
- Cause: `CheckoutExperience.tsx` was not fully ported; only functional essentials were implemented.
- Required correction: Port checkout DOM and invoice component, while swapping endpoint to WordPress REST.
- Target files/templates: `components/CheckoutExperience.tsx`, `class-kiswani-checkout-widget.php`, JS.

### 21. Projects Page Missing

- Classification: Critical
- Next.js behavior: `/projects` uses `ProjectsPageExperience` with header, immersive hero, project showcase, motion tabs/modal, CTA, footer, and contact drawer.
- Current WordPress behavior: `/projects/` returns 200 but lacks `kiswani-header` and has no project page structure.
- Cause: No WordPress page/template/widget was created for projects.
- Required correction: Create Projects page in WordPress and a custom Elementor widget matching `ProjectsPageExperience`/`ProjectsShowcase`.
- Target files/templates: `components/ProjectsPageExperience.tsx`, `components/ProjectsShowcase.tsx`, new widget, WordPress `/projects/` page.

### 22. Information Pages Missing Or Not Ported

- Classification: Critical
- Next.js behavior: `/about`, `/support`, `/privacy`, `/terms` use `InformationPageExperience` with dark hero, navigation, structured sections, support contact cards when applicable, and CTA/footer.
- Current WordPress behavior: `/about/` and `/support/` return 404. Privacy/terms have not been verified as matching and likely are not using the source structure.
- Cause: No information-page WordPress templates/pages were created in the Elementor package.
- Required correction: Create information page widget/template that consumes the same content model and build all required pages.
- Target files/templates: `components/InformationPageExperience.tsx`, `app/about/page.tsx`, `app/support/page.tsx`, `app/privacy/page.tsx`, `app/terms/page.tsx`, new widget/pages.

### 23. Footer Mostly Similar But Not Exact

- Classification: Major
- Next.js behavior: `LuxuryFooter` has `px-4 pb-8 pt-0 sm:px-8`, animated top rule, wrapper `pt-20 sm:pt-28`, grid `lg:grid-cols-[1.2fr_0.48fr_0.56fr_0.6fr]`, exact nav labels and localized text, huge background `KISWANI` wordmark.
- Current WordPress behavior: Similar dark footer exists, but top rule is static, localization is incomplete, background giant wordmark is missing, and the footer content/spacing is approximate.
- Cause: `Kiswani_Footer_Widget` manually recreated a simplified footer.
- Required correction: Port `LuxuryFooter` structure exactly and expose menu/contact controls.
- Target files/templates: `components/KiswaniExperience.tsx` LuxuryFooter, `class-kiswani-footer-widget.php`, CSS.

### 24. Animations Are Largely Missing

- Classification: Major
- Next.js behavior: Most sections use Framer Motion: whileInView, layout animation, hover y/scale, opacity/y reveals, modal transitions, drawer slide, gallery transitions, metric count-up, marquee.
- Current WordPress behavior: Only static CSS hover transitions and localStorage JS are present. No scroll-triggered reveals, metric count-up, Framer timing parity, or modal/drawer animation parity.
- Cause: No animation layer was ported from source.
- Required correction: Add a scoped vanilla JS animation layer or a small motion library only where necessary. Match easing/duration values and respect reduced-motion.
- Target files/templates: `assets/js/kiswani-elementor.js`, CSS, all custom widgets.

### 25. Elementor Editability Is Incomplete

- Classification: Major
- Next.js behavior: Static source uses hardcoded React copy/data, but WordPress requirement is editable via Elementor.
- Current WordPress behavior: Several WordPress widgets hardcode major content strings, images, links, and section copy. Only a few controls exist, such as product limit and fallback collection.
- Cause: Custom widgets were scaffolded without full Elementor controls.
- Required correction: Add Elementor controls/repeaters/media controls for section copy, images, CTA links, contact details, while preserving source-default values.
- Target files/templates: all widget files in `kiswani-elementor-core/includes/widgets/`.

### 26. CSS Architecture Is Not Maintainable Enough For Pixel Fixes

- Classification: Major
- Next.js behavior: Component styling is colocated as Tailwind class strings and global CSS utilities. Values are traceable component by component.
- Current WordPress behavior: Large compressed CSS append in `assets/css/kiswani-elementor.css` mixes header, home, collection, product, checkout, admin, and footer rules on single lines.
- Cause: CSS was appended quickly to support preview rather than structured for pixel auditing.
- Required correction: Split CSS into organized sections or files by component, keep source-value comments, and avoid broad overrides. This must happen before precise pixel tuning.
- Target files/templates: `hello-kiswani-child/assets/css/kiswani-elementor.css`.

### 27. WordPress Uses Elementor/Theme Defaults In Some Pages

- Classification: Critical
- Next.js behavior: Every route uses custom Kiswani page shell and footer/header.
- Current WordPress behavior: Projects page renders without `kiswani-header`; About and Support 404. Some pages may still render Hello Elementor defaults.
- Cause: WordPress pages/templates not registered for all routes.
- Required correction: Create real pages and templates for each Next.js route, assign shortcodes/widgets only as a preview fallback, and build Elementor Theme Builder templates where required.
- Target files/templates: WordPress database pages, `front-page.php`, `page.php`, new custom widgets, Elementor templates.

### 28. SEO And Metadata Not Ported

- Classification: Major
- Next.js behavior: Routes define metadata in page files, plus `sitemap.ts` and `robots.ts`.
- Current WordPress behavior: No Rank Math/Yoast configuration or matching page metadata was audited or created.
- Cause: SEO migration not implemented.
- Required correction: Map Next metadata to WordPress SEO plugin fields or custom meta output.
- Target files/templates: WordPress pages/products/terms SEO fields, optional SEO plugin setup.

## Required Correction Architecture

Do not continue by patching random CSS. The next implementation phase should proceed in this order:

1. Clean data first: remove duplicate products/terms and enforce source slugs.
2. Build a source-matching page shell: header, footer, cart drawer, contact drawer, product modal.
3. Replace simplified homepage widget with source-matching component widgets for every missing section.
4. Replace collection/product/checkout widgets with full source structure.
5. Create Projects and Information page widgets and WordPress pages.
6. Refactor CSS into component-scoped sections before pixel tuning.
7. Add Elementor controls/repeaters after the static source-equivalent markup is correct.
8. Recapture valid Next.js and WordPress screenshots at the full requested viewport matrix.
9. Tune critical and major differences by component.
10. Regenerate Elementor CSS, clear caches, and rerun comparison.

## Files That Must Change In Correction Phase

Current WordPress files:

- `wordpress-elementor/kiswani-elementor-core/includes/seed.php`
- `wordpress-elementor/kiswani-elementor-core/includes/frontend-helpers.php`
- `wordpress-elementor/kiswani-elementor-core/includes/widgets/class-kiswani-header-widget.php`
- `wordpress-elementor/kiswani-elementor-core/includes/widgets/class-kiswani-home-sections-widget.php`
- `wordpress-elementor/kiswani-elementor-core/includes/widgets/class-kiswani-collection-page-widget.php`
- `wordpress-elementor/kiswani-elementor-core/includes/widgets/class-kiswani-product-detail-widget.php`
- `wordpress-elementor/kiswani-elementor-core/includes/widgets/class-kiswani-checkout-widget.php`
- `wordpress-elementor/kiswani-elementor-core/includes/widgets/class-kiswani-footer-widget.php`
- New widgets for CinematicIntro, VisualStories, LightingTypes, PortfolioStrip, FeaturedProject, ContactDrawer, CartDrawer, ProductModal, Projects, InformationPage.
- `wordpress-elementor/hello-kiswani-child/assets/css/kiswani-elementor.css`
- `wordpress-elementor/hello-kiswani-child/assets/js/kiswani-elementor.js`
- WordPress pages/templates for `/projects`, `/about`, `/support`, `/privacy`, `/terms`, `/checkout`, `/admin`.

## Screenshot Work Remaining

The final correction phase must still complete the full requested screenshot matrix:

- `1920x1080`
- `1440x900`
- `1366x768`
- `1280x800`
- `1024x768`
- `768x1024`
- `480x900`
- `430x932`
- `390x844`
- `375x812`
- `360x800`

For this audit phase, current valid screenshot artifacts are limited to the WordPress side and earlier local captures. Fresh source screenshots from Chrome are invalid until the browser can reliably access the current source server.

## Summary

The current WordPress/Elementor implementation is functional as a preview, but it is not a pixel-perfect port. The largest issues are not small spacing mismatches; they are missing sections, missing routes, different header/menu structures, simplified page widgets, missing modals/drawers/animations, duplicate product data, and incomplete Elementor editability. Critical and major differences must be corrected architecturally before detailed pixel tuning will be meaningful.
