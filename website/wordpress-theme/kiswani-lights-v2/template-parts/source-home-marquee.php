<?php
/**
 * Homepage lighting collections and technology marquee.
 */

$marquee_items = array(
	'DECORATIVE',
	'ARCHITECTURAL',
	'TECHNICAL LIGHTING',
	'DALI CONTROL',
	'TRIAC DIMMING',
	'CRI 90+',
	'OUTDOOR LIGHTING',
);
?>
<section class="ks-marquee" aria-label="Lighting collections and technologies">
	<div class="ks-marquee__inner">
		<div class="ks-marquee__label"><p>COLLECTIONS &amp; TECHNOLOGY</p></div>
		<div class="ks-marquee__viewport">
			<div class="ks-marquee__track">
				<?php for ( $cycle = 0; $cycle < 2; $cycle++ ) : ?>
					<?php foreach ( $marquee_items as $marquee_item ) : ?>
						<span class="ks-marquee__item"<?php echo 1 === $cycle ? ' aria-hidden="true"' : ''; ?>>
							<span><?php echo esc_html( $marquee_item ); ?></span>
							<i aria-hidden="true"></i>
						</span>
					<?php endforeach; ?>
				<?php endfor; ?>
			</div>
		</div>
	</div>
</section>
