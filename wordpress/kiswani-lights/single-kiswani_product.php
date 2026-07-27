<?php
/**
 * Product detail template.
 *
 * @package KiswaniLights
 */

get_header();
the_post();
$post_id = get_the_ID();
$sku = kiswani_product_meta($post_id, 'sku');
$specs = kiswani_product_specs($post_id);
$datasheet = kiswani_product_meta($post_id, 'datasheet_url');
$terms = get_the_terms($post_id, 'kiswani_product_collection');
$collection = !is_wp_error($terms) && !empty($terms) ? $terms[0] : null;
?>
<main id="main">
    <section class="kl-product-single">
        <div class="kl-wrap">
            <nav class="kl-breadcrumbs" aria-label="<?php esc_attr_e('Breadcrumbs', 'kiswani-lights'); ?>">
                <a href="<?php echo esc_url(home_url('/')); ?>"><?php esc_html_e('Home', 'kiswani-lights'); ?></a>
                <span>/</span>
                <a href="<?php echo esc_url(get_post_type_archive_link('kiswani_product')); ?>"><?php esc_html_e('Products', 'kiswani-lights'); ?></a>
                <?php if ($collection instanceof WP_Term) : ?>
                    <span>/</span><a href="<?php echo esc_url(get_term_link($collection)); ?>"><?php echo esc_html($collection->name); ?></a>
                <?php endif; ?>
                <span>/</span><span><?php the_title(); ?></span>
            </nav>
            <div class="kl-product-hero">
                <div class="kl-product-hero__media">
                    <div class="kl-product-hero__image">
                        <?php if (has_post_thumbnail()) : ?>
                            <?php the_post_thumbnail('full'); ?>
                        <?php else : ?>
                            <img src="<?php echo kiswani_asset('images/kiswani-hero-2026.webp'); ?>" alt="">
                        <?php endif; ?>
                    </div>
                </div>
                <div class="kl-product-hero__summary">
                    <div>
                        <p class="kl-kicker"><?php echo esc_html($collection instanceof WP_Term ? $collection->name : __('Kiswani product', 'kiswani-lights')); ?></p>
                        <h1><?php the_title(); ?></h1>
                        <?php if ($sku) : ?><p><strong><?php echo esc_html($sku); ?></strong></p><?php endif; ?>
                        <div><?php the_excerpt(); ?></div>
                        <?php if ($specs) : ?>
                            <dl class="kl-spec-grid">
                                <?php foreach (array_slice($specs, 0, 4) as [$label, $value]) : ?>
                                    <div><dt><?php echo esc_html($label); ?></dt><dd><?php echo esc_html($value); ?></dd></div>
                                <?php endforeach; ?>
                            </dl>
                        <?php endif; ?>
                    </div>
                    <div class="kl-actions">
                        <a class="kl-button" href="<?php echo esc_url(kiswani_whatsapp_url($post_id)); ?>" target="_blank" rel="noreferrer"><?php esc_html_e('Ask about it', 'kiswani-lights'); ?></a>
                        <?php if ($datasheet) : ?>
                            <a class="kl-button kl-button--outline" href="<?php echo esc_url($datasheet); ?>"><?php esc_html_e('Datasheet PDF', 'kiswani-lights'); ?></a>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="kl-section kl-section--paper">
        <div class="kl-wrap">
            <div class="kl-section-header">
                <p class="kl-kicker"><?php esc_html_e('Product data', 'kiswani-lights'); ?></p>
                <h2><?php esc_html_e('Precise details for a confident decision.', 'kiswani-lights'); ?></h2>
            </div>
            <?php if ($specs) : ?>
                <div class="kl-spec-table">
                    <?php foreach ($specs as $index => [$label, $value]) : ?>
                        <div class="kl-spec-row"><span><?php echo esc_html(sprintf('%02d', $index + 1)); ?></span><span><?php echo esc_html($label); ?></span><strong><?php echo esc_html($value); ?></strong></div>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
            <div class="entry-content"><?php the_content(); ?></div>
        </div>
    </section>
</main>
<?php
get_footer();
