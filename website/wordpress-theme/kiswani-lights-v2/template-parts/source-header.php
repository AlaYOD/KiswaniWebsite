<?php
/**
 * Source-matched public header, shared by every source route.
 *
 * The `ks-header--home` modifier is the hook the header layout and mega-menu
 * stylesheets are written against. It is not homepage-only styling: the source
 * renders one Header component on every route, so the modifier stays on all of
 * them. Hash targets are resolved against home_url() so anchors such as
 * #products and #contact work from subpages too.
 *
 * @package Kiswani_Lights
 */

defined( 'ABSPATH' ) || exit;

$theme_image_uri   = get_stylesheet_directory_uri() . '/assets/images/';
$source_nav_path   = get_stylesheet_directory() . '/data/product-map.json';
$source_nav_groups = file_exists( $source_nav_path ) ? json_decode( file_get_contents( $source_nav_path ), true ) : array(); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
$source_nav_groups = is_array( $source_nav_groups ) ? $source_nav_groups : array();

$source_nav_asset = static function ( $path ) use ( $theme_image_uri ) {
	$path = preg_replace( '#^/images/#', '', (string) $path );
	return $theme_image_uri . ltrim( $path, '/' );
};

$source_nav_href = static function ( $group, $section = null, $item = null ) {
	$query = array();
	if ( is_array( $section ) && ! empty( $section['id'] ) ) {
		$query['category'] = $section['id'];
	}
	if ( is_array( $item ) && ! empty( $item['id'] ) ) {
		$query['subcategory'] = $item['id'];
	}
	$url = home_url( '/collections/' . sanitize_title( $group['id'] ?? '' ) . '/' );
	return $query ? add_query_arg( $query, $url ) : $url;
};
?>
<header class="ks-header ks-header--home" data-ks-header>
	<div class="ks-utility">
		<div class="ks-utility__inner">
			<div class="ks-utility__links">
				<a href="tel:+970599671209" aria-label="Call Kiswani Lights">
					<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.84.56 2.8.69A2 2 0 0 1 22 16.92Z"/></svg>
					<span dir="ltr">+970 599 67 12 09</span>
				</a>
				<i aria-hidden="true"></i>
				<a href="https://www.google.com/maps/search/?api=1&amp;query=Ramallah%2C+Palestine" target="_blank" rel="noreferrer" aria-label="View Kiswani location on Google Maps">
					<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
					<span>Ramallah, Palestine</span>
				</a>
				<i class="ks-utility__desktop" aria-hidden="true"></i>
				<a class="ks-email" href="mailto:info@kiswanilights.com" aria-label="Email Kiswani Lights">
					<svg viewBox="0 0 24 24" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
					<span>info@kiswanilights.com</span>
				</a>
			</div>
		</div>
	</div>

	<div class="ks-mainbar">
		<div class="ks-mainbar__inner">
			<a class="ks-logo" href="<?php echo esc_url( home_url( '/#top' ) ); ?>" aria-label="Kiswani Lights home"><img src="<?php echo esc_url( $theme_image_uri . 'kiswani-logo-header-lockup.png' ); ?>" alt="Kiswani Lights"></a>

			<form class="ks-header-search" action="<?php echo esc_url( home_url( '/#products' ) ); ?>" role="search">
				<label><span class="screen-reader-text">Search products</span><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg><input name="search" placeholder="Search products"></label>
				<button type="submit">SEARCH</button>
			</form>

			<div class="ks-actions">
				<a class="ks-contact-link" href="<?php echo esc_url( home_url( '/#contact' ) ); ?>">CONTACT</a>
				<label class="ks-language"><span class="screen-reader-text">Select language</span><select aria-label="Select language"><option value="en">EN</option><option value="ar">&#1575;&#1604;&#1593;&#1585;&#1576;&#1610;&#1577;</option><option value="he">&#1506;&#1489;&#1512;&#1497;&#1514;</option></select><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></label>
				<button class="ks-cart-link" type="button" aria-label="Open shopping cart with 0 items"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18M16 10a4 4 0 0 1-8 0"/></svg><span>Cart</span><b hidden>0</b></button>
				<button class="ks-menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-navigation"><svg data-ks-menu-open-icon viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg><svg data-ks-menu-close-icon viewBox="0 0 24 24" aria-hidden="true" hidden><path d="M6 6l12 12M18 6 6 18"/></svg></button>
			</div>
		</div>
	</div>

	<div class="ks-mobile-header-search">
		<form role="search" action="<?php echo esc_url( home_url( '/#products' ) ); ?>"><label><span class="screen-reader-text">Search products</span><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg><input name="search" placeholder="Search products"></label><button type="submit">SEARCH</button></form>
	</div>

	<?php require get_stylesheet_directory() . '/template-parts/source-navbar.php'; ?>
</header>
