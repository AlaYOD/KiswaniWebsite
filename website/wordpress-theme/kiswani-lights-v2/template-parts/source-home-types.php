<?php
/**
 * Pixel-parity homepage lighting types section.
 *
 * @package Kiswani_Lights
 */

defined( 'ABSPATH' ) || exit;

$home_types = array(
	array( 'Light sources', 'Color temperature and clarity for every use.' ),
	array( 'Decorative pieces', 'Visual presence that gives the space character.' ),
	array( 'Functional lighting', 'Useful light without visual noise.' ),
	array( 'Technical control', 'Precision, visual comfort, and reliable output.' ),
);
?>
<section class="ks-types" id="types">
	<div class="ks-types__glow" aria-hidden="true"></div>
	<div class="ks-types__pendant" aria-hidden="true">
		<div class="ks-types__cord"></div>
		<div class="ks-types__fixture">
			<div class="ks-types__cap"></div>
			<div class="ks-types__shade"></div>
			<div class="ks-types__bulb"></div>
		</div>
		<div class="ks-types__beam"></div>
	</div>
	<div class="ks-types__inner">
		<div class="ks-types__layout">
			<div class="ks-types__intro">
				<div class="ks-section-title ks-section-title--dark">
					<p>A DISTINCTIVE VISUAL LANGUAGE</p>
					<h2>Every line has a purpose.</h2>
				</div>
				<p class="ks-types__lead">From the product silhouette to the way light lands, Kiswani combines decorative presence with technical precision.</p>
			</div>
			<div class="ks-types__grid">
				<?php foreach ( $home_types as $index => $type ) : ?>
					<article class="ks-type-card">
						<span class="ks-type-card__wash" aria-hidden="true"></span>
						<div class="ks-type-card__top">
							<?php if ( 0 === $index ) : ?>
								<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path><path d="M9 18h6"></path><path d="M10 22h4"></path></svg>
							<?php elseif ( 1 === $index ) : ?>
								<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M10.293 2.293a1 1 0 0 1 1.414 0l2.5 2.5 5.994 1.227a1 1 0 0 1 .506 1.687l-7 7a1 1 0 0 1-1.687-.506l-1.227-5.994-2.5-2.5a1 1 0 0 1 0-1.414z"></path><path d="m14.207 4.793-3.414 3.414"></path><path d="M3 20a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"></path><path d="m9.086 6.5-4.793 4.793a1 1 0 0 0-.18 1.17L7 18"></path></svg>
							<?php elseif ( 2 === $index ) : ?>
								<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 10v12"></path><path d="M17.929 7.629A1 1 0 0 1 17 9H7a1 1 0 0 1-.928-1.371l2-5A1 1 0 0 1 9 2h6a1 1 0 0 1 .928.629z"></path><path d="M9 22h6"></path></svg>
							<?php else : ?>
								<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m12 14 4-4"></path><path d="M3.34 19a10 10 0 1 1 17.32 0"></path></svg>
							<?php endif; ?>
							<span>0<?php echo esc_html( $index + 1 ); ?></span>
						</div>
						<h3><?php echo esc_html( $type[0] ); ?></h3>
						<p><?php echo esc_html( $type[1] ); ?></p>
					</article>
				<?php endforeach; ?>
			</div>
		</div>
	</div>
</section>
