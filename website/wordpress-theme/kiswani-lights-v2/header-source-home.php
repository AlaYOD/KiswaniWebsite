<?php
/**
 * Public header for the homepage: the shared source header plus the cinematic
 * intro, which only plays on the front page.
 */

kiswani_source_header_assets();

$theme_image_uri = get_stylesheet_directory_uri() . '/assets/images/';
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php wp_head(); ?>
</head>
<body <?php body_class( 'kiswani-source-site' ); ?>>
<?php wp_body_open(); ?>
<section class="ks-cinematic-intro" data-ks-cinematic-intro role="status" aria-live="polite" aria-label="Kiswani Lights brand introduction" hidden>
	<div class="ks-cinematic-intro__glow" aria-hidden="true"></div>
	<div class="ks-cinematic-intro__frame" aria-hidden="true"></div>
	<div class="ks-cinematic-intro__top" aria-hidden="true"></div>
	<div class="ks-cinematic-intro__horizon" aria-hidden="true"></div>
	<div class="ks-cinematic-intro__center">
		<div class="ks-cinematic-intro__content">
			<div class="ks-cinematic-intro__logo"><img src="<?php echo esc_url( $theme_image_uri . 'kiswani-logo-since-1994.png' ); ?>" alt="Kiswani Lights"></div>
			<div class="ks-cinematic-intro__rule" aria-hidden="true"></div>
			<div class="ks-cinematic-intro__copy">
				<p>Lighting is the soul of the space</p>
				<p dir="rtl">&#1575;&#1604;&#1573;&#1590;&#1575;&#1569;&#1577; &#1607;&#1610; &#1585;&#1608;&#1581; &#1575;&#1604;&#1605;&#1603;&#1575;&#1606;</p>
			</div>
		</div>
	</div>
	<div class="ks-cinematic-intro__footer">
		<div><span>Kiswani Lights</span><span>Est. 2026</span></div>
		<div class="ks-cinematic-intro__progress"><span></span></div>
	</div>
</section>
<?php require get_stylesheet_directory() . '/template-parts/source-header.php'; ?>
