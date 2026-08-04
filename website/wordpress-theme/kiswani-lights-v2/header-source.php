<?php
/** Source-matched public header for the conversion homepage. */
kiswani_enqueue_cart_assets();
wp_enqueue_style( 'kiswani-header-parity', get_stylesheet_directory_uri() . '/assets/css/header-parity.css', array( 'kiswani-source-home' ), '0.1.0' );
wp_enqueue_style( 'kiswani-mobile-header-parity', get_stylesheet_directory_uri() . '/assets/css/mobile-header-parity.css', array( 'kiswani-header-parity' ), '0.1.0' );
wp_enqueue_style( 'kiswani-header-mobile-final', get_stylesheet_directory_uri() . '/assets/css/header-mobile-final.css', array( 'kiswani-mobile-header-parity' ), '0.1.0' );
wp_enqueue_style( 'kiswani-footer-parity-v2', get_stylesheet_directory_uri() . '/assets/css/footer-parity-v2.css', array( 'kiswani-mobile-header-parity' ), '0.1.0' );
wp_enqueue_style( 'kiswani-footer-polish-parity', get_stylesheet_directory_uri() . '/assets/css/footer-polish-parity.css', array( 'kiswani-footer-parity-v2' ), '0.1.0' );
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php wp_head(); ?>
</head>
<body <?php body_class( 'kiswani-source-site' ); ?>>
<?php wp_body_open(); ?>
<header class="ks-header" data-ks-header>
	<div class="ks-utility"><div><a href="tel:+970599671209">+970 599 67 12 09</a><i></i><a href="https://www.google.com/maps/search/?api=1&amp;query=Ramallah%2C+Palestine">Ramallah, Palestine</a><i></i><a class="ks-email" href="mailto:info@kiswanilights.com">info@kiswanilights.com</a></div></div>
	<div class="ks-mainbar"><div class="ks-mainbar__inner">
		<a class="ks-logo" href="#top" aria-label="Kiswani Lights home"><img src="<?php echo esc_url( get_stylesheet_directory_uri() . '/assets/images/kiswani-logo-header-lockup.png' ); ?>" alt="Kiswani Lights"></a>
		<form class="ks-header-search" action="#products"><input aria-label="Search products" placeholder="Search products"><button>SEARCH</button></form>
		<div class="ks-actions"><a class="ks-contact-link" href="#contact">CONTACT</a><label class="ks-language"><span class="screen-reader-text">Select language</span><select aria-label="Select language"><option value="en">EN</option><option value="ar">&#1575;&#1604;&#1593;&#1585;&#1576;&#1610;&#1577;</option><option value="he">&#1506;&#1489;&#1512;&#1497;&#1514;</option></select></label><button class="ks-cart-link" type="button" aria-label="Open shopping cart with 0 items">CART <b>0</b></button><button class="ks-menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="ks-mobile-menu">&#9776;</button></div>
	</div></div>
	<div class="ks-mobile-header-search"><form role="search" action="/#products"><label><span class="screen-reader-text">Search products</span><input name="search" placeholder="Search products"></label><button type="submit">SEARCH</button></form></div>
	<nav class="ks-desktop-nav" aria-label="Product categories"><a href="#products">Products <i>&#9662;</i></a><a href="/collections/lighting-fixtures">Lighting fixtures <i>&#9662;</i></a><a href="/collections/light-bulbs">Light bulbs <i>&#9662;</i></a><a href="/collections/electrical-products">Electrical products <i>&#9662;</i></a><a href="/collections/i-lite">i lite <i>&#9662;</i></a><a href="/projects">Projects</a></nav>
	<aside class="ks-mobile-menu" id="ks-mobile-menu" aria-hidden="true"><button class="ks-menu-close" type="button" aria-label="Close menu">&times;</button><form class="ks-mobile-search" role="search"><label><span class="screen-reader-text">Search products</span><input placeholder="Search products"></label><button type="submit">SEARCH</button></form><a href="#products">Products</a><a href="/collections/lighting-fixtures">Lighting fixtures</a><a href="/collections/light-bulbs">Light bulbs</a><a href="/collections/electrical-products">Electrical products</a><a href="/collections/i-lite">i lite</a><a href="/projects">Projects</a></aside><div class="ks-menu-backdrop" data-ks-close></div>
</header>
