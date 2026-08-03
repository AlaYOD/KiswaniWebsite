<?php
/**
 * Product detail page.
 *
 * @package KiswaniLights
 */
get_header();
while (have_posts()) : the_post();
    $product = kiswani_current_static_product(get_post()) ?: [
        'name' => get_the_title(),
        'code' => kiswani_product_meta(get_the_ID(), 'sku'),
        'description' => get_the_excerpt(),
        'category' => __('Lighting', 'kiswani-lights'),
        'categorySlug' => '',
        'price' => kiswani_product_meta(get_the_ID(), 'price'),
        'image' => '/images/kiswani-hero-2026.webp',
        'specs' => kiswani_product_specs(get_the_ID()),
    ];
    $name = (string) ($product['name'] ?? get_the_title());
    $code = (string) ($product['code'] ?? '');
    $image = (string) ($product['image'] ?? '/images/kiswani-hero-2026.webp');
    $description = (string) ($product['description'] ?? get_the_excerpt());
    $category = (string) ($product['category'] ?? __('Lighting', 'kiswani-lights'));
    $category_slug = (string) ($product['categorySlug'] ?? '');
    $specs = is_array($product['specs'] ?? null) ? $product['specs'] : kiswani_product_specs(get_the_ID());
    $datasheet = kiswani_product_meta(get_the_ID(), 'datasheet_url') ?: kiswani_asset('downloads/' . $code . '.pdf');
    $related = kiswani_related_products($product);
?>
<main id="primary">
    <section class="kl-product-single">
        <div class="kl-wrap">
            <div class="kl-breadcrumbs">
                <a href="<?php echo esc_url(home_url('/')); ?>"><?php esc_html_e('Home', 'kiswani-lights'); ?></a><span>/</span>
                <a href="<?php echo esc_url(home_url('/products/')); ?>"><?php esc_html_e('Products', 'kiswani-lights'); ?></a><span>/</span>
                <?php if ($category_slug) : ?><a href="<?php echo esc_url(kiswani_collection_url($category_slug)); ?>"><?php echo esc_html($category); ?></a><span>/</span><?php endif; ?>
                <span><?php echo esc_html($name); ?></span>
            </div>
            <div class="kl-product-hero">
                <div class="kl-product-hero__media">
                    <div class="kl-product-hero__image">
                        <img src="<?php echo esc_url(kiswani_asset_path($image)); ?>" alt="<?php echo esc_attr($name); ?>">
                        <?php if ($code) : ?><span class="kl-product-code"><?php echo esc_html($code); ?></span><?php endif; ?>
                    </div>
                </div>
                <div class="kl-product-hero__summary">
                    <div>
                        <?php if ($category_slug) : ?><a class="kl-back-link" href="<?php echo esc_url(kiswani_collection_url($category_slug)); ?>"><?php echo esc_html($category); ?></a><?php endif; ?>
                        <h1><?php echo esc_html($name); ?></h1>
                        <p><?php echo esc_html($description); ?></p>
                        <?php if (!empty($product['price'])) : ?>
                            <div class="kl-price-block"><span><?php esc_html_e('Initial catalog price', 'kiswani-lights'); ?></span><strong><?php echo esc_html(kiswani_format_price($product['price'])); ?></strong><small><?php esc_html_e('Final price and availability are confirmed with the Kiswani team.', 'kiswani-lights'); ?></small></div>
                        <?php endif; ?>
                        <?php if (!empty($specs)) : ?>
                            <dl class="kl-spec-grid">
                                <?php foreach (array_slice($specs, 0, 4) as $spec) : ?>
                                    <div><dt><?php echo esc_html((string) ($spec[0] ?? '')); ?></dt><dd><?php echo esc_html((string) ($spec[1] ?? '')); ?></dd></div>
                                <?php endforeach; ?>
                            </dl>
                        <?php endif; ?>
                    </div>
                    <div class="kl-product-actions">
                        <a class="kl-button" href="<?php echo esc_url(kiswani_whatsapp_url(get_the_ID())); ?>" target="_blank" rel="noreferrer"><?php esc_html_e('Ask about it', 'kiswani-lights'); ?></a>
                        <?php if ($code) : ?><a class="kl-button kl-button--outline" href="<?php echo esc_url($datasheet); ?>" download><?php esc_html_e('Datasheet PDF', 'kiswani-lights'); ?></a><?php endif; ?>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <?php if (!empty($specs)) : ?>
        <section class="kl-section kl-section--paper">
            <div class="kl-wrap kl-product-data-grid">
                <div class="kl-section-header"><p class="kl-kicker"><?php esc_html_e('Product data', 'kiswani-lights'); ?></p><h2><?php esc_html_e('Precise details for a confident decision.', 'kiswani-lights'); ?></h2><p><?php esc_html_e('Review the essential specifications and share the data sheet with your designer or contractor.', 'kiswani-lights'); ?></p></div>
                <div class="kl-spec-table">
                    <?php foreach ($specs as $index => $spec) : ?>
                        <div class="kl-spec-row"><span><?php echo esc_html(sprintf('%02d', $index + 1)); ?></span><span><?php echo esc_html((string) ($spec[0] ?? '')); ?></span><strong><?php echo esc_html((string) ($spec[1] ?? '')); ?></strong></div>
                    <?php endforeach; ?>
                </div>
            </div>
        </section>
    <?php endif; ?>

    <?php if (!empty($related)) : ?>
        <section class="kl-section">
            <div class="kl-wrap">
                <div class="kl-section-header"><p class="kl-kicker"><?php esc_html_e('Related lighting', 'kiswani-lights'); ?></p><h2><?php esc_html_e('From the same collection', 'kiswani-lights'); ?></h2></div>
                <div class="kl-product-grid"><?php foreach ($related as $item) : kiswani_product_card_from_data($item); endforeach; ?></div>
            </div>
        </section>
    <?php endif; ?>

    <section class="kl-section kl-section--yellow">
        <div class="kl-wrap kl-cta-row"><h2><?php esc_html_e('Want this fixture in a complete lighting plan?', 'kiswani-lights'); ?></h2><a class="kl-button kl-button--dark" href="<?php echo esc_url(kiswani_whatsapp_url(get_the_ID())); ?>" target="_blank" rel="noreferrer"><?php esc_html_e('Talk to an advisor', 'kiswani-lights'); ?></a></div>
    </section>
</main>
<?php endwhile; get_footer(); ?>