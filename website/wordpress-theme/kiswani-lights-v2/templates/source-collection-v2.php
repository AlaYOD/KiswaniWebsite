<?php
/**
 * Source-matched collection route.
 *
 * @package Kiswani_Lights_V2
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$slug       = sanitize_key( (string) get_query_var( 'kiswani_collection' ) );
$collection = kiswani_catalog_collection_details( $slug );
$products   = kiswani_catalog_products( $slug );
$theme_uri  = get_template_directory_uri();

get_header( 'source' );
?>
<main class="ks-catalog ks-catalog--v2">
	<section class="ks-catalog-hero" id="top">
		<div class="ks-catalog-hero__inner">
			<div class="ks-catalog-hero__copy">
				<a class="ks-catalog-back" href="<?php echo esc_url( home_url( '/#collections' ) ); ?>"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5m6 6-6-6 6-6"/></svg><span>Back to collections</span></a>
				<div>
					<div class="ks-catalog-kicker"><span></span><p>KISWANI COLLECTION</p></div>
					<h1><?php echo esc_html( $collection['name'] ); ?></h1>
					<p><?php echo esc_html( $collection['detail'] ); ?></p>
					<div class="ks-catalog-hero-actions"><a href="#collection-products">Browse products</a><span><?php echo esc_html( (string) count( $products ) ); ?> products</span></div>
				</div>
			</div>
			<div class="ks-catalog-hero__image"><img src="<?php echo esc_url( $theme_uri . '/assets/' . $collection['image'] ); ?>" alt="<?php echo esc_attr( $collection['name'] ); ?>"><i></i><b></b></div>
		</div>
	</section>

	<nav class="ks-catalog-nav" aria-label="Collections">
		<div>
			<?php foreach ( array( 'decorative', 'interior', 'technical', 'accent' ) as $item ) : ?>
				<?php $detail = kiswani_catalog_collection_details( $item ); ?>
				<a href="<?php echo esc_url( home_url( '/collections/' . $item . '/' ) ); ?>"<?php echo $item === $slug ? ' aria-current="page"' : ''; ?>><?php echo esc_html( $detail['name'] ); ?></a>
			<?php endforeach; ?>
		</div>
	</nav>

	<section class="ks-catalog-products" id="collection-products">
		<div>
			<header>
				<div><div class="ks-catalog-products-kicker"><span></span><p>PRODUCTS</p></div><h2><?php echo esc_html( $collection['name'] ); ?></h2></div>
				<label><span class="screen-reader-text">Search this collection</span><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg><input data-ks-catalog-search placeholder="Search by name or code"></label>
			</header>

			<div class="ks-catalog-grid" data-ks-catalog-grid>
				<?php foreach ( $products as $product ) : ?>
					<?php
					$price = (float) get_post_meta( $product->ID, '_kiswani_price', true );
					$code  = get_post_meta( $product->ID, '_kiswani_code', true );
					$image = get_post_meta( $product->ID, '_kiswani_source_image', true );
					$url   = home_url( '/products/' . strtolower( $code ) . '/' );
					?>
					<article data-ks-catalog-card data-product-code="<?php echo esc_attr( $code ); ?>" data-search="<?php echo esc_attr( strtolower( $product->post_title . ' ' . $code . ' ' . $product->post_excerpt ) ); ?>">
						<a class="ks-catalog-card__image" href="<?php echo esc_url( $url ); ?>" aria-label="View product"><img src="<?php echo esc_url( $theme_uri . '/assets' . $image ); ?>" alt="<?php echo esc_attr( $product->post_title ); ?>" decoding="async"><span></span></a>
						<div class="ks-catalog-card__content">
							<a class="ks-catalog-card__title" href="<?php echo esc_url( $url ); ?>"><h3><?php echo esc_html( $product->post_title ); ?></h3></a>
							<p class="ks-catalog-card__price">&#8362;<?php echo esc_html( number_format_i18n( $price ) ); ?></p>
							<div class="ks-catalog-card__footer">
								<div class="ks-catalog-card__quantity"><span>Qty</span><div><button type="button" aria-label="Decrease quantity" data-catalog-quantity="decrease"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"/></svg></button><input type="number" min="1" max="999" value="1" aria-label="Quantity for <?php echo esc_attr( $product->post_title ); ?>"><button type="button" aria-label="Increase quantity" data-catalog-quantity="increase"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg></button></div></div>
								<button class="ks-catalog-add" type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 10a4 4 0 0 1-8 0"/><path d="M3.103 6.034h17.794"/><path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z"/></svg><span>Add to cart</span></button>
							</div>
						</div>
					</article>
				<?php endforeach; ?>
			</div>
			<p class="ks-catalog-empty" hidden>No products match your search.</p>
		</div>
	</section>

	<section class="ks-catalog-cta" id="contact">
		<div><div><p>PROJECT SUPPORT</p><h2>Need help choosing the right light?</h2></div><a href="<?php echo esc_url( home_url( '/#contact' ) ); ?>"><span>Talk to Kiswani</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a></div>
	</section>
</main>
<?php
get_footer( 'source' );
