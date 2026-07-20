# Kiswani Lights 2026 brand system

## Source and accuracy

This reference summarizes `Kiswani Guidelines 2026.pdf` (25 pages). Pantone names are authoritative. Hex values are digital approximations sampled from the PDF's rendered artwork and should be confirmed against original design files before color-critical production or printing.

## Core identity

- Brand name: Kiswani Lights / كسواني للإنارة
- Brand idea: lighting is the soul of a space, not merely decoration.
- Logo idea: an angular `K` monogram integrates a lightning bolt. Its descending diagonal tail suggests electrical energy, speed, direction, and illumination.
- Lockups: use the approved vertical or horizontal bilingual Arabic-English lockup.
- Personality: precise, architectural, energetic, premium, contemporary, and practical.

## Digital color palette

Use the compact core set for most interfaces. Keep the wider Pantone ramp available for campaigns and controlled variants.

| Role | Source name | Approximate hex | Recommended digital use |
|---|---|---:|---|
| Primary brand yellow | Applied artwork yellow | `#FFDA01` | Primary emphasis, active states, rules, highlights |
| Yellow ramp 1 | Yellow C | `#FCDC00` | Alternate campaign yellow |
| Yellow ramp 2 | Yellow 012 C | `#FFD600` | Bright secondary yellow |
| Yellow ramp 3 | Yellow 109 C | `#FFD100` | Product/category accent |
| Yellow ramp 4 | Yellow 7548 C | `#FFC600` | Warm highlight |
| Warm accent | Yellow 137 C | `#FFA300` | Sparing warm accent, never a default text color |
| Pale neutral | Cool Gray 2 C | `#CCCFCE` | Dividers, disabled surfaces, quiet backgrounds |
| Mid neutral | Cool Gray 6 C | `#A3A7AA` | Secondary text, logo reference tone, icons |
| Strong neutral | Cool Gray 9 C | `#73787C` | Supporting UI and borders |
| Graphite | Cool Gray 11 C | `#50555B` | Secondary dark panels |
| Warm black | Black 3 C | `#1E2722` | Deep warm editorial surfaces |
| Primary ink | Black 6 C | `#0F1822` | Main text, navigation, dark backgrounds |
| Canvas | White | `#FFFFFF` | Primary background and framed content |

Prefer this semantic token set:

```css
:root {
  --kiswani-yellow: #ffda01;
  --kiswani-yellow-warm: #ffa300;
  --kiswani-ink: #0f1822;
  --kiswani-graphite: #50555b;
  --kiswani-muted: #a3a7aa;
  --kiswani-line: #cccfce;
  --kiswani-canvas: #ffffff;
}
```

### Contrast rules

- Set normal text on yellow in `#0F1822` or black.
- Set white or yellow text on `#0F1822` for dark editorial sections.
- Use gray for supporting text only after checking contrast at the intended size and weight.
- Never communicate availability, selection, or errors by color alone.

## Typography

- Use IBM Plex Sans Arabic for both Arabic and English.
- Use ExtraLight or Light only for large display copy with ample contrast.
- Use Regular for body text and product descriptions.
- Use Medium or Semibold for navigation, filters, labels, and subheads.
- Use Bold for concise campaign headlines and major section titles.
- Preserve true Arabic shaping and RTL flow. Do not simulate Arabic with reversed strings or forced letter spacing.
- Keep English headings compact and architectural; use uppercase selectively, as shown in the guide.

## Logo rules

- Preserve the vertical and horizontal construction grids shown on pages 3-8.
- Preserve the one-`X` clear-space perimeter demonstrated on pages 4 and 7.
- Scale proportionally and verify legibility at every responsive breakpoint.
- Prefer the horizontal lockup in wide headers and the vertical lockup in centered, square, or tall placements.
- Use one-color dark marks on yellow or pale backgrounds and one-color white marks on dark or warm-yellow backgrounds only as demonstrated in the guide.
- Obtain the original SVG, AI, EPS, or transparent PNG before production. Do not recreate the logo from text or trace a screenshot.

The guide prohibits stretching, distortion, recoloring, effects, reflection, rotation, element removal, reconfiguration, similar-value backgrounds, cropping, outline-only treatment, and added strokes.

## Graphic language

- Use thin outlined icons based on lighting products: pendants, bulbs, chandeliers, spotlights, floor lamps, wall lamps, garden fixtures, and technical lights.
- Combine yellow with charcoal, gray, or white strokes. Keep line weight and corner treatment consistent.
- Use generous white space and strong horizontal yellow or dark bands.
- Use white rounded rectangular frames and copy cards over lifestyle photography, echoing the social-media theme.
- Use short yellow rules as anchors for headings or card content.
- Use dark lower bands for logo and contact details when appropriate.

## Photography direction

- Show real or photorealistic fixtures installed in believable interiors and architectural settings.
- Prioritize warm pools of light, material texture, dining and living spaces, and visible fixture detail.
- Keep compositions clean enough for Arabic or English copy overlays.
- Avoid clipped products, impossible light behavior, unrelated decorative objects, excessive filters, and generic stock imagery that hides the fixture.

## Approved copy cues

- English: “Lighting isn’t just a decorative piece; lighting is the soul of the space.”
- Arabic: “الإضاءة مش بس قطعة ديكور، الإضاءة هي روح المكان”

Treat these as tone references. Verify final campaign wording and punctuation with the content owner.
