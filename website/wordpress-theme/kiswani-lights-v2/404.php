<?php
/**
 * Source-matched 404 view.
 *
 * The Next.js source renders app/not-found.tsx directly inside the root layout,
 * which carries no header or footer, so this template intentionally skips the
 * site chrome instead of calling get_header()/get_footer().
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<main class="ks-404">
	<div class="ks-404__panel">
		<div class="ks-404__rule"></div>
		<p class="ks-404__eyebrow">404 / Kiswani Lights</p>
		<h1 class="ks-404__title">This light is not in our collection.</h1>
		<p class="ks-404__body">The page may have moved or the product code may be incorrect. Return to the catalog to continue exploring.</p>
		<a class="ks-404__cta" href="<?php echo esc_url( home_url( '/#collections' ) ); ?>">Explore lighting</a>
	</div>
</main>
<?php wp_footer(); ?>
</body>
</html>
