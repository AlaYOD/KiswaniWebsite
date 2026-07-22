# Kiswani Lights — Website Sitemap Plan

Replaces the previous `Kiswani_Lights_Sitemap_Plan.pdf`. Reflects the live Next.js app in `website/`, the full catalog in `product_catalog_categories.md`, and the goals in `website_requirements.md` (fast, SEO-friendly, easy-to-browse catalog).

Status legend: **Live** = page exists in code today · **Planned** = needed to cover the full catalog, not yet built.

---

## 1. Site tree

```
/ (Home)                                                          Live
│
├── /collections (Product Catalog hub)                           Live
│   ├── /collections/interior-lighting                           Live
│   ├── /collections/outdoor-lighting                            Planned
│   ├── /collections/bulb-lighting                                Planned
│   ├── /collections/technical-lighting                          Live
│   ├── /collections/accessories (hub)                           Planned
│   │   ├── /collections/accessories/drivers-power-supplies      Planned
│   │   ├── /collections/accessories/led-films-garden             Planned
│   │   ├── /collections/accessories/emergency-lighting           Planned
│   │   ├── /collections/accessories/mosquito-killers             Planned
│   │   └── /collections/accessories/pool-lighting                Planned
│   ├── /collections/ventilators                                 Planned
│   ├── /collections/tcs-products                                Planned
│   └── /outlet (clearance / sale)                                Planned
│
├── /products/[product-slug]  (e.g. /products/kl-hc-120)          Live
│                                                    ↳ one detail page per product, under every category above
│
├── /about                                                        Live
├── /support (contact)                                            Live
│
├── /cart (drawer or /cart route)                                 Live (drawer only, no route)
├── /checkout                                                     Live
│
├── /privacy                                                      Live
├── /terms                                                        Live
│
├── /not-found (404)                                              Live
├── /sitemap.xml (auto-generated)                                 Live
├── /robots.txt                                                   Live
└── /signin-with-chatgpt, /signout-with-chatgpt, /callback         Live (ChatGPT Apps commerce auth, not a nav page)
```

Two lighting categories the site currently calls **"Decorative"** and **"Accent"** (in `lib/catalog.ts`) don't appear in the official catalog list at all — they read as internal/marketing groupings layered on top of the real category set, not a like-for-like match to it.

---

## 2. Priority gap: category mismatch

`website/lib/catalog.ts` currently defines only **4 categories** — Decorative, Interior, Technical, Accent — each with 3 demo products.

The real catalog (`product_catalog_categories.md`, sourced from the live site) has **11 categories** across 3 groups:

| Group | Categories |
|---|---|
| Main lighting | Interior · Outdoor · Bulb · Technical |
| Accessories (sub-hub) | Drivers/Power Supplies · LED Films/Garden · Emergency · Mosquito Killer · Pool |
| Other | Ventilators · TCS Products · Outlet/Sales |

**Action:** before this sitemap is fully "live," expand `lib/catalog.ts` (or move it to a CMS/DB — `website/db/` already has a Drizzle schema stubbed out) so every category above has a real collection page and product set. Until then, `app/sitemap.ts` will keep only advertising 4 of 11 categories to search engines, which caps organic reach on the other 7.

---

## 3. URL structure — best practices applied

- **Flat and shallow**: max depth is `/collections/accessories/<sub-category>/` (3 segments) or `/products/<slug>` (2 segments) — Google's crawl budget and users both prefer ≤3 clicks from home.
- **Lowercase, hyphenated, keyword-rich**: `drivers-power-supplies`, not `Drivers_Power_Supplies` or `cat-3`.
- **Stable IDs in product slugs**: `getProductSlug()` already uses the product code (`kl-hc-120`) — durable even if the product name changes later, so old links/QR codes on printed catalogs keep working.
- **One canonical noun per concern**: `/collections/*` = browsing/category pages, `/products/*` = single-item detail pages. Don't mix the two patterns for the same content.
- **Accessories as a parent, not a sibling**: matches the catalog doc's own guidance ("make Accessories a main category under which other types fall") and keeps the nav from becoming a flat wall of 11 top-level items.
- **`/outlet` stays top-level**, not nested under `/collections`, because clearance items span multiple categories — nesting it would force a false single-category home.

---

## 4. Performance & SEO checklist for this structure

- **Static generation**: category and product pages should use `generateStaticParams` + ISR (revalidate on catalog change) rather than pure SSR, so every catalog/product page ships as a pre-rendered, cached page — this is the single biggest lever for the "fast loading" requirement.
- **`app/sitemap.ts` improvements needed**:
  - Read `origin` from an env var (`NEXT_PUBLIC_SITE_URL`), not a hardcoded Vercel preview URL — the current hardcoded domain will point search engines at the wrong host if/when the production domain changes.
  - Add `lastModified` per entry so crawlers can skip unchanged pages.
  - Once categories expand (see §2), the sitemap will automatically cover all 11 categories since it's already generated from `lib/catalog.ts`.
- **Images**: category/product images are already `.webp`; keep using `next/image` with explicit `width`/`height` to avoid layout shift.
- **Metadata**: every `/collections/[slug]` and `/products/[slug]` page should set its own `title`/`description` via `generateMetadata` (product name + spec highlights), not inherit the root layout's generic description.
- **Breadcrumbs**: add `BreadcrumbList` structured data on category/product pages — cheap win for search result rich snippets given the 3-level hierarchy above.
- **Cart/Checkout stay `noindex`**: transactional pages shouldn't be in `sitemap.xml` (already correctly excluded).

---

## 5. Primary navigation (recommended)

```
Home   Products ▾                              About   Support   Cart 🛒
       ├─ Interior Lighting
       ├─ Outdoor Lighting
       ├─ Bulb Lighting
       ├─ Technical Lighting
       ├─ Accessories ▸ (Drivers · LED Films/Garden · Emergency · Mosquito Killer · Pool)
       ├─ Ventilators
       ├─ TCS Products
       └─ Outlet
```

Footer repeats the same links (flat list, no submenu) plus Privacy / Terms — this is the "footer sitemap" search engines and users both fall back to.
