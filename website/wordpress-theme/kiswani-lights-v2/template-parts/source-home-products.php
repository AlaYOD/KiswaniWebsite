<?php
/**
 * Pixel-parity homepage featured products section.
 *
 * @package Kiswani_Lights
 */

defined( 'ABSPATH' ) || exit;

$catalog_path = get_template_directory() . '/data/catalog-products.json';
$catalog_data = file_exists( $catalog_path ) ? json_decode( (string) file_get_contents( $catalog_path ), true ) : array();
$home_products = is_array( $catalog_data ) ? array_slice( $catalog_data, 0, 8 ) : array();
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
				<?php
				$product_image_path = preg_replace( '#^/images/#', '', (string) $product['image'] );
				$product_image_url  = $asset( $product_image_path );
				$product_code       = (string) $product['code'];
				$product_payload    = array(
					'name'        => (string) $product['name'],
					'category'    => (string) $product['category'],
					'code'        => $product_code,
					'price'       => (float) $product['price'],
					'image'       => $product_image_url,
					'description' => (string) $product['description'],
					'specs'       => is_array( $product['specs'] ) ? $product['specs'] : array(),
					'url'         => home_url( '/products/' . strtolower( $product_code ) . '/' ),
				);
				$product_json = wp_json_encode( $product_payload );
				?>
				<article class="ks-product-card" data-ks-product-card data-product-code="<?php echo esc_attr( $product_code ); ?>" data-ks-product-details="<?php echo esc_attr( $product_json ); ?>">
					<button type="button" class="ks-product-card__image ks-view" data-ks-product-open aria-label="View details">
						<img src="<?php echo esc_url( $product_image_url ); ?>" alt="<?php echo esc_attr( $product['name'] ); ?>" loading="lazy" decoding="async">
						<span aria-hidden="true"></span>
					</button>
					<div class="ks-product-card__content">
						<button class="ks-product-card__title" type="button" data-ks-product-open><h3><?php echo esc_html( $product['name'] ); ?></h3></button>
						<p class="ks-product-card__price">&#8362;<?php echo esc_html( number_format_i18n( $product['price'] ) ); ?></p>
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
		<div class="ks-products__empty" data-ks-products-empty hidden>
			<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
			<p>No products match your search.</p>
			<button type="button" data-ks-product-clear>Clear search</button>
		</div>
	</div>
</section>

<div class="ks-product-modal" data-ks-product-modal hidden aria-hidden="true">
	<div class="ks-product-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="ks-product-modal-title">
		<button class="ks-product-modal__close" type="button" data-ks-product-modal-close aria-label="Close product details"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"></path></svg></button>
		<div class="ks-product-modal__media">
			<div class="ks-product-modal__stage">
				<img data-ks-product-modal-image alt="">
				<div class="ks-product-modal__frame" aria-hidden="true"></div>
				<span class="ks-product-modal__code" data-ks-product-modal-code></span>
				<span class="ks-product-modal__count" data-ks-product-modal-count>01 / 04</span>
			</div>
			<div class="ks-product-modal__thumbs" data-ks-product-modal-thumbs>
				<?php $gallery_labels = array( 'Full product view', 'Product detail view', 'Lighting detail view', 'Material detail view' ); ?>
				<?php for ( $thumb_index = 0; $thumb_index < 4; $thumb_index++ ) : ?>
					<button type="button" data-ks-product-modal-thumb="<?php echo esc_attr( $thumb_index ); ?>" aria-label="<?php echo esc_attr( $gallery_labels[ $thumb_index ] ); ?>"><img alt=""><span></span><b>0<?php echo esc_html( $thumb_index + 1 ); ?></b></button>
				<?php endfor; ?>
			</div>
		</div>

		<div class="ks-product-modal__content">
			<div class="ks-product-modal__kicker"><span></span><p data-ks-product-modal-category></p></div>
			<h2 id="ks-product-modal-title" data-ks-product-modal-title></h2>
			<div class="ks-product-modal__price-row">
				<div><p>Initial catalog price</p><strong data-ks-product-modal-price></strong></div>
				<div data-ks-product-modal-total-wrap hidden><p>Quantity total</p><strong data-ks-product-modal-total></strong></div>
			</div>
			<p class="ks-product-modal__description" data-ks-product-modal-description></p>
			<div class="ks-product-modal__specification">
				<div><h3>Technical specifications</h3><span data-ks-product-modal-spec-code></span></div>
				<div class="ks-product-modal__specs" data-ks-product-modal-specs></div>
			</div>
			<p class="ks-product-modal__note">Initial catalog price. Availability, delivery, and final approval are confirmed before processing.</p>
			<div class="ks-product-modal__quantity">
				<label for="ks-product-modal-quantity">Quantity</label>
				<div><button type="button" data-ks-product-modal-quantity="decrease" aria-label="Decrease quantity"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"></path></svg></button><input id="ks-product-modal-quantity" type="number" min="1" max="999" value="1"><button type="button" data-ks-product-modal-quantity="increase" aria-label="Increase quantity"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M12 5v14"></path></svg></button></div>
			</div>
			<div class="ks-product-modal__actions">
				<button type="button" data-ks-product-modal-add><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 10a4 4 0 0 1-8 0"></path><path d="M3.103 6.034h17.794"></path><path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z"></path></svg>Add to cart</button>
				<a data-ks-product-modal-link>Full product page <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"></path></svg></a>
			</div>
		</div>
	</div>
</div>
