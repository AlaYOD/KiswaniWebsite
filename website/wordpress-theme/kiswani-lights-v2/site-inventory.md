# Kiswani Next.js → WordPress site inventory

Source audited: `D:\Kiswani\website` (Next.js App Router, Tailwind CSS 4, Framer Motion 12). The project has no `tailwind.config.*`; Tailwind utility classes below are literal strings from the components.

## Routes and WordPress content model

| Next.js route | Source | Content type | WordPress equivalent | Elementor requirement |
|---|---|---|---|---|
| `/` | `app/page.tsx` → `KiswaniExperience` | Static page composition with dynamic product selection | Page set as front page; reusable section widgets | Elementor Free widgets; theme header/footer/drawers |
| `/collections/[slug]` | `CollectionExperience` | Dynamic category/product-map page | `kiswani_collection` hierarchical taxonomy archive | Theme archive + custom Collection widget; **not** a static Elementor page |
| `/products/[slug]` | `ProductExperience` | Dynamic individual product | `kiswani_product` CPT single template | Theme single template + custom Product Detail widget |
| `/projects` | `ProjectsPageExperience`, `ProjectsShowcase` | Repeating project studies | `kiswani_project` CPT archive | Custom Projects widget; Elementor Pro Loop/Theme Builder could assist but is not permitted for essential behavior |
| `/checkout` | `CheckoutExperience` | Dynamic cart/order request | Static WordPress page with custom Checkout widget and REST endpoint | Custom Elementor Free widget + theme cart state |
| `/about` | `InformationPageExperience kind="about"` | Static editorial content | Standard page | Information Page widget/repeater |
| `/support` | `InformationPageExperience kind="support"` | Static editorial content | Standard page | Information Page widget/repeater + contact CTA |
| `/privacy` | `InformationPageExperience kind="privacy"` | Static legal content | Standard page | Information Page widget/repeater |
| `/terms` | `InformationPageExperience kind="terms"` | Static legal content | Standard page | Information Page widget/repeater |
| `/admin`, `/admin/orders` | `AdminOrdersDashboard` | Private operational content | WordPress admin order UI/CPT list | No Elementor page required |
| `/api/orders` | `app/api/orders/route.ts` | Order submission API | Custom REST route | Custom PHP; nonce, sanitization, rate limiting |
| `/api/admin/*` | `app/api/admin/*` | Admin orders API | WordPress capabilities + REST/AJAX | Custom PHP; no front-end Elementor dependency |
| 404 | `app/not-found.tsx` | Static fallback | `404.php` | Theme template |

## Shared shell and reusable components

| Source component | Exact source structure and key literal Tailwind classes | WordPress implementation |
|---|---|---|
| `Header` (`KiswaniExperience.tsx:274`) | `motion.header.sticky.top-0.z-50.shadow-[0_12px_34px_rgba(0,0,0,0.18)]`; yellow contact bar; dark main grid `grid h-[76px] max-w-[1440px] grid-cols-[1fr_auto] ... xl:grid-cols-[250px_minmax(300px,520px)_1fr]`; desktop `nav.flex.h-[52px]`; mega-menu panels `h-[430px]` / `h-[460px]`; mobile off-canvas `motion.aside`. | Theme `header.php`; WordPress menus; custom mega-menu/mobile JS. Elementor Free has no Theme Builder/Nav Menu widget. |
| `LuxuryFooter` (`:1323`) | `footer.relative.overflow-hidden.bg-[#050709].px-4.pb-8.pt-0.text-white.sm:px-8`; animated top rule `h-1`; grid `lg:grid-cols-[1.2fr_0.48fr_0.56fr_0.6fr]`; source logo `kiswani-logo-since-1994.png`; oversized background wordmark. | Theme `footer.php`; Customizer settings + footer menus. |
| `CinematicIntro` | Fixed full-screen `AnimatePresence` overlay; yellow line, logo/title stages, progress bar. Constants: `INTRO_HOLD = 3.25`, `PROGRESS_DURATION = 3.05`. | Theme global intro; custom JS/CSS. No native Elementor equivalent. |
| `CartProvider`, `CartTrigger`, `CartDrawer` | Local-storage cart context; `motion.span` count; overlay `fixed inset-0 z-[90] bg-[#070B0E]/75 backdrop-blur-sm`; drawer `absolute inset-y-0 end-0 ... max-w-lg bg-[#F4F2ED]`; `motion.article layout` cart lines. | Theme global cart/drawer and custom JS. No native Elementor equivalent. |
| `ContactProjectForm`, `ContactProjectDrawer` | Form grid fields; drawer `fixed inset-y-0 right-0 z-[100] w-full max-w-[600px] overflow-y-auto bg-white shadow-[-24px_0_70px_rgba(0,0,0,0.32)]`. | Custom widget + secure REST/form handler. Elementor Pro Forms is an alternative, but not permitted for essential behavior. |
| `BrandButton` | Magnetic `motion.a` with `group relative overflow-hidden`, hover scale `1.015`, tap scale `.98`. | Reusable theme/component class + custom pointer JS. |
| `Media` | `next/image` replacement; source class base `object-cover transition-opacity duration-500`, loaded state `opacity-100`/`opacity-0`. | WordPress responsive image wrapper; CSS transition. |
| `SectionIntro` | Kicker wrapper `mb-5 flex items-center gap-4`; yellow rule `h-[3px] w-14 bg-[#FFDA01]`; title `text-balance text-4xl font-semibold leading-[1.04] tracking-[-0.04em] sm:text-5xl lg:text-6xl`. | Reusable Elementor Free section-intro control group. |

