<?php
/**
 * Public header for every source route except the homepage.
 *
 * Identical to the homepage header apart from the cinematic intro, which only
 * plays on the front page.
 */

kiswani_source_header_assets();
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php wp_head(); ?>
</head>
<body <?php body_class( 'kiswani-source-site' ); ?>>
<?php wp_body_open(); ?>
<?php require get_stylesheet_directory() . '/template-parts/source-header.php'; ?>
