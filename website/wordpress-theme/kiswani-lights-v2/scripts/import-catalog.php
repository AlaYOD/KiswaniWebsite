<?php
/**
 * Imports the source catalog into editable WordPress product posts.
 * Run from the WordPress root:
 * wp eval-file wp-content/themes/kiswani-lights-v2/scripts/import-catalog.php
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$file = get_template_directory() . '/data/catalog-products.json';
$products = json_decode( (string) file_get_contents( $file ), true );

if ( ! is_array( $products ) ) {
	WP_CLI::error( 'Unable to read catalog-products.json.' );
}

foreach ( $products as $position => $product ) {
	$code = isset( $product['code'] ) ? sanitize_text_field( $product['code'] ) : '';
	if ( ! $code ) {
		continue;
	}

	$existing = kiswani_catalog_product_by_code( $code );
	$post_id = wp_insert_post(
		array(
			'ID'           => $existing ? $existing->ID : 0,
			'post_type'    => 'kiswani_product',
			'post_status'  => 'publish',
			'post_title'   => sanitize_text_field( $product['name'] ),
			'post_excerpt' => sanitize_text_field( $product['description'] ),
			'post_content' => wp_kses_post( wpautop( sanitize_textarea_field( $product['description'] ) ) ),
			'menu_order'   => (int) $position,
		),
		true
	);

	if ( is_wp_error( $post_id ) ) {
		WP_CLI::warning( $code . ': ' . $post_id->get_error_message() );
		continue;
	}

	wp_set_object_terms( $post_id, sanitize_key( $product['categorySlug'] ), 'kiswani_collection', false );
	update_post_meta( $post_id, '_kiswani_code', $code );
	update_post_meta( $post_id, '_kiswani_price', (float) $product['price'] );
	update_post_meta( $post_id, '_kiswani_source_image', esc_url_raw( $product['image'] ) );
	update_post_meta( $post_id, '_kiswani_specs', wp_json_encode( $product['specs'] ) );
	update_post_meta( $post_id, '_kiswani_arabic_name', sanitize_text_field( $product['arabic'] ) );
	update_post_meta( $post_id, '_kiswani_arabic_description', sanitize_textarea_field( $product['descriptionAr'] ) );
}

WP_CLI::success( 'Catalog import complete: ' . count( $products ) . ' products.' );