## Homepage components

| Component | Exact structure / classes | WordPress widget |
|---|---|---|
| `Hero` | Full visual hero with scene state; image layer `absolute inset-0`; content `w-full max-w-[810px]`; H1 `text-balance text-5xl font-semibold leading-[0.92] tracking-[-0.06em] text-white sm:text-7xl lg:text-[92px]`; scene nav includes `h-px` active `w-12 bg-[#FFDA01]` and desktop side labels. | Custom Hero widget with repeater of scenes, metrics, links and image fields. |
| `AnimatedMetric` | Scroll count-up metric with index stagger. | Custom Counter widget; Elementor Free lacks a native counter widget. |
| `CategoryCard` | `motion.a.group.block`; image frame `gold-image-corners light-sweep relative aspect-[4/5] overflow-hidden bg-[#070B0E] shadow-[0_22px_70px_rgba(7,11,14,0.16)]`; content `absolute inset-x-0 bottom-0 p-6 sm:p-7`; heading `text-3xl font-semibold leading-tight tracking-[-0.035em] text-white`; pointer 3D tilt. | Collections widget/repeater; custom pointer tilt and reveal JS. |
| `VisualStories` | Main card `gold-image-corners group light-sweep relative min-h-[420px] ... sm:min-h-[540px]`; side cards `min-h-[280px] ... sm:min-h-[340px]`; images `transition-transform duration-[1200ms] ... scale-[1.035]`. | Editorial Stories widget with image/card repeater. |
| `ProductCard` | `motion.article.group flex h-full min-h-[530px] flex-col overflow-hidden border border-[#DEDAD1] bg-white shadow-[0_16px_45px_rgba(15,24,34,0.055)]`; image trigger `relative block aspect-square w-full`; body `flex flex-1 flex-col p-5 sm:p-6`; title `line-clamp-2 h-14 text-xl font-semibold leading-7`; quantity controls `h-11 w-11`; CTA `mt-4 inline-flex min-h-12 w-full ... bg-[#FFDA01]`. | Product Grid/Card custom widget driven by CPT query; must preserve modal-on-home behavior. |
| `ProductModal` | `AnimatePresence`; overlay `fixed inset-0 z-[100] grid place-items-center ... bg-[#050709]/90`; dialog/gallery, thumbnail buttons `relative aspect-[4/3] overflow-hidden border-2`; transitions `y:30`, image scale `1.015`. | Theme global accessible dialog with custom JS; no native Elementor equivalent. |
| `LightingTypes` | Dark `section ... bg-[#070B0E] px-4 py-16 text-white sm:px-8 sm:py-24`; section cards `border-b border-r border-white/10 ... p-6 sm:p-7`; illustrated active fixture and radial light. | Custom Lighting Types widget + Intersection Observer/CSS animation. |
| `WallSconceMotion` / `TrackLightsMotion` | Decorative fixture DOM with staggered `scaleY`, `rotate`, pulsing glow, infinite sway. | Custom non-Elementor decoration module; source-specific CSS/JS required. |
| `FeaturedProjectExperience`, `LightingPortfolioStrip`, `KineticLightSculpture` | `LuxuryEnhancements.tsx`; feature imagery, animated portfolio strip, interactive 3D/pointer-controlled illuminated sculpture. | Three distinct custom widgets. No native Elementor equivalent. |

## Collection, product, project, and information components

