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

/**
 * Product-map groups exported from lib/product-map.ts.
 *
 * These back the four non-category collection routes (lighting-fixtures,
 * light-bulbs, electrical-products, i-lite) and their category/subcategory
 * views. Regenerate data/product-map.json with scripts/export-product-map-json.mjs.
 */
function kiswani_product_map_groups() {
	static $groups = null;

	if ( null !== $groups ) {
		return $groups;
	}

	$path    = get_template_directory() . '/data/product-map.json';
	$decoded = is_readable( $path ) ? json_decode( (string) file_get_contents( $path ), true ) : null; // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
	$groups  = is_array( $decoded ) ? $decoded : array();

	return $groups;
}

function kiswani_product_map_group( $id ) {
	foreach ( kiswani_product_map_groups() as $group ) {
		if ( isset( $group['id'] ) && $group['id'] === $id ) {
			return $group;
		}
	}

	return null;
}

/** Sections and items are addressed by their English label, exactly like the source query string. */
function kiswani_product_map_section( $group, $label ) {
	if ( ! $label || empty( $group['sections'] ) ) {
		return null;
	}

	foreach ( $group['sections'] as $section ) {
		if ( isset( $section['label']['en'] ) && $section['label']['en'] === $label ) {
			return $section;
		}
	}

	return null;
}

function kiswani_product_map_item( $section, $label ) {
	if ( ! $label || empty( $section['items'] ) ) {
		return null;
	}

	foreach ( $section['items'] as $item ) {
		if ( isset( $item['label']['en'] ) && $item['label']['en'] === $label ) {
			return $item;
		}
	}

	return null;
}

/** Mirrors groupHref() in CollectionExperience.tsx: English labels in the query string. */
function kiswani_product_map_href( $group_id, $section_label = '', $item_label = '' ) {
	$url  = home_url( '/collections/' . $group_id . '/' );
	$args = array();

	if ( $section_label ) {
		$args['category'] = $section_label;
	}

	if ( $item_label ) {
		$args['subcategory'] = $item_label;
	}

	if ( ! $args ) {
		return $url;
	}

	return $url . '?' . http_build_query( $args );
}

/** Mirrors the fields joined by productMatches() in CollectionExperience.tsx. */
function kiswani_product_search_haystack( $product ) {
	$terms = wp_get_post_terms( $product->ID, 'kiswani_collection', array( 'fields' => 'names' ) );

	$parts = array(
		$product->post_title,
		get_post_meta( $product->ID, '_kiswani_arabic_name', true ),
		is_array( $terms ) ? implode( ' ', $terms ) : '',
		get_post_meta( $product->ID, '_kiswani_code', true ),
		$product->post_excerpt,
		get_post_meta( $product->ID, '_kiswani_arabic_description', true ),
	);

	return strtolower( implode( ' ', array_filter( array_map( 'strval', $parts ) ) ) );
}

/**
 * Narrow a product list to a product-map section or item.
 *
 * Like the source, an empty match falls back to the unfiltered list rather than
 * rendering an empty grid.
 */
function kiswani_product_map_filter_products( $products, $section = null, $item = null ) {
	$needles = array();

	if ( $item ) {
		$needles = array( isset( $item['search'] ) ? $item['search'] : '', $item['label']['en'] );
	} elseif ( $section && ! empty( $section['items'] ) ) {
		foreach ( $section['items'] as $section_item ) {
			$needles[] = isset( $section_item['search'] ) ? $section_item['search'] : '';
			$needles[] = $section_item['label']['en'];
		}
	} else {
		return $products;
	}

	$needles = array_filter( array_unique( array_map( 'strtolower', array_map( 'trim', $needles ) ) ) );

	if ( ! $needles ) {
		return $products;
	}

	$matched = array();

	foreach ( $products as $product ) {
		$haystack = kiswani_product_search_haystack( $product );

		foreach ( $needles as $needle ) {
			if ( false !== strpos( $haystack, $needle ) ) {
				$matched[] = $product;
				break;
			}
		}
	}

	return $matched ? $matched : $products;
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
