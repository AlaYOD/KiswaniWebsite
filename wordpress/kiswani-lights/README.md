# Kiswani Lights WordPress Theme

This is a native WordPress theme for deploying the Kiswani Lights website on a standard WordPress host.

## What It Includes

- Native WordPress homepage, catalog archive, collection/category pages, product detail pages, search, 404, and generic content templates.
- Local theme assets copied from the Next.js site: product images, editorial images, logos, and datasheet PDFs.
- Custom post type: `Products`.
- Hierarchical taxonomy: `Lighting collections`, used for collections, categories, and subcategories.
- Automatic catalog seed for the prepared Kiswani product catalog.
- Front-end Catalog Manager page at `/catalog-manager/` for WordPress administrators.

## Catalog Manager

Open:

`/catalog-manager/`

Log in with the WordPress administrator/super user username and password. The manager lets administrators:

- Add products.
- Edit existing products.
- Upload product images.
- Set SKU, price, descriptions, and specifications.
- Assign products to collections, categories, and subcategories.
- Create or edit collection/category/subcategory terms.
- Import the default catalog if the WordPress product list is empty.

## Deployment

1. Upload `kiswani-lights.zip` in `Appearance > Themes > Add New > Upload Theme`.
2. Activate `Kiswani Lights`.
3. Visit `Settings > Permalinks` and click `Save Changes` once if routes need refreshing.
4. Open `/catalog-manager/` and log in as a WordPress administrator.
5. Confirm products and collections are present. If not, use `Import catalog`.

## Notes

- This version does not use an iframe and does not require Vercel or a Node.js server.
- WordPress is the runtime. Products and categories can be managed from WordPress.
- The prepared static catalog remains bundled so a fresh WordPress install has Kiswani content immediately.