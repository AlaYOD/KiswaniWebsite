<?php
/**
 * Source-matched product detail route.
 *
 * @package Kiswani_Lights_V2
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$code    = sanitize_text_field( (string) get_query_var( 'kiswani_product' ) );
$product = kiswani_catalog_product_by_code( $code );

if ( ! $product ) {
	status_header( 404 );
	get_template_part( '404' );
	return;
}

$product_code = get_post_meta( $product->ID, '_kiswani_code', true );
$price        = (float) get_post_meta( $product->ID, '_kiswani_price', true );
$source_image = get_post_meta( $product->ID, '_kiswani_source_image', true );
$specs        = json_decode( (string) get_post_meta( $product->ID, '_kiswani_specs', true ), true );
$terms        = get_the_terms( $product->ID, 'kiswani_collection' );
$collection   = $terms ? $terms[0] : null;
$theme_uri    = get_template_directory_uri();
$related      = $collection ? array_values(
	array_filter(
		kiswani_catalog_products( $collection->slug ),
		static function ( $item ) use ( $product ) {
			return $item->ID !== $product->ID;
		}
	)
) : array();
$related      = array_slice( $related, 0, 3 );
$download_url = home_url( '/downloads/' . $product_code . '.pdf' );
$message      = rawurlencode( 'Hello Kiswani Lights, I am interested in ' . $product->post_title . ' (' . $product_code . '). Initial catalog price: ' . number_format_i18n( $price ) . ' ILS.' );

get_header( 'source' );
?>
<main class="ks-product" id="top" data-product-code="<?php echo esc_attr( $product_code ); ?>">
	<section class="ks-product-hero">
		<div class="ks-product-breadcrumb">
			<a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a><span>/</span>
			<?php if ( $collection ) : ?>
				<a href="<?php echo esc_url( home_url( '/collections/' . $collection->slug . '/' ) ); ?>"><?php echo esc_html( $collection->name ); ?></a><span>/</span>
			<?php endif; ?>
			<b><?php echo esc_html( $product->post_title ); ?></b>
		</div>

		<div class="ks-product-panel">
			<div class="ks-product-media">
				<div class="ks-product-primary">
					<img src="<?php echo esc_url( $theme_uri . '/assets' . $source_image ); ?>" alt="<?php echo esc_attr( $product->post_title ); ?>">
					<i aria-hidden="true"></i>
					<b><?php echo esc_html( $product_code ); ?></b>
				</div>
				<div class="ks-product-thumbs">
					<?php for ( $image_index = 0; $image_index < 4; $image_index++ ) : ?>
						<button class="<?php echo 0 === $image_index ? 'is-active' : ''; ?>" type="button" aria-label="View image <?php echo esc_attr( (string) ( $image_index + 1 ) ); ?>" aria-pressed="<?php echo 0 === $image_index ? 'true' : 'false'; ?>">
							<img src="<?php echo esc_url( $theme_uri . '/assets' . $source_image ); ?>" alt="">
						</button>
					<?php endfor; ?>
				</div>
			</div>

			<div class="ks-product-copy">
				<div class="ks-product-details">
					<a class="ks-kicker" href="<?php echo esc_url( $collection ? home_url( '/collections/' . $collection->slug . '/' ) : home_url( '/' ) ); ?>">
						<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
						<?php echo esc_html( $collection ? $collection->name : 'KISWANI PRODUCT' ); ?>
					</a>
					<h1><?php echo esc_html( $product->post_title ); ?></h1>
					<p class="ks-product-description"><?php echo esc_html( $product->post_excerpt ); ?></p>

					<div class="ks-product-price">
						<div><small>Initial catalog price</small><b>&#8362;<?php echo esc_html( number_format_i18n( $price ) ); ?></b></div>
						<p>Calculated in cart by quantity before final approval.</p>
					</div>

					<div class="ks-product-summary">
						<?php if ( is_array( $specs ) ) : ?>
							<?php foreach ( array_slice( $specs, 0, 4 ) as $spec ) : ?>
								<div><small><?php echo esc_html( $spec[0] ); ?></small><b><?php echo esc_html( $spec[1] ); ?></b></div>
							<?php endforeach; ?>
						<?php endif; ?>
					</div>

					<div class="ks-product-note">
						<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m20 6-11 11-5-5"/></svg>
						<p>Initial price, availability, and delivery timing are confirmed with the Kiswani team before final approval.</p>
					</div>
				</div>

				<div class="ks-product-quantity">
					<label for="product-qty">Select Quantity</label>
					<div>
						<button type="button" aria-label="Decrease quantity" data-product-quantity="decrease">&minus;</button>
						<input id="product-qty" type="number" min="1" max="999" value="1" aria-label="Select Quantity">
						<button type="button" aria-label="Increase quantity" data-product-quantity="increase">+</button>
					</div>
				</div>

				<div class="ks-product-purchase">
					<button type="button">Add to project cart</button>
					<div>
						<a href="<?php echo esc_url( $download_url ); ?>" download>Datasheet PDF</a>
						<a target="_blank" rel="noreferrer" href="<?php echo esc_url( 'https://wa.me/970599671209?text=' . $message ); ?>">Ask about it</a>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="ks-product-specs">
		<div>
			<header>
				<div class="ks-product-data-kicker"><i></i><p>PRODUCT DATA</p></div>
				<h2>Precise details for a confident decision.</h2>
				<span>Review the essential specifications and download the data sheet to share with your designer or contractor.</span>
				<a href="<?php echo esc_url( $download_url ); ?>" download>Download specification PDF</a>
			</header>
			<div class="ks-product-data-right">
				<div class="ks-product-spec-list">
					<?php if ( is_array( $specs ) ) : ?>
						<?php foreach ( $specs as $index => $spec ) : ?>
							<div><small>0<?php echo esc_html( (string) ( $index + 1 ) ); ?></small><span><?php echo esc_html( $spec[0] ); ?></span><b><?php echo esc_html( $spec[1] ); ?></b></div>
						<?php endforeach; ?>
					<?php endif; ?>
				</div>
				<div class="ks-product-support"><span>Selection support</span><span>Availability check</span><span>Installation guidance</span></div>
			</div>
		</div>
	</section>

	<?php if ( $related ) : ?>
		<section class="ks-product-related">
			<div>
				<header><div><p>RELATED LIGHTING</p><h2>From the same collection</h2></div><a href="<?php echo esc_url( home_url( '/collections/' . $collection->slug . '/' ) ); ?>"><span>View collection</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a></header>
				<div>
					<?php foreach ( $related as $item ) : ?>
						<?php
						$item_code  = get_post_meta( $item->ID, '_kiswani_code', true );
						$item_image = get_post_meta( $item->ID, '_kiswani_source_image', true );
						?>
						<a href="<?php echo esc_url( home_url( '/products/' . strtolower( $item_code ) . '/' ) ); ?>">
							<div class="ks-related-image"><img src="<?php echo esc_url( $theme_uri . '/assets' . $item_image ); ?>" alt="<?php echo esc_attr( $item->post_title ); ?>" decoding="async"><i><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"/></svg></i></div>
							<div class="ks-related-copy"><span><?php echo esc_html( $item_code ); ?></span><h3><?php echo esc_html( $item->post_title ); ?></h3></div>
						</a>
					<?php endforeach; ?>
				</div>
			</div>
		</section>
	<?php endif; ?>

	<section class="ks-product-cta">
		<div><div><p>PROJECT SUPPORT</p><h2>Want this fixture in a complete lighting plan?</h2></div><a href="<?php echo esc_url( 'https://wa.me/970599671209?text=' . $message ); ?>" target="_blank" rel="noreferrer"><span>Talk to an advisor</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"/></svg></a></div>
	</section>
</main>
<?php
get_footer( 'source' );
