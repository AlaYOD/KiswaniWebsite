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

Build the theme only after the user accepts or requests continuation from the mandatory audit report. Begin with a source-exact page shell and data model, then widgets, content seeding, animation layer, and viewport-by-viewport visual QA.
