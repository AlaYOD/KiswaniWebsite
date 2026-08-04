<?php
/**
 * Pixel-parity homepage featured products section.
 *
 * @package Kiswani_Lights
 */

defined( 'ABSPATH' ) || exit;

$home_products = array(
	array( 'Golden Wall Lamp - 2 Bulb', 'KL-GL-001', 285, 'products/kiswani-product-01.jpg' ),
	array( 'Golden Wall Lamp - 6 Bulb', 'KL-GL-002', 690, 'products/kiswani-product-02.jpg' ),
	array( 'Golden Wall Lamp - 15 Bulb', 'KL-GL-003', 1450, 'products/kiswani-product-03.jpg' ),
	array( 'Golden Wall Lamp - 8 Bulb Long', 'KL-GL-004', 980, 'products/kiswani-product-04.jpg' ),
	array( 'Amber Globe Wall Lamp', 'KL-AG-005', 220, 'products/kiswani-product-05.jpg' ),
	array( 'Travertine Oval Wall Light', 'KL-TV-006', 260, 'products/kiswani-product-06.jpg' ),
	array( 'Travertine Glass Sconce', 'KL-TV-007', 240, 'products/kiswani-product-07.jpg' ),
	array( 'Travertine Cylinder Wall Light', 'KL-TV-008', 210, 'products/kiswani-product-08.jpg' ),
);
?>
<section class="ks-products" id="products">
	<div class="ks-products__track" aria-hidden="true">
		<div class="ks-products__track-bar"></div>
		<?php foreach ( array( -18, 0, 18 ) as $index => $angle ) : ?>
			<div class="ks-products__spot" style="--ks-spot-index:<?php echo esc_attr( $index ); ?>;--ks-spot-angle:<?php echo esc_attr( $angle ); ?>deg">
				<div class="ks-products__spot-stem"></div>
				<div class="ks-products__spot-head"><span></span></div>
				<div class="ks-products__spot-beam"></div>
			</div>
		<?php endforeach; ?>
	</div>
	<div class="ks-products__inner">
		<div class="ks-products__head">
			<div class="ks-section-title">
				<p>FEATURED LIGHTING</p>
				<h2>Selected pieces, clearly specified.</h2>
			</div>
			<label class="ks-products__search">
				<span class="screen-reader-text">Search by name, category, or code</span>
				<svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
				<input type="search" data-ks-product-search placeholder="Search by name, category, or code" autocomplete="off">
			</label>
		</div>
		<div class="ks-product-grid" data-ks-product-grid>
			<?php foreach ( $home_products as $product ) : ?>
				<article class="ks-product-card" data-ks-product-card data-product-code="<?php echo esc_attr( $product[1] ); ?>">
					<button type="button" class="ks-product-card__image ks-view" aria-label="View details">
						<img src="<?php echo esc_url( $asset( $product[3] ) ); ?>" alt="<?php echo esc_attr( $product[0] ); ?>" loading="lazy" decoding="async">
						<span aria-hidden="true"></span>
					</button>
					<div class="ks-product-card__content">
						<a class="ks-product-card__title" href="<?php echo esc_url( home_url( '/products/' . strtolower( $product[1] ) . '/' ) ); ?>"><h3><?php echo esc_html( $product[0] ); ?></h3></a>
						<p class="ks-product-card__price">₪<?php echo esc_html( number_format_i18n( $product[2] ) ); ?></p>
						<div class="ks-product-footer">
							<div class="ks-product-card__quantity-row">
								<b>Qty</b>
								<span class="ks-quantity-control">
									<button type="button" aria-label="Decrease quantity"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h14"></path></svg></button>
									<input type="number" min="1" max="999" value="1" aria-label="Quantity">
									<button type="button" aria-label="Increase quantity"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg></button>
								</span>
							</div>
							<button type="button" class="ks-add"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>Add to cart</button>
						</div>
					</div>
				</article>
			<?php endforeach; ?>
		</div>
	</div>
</section>
