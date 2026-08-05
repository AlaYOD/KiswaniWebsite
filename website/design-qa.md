# Homepage Design QA

## Comparison target

- Source visual truth: `https://kiswani-website-82jb.vercel.app/` plus the local authoritative Next.js components in `components/KiswaniExperience.tsx`, `components/LuxuryEnhancements.tsx`, and `components/CinematicIntro.tsx`.
- Supplied HTML reference: `D:\Kiswani\PagesCodes\homePageCode.html` (0 bytes at final check, so it contained no additional visual information).
- Implementation: `http://localhost:8088/` using `wordpress-theme/kiswani-lights-v2`.
- State: English, homepage, first-load intro tested separately, reduced-motion static captures for deterministic full-page comparison, and normal-motion behavior tested separately.
- Density normalization: all source and implementation captures used deviceScaleFactor 1 and equal CSS/pixel widths; no resampling was used for pixelmatch. Side-by-side JPEGs are review previews only.

## Viewports and rendered evidence

| CSS viewport | Source and target pixel dimensions | Full-page difference | Source capture | Implementation capture | Combined comparison |
| --- | --- | ---: | --- | --- | --- |
| 375 x 812 | 375 x 15494, DPR 1 | 0.5083% | `output/playwright/visual-regression/2026-08-05T09-39-18-438Z/home-375-source.png` | `output/playwright/visual-regression/2026-08-05T09-39-18-438Z/home-375-target.png` | `output/playwright/visual-regression/2026-08-05T09-39-18-438Z/home-375-pair.jpg` |
| 768 x 1024 | 768 x 10247, DPR 1 | 0.5112% | `output/playwright/visual-regression/2026-08-05T09-39-18-438Z/home-768-source.png` | `output/playwright/visual-regression/2026-08-05T09-39-18-438Z/home-768-target.png` | `output/playwright/visual-regression/2026-08-05T09-39-18-438Z/home-768-pair.jpg` |
| 1440 x 900 | 1440 x 8074, DPR 1 | 0.5957% | `output/playwright/visual-regression/2026-08-05T09-39-18-438Z/home-1440-source.png` | `output/playwright/visual-regression/2026-08-05T09-39-18-438Z/home-1440-target.png` | `output/playwright/visual-regression/2026-08-05T09-39-18-438Z/home-1440-pair.jpg` |

All three homepage comparisons passed the 2% gate. The wider regression script also visits routes outside the requested homepage; those unrelated results are not part of this QA result.

## Focused visual evidence

The full page is too tall for detailed typography and crop inspection in one image, so focused source/implementation pairs were reviewed together:

- Desktop top, middle, products, and bottom: `output/playwright/visual-regression/2026-08-05T07-30-44-334Z/qa-*-pair-small.jpg`.
- Mobile top, stories/types, product grid, and lower page: `output/playwright/visual-regression/2026-08-05T07-30-44-334Z/qa-mobile-*-pair-small.jpg`.
- Product modal: `output/playwright/home-state-qa-final/product-modal-pair.jpg` at 375 x 812, DPR 1.
- Contact drawer after focus fix: `output/playwright/home-state-qa-final/contact-drawer-pair.jpg` at 375 x 812, DPR 1.
- Cinematic intro: `output/playwright/home-state-qa-final/intro-pair.jpg` at 375 x 812, DPR 1.

## Section-level results

| Section | 375 | 768 | 1440 |
| --- | ---: | ---: | ---: |
| Header | 0.106% | 0.200% | 0.374% |
| Hero | 1.730% | 2.517% | 2.193% |
| Metrics | 0.000% | 0.000% | 0.000% |
| Motif | 0.748% | 0.810% | 0.529% |
| Statement | 0.045% | 0.000% | 0.000% |
| Collections | 1.678% | 1.394% | 1.381% |
| Stories | 0.582% | 0.292% | 0.123% |
| Lighting types | 0.000% | 0.000% | 0.456% |
| Products | 0.210% | 0.191% | 0.586% |
| Marquee | 0.917% | 1.624% | 1.916% |
| Featured project | 0.064% | 0.061% | 0.035% |
| Contact | 0.003% | 0.070% | 0.019% |
| Footer | 0.504% | 0.196% | 0.405% |

The slightly higher isolated hero percentages are limited to image rasterization and antialiasing; layout, copy, crop, and geometry match in the combined visual review, while the complete pages remain near 0.5% difference.

## Navbar state QA

The navbar was also compared as a focused component across its closed and interactive states. Every capture used equal source/implementation CSS and pixel dimensions, deviceScaleFactor 1, reduced motion for deterministic state comparison, and no resampling before pixelmatch.

| State | Viewport and pixels | Compared region | Difference | Combined comparison |
| --- | --- | --- | ---: | --- |
| Desktop closed | 1440 x 900, DPR 1 | Header y0-164 | 0.556% | `output/playwright/navbar-qa-2026-08-05-final-passed/pair-desktop-closed.jpg` |
| Desktop Products mega menu | 1440 x 900, DPR 1 | Mega panel y164-594 | 1.068% | `output/playwright/navbar-qa-2026-08-05-final-passed/pair-desktop-products.jpg` |
| Desktop Lighting fixtures mega menu | 1440 x 900, DPR 1 | Mega panel y164-624 | 0.436% | `output/playwright/navbar-qa-2026-08-05-final-passed/pair-desktop-lighting-fixtures.jpg` |
| Mobile drawer | 375 x 812, DPR 1 | Full viewport | 0.353% | `output/playwright/navbar-qa-2026-08-05-final-passed/pair-mobile-menu.jpg` |
| Mobile Products expanded | 375 x 812, DPR 1 | Full viewport | 0.928% | `output/playwright/navbar-qa-2026-08-05-final-passed/pair-mobile-products.jpg` |