| Component | Exact structure / classes | WordPress implementation |
|---|---|---|
| `CollectionExperience` | Hero `bg-[#070B0E] px-4 py-4 text-white sm:px-8 sm:py-8`; shell `max-w-[1440px] ... lg:h-[720px] lg:grid-cols-[0.88fr_1.12fr]`; copy `min-h-[580px] p-8 sm:p-14 lg:p-20`; product grid `mt-16 grid auto-rows-fr gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4`; product map cards `sm:h-44 sm:min-w-[280px]` / `sm:min-w-[310px]`. | Taxonomy archive + custom filter/widget JS using term/product payload. |
| `ProductExperience` | Gallery / summary two-column shell; selected image layer has `opacity:0, scale:1.02` transition duration `.55`; detail panel `p-5 sm:p-8 lg:p-10 xl:p-12`; related grid `mt-8 grid gap-4 md:grid-cols-3`. | `single-kiswani_product.php` + custom Product Detail widget. |
| `ProjectsPageExperience` | Hero, testimonial panel grid `lg:grid-cols-[0.82fr_1.18fr]`, process cards `grid ... md:grid-cols-3`, contact CTA and global shell. | `/projects/` page with custom Project Page widget and CPT query. |
| `ProjectsShowcase` | Category filter buttons `min-h-11 border px-5 text-xs font-bold`; layout grid `mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-12`; project buttons `min-h-[320px] ... md:min-h-[380px]`; modal `fixed inset-0 z-[100] ... bg-[#050709]/90`. | Custom Projects widget with CPT query, filter JS and dialog. Elementor Pro Loop Builder is not allowed as an essential dependency. |
| `InformationPageExperience` | Shared dark hero and section/data model for about/support/privacy/terms; nav links `flex min-h-16 ... border-b border-e border-white/10 px-5 text-xs font-bold`; support CTA title `text-balance text-4xl ... sm:text-6xl`. | One Information Page widget/template with section repeaters. |
| `CheckoutExperience`, `ClientInvoice` | Cart and form state, invoice print area, local-storage cart, POST order action. | Custom Checkout widget + REST handler + printable invoice template. |
| `AdminOrdersDashboard` | Password-unlock state, status filter/update workflow, order detail panel. | Native WordPress admin screen/CPT list or custom admin page; not Elementor. |

## Interaction inventory and Elementor decision matrix

| Interaction | Source implementation | Elementor Pro equivalent | Required implementation for this Elementor Free project |
|---|---|---|---|
| Header mega-menu | React hover/focus state; animated `AnimatePresence` mega panels | Nav Menu (Pro), but source mega layout still needs customization | Theme header + custom JS/CSS |
| Mobile menu / nested category accordions | React state; height `0 → auto`, 0.26s | Nav Menu (Pro) | Theme menu + custom JS/CSS |
| Hero scene selector / parallax | React scene state, `useScroll`, `useTransform` | Slides (Pro) is not source-equivalent | Custom Hero widget + custom JS/CSS |
| Product search / live filtering | React query state filters product array | No direct equivalent | Custom Product Grid / Collection widget + JS |
| Product modal / gallery | `AnimatePresence`, thumbnail state, cart action | Popup (Pro) is not source-equivalent | Theme dialog + custom JS |
| Cart drawer / quantity edits | React context/localStorage, animated drawer | No native equivalent | Theme cart module + custom JS |
| Contact drawer / form | React state, WhatsApp handoff | Forms/Popup (Pro) | Custom secure form widget + drawer JS |
| Collection group/section/item tabs | State and query-string filter selection | Tabs (Pro) has similar basic UI only | Custom Collection widget + filter JS |
| Projects category filters / modal | State filters and layout animation | Tabs/Loop Builder (Pro) do not match modal/layout behavior | Custom Projects widget + JS |
| Testimonial next/previous | React index; image/quote crossfade | Slides (Pro) provides a basic carousel | Custom slider required for source timing/layout |
| Lighting-type illumination | Intersection state plus animated fixture/glow | No direct equivalent | Custom widget + Intersection Observer/CSS |
| Kinetic sculpture / pointer tilt | Pointer position + Framer Motion transforms | No direct equivalent | Custom widget + custom pointer JS |
| Image comparison control | Pointer/keyboard controlled reveal range | No direct equivalent | Custom widget + custom JS; accessible range input |
| Scroll progress / light-beam cursor | Global pointer and scroll state | No direct equivalent | Theme global JS, optional reduced-motion disable |
| Simple FAQ accordion | No dedicated reusable FAQ component in current source | Accordion (Pro) | Elementor Free Accordion can be used only if source FAQ markup is later introduced and matched |

## Elementor Free constraint

The source can be made visually editable with Elementor Free only by registering the custom widgets above. Do **not** rely on Elementor Pro Theme Builder, Nav Menu, Slides, Popup, Forms, Loop Builder, or dynamic tags for essential behavior. Header/footer, archives, single product templates, modals, drawers, filtering, cart, checkout, and source-specific animations must remain in the custom theme/widget layer.
