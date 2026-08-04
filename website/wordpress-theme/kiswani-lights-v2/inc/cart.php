<?php
/** Shared catalog-cart assets and editable product payload. */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function kiswani_cart_catalog_payload() {
	$catalog = array();
	foreach ( kiswani_catalog_products() as $product ) {
		$source_image = (string) get_post_meta( $product->ID, '_kiswani_source_image', true );
		$catalog[] = array(
			'code'  => (string) get_post_meta( $product->ID, '_kiswani_code', true ),
			'name'  => $product->post_title,
			'price' => (float) get_post_meta( $product->ID, '_kiswani_price', true ),
			'image' => get_template_directory_uri() . '/assets' . $source_image,
		);
	}
	return $catalog;
}

function kiswani_enqueue_cart_assets() {
	if ( wp_script_is( 'kiswani-source-cart', 'enqueued' ) ) {
		return;
	}
	wp_enqueue_style( 'kiswani-source-cart', get_template_directory_uri() . '/assets/css/source-cart.css', array( 'kiswani-source-home' ), '0.1.0' );
	wp_enqueue_script( 'kiswani-source-cart', get_template_directory_uri() . '/assets/js/source-cart.js', array(), '0.1.0', true );
	wp_localize_script(
		'kiswani-source-cart',
		'ksCartData',
		array(
			'catalog'    => kiswani_cart_catalog_payload(),
			'checkoutUrl' => home_url( '/checkout/' ),
		)
	);
}
