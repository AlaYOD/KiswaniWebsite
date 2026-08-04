<?php
/**
 * Pixel-parity homepage collections section.
 *
 * @package Kiswani_Lights
 */

defined( 'ABSPATH' ) || exit;

$home_collection_cards = array(
	array( 'decorative', 'Decorative lighting', 'Statement pieces that give the room its character.', 'editorial/hero-decorative.webp' ),
	array( 'interior', 'Interior lighting', 'Warm, considered light for everyday living.', 'editorial/hero-interior.webp' ),
	array( 'technical', 'Technical lighting', 'Precise systems for architectural performance.', 'editorial/hero-technical.webp' ),
	array( 'accent', 'Accent lighting', 'Focused moments that reveal material and mood.', 'editorial/hero-accent.webp' ),
);
?>
<section class="ks-collections" id="collections">
	<div class="ks-wall-sconce" aria-hidden="true">
		<div class="ks-wall-sconce__beam ks-wall-sconce__beam--up"></div>
		<div class="ks-wall-sconce__beam ks-wall-sconce__beam--down"></div>
		<div class="ks-wall-sconce__body"></div>
		<div class="ks-wall-sconce__arm"></div>
		<div class="ks-wall-sconce__bulb"></div>
		<div class="ks-wall-sconce__glass"></div>
	</div>
	<div class="ks-collections__inner">
		<div class="ks-section-title">
			<p>LIGHTING COLLECTIONS</p>
			<h2>Find the light that belongs in your space.</h2>
		</div>
		<div class="ks-category-grid">
			<?php foreach ( $home_collection_cards as $index => $category ) : ?>
				<a href="<?php echo esc_url( home_url( '/collections/' . $category[0] . '/' ) ); ?>" class="ks-category-card">
					<img src="<?php echo esc_url( $asset( $category[3] ) ); ?>" alt="<?php echo esc_attr( $category[1] ); ?>">
					<div class="ks-category-card__overlay"></div>
					<div class="ks-category-card__top"><span>0<?php echo esc_html( $index + 1 ); ?></span><i></i></div>
					<div class="ks-category-card__body">
						<small>KISWANI / 2026</small>
						<h3><?php echo esc_html( $category[1] ); ?></h3>
						<p><?php echo esc_html( $category[2] ); ?></p>
						<b aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"></path></svg></b>
					</div>
				</a>
			<?php endforeach; ?>
		</div>
	</div>
</section>


