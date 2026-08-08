# Visual regression report

## Approved visual source of truth

All visual QA uses the deployed source site, not the local development copy:

- Reference: `https://kiswani-website-82jb.vercel.app`
- WordPress target: `http://localhost:8088`
- Comparator: Playwright + pixelmatch
- Threshold: **2.00%** mismatched pixels
- Viewports: 375 × 812, 768 × 1024, and 1440 × 900
- Capture: full page, reduced motion, transitions disabled

## Current result — 2026-08-06

**78 of 78 comparisons pass** across all 26 routes, with zero capture errors.
Repeat runs are bit-identical.

| Route | 375px | 768px | 1440px |
|---|---:|---:|---:|
| `/` | 0.39% | 0.41% | 0.53% |
| `/collections/decorative` | 0.13% | 0.23% | 0.09% |
| `/collections/interior` | 0.33% | 0.44% | 0.19% |
| `/collections/technical` | 0.33% | 0.41% | 0.17% |
| `/collections/accent` | 0.14% | 0.20% | 0.06% |
| `/collections/lighting-fixtures` | 0.08% | 0.14% | 0.05% |
| `/collections/light-bulbs` | 0.08% | 0.13% | 0.04% |
| `/collections/electrical-products` | 0.08% | 0.12% | 0.04% |
| `/collections/i-lite` | 0.07% | 0.12% | 0.04% |
| category and subcategory views (9 sampled) | 0.07–0.08% | 0.12–0.17% | 0.04–0.09% |
| `/products/kl-gl-001` | 1.03% | 1.20% | 0.98% |
| `/projects` | 1.41% | 1.40% | 0.68% |
| `/checkout` | 0.30% | 0.11% | 0.18% |
| `/about` | 0.19% | 0.08% | 0.10% |
| `/support` | 0.18% | 0.09% | 0.10% |
| `/privacy` | 0.20% | 0.10% | 0.13% |
| `/terms` | 0.19% | 0.09% | 0.12% |
| 404 | 0.00% | 0.00% | 0.01% |

### Superseded — first pass, before the shared header and font fixes

| Route | 375px | 768px | 1440px |
|---|---:|---:|---:|
| `/` | 0.44% | 0.45% | 0.55% |
| `/collections/decorative` | 0.21% | 0.31% | 0.16% |
| `/collections/interior` | 0.53% | 0.61% | 0.34% |
| `/collections/technical` | 0.54% | 0.59% | 0.32% |
| `/collections/accent` | 0.22% | 0.29% | 0.13% |
| `/collections/lighting-fixtures` | 0.13% | 0.19% | 0.09% |
| `/collections/light-bulbs` | 0.12% | 0.19% | 0.08% |
| `/collections/electrical-products` | 0.13% | 0.18% | 0.08% |
| `/collections/i-lite` | 0.12% | 0.17% | 0.08% |
| `…lighting-fixtures?category=Indoor lighting` | 0.12% | 0.21% | 0.11% |
| `…lighting-fixtures?category=Outdoor lighting` | 0.12% | 0.22% | 0.13% |
| `…lighting-fixtures?category=Accessories` | 0.12% | 0.21% | 0.11% |
| `…light-bulbs?category=E27 LED bulbs` | 0.12% | 0.18% | 0.08% |
| `…electrical-products?category=Kitchen electrical appliances` | 0.11% | 0.18% | 0.09% |
| `…i-lite?category=I LITE` | 0.12% | 0.17% | 0.07% |
| `…?category=Indoor lighting&subcategory=Ceiling-mounted lighting` | 0.11% | 0.21% | 0.11% |
| `…?category=Indoor lighting&subcategory=Pendant lights` | 0.12% | 0.21% | 0.11% |
| `…?category=Kitchen electrical appliances&subcategory=Kettles` | 0.12% | 0.18% | 0.09% |
| `/products/kl-gl-001` | 1.17% | 1.35% | 1.10% |
| `/projects` | 1.51% | 1.50% | 0.75% |
| `/checkout` | 0.58% | 0.34% | 0.36% |
| `/about` | 0.35% | 0.21% | 0.21% |
| `/support` | 0.31% | 0.22% | 0.21% |
| `/privacy` | 0.35% | 0.24% | 0.24% |
| `/terms` | 0.33% | 0.23% | 0.22% |
| 404 | 0.00% | 0.00% | 0.01% |

The residual sub-1% differences are subpixel text antialiasing and responsive image
resampling. They do not change layout, copy, crop, or hierarchy.

## Homepage, section by section

`scripts/homepage-sections.mjs` crops each top-level region (header, every
`main > section`, footer) out of both full-page captures and scores it on its own, so a
single broken section cannot hide inside a whole-page average.

Every section's `y` and `height` match the source exactly at 768 and 1440, and within
1px at 375.

