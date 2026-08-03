<?php
/**
 * Product catalog archive.
 *
 * @package KiswaniLights
 */
get_header();
$query = isset($_GET['s']) ? sanitize_text_field(wp_unslash($_GET['s'])) : '';
$products = kiswani_static_products();
if ($query !== '') {
    $products = array_values(array_filter($products, static fn(array $product): bool => kiswani_product_matches($product, $query)));
}
?>
<main id="primary">
    <section class="kl-page-hero kl-page-hero--dark">
        <div class="kl-wrap">
            <p class="kl-kicker"><?php esc_html_e('Kiswani catalog', 'kiswani-lights'); ?></p>
            <h1><?php esc_html_e('All products', 'kiswani-lights'); ?></h1>
            <p><?php esc_html_e('Browse decorative lighting, accent fixtures, and technical product families available through Kiswani Lights.', 'kiswani-lights'); ?></p>
            <form class="kl-catalog-search" method="get" action="<?php echo esc_url(home_url('/products/')); ?>">
                <label class="screen-reader-text" for="kl-product-search"><?php esc_html_e('Search products', 'kiswani-lights'); ?></label>
                <input id="kl-product-search" type="search" name="s" value="<?php echo esc_attr($query); ?>" placeholder="<?php esc_attr_e('Search by name, code, or category', 'kiswani-lights'); ?>">
                <button class="kl-button" type="submit"><?php esc_html_e('Search', 'kiswani-lights'); ?></button>
            </form>
        </div>
    </section>

    <section class="kl-section">
        <div class="kl-wrap">
            <div class="kl-collection-tabs">
                <?php foreach (kiswani_static_categories() as $category) : ?>
                    <a href="<?php echo esc_url(kiswani_collection_url((string) ($category['slug'] ?? ''))); ?>"><?php echo esc_html((string) ($category['name'] ?? 'Lighting')); ?></a>
                <?php endforeach; ?>
            </div>

            <?php if (!empty($products)) : ?>
                <div class="kl-product-grid">
                    <?php foreach ($products as $product) : kiswani_product_card_from_data($product); endforeach; ?>
                </div>
            <?php else : ?>
                <div class="kl-empty-state">
                    <h2><?php esc_html_e('No products found.', 'kiswani-lights'); ?></h2>
                    <a class="kl-button kl-button--dark" href="<?php echo esc_url(home_url('/products/')); ?>"><?php esc_html_e('Clear search', 'kiswani-lights'); ?></a>
                </div>
            <?php endif; ?>
        </div>
    </section>
</main>
<?php get_footer(); ?>