<?php
/** Source-compatible public URL routing for the editable catalog. */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function kiswani_source_route_rules() {
	add_rewrite_tag( '%kiswani_collection%', '([^&]+)' );
	add_rewrite_tag( '%kiswani_product%', '([^&]+)' );
	add_rewrite_tag( '%kiswani_special%', '([^&]+)' );
	add_rewrite_rule( '^collections/([^/]+)/?$', 'index.php?kiswani_collection=$matches[1]', 'top' );
	add_rewrite_rule( '^products/([^/]+)/?$', 'index.php?kiswani_product=$matches[1]', 'top' );
	add_rewrite_rule( '^projects/?$', 'index.php?kiswani_special=projects', 'top' );
	add_rewrite_rule( '^checkout/?$', 'index.php?kiswani_special=checkout', 'top' );
}
add_action( 'init', 'kiswani_source_route_rules' );

function kiswani_source_route_query_vars( $vars ) {
	$vars[] = 'kiswani_collection';
	$vars[] = 'kiswani_product';
	$vars[] = 'kiswani_special';
	return $vars;
}
add_filter( 'query_vars', 'kiswani_source_route_query_vars' );

function kiswani_source_route_template( $template ) {
	$special = sanitize_key( (string) get_query_var( 'kiswani_special' ) );
	if ( 'checkout' === $special ) {
		global $wp_query;
		$wp_query->is_404 = false;
		status_header( 200 );
		wp_enqueue_style( 'kiswani-source-home', get_template_directory_uri() . '/assets/css/source-home.css', array( 'kiswani-lights' ), '0.1.2' );
		wp_enqueue_style( 'kiswani-source-fonts', get_template_directory_uri() . '/assets/css/fonts.css', array( 'kiswani-source-home' ), '0.1.0' );
		wp_enqueue_style( 'kiswani-source-checkout', get_template_directory_uri() . '/assets/css/source-checkout.css', array( 'kiswani-source-fonts' ), '0.1.0' );
		wp_enqueue_script( 'kiswani-source-home', get_template_directory_uri() . '/assets/js/source-home.js', array(), '0.1.0', true );
		wp_enqueue_script( 'kiswani-source-checkout', get_template_directory_uri() . '/assets/js/source-checkout.js', array(), '0.1.0', true );
		$catalog = array();
		foreach ( kiswani_catalog_products() as $checkout_product ) {
			$source_image = (string) get_post_meta( $checkout_product->ID, '_kiswani_source_image', true );
			$catalog[] = array(
				'code'  => (string) get_post_meta( $checkout_product->ID, '_kiswani_code', true ),
				'name'  => $checkout_product->post_title,
				'price' => (float) get_post_meta( $checkout_product->ID, '_kiswani_price', true ),
				'image' => get_template_directory_uri() . '/assets' . $source_image,
			);
		}
		wp_localize_script(
			'kiswani-source-checkout',
			'ksCheckout',
			array(
				'ajaxUrl' => admin_url( 'admin-ajax.php' ),
				'nonce'   => wp_create_nonce( 'kiswani_checkout' ),
				'catalog' => $catalog,
			)
		);
		wp_add_inline_script( 'kiswani-source-home', 'window.ksThemeUri = ' . wp_json_encode( get_template_directory_uri() ) . ';', 'before' );
		return get_template_directory() . '/templates/source-checkout.php';
	}
	if ( 'projects' === $special ) {
		global $wp_query;
		$wp_query->is_404 = false;
		status_header( 200 );
		wp_enqueue_style( 'kiswani-source-home', get_template_directory_uri() . '/assets/css/source-home.css', array( 'kiswani-lights' ), '0.1.2' );
		wp_enqueue_style( 'kiswani-source-fonts', get_template_directory_uri() . '/assets/css/fonts.css', array( 'kiswani-source-home' ), '0.1.0' );
		wp_enqueue_style( 'kiswani-source-projects', get_template_directory_uri() . '/assets/css/source-projects.css', array( 'kiswani-source-fonts' ), '0.1.0' );
		wp_enqueue_style( 'kiswani-source-projects-polish', get_template_directory_uri() . '/assets/css/source-projects-polish.css', array( 'kiswani-source-projects' ), '0.1.0' );
		wp_enqueue_script( 'kiswani-source-home', get_template_directory_uri() . '/assets/js/source-home.js', array(), '0.1.0', true );
		wp_enqueue_script( 'kiswani-source-projects', get_template_directory_uri() . '/assets/js/source-projects.js', array(), '0.1.0', true );
		wp_add_inline_script( 'kiswani-source-home', 'window.ksThemeUri = ' . wp_json_encode( get_template_directory_uri() ) . ';', 'before' );
		return get_template_directory() . '/templates/source-projects.php';
	}
	$collection = sanitize_key( (string) get_query_var( 'kiswani_collection' ) );
	if ( $collection && kiswani_catalog_collection_details( $collection ) ) {
		wp_enqueue_style( 'kiswani-source-home', get_template_directory_uri() . '/assets/css/source-home.css', array( 'kiswani-lights' ), '0.1.2' );
		wp_enqueue_style( 'kiswani-source-fonts', get_template_directory_uri() . '/assets/css/fonts.css', array( 'kiswani-source-home' ), '0.1.0' );
		wp_enqueue_style( 'kiswani-source-catalog', get_template_directory_uri() . '/assets/css/source-catalog.css', array( 'kiswani-source-fonts' ), '0.1.0' );
		wp_enqueue_style( 'kiswani-collection-v2', get_template_directory_uri() . '/assets/css/collection-v2.css', array( 'kiswani-source-catalog' ), '0.1.0' );
		wp_enqueue_style( 'kiswani-collection-v2-fix', get_template_directory_uri() . '/assets/css/collection-v2-fix.css', array( 'kiswani-collection-v2' ), '0.1.0' );
		wp_enqueue_style( 'kiswani-collection-v2-polish', get_template_directory_uri() . '/assets/css/collection-v2-polish.css', array( 'kiswani-collection-v2-fix' ), '0.1.0' );
		wp_enqueue_style( 'kiswani-collection-mobile-header-fix', get_template_directory_uri() . '/assets/css/collection-mobile-header-fix.css', array( 'kiswani-collection-v2-polish' ), '0.1.0' );
		wp_enqueue_style( 'kiswani-collection-card-parity', get_template_directory_uri() . '/assets/css/collection-card-parity.css', array( 'kiswani-collection-mobile-header-fix' ), '0.1.0' );
		wp_enqueue_script( 'kiswani-source-home', get_template_directory_uri() . '/assets/js/source-home.js', array(), '0.1.0', true );
		wp_enqueue_script( 'kiswani-source-catalog', get_template_directory_uri() . '/assets/js/source-catalog.js', array(), '0.1.0', true );
		wp_add_inline_script( 'kiswani-source-home', 'window.ksThemeUri = ' . wp_json_encode( get_template_directory_uri() ) . ';', 'before' );
		return get_template_directory() . '/templates/source-collection-v2.php';
	}

	$product_code = sanitize_text_field( (string) get_query_var( 'kiswani_product' ) );
	$product = $product_code ? kiswani_catalog_product_by_code( $product_code ) : null;
	if ( $product ) {
		global $wp_query;
		$wp_query->is_404 = false;
		status_header( 200 );
		wp_enqueue_style( 'kiswani-source-home', get_template_directory_uri() . '/assets/css/source-home.css', array( 'kiswani-lights' ), '0.1.2' );
		wp_enqueue_style( 'kiswani-source-fonts', get_template_directory_uri() . '/assets/css/fonts.css', array( 'kiswani-source-home' ), '0.1.0' );
		wp_enqueue_style( 'kiswani-source-catalog', get_template_directory_uri() . '/assets/css/source-catalog.css', array( 'kiswani-source-fonts' ), '0.1.1' );
		wp_enqueue_style( 'kiswani-source-product', get_template_directory_uri() . '/assets/css/source-product.css', array( 'kiswani-source-catalog' ), '0.1.0' );
		wp_enqueue_style( 'kiswani-product-content-parity', get_template_directory_uri() . '/assets/css/product-content-parity.css', array( 'kiswani-source-product' ), '0.1.0' );
		wp_enqueue_style( 'kiswani-product-actions-parity', get_template_directory_uri() . '/assets/css/product-actions-parity.css', array( 'kiswani-product-content-parity' ), '0.1.0' );
		wp_enqueue_style( 'kiswani-product-responsive-parity', get_template_directory_uri() . '/assets/css/product-responsive-parity.css', array( 'kiswani-product-actions-parity' ), '0.1.0' );
		wp_enqueue_style( 'kiswani-product-final-parity', get_template_directory_uri() . '/assets/css/product-final-parity.css', array( 'kiswani-product-responsive-parity' ), '0.1.0' );
		wp_enqueue_style( 'kiswani-product-polish-parity', get_template_directory_uri() . '/assets/css/product-polish-parity.css', array( 'kiswani-product-final-parity' ), '0.1.0' );
		wp_enqueue_style( 'kiswani-product-breakpoint-fix', get_template_directory_uri() . '/assets/css/product-breakpoint-fix.css', array( 'kiswani-product-polish-parity' ), '0.1.0' );
		wp_enqueue_script( 'kiswani-source-home', get_template_directory_uri() . '/assets/js/source-home.js', array(), '0.1.0', true );
		wp_add_inline_script( 'kiswani-source-home', 'window.ksThemeUri = ' . wp_json_encode( get_template_directory_uri() ) . ';', 'before' );
		return get_template_directory() . '/templates/source-product-v2.php';
	}
	if ( is_page( array( 'about', 'support', 'privacy', 'terms' ) ) ) {
		wp_enqueue_style( 'kiswani-source-home', get_template_directory_uri() . '/assets/css/source-home.css', array( 'kiswani-lights' ), '0.1.2' );
		wp_enqueue_style( 'kiswani-source-fonts', get_template_directory_uri() . '/assets/css/fonts.css', array( 'kiswani-source-home' ), '0.1.0' );
		wp_enqueue_style( 'kiswani-source-information', get_template_directory_uri() . '/assets/css/source-information.css', array( 'kiswani-source-fonts' ), '0.1.0' );
		wp_enqueue_script( 'kiswani-source-home', get_template_directory_uri() . '/assets/js/source-home.js', array(), '0.1.0', true );
		wp_add_inline_script( 'kiswani-source-home', 'window.ksThemeUri = ' . wp_json_encode( get_template_directory_uri() ) . ';', 'before' );
		return get_template_directory() . '/templates/source-information.php';
	}
	return $template;
}
add_filter( 'template_include', 'kiswani_source_route_template' );
