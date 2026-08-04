<?php
/** Header template. */
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div class="kiswani-shell">
	<header class="kiswani-site-header">
		<div class="kiswani-site-header__inner">
			<a class="kiswani-site-title" href="<?php echo esc_url( home_url( '/' ) ); ?>">KISWANI LIGHTS</a>
			<nav class="kiswani-primary-menu" aria-label="<?php esc_attr_e( 'Primary navigation', 'kiswani-lights' ); ?>">
				<?php wp_nav_menu( array( 'theme_location' => 'primary', 'container' => false, 'fallback_cb' => false ) ); ?>
			</nav>
		</div>
	</header>
