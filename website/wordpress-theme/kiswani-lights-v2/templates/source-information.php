<?php
/** Source-matched shared information page template. */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
$kind = get_post_field( 'post_name', get_queried_object_id() );
$info_page = kiswani_information_page_data( $kind );
if ( ! $info_page ) {
	return;
}
$links = array( 'about' => 'About', 'support' => 'Support', 'privacy' => 'Privacy', 'terms' => 'Terms' );
$kind_index = array_search( $kind, array_keys( $links ), true ) + 1;
$icons = array(
	'about' => '<path d="m12 3-1.9 5.1L5 10l5.1 1.9L12 17l1.9-5.1L19 10l-5.1-1.9Z"></path><path d="M5 3v4"></path><path d="M3 5h4"></path><path d="M19 17v4"></path><path d="M17 19h4"></path>',
	'support' => '<path d="M4 14a8 8 0 0 1 16 0"></path><path d="M18 19c0 1.7-1.3 3-3 3h-3"></path><path d="M4 14v4a2 2 0 0 0 2 2h1v-8H6a2 2 0 0 0-2 2Z"></path><path d="M20 14v4a2 2 0 0 1-2 2h-1v-8h1a2 2 0 0 1 2 2Z"></path>',
	'privacy' => '<path d="M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3Z"></path><path d="m9 12 2 2 4-4"></path>',
	'terms' => '<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5Z"></path><path d="M14 2v6h6"></path><path d="M8 13h8"></path><path d="M8 17h8"></path>',
);
get_header( 'source' );
?>
<main class="ks-info" id="top" data-info-kind="<?php echo esc_attr( $kind ); ?>">
	<section class="ks-info-hero">
		<div class="ks-info-hero-glow"></div>
		<div class="ks-info-container">
			<div class="ks-info-breadcrumb"><a href="<?php echo esc_url( home_url( '/' ) ); ?>">Kiswani Lights</a><span>/</span><b><?php echo esc_html( $info_page['eyebrow'] ); ?></b></div>
			<div class="ks-info-hero-grid">
				<div class="ks-info-hero-copy">
					<div class="ks-info-kicker"><span></span><p><?php echo esc_html( $info_page['eyebrow'] ); ?></p></div>
					<h1><?php echo esc_html( $info_page['title'] ); ?></h1>
					<p class="ks-info-lead"><?php echo esc_html( $info_page['lead'] ); ?></p>
					<?php if ( $info_page['notice'] ) : ?><p class="ks-info-notice"><?php echo esc_html( $info_page['notice'] ); ?></p><?php endif; ?>
				</div>
				<div class="ks-info-icon"><span></span><svg viewBox="0 0 24 24" aria-hidden="true"><?php echo $icons[ $kind ]; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></svg><b>0<?php echo esc_html( (string) $kind_index ); ?> / 04</b></div>
			</div>
			<nav class="ks-info-nav" aria-label="Information pages"><?php foreach ( $links as $slug => $label ) : $active = $slug === $kind; ?><a href="<?php echo esc_url( home_url( '/' . $slug . '/' ) ); ?>"<?php echo $active ? ' aria-current="page"' : ''; ?>><span><?php echo esc_html( $label ); ?></span><b>0<?php echo esc_html( (string) ( array_search( $slug, array_keys( $links ), true ) + 1 ) ); ?></b></a><?php endforeach; ?></nav>
		</div>
	</section>

	<?php if ( 'about' === $kind ) : ?>
	<section class="ks-info-about-feature"><div class="ks-info-container"><div class="ks-info-about-grid"><div class="ks-info-about-image"><img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/kiswani-hero-2026.webp' ); ?>" alt="Architectural interior illuminated by Kiswani Lights"><span></span></div><div class="ks-info-about-copy"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18h6"></path><path d="M10 22h4"></path><path d="M15.09 14c.18-.9.66-1.67 1.32-2.34A6 6 0 1 0 7.6 11.66c.65.66 1.13 1.43 1.31 2.34"></path></svg><div><p>KISWANI / 2026</p><h2>Lighting is the soul of the space.</h2></div></div></div></div></section>
	<?php endif; ?>

	<?php if ( 'support' === $kind ) : ?>
	<section class="ks-info-support"><div class="ks-info-container"><header><span></span><h2>Contact the support team</h2></header><div class="ks-info-support-grid">
		<?php $contacts = array( array( 'WhatsApp', '+970 599 67 12 09', 'https://wa.me/970599671209' ), array( 'Call us', '+970 599 67 12 09', 'tel:+970599671209' ), array( 'Email support', 'info@kiswanilights.com', 'mailto:info@kiswanilights.com' ), array( 'Showroom', 'Ramallah · Palestine', 'https://maps.google.com/?q=Ramallah+Palestine' ) ); foreach ( $contacts as $index => $contact ) : ?><a href="<?php echo esc_url( $contact[2] ); ?>"><div><span><?php echo esc_html( (string) ( $index + 1 ) ); ?></span><b>0<?php echo esc_html( (string) ( $index + 1 ) ); ?></b></div><h3><?php echo esc_html( $contact[0] ); ?></h3><p><?php echo esc_html( $contact[1] ); ?></p><i>&nearr;</i></a><?php endforeach; ?>
	</div></div></section>
	<?php endif; ?>

	<section class="ks-info-content"><div class="ks-info-container ks-info-content-grid">
		<aside><p>On this page</p><nav><?php foreach ( $info_page['sections'] as $index => $section ) : ?><a href="#section-<?php echo esc_attr( (string) ( $index + 1 ) ); ?>"><span><?php echo esc_html( $section['title'] ); ?></span><b>0<?php echo esc_html( (string) ( $index + 1 ) ); ?></b></a><?php endforeach; ?></nav></aside>
		<div class="ks-info-articles"><?php foreach ( $info_page['sections'] as $index => $section ) : ?><article id="section-<?php echo esc_attr( (string) ( $index + 1 ) ); ?>"><span>0<?php echo esc_html( (string) ( $index + 1 ) ); ?></span><div><h2><?php echo esc_html( $section['title'] ); ?></h2><p><?php echo esc_html( $section['body'] ); ?></p></div></article><?php endforeach; ?></div>
	</div></section>

	<section class="ks-info-cta"><div class="ks-info-container"><div><p>KISWANI SUPPORT</p><h2>Still need a clear answer? Talk to our team.</h2></div><a href="https://wa.me/970599671209" target="_blank" rel="noreferrer">Contact Kiswani <span>&rarr;</span></a></div></section>
</main>
<?php get_footer( 'source' ); ?>
