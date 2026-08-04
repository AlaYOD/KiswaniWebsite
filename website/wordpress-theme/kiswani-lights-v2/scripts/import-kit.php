<?php
/**
 * WP-CLI: wp eval-file scripts/import-kit.php
 *
 * Imports literal Next.js design tokens into the active Elementor Kit.
 * Review this file against the Elementor version installed on the destination
 * site before executing: Kit page-setting keys are Elementor-internal.
 */

if ( ! defined( 'ABSPATH' ) ) {
	fwrite( STDERR, "Run this file through WP-CLI: wp eval-file scripts/import-kit.php\n" );
	exit( 1 );
}

$tokens_file = dirname( __DIR__ ) . '/design-tokens.json';

if ( ! is_readable( $tokens_file ) ) {
	WP_CLI::error( 'Unable to read design-tokens.json: ' . $tokens_file );
}

$tokens = json_decode( file_get_contents( $tokens_file ), true );

if ( ! is_array( $tokens ) || JSON_ERROR_NONE !== json_last_error() ) {
	WP_CLI::error( 'design-tokens.json does not contain valid JSON.' );
}

$kit_id = (int) get_option( 'elementor_active_kit' );

if ( ! $kit_id || 'elementor_library' !== get_post_type( $kit_id ) ) {
	WP_CLI::error( 'No active Elementor Kit was found.' );
}

$settings = get_post_meta( $kit_id, '_elementor_page_settings', true );
$settings = is_array( $settings ) ? $settings : array();

$id = static function ( $value, $fallback ) {
	$value = sanitize_key( (string) $value );
	return $value ? substr( $value, 0, 50 ) : $fallback;
};

$colors = isset( $tokens['colors'] ) && is_array( $tokens['colors'] ) ? $tokens['colors'] : array();
$system_color_ids = array( 'kiswani_yellow', 'kiswani_ink', 'kiswani_graphite', 'kiswani_gold' );
$system_color_titles = array(
	'kiswani_yellow'   => 'Primary',
	'kiswani_ink'      => 'Text',
	'kiswani_graphite' => 'Secondary',
	'kiswani_gold'     => 'Accent',
);
$system_colors = array();
$custom_colors = array();

foreach ( $colors as $index => $color ) {
	if ( ! is_array( $color ) || empty( $color['name'] ) || empty( $color['hex'] ) ) {
		continue;
	}

	$hex = strtoupper( sanitize_hex_color( $color['hex'] ) ?: '' );
	if ( ! $hex ) {
		continue;
	}

	$color_id = $id( $color['name'], 'color_' . $index );
	$entry = array(
		'_id'   => $color_id,
		'title' => ucwords( str_replace( array( '_', '-' ), ' ', $color['name'] ) ),
		'color' => $hex,
	);

	if ( in_array( $color_id, $system_color_ids, true ) ) {
		$entry['_id'] = $color_id;
		$entry['title'] = $system_color_titles[ $color_id ];
		$system_colors[] = $entry;
	} else {
		$custom_colors[] = $entry;
	}
}

$typography = isset( $tokens['typography'] ) && is_array( $tokens['typography'] ) ? $tokens['typography'] : array();
$system_type_ids = array( 'text_base', 'text_2xl', 'text_sm', 'text_7xl' );
$system_type_titles = array(
	'text_base' => 'Primary',
	'text_2xl'  => 'Secondary',
	'text_sm'   => 'Text',
	'text_7xl'  => 'Accent',
);
$system_typography = array();
$custom_typography = array();

foreach ( $typography as $index => $type ) {
	if ( ! is_array( $type ) || empty( $type['name'] ) || empty( $type['family'] ) || ! is_numeric( $type['size_px'] ) ) {
		continue;
	}

	$type_id = $id( $type['name'], 'type_' . $index );
	$entry = array(
		'_id'                        => $type_id,
		'title'                      => ucwords( str_replace( array( '_', '-' ), ' ', $type['name'] ) ),
		'typography_typography'      => 'custom',
		'typography_font_family'     => sanitize_text_field( $type['family'] ),
		'typography_font_size'       => array( 'unit' => 'px', 'size' => (float) $type['size_px'], 'sizes' => array() ),
	);

	if ( is_numeric( $type['weight'] ) ) {
		$entry['typography_font_weight'] = (string) (int) $type['weight'];
	}

	if ( is_numeric( $type['line_height'] ) ) {
		$entry['typography_line_height'] = array( 'unit' => 'em', 'size' => (float) $type['line_height'], 'sizes' => array() );
	}

	if ( isset( $system_type_titles[ $type_id ] ) ) {
		$entry['title'] = $system_type_titles[ $type_id ];
		$system_typography[] = $entry;
	} else {
		$custom_typography[] = $entry;
	}
}

$spacing = isset( $tokens['spacing_px'] ) && is_array( $tokens['spacing_px'] ) ? $tokens['spacing_px'] : array();
$spacing = array_values( array_filter( $spacing, 'is_numeric' ) );
sort( $spacing, SORT_NUMERIC );

if ( empty( $spacing ) ) {
	WP_CLI::error( 'design-tokens.json contains no numeric spacing_px values.' );
}

// Literal source values: 1440px maximum content width and 24px standard gap.
$container_width = in_array( 1440, $spacing, true ) ? 1440 : max( $spacing );
$widget_gap = in_array( 24, $spacing, true ) ? 24 : $spacing[0];
$default_padding = in_array( 16, $spacing, true ) ? 16 : $widget_gap;

$settings['system_colors'] = $system_colors;
$settings['custom_colors'] = $custom_colors;
$settings['system_typography'] = $system_typography;
$settings['custom_typography'] = $custom_typography;
$settings['container_width'] = $container_width;
$settings['space_between_widgets'] = $widget_gap;
$settings['container_padding'] = array(
	'unit'  => 'px',
	'top'   => $default_padding,
	'right' => $default_padding,
	'bottom'=> $default_padding,
	'left'  => $default_padding,
	'isLinked' => true,
);

update_post_meta( $kit_id, '_elementor_page_settings', $settings );

WP_CLI::success( sprintf( 'Updated active Elementor Kit #%d with %d system colors, %d custom colors, %d system typography entries, and %d custom typography entries.', $kit_id, count( $system_colors ), count( $custom_colors ), count( $system_typography ), count( $custom_typography ) ) );
