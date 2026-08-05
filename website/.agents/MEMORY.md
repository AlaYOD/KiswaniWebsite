# Kiswani Lights conversion memory

## Project overview

- Source application: Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Framer Motion 12, Lucide React, local IBM Plex Sans Arabic font files.
- Conversion target requested: an installable standalone WordPress theme with Elementor Free-compatible custom widgets; Elementor Pro must not be required.
- Source catalog: 45 products, 74 images under `public/images`, and 12 PDF datasheets.

## Audit baseline — 2026-08-03

- Public source routes: home, dynamic collections, dynamic products, projects, checkout, about, support, privacy, terms, and 404. Administrative order routes and API endpoints are separate non-public workflows.
- The site shell is built from `Header`, `LuxuryFooter`, `CartDrawer`, `ContactProjectDrawer`, intro and enhancement components. Homepage, collection, product, checkout, project, and information-page experiences are reusable React components.
- Primary motion dependency is Framer Motion. The WordPress port must reproduce it with a scoped CSS/vanilla-JS layer plus IntersectionObserver, and use Web Animations only where it is necessary. The source cubic-bezier is repeatedly `[0.22, 1, 0.36, 1]`; reduced-motion is supported.
- WordPress data model decision: product CPT + hierarchical product collection taxonomy + native post meta for technical data/datasheets/galleries; project CPT; order CPT/private storage or custom tables; theme options for header/footer/contact/social/global CTA; no ACF Pro requirement.
- Required custom Elementor Free widgets: homepage composition/sections, product grid/card/modal, collection experience, product detail, projects showcase/modal, information page, checkout, contact form, and reusable utility widgets. Header/footer/drawers are theme-managed global components, not Elementor Pro templates.
- Before implementation, create a fresh theme source directory. A prior WordPress discrepancy report exists in `docs/wordpress-pixel-parity-discrepancy-report.md`, but no WordPress source is present in this workspace; treat that report as historical reference only.

## Next task

The WordPress homepage parity work is complete and passed final design QA on 2026-08-05. Continue with the next source route only when requested; collection-page work is the most natural next conversion step.

## Homepage parity completion - 2026-08-05

- Local WordPress preview: `http://localhost:8088/`, theme `wordpress-theme/kiswani-lights-v2`.
- Final homepage visual evidence: `output/playwright/visual-regression/2026-08-05T09-39-18-438Z`.
- Full-page pixel differences versus the live Next.js source: 0.5083% at 375 x 812, 0.5112% at 768 x 1024, and 0.5957% at 1440 x 900. All homepage viewports pass the 2% gate and have matching rendered heights.
- Section-level QA covers header, hero, metrics, motif, statement, collections, stories, lighting types, products, marquee, featured project, contact, and footer. The final report is `design-qa.md` with `final result: passed`.
- Implemented source-matched cinematic intro, reveal/stagger motion, hero parallax and scene transitions, metric counters, fixture illumination, marquee behavior, collection tilt, featured-project interaction, and reduced-motion behavior.
- Implemented and tested mobile navigation, name/category/code search with empty state, product modal/gallery/quantity, cart drawer/badge, project comparison controls, contact hash drawer, form-to-WhatsApp preparation, success state, Escape behavior, and focus treatment.
- Final motion and interaction browser tests pass with no console or page errors. JavaScript syntax, relevant PHP syntax, and `git diff --check` pass.
- `D:\\Kiswani\\PagesCodes\\homePageCode.html` was still 0 bytes at final check; the live source URL and local Next.js source components were used as visual/behavioral truth.

## Navbar parity completion - 2026-08-05

- Rebuilt the WordPress homepage navbar from the authoritative live Next.js markup and local source components, including desktop hover/focus mega menus, keyboard Escape handling, accurate chevrons/underlines, and the responsive mobile drawer with one-panel accordion behavior.
- Primary implementation files: `header-source-home.php`, `template-parts/source-navbar.php`, `assets/css/source-navbar.css`, and `assets/js/source-home.js` inside `wordpress-theme/kiswani-lights-v2`.
- Product navigation content is exported to `wordpress-theme/kiswani-lights-v2/data/product-map.json`; `scripts/export-product-map-json.mjs` is the regeneration helper.
- Final navbar evidence: `output/playwright/navbar-qa-2026-08-05-final-passed`. Pixel differences are 0.556% for the closed desktop header, 1.068% for the Products mega menu, 0.436% for Lighting Fixtures, 0.353% for the closed mobile drawer, and 0.928% for expanded mobile Products.
- The complete homepage interaction suite passes with zero console/page errors; JavaScript and PHP syntax checks pass. Navbar QA is recorded in `design-qa.md` and the final result remains passed.
