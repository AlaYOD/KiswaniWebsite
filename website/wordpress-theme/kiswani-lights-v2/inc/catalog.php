<?php
/**
 * Editable WordPress catalog model mirroring the deployed source catalog.
 *
 * Product content is stored in a custom post type; source data is used only
 * by the explicit local/demo importer and never rendered directly as a
 * replacement for WordPress content.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function kiswani_register_catalog_content() {
	register_post_type(
		'kiswani_product',
		array(
			'labels' => array(
				'name'          => __( 'Products', 'kiswani-lights' ),
				'singular_name' => __( 'Product', 'kiswani-lights' ),
			),
			'public'       => true,
			'show_in_rest' => true,
			'has_archive'  => false,
			'rewrite'      => false,
			'supports'     => array( 'title', 'editor', 'thumbnail', 'excerpt' ),
			'menu_icon'    => 'dashicons-lightbulb',
		)
	);

	register_taxonomy(
		'kiswani_collection',
		array( 'kiswani_product' ),
		array(
			'labels'       => array( 'name' => __( 'Collections', 'kiswani-lights' ) ),
			'public'       => true,
			'show_in_rest' => true,
			'hierarchical' => true,
			'rewrite'      => false,
		)
	);
}
add_action( 'init', 'kiswani_register_catalog_content' );

function kiswani_catalog_collection_details( $slug ) {
	$collections = array(
		'decorative' => array(
			'name'   => 'Decorative lighting',
			'detail' => 'Statement pieces that give the room its character.',
			'image'  => 'images/editorial/hero-decorative.webp',
		),
		'interior' => array(
			'name'   => 'Interior lighting',
			'detail' => 'Warm, considered light for everyday living.',
			'image'  => 'images/editorial/hero-interior.webp',
		),
		'technical' => array(
			'name'   => 'Technical lighting',
			'detail' => 'Precise systems for architectural performance.',
			'image'  => 'images/editorial/hero-technical.webp',
		),
		'accent' => array(
			'name'   => 'Accent lighting',
			'detail' => 'Focused moments that reveal material and mood.',
			'image'  => 'images/editorial/hero-accent.webp',
		),
	);

	return isset( $collections[ $slug ] ) ? $collections[ $slug ] : null;
}

function kiswani_catalog_products( $collection = '' ) {
	$args = array(
		'post_type'      => 'kiswani_product',
		'post_status'    => 'publish',
		'posts_per_page' => -1,
		'orderby'        => 'menu_order',
		'order'          => 'ASC',
	);

	if ( $collection ) {
		$args['tax_query'] = array(
			array(
				'taxonomy' => 'kiswani_collection',
				'field'    => 'slug',
				'terms'    => sanitize_key( $collection ),
			),
		);
	}

	return get_posts( $args );
}

function kiswani_catalog_product_by_code( $code ) {
	$products = get_posts(
		array(
			'post_type'      => 'kiswani_product',
			'post_status'    => 'publish',
			'posts_per_page' => 1,
			'meta_key'       => '_kiswani_code',
			'meta_value'     => sanitize_text_field( strtoupper( $code ) ),
		)
	);

	return $products ? $products[0] : null;
}
