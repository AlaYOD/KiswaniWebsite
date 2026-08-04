# Visual regression report

## Approved visual source of truth

All visual QA now uses the deployed source site, not the local development copy:

- Reference: `https://kiswani-website-82jb.vercel.app`
- WordPress target: `http://localhost:8088`
- Comparator: Playwright + pixelmatch
- Threshold: **2.00%** mismatched pixels
- Viewports: 375 × 812, 768 × 1024, and 1440 × 900
- Capture: full page, reduced motion, transitions disabled

## Current deployed-reference result — 2026-08-04

**30 of 30 comparisons fail.** The WordPress conversion is not pixel-perfect and must not be considered complete.

| Route | 375px | 768px | 1440px | WordPress response |
|---|---:|---:|---:|---|
| `/` | 49.4617% | 44.7058% | 56.2784% | 200 |
| `/collections/decorative` | 29.8139% | 36.0388% | 28.4711% | 404 — unbuilt |
| `/products/kl-gl-001` | 69.2662% | 67.8835% | 63.9304% | 404 — unbuilt |
| `/projects` | 68.9454% | 73.2715% | 70.6742% | 404 — unbuilt |
| `/checkout` | 61.7224% | 58.9941% | 53.9747% | 404 — unbuilt |
| `/about` | 38.1684% | 21.9939% | 16.8208% | 200 — incomplete parity |
| `/support` | 37.6229% | 19.3944% | 9.1313% | 200 — incomplete parity |
| `/privacy` | 59.9020% | 50.3212% | 43.4334% | 200 — incomplete parity |
| `/terms` | 47.1460% | 36.1393% | 24.5584% | 200 — incomplete parity |
| 404 | 62.2036% | 72.9146% | 70.5305% | 404 — incorrect design |

Artifacts for this run: `output/playwright/visual-regression/2026-08-04T07-06-13-340Z/`.

## Deployed-site audit that now drives implementation

The live homepage includes these source components that the WordPress build must reproduce exactly:

1. Utility bar; 76px dark main header; search; language selector; cart; 52px category navigation.
2. Four-scene hero with interior/decorative/technical/accent controls and count-up metrics.
3. Four collection cards, visual-stories layout, lighting-type grid, and eight-card product grid with quantity controls and cart interaction.
4. Technology marquee; before/after lighting comparison slider; 2700K/3500K/5000K temperature controls; project product links.
5. Contact image panel and full four-column footer.
6. Source routes for collection, product, projects, checkout, information pages, and the custom 404 state.

## Required remediation order

1. Implement custom WordPress routing/templates for collections, products, projects, checkout, and 404 so no live source route returns a generic 404.
2. Port `CollectionExperience.tsx`, `ProductExperience.tsx`, `ProjectsPageExperience.tsx`, and `CheckoutExperience.tsx` component-by-component using original assets/data.
3. Replace the abbreviated homepage PHP markup with the full deployed component hierarchy and exact responsive Tailwind values.
4. Recreate the source cart, language switcher, search, hero scene controls, comparison/temperature controls, and mobile drawer as custom theme/Elementor Free widgets.
5. Retest one route at a time until every viewport scores ≤2%.

## Run the approved test

```powershell
$env:TARGET_URL = 'http://localhost:8088'
node scripts/visual-regression.mjs

# While working on named routes:
$env:VISUAL_ROUTES = 'home,collection-decorative,product-kl-gl-001'
node scripts/visual-regression.mjs
```