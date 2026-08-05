<?php
/**
 * Kiswani Lights local test theme bootstrap.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once get_template_directory() . '/inc/catalog.php';
require_once get_template_directory() . '/inc/cart.php';
require_once get_template_directory() . '/inc/information.php';
require_once get_template_directory() . '/inc/projects.php';
require_once get_template_directory() . '/inc/orders.php';
require_once get_template_directory() . '/inc/source-routes.php';

function kiswani_lights_setup() {
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'align-wide' );
	add_theme_support( 'responsive-embeds' );

	register_nav_menus(
		array(
			'primary' => __( 'Primary Navigation', 'kiswani-lights' ),
		)
	);
}
add_action( 'after_setup_theme', 'kiswani_lights_setup' );

function kiswani_lights_assets() {
	wp_enqueue_style( 'kiswani-lights', get_stylesheet_uri(), array(), wp_get_theme()->get( 'Version' ) );
}
add_action( 'wp_enqueue_scripts', 'kiswani_lights_assets' );

function kiswani_source_home_assets() {
	if ( ! is_front_page() ) {
		return;
	}

	wp_enqueue_style( 'kiswani-source-home', get_stylesheet_directory_uri() . '/assets/css/source-home.css', array( 'kiswani-lights' ), '0.1.1' );
	wp_enqueue_style( 'kiswani-source-fonts', get_stylesheet_directory_uri() . '/assets/css/fonts.css', array( 'kiswani-source-home' ), '0.1.0' );
	wp_enqueue_style( 'kiswani-source-home-fidelity', get_stylesheet_directory_uri() . '/assets/css/source-home-fidelity.css', array( 'kiswani-source-fonts' ), '0.1.0' );
	wp_enqueue_style( 'kiswani-source-home-collections', get_stylesheet_directory_uri() . '/assets/css/source-home-collections.css', array( 'kiswani-source-home-fidelity' ), '0.1.1' );
	wp_enqueue_style( 'kiswani-source-home-stories', get_stylesheet_directory_uri() . '/assets/css/source-home-stories.css', array( 'kiswani-source-home-collections' ), '0.1.0' );
	wp_enqueue_style( 'kiswani-source-home-types', get_stylesheet_directory_uri() . '/assets/css/source-home-types.css', array( 'kiswani-source-home-stories' ), '0.1.0' );
	wp_enqueue_style( 'kiswani-source-home-products', get_stylesheet_directory_uri() . '/assets/css/source-home-products.css', array( 'kiswani-source-home-types' ), '0.1.1' );
	wp_enqueue_style( 'kiswani-source-home-marquee', get_stylesheet_directory_uri() . '/assets/css/source-home-marquee.css', array( 'kiswani-source-home-products' ), '0.1.1' );
	wp_enqueue_style( 'kiswani-source-home-project', get_stylesheet_directory_uri() . '/assets/css/source-home-project.css', array( 'kiswani-source-home-marquee' ), '0.1.0' );
	wp_enqueue_style( 'kiswani-source-home-contact', get_stylesheet_directory_uri() . '/assets/css/source-home-contact.css', array( 'kiswani-source-home-project' ), '0.1.1' );
	wp_enqueue_style( 'kiswani-source-home-motion', get_stylesheet_directory_uri() . '/assets/css/source-home-motion.css', array( 'kiswani-source-home-contact' ), '0.1.1' );
	wp_enqueue_script( 'kiswani-source-home', get_stylesheet_directory_uri() . '/assets/js/source-home.js', array(), '0.3.1', true );
	wp_enqueue_script( 'kiswani-source-home-project', get_stylesheet_directory_uri() . '/assets/js/source-home-project.js', array( 'kiswani-source-home' ), '0.1.0', true );
	wp_add_inline_script( 'kiswani-source-home', 'window.ksThemeUri = ' . wp_json_encode( get_stylesheet_directory_uri() ) . ';', 'before' );
}
add_action( 'wp_enqueue_scripts', 'kiswani_source_home_assets' );
