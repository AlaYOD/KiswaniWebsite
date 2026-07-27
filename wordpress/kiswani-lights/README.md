# Kiswani Lights WordPress Theme

This theme converts the existing Next.js Kiswani Lights website into an editable WordPress CMS theme.

## What Is Editable

- Homepage sections: edit page content with WordPress blocks and the included `Kiswani editable homepage` pattern.
- Header navigation: edit from `Appearance > Menus`.
- Logo: edit from `Appearance > Customize > Site Identity`.
- Products: manage from the `Products` post type.
- Product collections: manage from `Products > Lighting collections`.
- Product specifications: edit native product fields without requiring ACF.
- Projects and content pages: manage as normal WordPress entries/pages.

## Recommended Setup

1. Upload the `kiswani-lights` theme folder or ZIP to WordPress.
2. Activate `Kiswani Lights`.
3. Go to `Settings > Permalinks` and save once to refresh `/products/` and `/collections/` URLs.
4. Create a page named `Home`, insert the `Kiswani editable homepage` pattern, and set it as the homepage in `Settings > Reading`.
5. Add or edit products from `Products`.

## CMS Model

Products support:

- Product title, excerpt, body content, featured image
- Lighting collection taxonomy
- Model / SKU
- Arabic name and Arabic short description
- Wattage, voltage, lumen output, CCT, beam angle, CRI, IP rating
- Finish, dimensions, installation type, availability
- Datasheet URL and WhatsApp inquiry text

Empty specification fields are hidden on product pages.

## Notes

- The theme uses native WordPress APIs and does not require ACF, Elementor, or WooCommerce.
- If ecommerce checkout is needed later, add WooCommerce as a second phase and map `kiswani_product` content into products or keep this catalog as inquiry-first.
- The included seed content runs only when the theme is activated and no products exist.
