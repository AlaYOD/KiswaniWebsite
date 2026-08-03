# Kiswani Lights WordPress Theme

This theme now runs the deployed Kiswani Next.js app as the public WordPress front end.

## What Changed

- WordPress remains the installable theme, admin area, CMS, custom post types, and Customizer surface.
- Every public WordPress route renders a full-viewport Next.js app shell.
- The current WordPress path and query string are passed to the same path on the Next.js deployment.
- The Next.js app URL is configurable in `Appearance > Customize > Next.js app shell`.
- Existing WordPress product/project CMS code remains available for admin use and future headless integrations.

## Default Next.js App

The theme defaults to:

`https://kiswani-website-82jb.vercel.app`

Change this in the Customizer when the Next.js deployment URL changes or when pointing WordPress to production.

## Recommended Setup

1. Upload the `kiswani-lights` theme folder or `kiswani-lights.zip` to WordPress.
2. Activate `Kiswani Lights`.
3. Go to `Appearance > Customize > Next.js app shell` and confirm the Next.js app URL.
4. Go to `Settings > Permalinks` and save once to refresh public route handling.
5. Visit the WordPress front end; it should display the live Next.js app while the WordPress admin remains available.

## Important Notes

- This is an app-shell integration, not a PHP rewrite of the React/Next application.
- WordPress cannot execute a server-rendered Next.js app by itself; the Next app must remain deployed on Vercel or another Node-compatible host.
- The configured Next.js URL must be publicly accessible and allow iframe embedding. Vercel preview/protected deployments can block embedding with `X-Frame-Options: DENY`.
- If SEO must be served directly from WordPress HTML instead of the Next deployment, the next phase is a deeper reverse-proxy or full PHP theme rebuild, both of which are larger architecture changes.