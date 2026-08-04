<?php
/**
 * Pixel-parity homepage visual stories section.
 *
 * @package Kiswani_Lights
 */

defined( 'ABSPATH' ) || exit;

$home_stories = array(
	array( 'decorative', 'editorial/story-lounge.webp', 'Sculptural light for shared spaces', 'Dining & lounge' ),
	array( 'technical', 'editorial/story-stair.webp', 'Guidance after dark', 'Stairs & circulation' ),
	array( 'accent', 'editorial/story-wall.webp', 'Layers of ambient light', 'Walls & quiet corners' ),
);
?>
<section class="ks-stories">
	<div class="ks-stories__rail" aria-hidden="true"></div>
	<div class="ks-stories__inner">
		<div class="ks-stories__intro">
			<div class="ks-section-title">
				<p>LIGHT IN REAL SPACES</p>
				<h2>One fixture can change the rhythm of the whole room.</h2>
			</div>
			<p class="ks-stories__lead">Explore warm, believable interiors where the fixture, materials, and atmosphere work as one composition.</p>
		</div>
		<div class="ks-stories__grid">
			<a class="ks-story ks-story--main" href="<?php echo esc_url( home_url( '/collections/' . $home_stories[0][0] . '/' ) ); ?>">
				<img src="<?php echo esc_url( $asset( $home_stories[0][1] ) ); ?>" alt="<?php echo esc_attr( $home_stories[0][2] ); ?>">
				<span class="ks-story__overlay" aria-hidden="true"></span>
				<div class="ks-story__main-body">
					<div><p><?php echo esc_html( $home_stories[0][3] ); ?></p><h3><?php echo esc_html( $home_stories[0][2] ); ?></h3></div>
					<span class="ks-story__main-arrow" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M7 17 17 7M7 7h10v10"></path></svg></span>
				</div>
			</a>
			<div class="ks-stories__side">
				<?php foreach ( array_slice( $home_stories, 1 ) as $story ) : ?>
					<a class="ks-story ks-story--side" href="<?php echo esc_url( home_url( '/collections/' . $story[0] . '/' ) ); ?>">
						<img src="<?php echo esc_url( $asset( $story[1] ) ); ?>" alt="<?php echo esc_attr( $story[2] ); ?>">
						<span class="ks-story__overlay" aria-hidden="true"></span>
						<div class="ks-story__side-body">
							<p><?php echo esc_html( $story[3] ); ?></p>
							<div><h3><?php echo esc_html( $story[2] ); ?></h3><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M7 17 17 7M7 7h10v10"></path></svg></div>
						</div>
					</a>
				<?php endforeach; ?>
			</div>
		</div>
	</div>
</section>
