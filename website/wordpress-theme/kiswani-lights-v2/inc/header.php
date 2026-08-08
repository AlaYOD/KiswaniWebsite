<?php
/**
 * Shared asset registration for the source-matched public header.
 *
 * Every source route renders the same header markup
 * (template-parts/source-header.php), so they all need the same stylesheets.
 * Loading only a subset leaves the navigation unstyled — the mega-menu rules and
 * the header layout live in source-navbar.css and header-home-parity.css.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function kiswani_source_header_assets() {
	kiswani_enqueue_cart_assets();

	$css = get_stylesheet_directory_uri() . '/assets/css/';

	wp_enqueue_style( 'kiswani-header-parity', $css . 'header-parity.css', array( 'kiswani-source-home' ), '0.1.0' );
	wp_enqueue_style( 'kiswani-mobile-header-parity', $css . 'mobile-header-parity.css', array( 'kiswani-header-parity' ), '0.1.0' );
	wp_enqueue_style( 'kiswani-header-mobile-final', $css . 'header-mobile-final.css', array( 'kiswani-mobile-header-parity' ), '0.1.0' );
	wp_enqueue_style( 'kiswani-header-home-parity', $css . 'header-home-parity.css', array( 'kiswani-header-mobile-final' ), '0.1.0' );
	wp_enqueue_style( 'kiswani-source-navbar', $css . 'source-navbar.css', array( 'kiswani-header-home-parity' ), '0.8.1' );
	wp_enqueue_style( 'kiswani-footer-parity-v2', $css . 'footer-parity-v2.css', array( 'kiswani-source-navbar' ), '0.1.0' );
	wp_enqueue_style( 'kiswani-footer-polish-parity', $css . 'footer-polish-parity.css', array( 'kiswani-footer-parity-v2' ), '0.1.0' );

	// Font stack, smoothing, and inherited line-height. The source applies these
	// on every route, so this belongs to the shared header rather than to the
	// non-homepage template it used to live in.
	wp_enqueue_style( 'kiswani-source-font-rendering', $css . 'source-font-rendering.css', array( 'kiswani-footer-polish-parity' ), '0.1.1' );
}

/**
 * Measured per-element font size/weight/line-height corrections.
 *
 * Enqueued on a late wp_enqueue_scripts pass rather than alongside the header
 * styles: the header runs before wp_head(), so the per-section stylesheets are
 * registered afterwards and would otherwise print later and win.
 */
function kiswani_typography_parity_assets() {
	if ( ! wp_style_is( 'kiswani-header-parity', 'enqueued' ) ) {
		return;
	}

	wp_enqueue_style( 'kiswani-typography-parity', get_stylesheet_directory_uri() . '/assets/css/typography-parity.css', array(), '0.1.0' );
}
add_action( 'wp_enqueue_scripts', 'kiswani_typography_parity_assets', 99 );