| Section | 375 | 768 | 1440 |
|---|---:|---:|---:|
| header | 0.11% | 0.20% | 0.01% |
| hero | 1.60% | 0.74% | 0.38% |
| metrics | 0.00% | 0.00% | 0.00% |
| motif / statement | 0.05% | 0.00% | 0.00% |
| collections | 1.19% | 0.99% | 1.13% |
| visual stories | 0.43% | 0.21% | 0.12% |
| lighting types | 0.00% | 0.00% | 0.46% |
| products | 0.00% | 0.00% | 0.47% |
| marquee | 0.00% | 0.00% | 0.00% |
| featured project | 0.06% | 0.03% | 0.01% |
| contact | 0.00% | 0.00% | 0.02% |
| footer | 0.50% | 0.18% | 0.40% |

The two highest — hero and collections — are large photographic areas, so what remains
is image resampling rather than layout. Everything else is at or near zero.

## Collection route coverage

The source exposes two families of collection route, both under `/collections/<slug>`:

- **Catalog categories** — `decorative`, `interior`, `technical`, `accent`.
  `interior` and `technical` legitimately have no products; the source renders its
  empty state on them, and so does WordPress.
- **Product-map groups** — `lighting-fixtures`, `light-bulbs`, `electrical-products`,
  `i-lite`. These add a category-tab row, and a subcategory-item row once a category
  is selected, driven by `?category=` / `?subcategory=` carrying the English label
  exactly as the source links do.

That is 8 base routes, 19 category views, and 88 subcategory views. The regression
script covers all 8 base routes plus a representative spread of category and
subcategory views across all four groups; the remaining views share the same template
and data path.

## Fixes applied

### Round 1 — routes and information pages

1. **404 was unbuilt** (62–73% difference). It rendered the generic theme header and
   footer plus a bare `<h1>`. The source renders `app/not-found.tsx` directly inside the
   root layout, which carries no site chrome. Rebuilt `404.php` as a standalone
   document plus `assets/css/source-404.css`.
2. **Information hero `h1` stopped at 72px.** The source is
   `text-5xl sm:text-7xl lg:text-[88px]`; the `lg` step was missing.
3. **Information hero grid used the wrong breakpoint.** The source is `py-16 lg:py-24`,
   so 96px padding starts at 1024px; the theme applied it from 640px.
4. **Support contact cards rendered placeholders** — a CSS `content:'+'` badge and a
   `&nearr;` text arrow whose line box made each card 11px too tall. Replaced with the
   source's lucide SVGs and the source `text-xl`/`text-sm` line heights.
5. **Missing inherited line-height.** Tailwind preflight sets `html{line-height:1.5}`,
   which the source inherits wherever a rule does not override it.
6. **Collection cards were 8px short per row** (16.08% at 1440, compounding over six
   rows). `collection-v2-polish.css` overrode the correct 24px card padding back to
   20px and pinned `article{height:600px}` above 1280px — a value calibrated against
   the old wrong padding, which clamped the card below its own content.

### Round 2 — all collection, category, and subcategory routes

7. **Six of the eight collection routes returned 404.** The rewrite maps
   `/collections/<slug>` onto the `kiswani_collection` query var, which WordPress also
   reads as a taxonomy query, so only slugs backed by a real term resolved. The branch
   now clears `is_404` and sends a 200 like the other source routes.
8. **The four product-map group routes did not exist.** Added `kiswani_product_map_*`
   helpers in `inc/catalog.php` reading `data/product-map.json`, group mode in
   `templates/source-collection-v2.php` (group hero kicker and copy, group nav,
   category-tab row, subcategory-item row, breadcrumb chip, scoped grid heading), and
   `assets/css/collection-groups.css`. Product scoping mirrors the source's
   `productMatches()` needles, including its fall back to the unfiltered list when a
   needle matches nothing.
9. **The empty state was always hidden.** The source renders an icon, message, and
   "Clear search" button whenever the scoped list is empty; the theme only had a
   `hidden` paragraph toggled by search. This alone accounted for ~20–33% on the two
   empty categories.
10. **The collection hero gradient was applied twice.** `source-catalog.css` paints it
    on `::before` with an unscoped selector while `collection-v2.css` paints it on
    `::after`, double-darkening the lower half of every collection hero. Neutralised
    the legacy `::before` inside `--v2`.

### Round 3 — shared header, fonts, and the intro

11. **Only the homepage had the rebuilt navbar.** `header-source.php` (every route
    except the front page) still rendered an old simplified header: text-glyph chevrons
    that wrapped onto a second line, nav items bunched to the left, no utility or action
    icons, no mega menu at all, and no mobile drawer. It also never enqueued
    `source-navbar.css` or `header-home-parity.css`, both of which are scoped to
    `.ks-header--home`. The header markup now lives once in
    `template-parts/source-header.php` and its stylesheets in
    `kiswani_source_header_assets()`; the two `header-source*.php` files differ only by
    the cinematic intro. Hash targets resolve through `home_url()` so `#products` and
    `#contact` work from subpages.
