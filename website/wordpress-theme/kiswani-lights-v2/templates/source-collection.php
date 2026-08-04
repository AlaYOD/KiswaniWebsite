<?php
/** Source-matched collection route. */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$slug = sanitize_key( (string) get_query_var( 'kiswani_collection' ) );
$collection = kiswani_catalog_collection_details( $slug );
$products = kiswani_catalog_products( $slug );
$theme_uri = get_template_directory_uri();

get_header( 'source' );
?>
<main class="ks-catalog" id="top">
	<section class="ks-catalog-hero">
		<div class="ks-catalog-hero__inner">
			<div class="ks-catalog-hero__copy"><a class="ks-catalog-back" href="<?php echo esc_url( home_url( '/#collections' ) ); ?>">â† Back to collections</a><div><p class="ks-kicker"><span></span>KISWANI COLLECTION</p><h1><?php echo esc_html( $collection['name'] ); ?></h1><p><?php echo esc_html( $collection['detail'] ); ?></p><div><a href="#collection-products">Browse products</a><small><?php echo esc_html( (string) count( $products ) ); ?> products</small></div></div></div>
			<div class="ks-catalog-hero__image" style="background-image:url('<?php echo esc_url( $theme_uri . '/assets/' . $collection['image'] ); ?>')"><i></i><b></b></div>
		</div>
	</section>
	<nav class="ks-catalog-nav" aria-label="Collections"><div><?php foreach ( array( 'decorative', 'interior', 'technical', 'accent' ) as $item ) : $detail = kiswani_catalog_collection_details( $item ); ?><a href="<?php echo esc_url( home_url( '/collections/' . $item . '/' ) ); ?>"<?php echo $item === $slug ? ' aria-current="page"' : ''; ?>><?php echo esc_html( $detail['name'] ); ?></a><?php endforeach; ?></div></nav>
	<section class="ks-catalog-products" id="collection-products"><div><header><div><p class="ks-kicker"><span></span>PRODUCTS</p><h2><?php echo esc_html( $collection['name'] ); ?></h2></div><label><span class="screen-reader-text">Search this collection</span><input data-ks-catalog-search placeholder="Search by name or code"></label></header><div class="ks-catalog-grid" data-ks-catalog-grid><?php foreach ( $products as $product ) : $price = (float) get_post_meta( $product->ID, '_kiswani_price', true ); $code = get_post_meta( $product->ID, '_kiswani_code', true ); $image = get_post_meta( $product->ID, '_kiswani_source_image', true ); ?><article data-ks-catalog-card data-search="<?php echo esc_attr( strtolower( $product->post_title . ' ' . $code . ' ' . $product->post_excerpt ) ); ?>"><a class="ks-catalog-card__image" href="<?php echo esc_url( home_url( '/products/' . strtolower( $code ) . '/' ) ); ?>"><img src="<?php echo esc_url( $theme_uri . '/assets' . $image ); ?>" alt="<?php echo esc_attr( $product->post_title ); ?>" loading="lazy"></a><div class="ks-catalog-card__body"><h3><a href="<?php echo esc_url( home_url( '/products/' . strtolower( $code ) . '/' ) ); ?>"><?php echo esc_html( $product->post_title ); ?></a></h3><b>â‚ª<?php echo esc_html( number_format_i18n( $price ) ); ?></b></div><footer><label>Qty <input type="number" min="1" value="1" aria-label="Quantity for <?php echo esc_attr( $product->post_title ); ?>"></label><button type="button">Add to cart</button></footer></article><?php endforeach; ?></div><p class="ks-catalog-empty" hidden>No products match your search.</p></div></section>
	<section class="ks-catalog-cta"><div><p>PROJECT SUPPORT</p><h2>Need help choosing the right light?</h2><a href="<?php echo esc_url( home_url( '/#contact' ) ); ?>">Talk to Kiswani â†’</a></div></section>
</main>
<?php get_footer( 'source' );