Focused navbar regions were measured separately because the full screenshots make small UI text difficult to judge:

- Desktop Products: intro 2.309%, real-source card imagery 0.145%, and card copy 1.089%.
- Desktop Lighting fixtures: intro 0.842%, section imagery 0.116%, and section copy 0.275%.
- Mobile: drawer 0.384% closed and 1.009% with Products expanded; backdrop 0.000% in both states.
- Computed source/implementation geometry matches for the 1440px container, 32px gutters, 52px desktop nav, 430px/460px mega panels, group-specific rail tracks, 345px mobile drawer, 72px drawer header, 591px scroll body, 149px footer, and 1017px expanded Products panel.

## Required fidelity surfaces

- Fonts and typography: display/body families, weights, sizes, line heights, tracking, wrapping, hierarchy, and labels match across desktop, tablet, and mobile. Residual glyph-edge differences are expected browser antialiasing.
- Spacing and layout rhythm: section order, widths, grids, card heights, 24px desktop product-card padding, gaps, dividers, radii, and vertical rhythm match. No clipping, overlap, or horizontal overflow was observed.
- Colors and visual tokens: Kiswani black, warm white, gray scale, yellow accent, borders, overlays, and shadows match the source tokens.
- Image quality and asset fidelity: the real source logo, editorial photography, product images, crops, object positions, and responsive sizing are used. No placeholder or custom replacement art was introduced.
- Copy and content: headings, labels, metrics, product data, specifications, calls to action, contact copy, and footer content match the source.
- Icons and affordances: source-equivalent stroke icons, button sizes, hover/focus treatment, modal controls, and drawer controls are present and aligned.
- Accessibility and resilience: semantic controls, labels, keyboard Escape behavior, focus treatment, reduced motion, tap targets, responsive layouts, and text wrapping were verified.

## Findings

- No actionable P0, P1, or P2 homepage mismatches remain.
- P3/expected: subpixel text antialiasing and responsive image resampling account for the remaining 0.5083%-0.5957% full-page pixel difference. These do not change hierarchy, spacing, crop, content, or usability.

## Comparison history

1. [P2] Desktop product rows were 16px shorter across two rows because card content used 20px padding instead of the source's 24px desktop padding.
   - Fix: set `.ks-product-card__content` to 24px at the desktop/tablet breakpoint in `assets/css/source-home-products.css`.
   - Post-fix evidence: products measure 0.210%, 0.191%, and 0.586% difference at 375, 768, and 1440; full-page captures are equal in height and pass at every viewport.
2. [P2] The contact drawer initially focused the backdrop, so the source's yellow close-button focus ring was missing.
   - Fix: focus `.ks-contact-drawer__header [data-ks-contact-close]` when the drawer opens.
   - Post-fix evidence: `output/playwright/home-state-qa-final/contact-drawer-pair.jpg`; interaction and browser-error tests pass.
3. [P1] The WordPress navbar only exposed plain desktop links and a simplified mobile list, while the source included four data-backed desktop mega menus and a full mobile accordion drawer.
   - Fix: added the source product-map dataset, source-equivalent desktop/mobile markup, real editorial assets, hover/focus/Escape state management, accordion behavior, backdrop/body locking, ARIA state updates, and responsive styling.
   - Post-fix evidence: all five combined navbar comparisons in `output/playwright/navbar-qa-2026-08-05-final-passed/`; all state differences are 1.068% or lower.
4. [P2] Initial desktop group rails used generic 320px cards rather than the source's content-derived tracks, and mobile Products cards produced an eight-pixel panel-height drift.
   - Fix: matched the measured source tracks for Lighting fixtures, Light bulbs, Electrical products, and i lite; aligned title/count/row typography, dividers, arrows, padding, and the 1017px mobile Products stack.
   - Post-fix evidence: Lighting fixtures mega panel 0.436%, mobile drawer 0.353%, and mobile Products expanded 0.928%.

## Primary interactions tested

- Cinematic intro first visit, Escape dismissal, session persistence, and no-repeat behavior.
- Hero scene switching, parallax, staggered reveal, metric counters, fixture illumination, marquee motion, card tilt, and reduced-motion behavior.
- Mobile drawer open/close, backdrop/body locking, Products accordion expansion, one-panel state, ARIA updates, and Escape behavior.
- Desktop Products and Lighting fixtures mega-menu hover switching, expanded ARIA state, panel visibility, and Escape behavior.
- Header and product search by name, category, and code, including empty state and clear action.
- Product modal, four image views, quantity total, close behavior, add to cart, cart badge, and cart drawer.
- Featured-project before/after slider and color-temperature controls.
- Contact drawer, hash opening, form submission preparation, WhatsApp URL, success state, focus ring, Escape close, and hash cleanup.
- Console errors: none. Page errors: none.

## Implementation checklist

- [x] Source and WordPress captures compared together at mobile, tablet, and desktop.
- [x] Focused comparisons reviewed for typography, spacing, colors, imagery, copy, icons, and interaction states.
- [x] All P0/P1/P2 findings fixed and recaptured.
- [x] Motion, interactions, JavaScript syntax, PHP syntax, and whitespace checks passed.
- [x] Browser console and page errors are empty.

final result: passed
