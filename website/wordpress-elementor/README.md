# Kiswani Elementor WordPress Package

This folder contains the installable WordPress/Elementor conversion package for the Kiswani Lights Next.js website.

## Installable ZIPs

- `hello-kiswani-child.zip` - Hello Elementor child theme with Kiswani fonts, global CSS, responsive header/footer styling, cart JavaScript, and checkout behavior.
- `kiswani-elementor-core.zip` - Core plugin with products, collections, orders, seed data, REST endpoints, and Kiswani Elementor widgets.

## Required WordPress Plugins

- Elementor - visual page editing.
- Elementor Pro - Theme Builder header/footer/single/archive templates.
- Optional SEO plugin such as Rank Math or Yoast SEO for editable titles, descriptions, sitemap, Open Graph, and canonical controls.
- Optional cache/image optimizer after visual QA is complete.

## Kiswani Elementor Widgets

Create Elementor templates with these widgets under the `Kiswani Lights` category:

- `Kiswani Header` - global sticky header, desktop mega menus, mobile menu with all collections/categories closed by default.
- `Kiswani Home Sections` - homepage hero, metrics, collections, featured products, and contact band.
- `Kiswani Collection Page` - collection archive hero, product-map tabs, subcategory tabs, default all-products display, collection search, and mobile list product cards.
- `Kiswani Product Grid` - reusable product grid/list block.
- `Kiswani Product Detail` - product single page gallery, price, specs, datasheet, cart, and WhatsApp actions.
- `Kiswani Checkout` - cart summary, customer form, WordPress order save, and WhatsApp handoff.
- `Kiswani Admin Orders` - front-end admin workspace guarded by WordPress administrator login.
- `Kiswani Footer` - global footer matching the dark Kiswani footer structure.

## Elementor Template Map

- Header template: add only `Kiswani Header`, display on entire site.
- Footer template: add only `Kiswani Footer`, display on entire site.
- Homepage page: add `Kiswani Home Sections`.
- Collection archive template for `kiswani_collection`: add `Kiswani Collection Page`.
- Product single template for `kiswani_product`: add `Kiswani Product Detail`.
- Checkout page at `/checkout/`: add `Kiswani Checkout`.
- Admin page at `/admin/` or another private page: add `Kiswani Admin Orders`.

## Content Editing

- Products: WordPress Admin -> Products.
- Collections/categories/subcategories: WordPress Admin -> Products -> Collections.
- Product images: product featured image.
- Product price/code/specs: custom fields registered by `Kiswani Elementor Core`.
- Orders: WordPress Admin -> Orders or the front-end admin page.
- Header/footer placement and page sections: Elementor Theme Builder and Elementor page editor.

## Current QA Status

- PHP lint passed in the local WordPress Docker container for the child theme and plugin.
- Full Elementor runtime visual-diff QA is still required after installing Elementor/Elementor Pro and building the templates in a WordPress site.
- Pixel-perfect approval requires screenshots against the Next.js site at 1920, 1440, 1366, 1024, 768, 480, 390, and 360px.
