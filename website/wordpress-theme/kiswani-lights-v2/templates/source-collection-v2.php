<?php
/**
 * Source-matched collection route.
 *
 * @package Kiswani_Lights_V2
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$slug      = sanitize_key( (string) get_query_var( 'kiswani_collection' ) );
$theme_uri = get_template_directory_uri();
$group     = kiswani_product_map_group( $slug );

if ( $group ) {
	// Product-map route: sections and items are selected by English label in the
	// query string, exactly like the source links.
	$section_label = isset( $_GET['category'] ) ? sanitize_text_field( wp_unslash( $_GET['category'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
	$item_label    = isset( $_GET['subcategory'] ) ? sanitize_text_field( wp_unslash( $_GET['subcategory'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
	$section       = kiswani_product_map_section( $group, $section_label );
	$item          = $section ? kiswani_product_map_item( $section, $item_label ) : null;

	$collection = array(
		'name'   => $group['label']['en'],
		'detail' => $group['description']['en'],
		'image'  => ltrim( $group['image'], '/' ),
	);
	$kicker     = 'PRODUCT COLLECTION';
	$products   = kiswani_product_map_filter_products( kiswani_catalog_products(), $section, $item );
	$grid_title = $item ? $item['label']['en'] : ( $section ? $section['label']['en'] : $collection['name'] );
} else {
	$section    = null;
	$item       = null;
	$collection = kiswani_catalog_collection_details( $slug );
	$kicker     = 'KISWANI COLLECTION';
	$products   = kiswani_catalog_products( $slug );
	$grid_title = $collection['name'];
}

get_header( 'source' );
?>
<main class="ks-catalog ks-catalog--v2">
	<section class="ks-catalog-hero" id="top">
		<div class="ks-catalog-hero__inner">
			<div class="ks-catalog-hero__copy">
				<a class="ks-catalog-back" href="<?php echo esc_url( home_url( '/#collections' ) ); ?>"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5m6 6-6-6 6-6"/></svg><span>Back to collections</span></a>
				<div>
					<div class="ks-catalog-kicker"><span></span><p><?php echo esc_html( $kicker ); ?></p></div>
					<h1><?php echo esc_html( $collection['name'] ); ?></h1>
					<p><?php echo esc_html( $collection['detail'] ); ?></p>
					<?php if ( $section ) : ?>
						<div class="ks-catalog-crumb"><span><?php echo esc_html( $section['label']['en'] ); ?></span><?php if ( $item ) : ?><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg><b><?php echo esc_html( $item['label']['en'] ); ?></b><?php endif; ?></div>
					<?php endif; ?>
					<div class="ks-catalog-hero-actions"><a href="#collection-products">Browse products</a><span><?php echo esc_html( (string) count( $products ) ); ?> products</span></div>
				</div>
			</div>
			<div class="ks-catalog-hero__image"><img src="<?php echo esc_url( $theme_uri . '/assets/' . $collection['image'] ); ?>" alt="<?php echo esc_attr( $collection['name'] ); ?>"><i></i><b></b></div>
		</div>
	</section>

	<nav class="ks-catalog-nav" aria-label="Collections">
		<div>
			<?php if ( $group ) : ?>
				<?php foreach ( kiswani_product_map_groups() as $nav_group ) : ?>
					<a href="<?php echo esc_url( kiswani_product_map_href( $nav_group['id'] ) ); ?>"<?php echo $nav_group['id'] === $slug ? ' aria-current="page"' : ''; ?>><?php echo esc_html( $nav_group['label']['en'] ); ?></a>
				<?php endforeach; ?>
			<?php else : ?>
				<?php foreach ( array( 'decorative', 'interior', 'technical', 'accent' ) as $nav_slug ) : ?>
					<?php $detail = kiswani_catalog_collection_details( $nav_slug ); ?>
					<a href="<?php echo esc_url( home_url( '/collections/' . $nav_slug . '/' ) ); ?>"<?php echo $nav_slug === $slug ? ' aria-current="page"' : ''; ?>><?php echo esc_html( $detail['name'] ); ?></a>
				<?php endforeach; ?>
			<?php endif; ?>
		</div>
	</nav>

	<?php if ( $group ) : ?>
	<section class="ks-catalog-tabs">
		<div class="ks-catalog-tabs__inner">
			<header>
				<div>
					<p>Category tabs</p>
					<h2><?php echo esc_html( $collection['name'] ); ?></h2>
				</div>
			</header>

			<div class="ks-catalog-tabs__row">
				<a class="ks-catalog-tab ks-catalog-tab--all<?php echo $section ? '' : ' is-active'; ?>" href="<?php echo esc_url( kiswani_product_map_href( $group['id'] ) ); ?>">
					<span class="ks-catalog-tab__kicker">Full collection</span>
					<span class="ks-catalog-tab__foot"><span class="ks-catalog-tab__name">All products</span><span class="ks-catalog-tab__arrow"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></span>
				</a>
				<?php foreach ( $group['sections'] as $tab_section ) : ?>
					<?php $tab_active = $section && $tab_section['label']['en'] === $section['label']['en']; ?>
					<a class="ks-catalog-tab ks-catalog-tab--section<?php echo $tab_active ? ' is-active' : ''; ?>" href="<?php echo esc_url( kiswani_product_map_href( $group['id'], $tab_section['label']['en'] ) ); ?>">
						<img src="<?php echo esc_url( $theme_uri . '/assets' . $tab_section['image'] ); ?>" alt="<?php echo esc_attr( $tab_section['label']['en'] ); ?>" decoding="async">
						<span class="ks-catalog-tab__scrim"></span>
						<span class="ks-catalog-tab__foot"><span class="ks-catalog-tab__name"><?php echo esc_html( $tab_section['label']['en'] ); ?></span><span class="ks-catalog-tab__arrow"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></span>
					</a>
				<?php endforeach; ?>
			</div>

			<?php if ( $section ) : ?>
			<div class="ks-catalog-items">
				<div class="ks-catalog-items__row">
					<a class="ks-catalog-item-all<?php echo $item ? '' : ' is-active'; ?>" href="<?php echo esc_url( kiswani_product_map_href( $group['id'], $section['label']['en'] ) ); ?>">All</a>
					<?php foreach ( $section['items'] as $map_item ) : ?>
						<?php $item_active = $item && $map_item['label']['en'] === $item['label']['en']; ?>
						<a class="ks-catalog-item<?php echo $item_active ? ' is-active' : ''; ?>" href="<?php echo esc_url( kiswani_product_map_href( $group['id'], $section['label']['en'], $map_item['label']['en'] ) ); ?>">
							<span class="ks-catalog-item__thumb"><img src="<?php echo esc_url( $theme_uri . '/assets' . $map_item['image'] ); ?>" alt="" decoding="async"></span>
							<span class="ks-catalog-item__name"><?php echo esc_html( $map_item['label']['en'] ); ?></span>
						</a>
					<?php endforeach; ?>
				</div>
			</div>
			<?php endif; ?>
		</div>
	</section>
	<?php endif; ?>

	<section class="ks-catalog-products" id="collection-products">
		<div>
			<header>
				<div><div class="ks-catalog-products-kicker"><span></span><p>PRODUCTS</p></div><h2><?php echo esc_html( $grid_title ); ?></h2></div>
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
			<div class="ks-catalog-empty"<?php echo $products ? ' hidden' : ''; ?>>
				<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
				<p>No products match your search.</p>
				<button type="button" data-ks-catalog-clear>Clear search</button>
			</div>
		</div>
	</section>

	<section class="ks-catalog-cta" id="contact">
		<div><div><p>PROJECT SUPPORT</p><h2>Need help choosing the right light?</h2></div><a href="<?php echo esc_url( home_url( '/#contact' ) ); ?>"><span>Talk to Kiswani</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a></div>
	</section>
</main>
<?php
get_footer( 'source' );
