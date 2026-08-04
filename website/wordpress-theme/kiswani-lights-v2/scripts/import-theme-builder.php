<?php
/**
 * WP-CLI: wp eval-file scripts/import-theme-builder.php --header=pages/header-elementor.json --footer=pages/footer-elementor.json
 *
 * Preflight the WordPress menu before importing:
 *   wp menu list
 *   wp menu location list
 *   wp menu location assign <MENU_ID> primary
 *
 * Elementor Pro Theme Builder templates use the `elementor_library` post type,
 * `_elementor_template_type` (header/footer), and `_elementor_conditions`.
 * `elementor-hf` belongs to the separate Header Footer Builder plugin and is
 * deliberately not used here.
 */

if ( ! defined( 'ABSPATH' ) || ! defined( 'WP_CLI' ) || ! WP_CLI ) {
	fwrite( STDERR, "Run this file through WP-CLI.\n" );
	exit( 1 );
}

if ( ! defined( 'ELEMENTOR_PRO_VERSION' ) ) {
	WP_CLI::error( 'Elementor Pro must be active to import Theme Builder templates.' );
}

if ( ! post_type_exists( 'elementor_library' ) ) {
	WP_CLI::error( 'The Elementor Pro elementor_library post type is unavailable.' );
}

$cli_args = isset( $assoc_args ) && is_array( $assoc_args ) ? $assoc_args : array();
$theme_dir = dirname( __DIR__ );
$header_file = isset( $cli_args['header'] ) ? (string) $cli_args['header'] : 'pages/header-elementor.json';
$footer_file = isset( $cli_args['footer'] ) ? (string) $cli_args['footer'] : 'pages/footer-elementor.json';

$registered_locations = get_registered_nav_menus();

if ( ! isset( $registered_locations['primary'] ) ) {
	WP_CLI::error( 'The active theme has no registered primary menu location. Register primary with register_nav_menus() before importing.' );
}

$menu_locations = get_nav_menu_locations();
$primary_menu_id = isset( $menu_locations['primary'] ) ? (int) $menu_locations['primary'] : 0;

if ( ! $primary_menu_id || ! wp_get_nav_menu_object( $primary_menu_id ) ) {
	WP_CLI::error( 'No WordPress menu is assigned to the primary location. Run the preflight wp menu commands in this file header first.' );
}

$resolve_file = static function ( $path ) use ( $theme_dir ) {
	$candidates = array(
		$path,
		getcwd() . DIRECTORY_SEPARATOR . $path,
		$theme_dir . DIRECTORY_SEPARATOR . $path,
	);

	foreach ( $candidates as $candidate ) {
		if ( is_file( $candidate ) && is_readable( $candidate ) ) {
			return $candidate;
		}
	}

	return false;
};

$find_or_create_template = static function ( $key, $title ) {
	$existing = get_posts(
		array(
			'post_type'      => 'elementor_library',
			'post_status'    => 'any',
			'posts_per_page' => 1,
			'meta_key'       => '_kiswani_theme_builder_key',
			'meta_value'     => $key,
			'fields'         => 'ids',
		)
	);

	if ( ! empty( $existing ) ) {
		$template_id = (int) $existing[0];
		wp_update_post(
			array(
				'ID'          => $template_id,
				'post_title'  => $title,
				'post_status' => 'publish',
			)
		);
		return $template_id;
	}

	$template_id = wp_insert_post(
		array(
			'post_type'   => 'elementor_library',
			'post_status' => 'publish',
			'post_title'  => $title,
		),
		true
	);

	if ( is_wp_error( $template_id ) ) {
		WP_CLI::error( 'Unable to create ' . $title . ': ' . $template_id->get_error_message() );
	}

	return (int) $template_id;
};

$import_template = static function ( $key, $title, $type, $requested_file ) use ( $resolve_file, $find_or_create_template, $primary_menu_id ) {
	$json_file = $resolve_file( $requested_file );

	if ( ! $json_file ) {
		WP_CLI::error( 'Unable to read template JSON: ' . $requested_file );
	}

	$source_json = file_get_contents( $json_file );
	$source_json = str_replace(
		array( '__PRIMARY_MENU_ID__', '__THEME_URI__' ),
		array( (string) $primary_menu_id, get_stylesheet_directory_uri() ),
		$source_json
	);
	$element_tree = json_decode( $source_json, true );

	if ( JSON_ERROR_NONE !== json_last_error() || ! is_array( $element_tree ) ) {
		WP_CLI::error( 'Template JSON is invalid after resolving placeholders: ' . $requested_file );
	}

	$elementor_json = wp_json_encode( $element_tree, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE );

	if ( false === $elementor_json ) {
		WP_CLI::error( 'Unable to encode template JSON: ' . $requested_file );
	}

	$template_id = $find_or_create_template( $key, $title );

	// wp_slash() preserves embedded JSON quotes through the post-meta API.
	update_post_meta( $template_id, '_elementor_data', wp_slash( $elementor_json ) );
	update_post_meta( $template_id, '_elementor_edit_mode', 'builder' );
	update_post_meta( $template_id, '_elementor_template_type', $type );
	update_post_meta( $template_id, '_elementor_version', \Elementor\Plugin::$instance->get_version() );
	update_post_meta( $template_id, '_elementor_conditions', array( 'include/general' ) );
	update_post_meta( $template_id, '_kiswani_theme_builder_key', $key );

	$stored_data = get_post_meta( $template_id, '_elementor_data', true );

	if ( ! is_string( $stored_data ) || ! is_array( json_decode( $stored_data, true ) ) ) {
		WP_CLI::error( 'Elementor failed to store valid JSON for template #' . $template_id );
	}

	return $template_id;
};

$header_id = $import_template( 'kiswani_pro_header', 'Kiswani Global Header (Pro)', 'header', $header_file );
$footer_id = $import_template( 'kiswani_pro_footer', 'Kiswani Global Footer (Pro)', 'footer', $footer_file );

$files_manager = \Elementor\Plugin::$instance->files_manager;

if ( ! is_object( $files_manager ) || ! method_exists( $files_manager, 'clear_cache' ) ) {
	WP_CLI::error( 'Elementor CSS files manager is unavailable; generated CSS could not be flushed.' );
}

$files_manager->clear_cache();

foreach ( array( $header_id, $footer_id ) as $template_id ) {
	if ( class_exists( '\\Elementor\\Core\\Files\\CSS\\Post' ) ) {
		$template_css = new \Elementor\Core\Files\CSS\Post( $template_id );

		if ( method_exists( $template_css, 'update' ) ) {
			$template_css->update();
		}
	}
}

WP_CLI::success(
	sprintf(
		'Imported Elementor Pro Header #%d and Footer #%d for the entire site using primary menu #%d.',
		$header_id,
		$footer_id,
		$primary_menu_id
	)
);