12. **Cart button read `CART`;** the source renders `Cart`.
13. **Fonts.** The ten IBM Plex Sans Arabic woff2 files are byte-identical to the
    deployed site's and all ten faces load on both, but two rules were missing.
    The homepage never loaded `source-font-rendering.css`, so it rendered without
    `-webkit-font-smoothing: antialiased` while every other route had it. And neither
    side carried Tailwind preflight's `html{line-height:1.5}`, so any element without
    an explicit line-height inherited the browser's `normal` (~1.2–1.4 for this face)
    instead of 1.5. Both now apply on every source route; computed font family,
    smoothing, weight, size, and line-height match the source exactly.
14. **The intro only played once per session.** The deployed source replays it on every
    homepage render — first visit, reload, and returning from another route — so the
    `sessionStorage` gate was removed. Reduced motion still skips it, which is what
    keeps it out of the visual-regression captures.

### Round 4 — per-element typography

`scripts/typography-parity.mjs` walks every element that owns visible text on both
sites, matches them by text content, and compares font family, size, weight,
line-height, and letter-spacing. It found 28 distinct problems across ~920 matched
elements that the pixel gate could not see, because a mislabelled numeral or a button
at the wrong weight is a few hundred pixels against a whole-page average.

Representative examples: homepage hero scene labels rendering at 13.33px/400 instead of
11px/600 (an unstyled `<small>` default); the product page's "Add to project cart" at
12px instead of 14px; checkout's submit button at 16px/400 instead of 14px/700; product
spec labels and numerals a full weight step light; the price and related-product titles
missing their negative letter-spacing; and the information-page eyebrows at weight 900,
for which no face exists — the browser falls back to 700 and may synthesise the rest.

All measured corrections live in `assets/css/typography-parity.css`. Three points worth
remembering:

- It must print **after** the per-section stylesheets. The header runs before
  `wp_head()`, so anything enqueued there is registered first and would lose; it is
  enqueued on a late `wp_enqueue_scripts` pass (priority 99) instead.
- Some rules are responsive. `.ks-product-specs header h2` and `.ks-related-copy h3`
  step up at the `sm` breakpoint, so applying the desktop value unconditionally broke
  mobile — caught only by re-running the audit at 375.
- `.ks-projects-kicker` is not uniform: the `--bronze` variant is 16px where the others
  are 15px.

A second pass added `text-wrap` to the compared properties and found 15 more, all of
them wrapping mode rather than metrics: nine display headings across the collection,
product, and projects pages were missing the source's `text-balance`, and a few inline
items differed on `nowrap`. The homepage hero was the visible one — identical font size,
identical block height, but greedy wrapping put the line breaks in different places,
which alone was the difference between 2.52% and 0.74% for that section at 768.

Two of those rules needed scoping after over-applying them: only the utility bar's
location item is `nowrap` (the phone and email wrap), and the collection nav pills stop
wrapping only at `sm`.

Result: 0 typography differences at 375, 768, and 1440.

### Harness

15. **Tall pages captured non-deterministically.** The runner resolved lazy images once
    but never waited for the requests that scroll pass started, so a 45-product
    collection could swing between 0.09% and 6.32% on identical markup. `capture()` now
    waits for network idle after the scroll pass and decodes a second time.
16. **Concurrent captures broke the reference.** Source and target were captured with
    `Promise.all`; driving two full-page captures of a tall animation-heavy route at
    once pushed the deployed site into its client-side error view, which then scored
    ~70% against a healthy render. Captures are now sequential.
17. **Error pages were compared silently.** A host error stub scored ~70% and looked
    like a real regression. Captures are now rejected when the rendered text matches a
    known host error page or is shorter than 120 characters.
18. **Whole-page averages hid localized breakage.** A completely wrong 175px header on
    a 6000px page still scored under 1% — which is exactly why the header bug above
    survived a passing suite. Each result now also carries `worstBand`, the worst
    400px-tall horizontal band, so "one region is broken" is visible separately from
    "the whole page drifted slightly".

## Run the approved tests

Pixel comparison and the typography audit answer different questions — the first
catches layout and geometry, the second catches per-element font differences too small
to move a whole-page percentage. Run both.

```powershell
# Homepage, one score per section — catches breakage a page average hides
$env:TARGET_URL = 'http://localhost:8088'
node scripts/homepage-sections.mjs

# Per-element font family / size / weight / line-height / letter-spacing / wrap
$env:W = '1440'   # repeat for 768 and 375; responsive steps only show at the smaller ones
node scripts/typography-parity.mjs

$env:TARGET_URL = 'http://localhost:8088'
node scripts/visual-regression.mjs

# While working on named routes:
$env:VISUAL_ROUTES = 'collection-lighting-fixtures,collection-lf-indoor'
node scripts/visual-regression.mjs
```

Note: the runner compares against the live deployed site, so a DNS or network blip
surfaces as `ERR_NAME_NOT_RESOLVED` errors and inflated percentages for the routes
caught in it. Re-run those routes before treating a failure as real.
