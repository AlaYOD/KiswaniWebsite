<?php
/**
 * WP-CLI: wp eval-file scripts/import-page.php --slug=home --file=pages/home-elementor.json
 *
 * Imports a validated Elementor element tree into a WordPress page. The JSON is
 * stored as a JSON string in _elementor_data; it is never stored as a PHP array.
 *
 * Run from the theme directory, or pass paths that are resolvable from the
 * current directory or this theme directory.
 */

if ( ! defined( 'ABSPATH' ) || ! defined( 'WP_CLI' ) || ! WP_CLI ) {
	fwrite( STDERR, "Run this file through WP-CLI.\n" );
	exit( 1 );
}

$cli_args       = isset( $assoc_args ) && is_array( $assoc_args ) ? $assoc_args : array();
$slug            = isset( $cli_args['slug'] ) ? sanitize_title( (string) $cli_args['slug'] ) : '';
$requested_file  = isset( $cli_args['file'] ) ? (string) $cli_args['file'] : '';
$theme_directory = dirname( __DIR__ );

if ( '' === $slug ) {
	WP_CLI::error( 'Provide a valid page slug: --slug=home' );
}

if ( '' === $requested_file ) {
	WP_CLI::error( 'Provide an Elementor JSON file: --file=pages/home-elementor.json' );
}

$candidate_files = array(
	$requested_file,
	getcwd() . DIRECTORY_SEPARATOR . $requested_file,
	$theme_directory . DIRECTORY_SEPARATOR . $requested_file,
);
$json_file = '';

foreach ( $candidate_files as $candidate ) {
	if ( is_readable( $candidate ) && is_file( $candidate ) ) {
		$json_file = $candidate;
		break;
	}
}

if ( '' === $json_file ) {
	WP_CLI::error( 'Unable to read JSON file: ' . $requested_file );
}

$source_json = file_get_contents( $json_file );
$element_tree = json_decode( $source_json, true );

if ( JSON_ERROR_NONE !== json_last_error() || ! is_array( $element_tree ) ) {
	WP_CLI::error( 'The supplied file is not a valid Elementor JSON element tree.' );
}

if ( ! class_exists( '\\Elementor\\Plugin' ) || ! did_action( 'elementor/loaded' ) ) {
	WP_CLI::error( 'Elementor must be active before importing Elementor page data.' );
}

// Elementor expects _elementor_data to be a JSON string, not serialized PHP data.
$elementor_json = wp_json_encode(
	$element_tree,
	JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE
);

if ( false === $elementor_json ) {
	WP_CLI::error( 'Unable to encode the Elementor element tree as JSON.' );
}

$page = get_page_by_path( $slug, OBJECT, 'page' );

if ( $page instanceof WP_Post ) {
	$page_id = (int) $page->ID;
	$created = false;
} else {
	$page_id = wp_insert_post(
		array(
			'post_type'    => 'page',
			'post_status'  => 'publish',
			'post_title'   => ucwords( str_replace( '-', ' ', $slug ) ),
			'post_name'    => $slug,
			'post_content' => '',
		),
		true
	);

	if ( is_wp_error( $page_id ) ) {
		WP_CLI::error( 'Unable to create page: ' . $page_id->get_error_message() );
	}

	$page_id = (int) $page_id;
	$created = true;
}

// wp_slash() is required because post-meta APIs unslash values before writing.
update_post_meta( $page_id, '_elementor_data', wp_slash( $elementor_json ) );
update_post_meta( $page_id, '_elementor_edit_mode', 'builder' );
update_post_meta( $page_id, '_elementor_template_type', 'wp-page' );
update_post_meta( $page_id, '_elementor_version', \Elementor\Plugin::$instance->get_version() );

$stored_data = get_post_meta( $page_id, '_elementor_data', true );

if ( ! is_string( $stored_data ) || ! is_array( json_decode( $stored_data, true ) ) ) {
	WP_CLI::error( 'Elementor data was not stored as a valid JSON string.' );
}

/*
 * Equivalent to `wp elementor flush_css`: remove generated CSS and create the
 * imported page's CSS file immediately when this Elementor version supports it.
 */
$files_manager = \Elementor\Plugin::$instance->files_manager;

if ( ! is_object( $files_manager ) || ! method_exists( $files_manager, 'clear_cache' ) ) {
	WP_CLI::error( 'Elementor CSS files manager is unavailable; CSS cache was not flushed.' );
}

$files_manager->clear_cache();

if ( class_exists( '\\Elementor\\Core\\Files\\CSS\\Post' ) ) {
	$page_css = new \Elementor\Core\Files\CSS\Post( $page_id );

	if ( method_exists( $page_css, 'update' ) ) {
		$page_css->update();
	}
}

$action = $created ? 'Created and imported' : 'Updated and imported';

WP_CLI::success(
	sprintf(
		'%s page #%d (%s) from %s. Elementor CSS cache regenerated.',
		$action,
		$page_id,
		$slug,
		$json_file
	)
);
