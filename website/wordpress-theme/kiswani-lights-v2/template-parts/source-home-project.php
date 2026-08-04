<?php
/**
 * Homepage featured project before/after experience.
 */

$project_image = $asset( 'editorial/project-dining.webp' );
$project_products = array(
	array( 'Golden Wall Lamp - 8 Bulb Long', '/products/golden-wall-lamp-8-bulb-long' ),
	array( 'Travertine Glass Sconce', '/products/travertine-glass-sconce' ),
	array( 'Travertine Block Wall Light', '/products/travertine-block-wall-light' ),
);
?>
<section class="ks-featured-project" id="featured-project" data-ks-featured-project>
	<div class="ks-featured-project__line" aria-hidden="true"></div>
	<div class="ks-featured-project__glow" aria-hidden="true"></div>
	<div class="ks-featured-project__inner">
		<div class="ks-featured-project__head">
			<div>
				<div class="ks-featured-project__kicker"><span></span><p>FEATURED PROJECT</p></div>
				<h2>See how light changes the feeling of space.</h2>
			</div>
			<p>Drag the line to compare the quiet space before illumination with the final architectural scene, then explore how color temperature changes the atmosphere.</p>
		</div>

		<div class="ks-project-compare">
			<div class="ks-project-compare__visual">
				<div class="ks-project-compare__image ks-project-compare__before">
					<img src="<?php echo esc_url( $project_image ); ?>" alt="Interior lighting project before illumination">
				</div>
				<div class="ks-project-compare__image ks-project-compare__after" data-ks-project-after>
					<img src="<?php echo esc_url( $project_image ); ?>" alt="Interior lighting project after illumination" data-ks-project-image>
					<div data-ks-project-overlay aria-hidden="true"></div>
				</div>

				<div class="ks-project-compare__handle" data-ks-project-handle aria-hidden="true">
					<span><svg viewBox="0 0 24 24"><path d="m18 8 4 4-4 4M6 8l-4 4 4 4M2 12h20"/></svg></span>
				</div>
				<input class="ks-project-compare__range" dir="ltr" type="range" min="8" max="92" value="64" aria-label="Move to compare before and after lighting" data-ks-project-range>

				<div class="ks-project-compare__labels"><span>BEFORE</span><span>AFTER</span></div>
				<div class="ks-project-compare__shade" aria-hidden="true"></div>

				<div class="ks-project-compare__facts">
					<div>
						<svg viewBox="0 0 24 24"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
						<p>LOCATION</p><strong>Private residence, Ramallah</strong>
					</div>
					<div>
						<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41"/></svg>
						<p>PROJECT TYPE</p><strong>Interior &amp; architectural</strong>
					</div>
					<div>
						<svg viewBox="0 0 24 24"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/><path d="M12 9v7"/></svg>
						<p>LIGHTING SCENE</p><strong data-ks-project-kelvin>2700K</strong>
					</div>
				</div>
			</div>
		</div>

		<div class="ks-featured-project__controls">
			<div class="ks-featured-project__temperature">
				<p>SELECT LIGHT TEMPERATURE</p>
				<div class="ks-temperature-options" role="group" aria-label="Light temperature">
					<button type="button" class="is-active" aria-pressed="true" data-ks-temperature="warm" data-kelvin="2700K" data-filter="sepia(0.18) saturate(1.18)" data-overlay="rgba(255, 174, 58, 0.18)"><b>Warm</b><span>2700K</span></button>
					<button type="button" aria-pressed="false" data-ks-temperature="natural" data-kelvin="3500K" data-filter="saturate(1.02)" data-overlay="rgba(255, 218, 1, 0.055)"><b>Natural</b><span>3500K</span></button>
					<button type="button" aria-pressed="false" data-ks-temperature="cool" data-kelvin="5000K" data-filter="saturate(0.88) contrast(1.02)" data-overlay="rgba(176, 213, 255, 0.17)"><b>Cool</b><span>5000K</span></button>
				</div>
			</div>

			<div class="ks-featured-project__products">
				<div class="ks-featured-project__products-row">
					<div><p>PRODUCTS USED</p><div class="ks-featured-project__product-links">
						<?php foreach ( $project_products as $project_product ) : ?>
							<a href="<?php echo esc_url( home_url( $project_product[1] ) ); ?>"><?php echo esc_html( $project_product[0] ); ?></a>
						<?php endforeach; ?>
					</div></div>
					<a class="ks-featured-project__cta" href="<?php echo esc_url( home_url( $project_products[0][1] ) ); ?>">Project &amp; product details <svg viewBox="0 0 24 24"><path d="M7 17 17 7M7 7h10v10"/></svg></a>
				</div>
			</div>
		</div>
	</div>
</section>
