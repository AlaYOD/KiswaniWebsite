<?php
/**
 * Collection and category page.
 *
 * @package KiswaniLights
 */
get_header();
$term = get_queried_object();
$slug = $term instanceof WP_Term ? $term->slug : '';
$group = kiswani_get_product_map_group($slug);
$category = kiswani_get_category($slug);
$active_category = isset($_GET['category']) ? sanitize_text_field(wp_unslash($_GET['category'])) : null;
$active_subcategory = isset($_GET['subcategory']) ? sanitize_text_field(wp_unslash($_GET['subcategory'])) : null;

if ($group) {
    $title = (string) ($group['label']['en'] ?? 'Collection');
    $detail = (string) ($group['description']['en'] ?? '');
    $image = (string) ($group['image'] ?? '/images/editorial/hero-interior.webp');
    $products = kiswani_filter_products_for_map($group, $active_category, $active_subcategory);
} elseif ($category) {
    $title = (string) ($category['name'] ?? 'Lighting');
    $detail = (string) ($category['detail'] ?? '');
    $image = (string) ($category['image'] ?? '/images/editorial/hero-interior.webp');
    $products = kiswani_products_by_category($slug);
} else {
    $title = single_term_title('', false);
    $detail = term_description();
    $image = '/images/editorial/hero-interior.webp';
    $products = kiswani_static_products();
}
?>
<main id="primary">
    <section class="kl-collection-hero">
        <div class="kl-wrap kl-collection-hero__grid">
            <div class="kl-collection-hero__copy">
                <a class="kl-back-link" href="<?php echo esc_url(home_url('/#collections')); ?>"><?php esc_html_e('Back to collections', 'kiswani-lights'); ?></a>
                <p class="kl-kicker"><?php echo esc_html($group ? __('Product collection', 'kiswani-lights') : __('Kiswani collection', 'kiswani-lights')); ?></p>
                <h1><?php echo esc_html($title); ?></h1>
                <p><?php echo wp_kses_post($detail); ?></p>
                <div class="kl-actions"><a class="kl-button" href="#collection-products"><?php esc_html_e('Browse products', 'kiswani-lights'); ?></a><span class="kl-count"><?php echo esc_html(count($products)); ?> <?php esc_html_e('products', 'kiswani-lights'); ?></span></div>
            </div>
            <div class="kl-collection-hero__image"><img src="<?php echo esc_url(kiswani_asset_path($image)); ?>" alt="<?php echo esc_attr($title); ?>"></div>
        </div>
    </section>

    <nav class="kl-collection-nav" aria-label="<?php esc_attr_e('Collections', 'kiswani-lights'); ?>">
        <div class="kl-wrap">
            <?php foreach (kiswani_static_product_map_groups() as $item) : $item_slug = (string) ($item['id'] ?? ''); ?>
                <a class="<?php echo $item_slug === $slug ? 'is-active' : ''; ?>" href="<?php echo esc_url(kiswani_collection_url($item_slug)); ?>"><?php echo esc_html((string) ($item['label']['en'] ?? 'Collection')); ?></a>
            <?php endforeach; ?>
            <?php foreach (kiswani_static_categories() as $item) : $item_slug = (string) ($item['slug'] ?? ''); ?>
                <a class="<?php echo $item_slug === $slug ? 'is-active' : ''; ?>" href="<?php echo esc_url(kiswani_collection_url($item_slug)); ?>"><?php echo esc_html((string) ($item['name'] ?? 'Lighting')); ?></a>
            <?php endforeach; ?>
        </div>
    </nav>

    <?php if ($group) : ?>
        <section class="kl-map-tabs">
            <div class="kl-wrap">
                <div class="kl-map-tabs__sections">
                    <a class="<?php echo !$active_category ? 'is-active' : ''; ?>" href="<?php echo esc_url(kiswani_collection_url($slug)); ?>"><?php esc_html_e('All products', 'kiswani-lights'); ?></a>
                    <?php foreach (($group['sections'] ?? []) as $section) :
                        $section_label = (string) ($section['label']['en'] ?? '');
                        $section_url = add_query_arg('category', $section_label, kiswani_collection_url($slug));
                    ?>
                        <a class="<?php echo $active_category === $section_label ? 'is-active' : ''; ?>" href="<?php echo esc_url($section_url); ?>">
                            <?php echo esc_html($section_label); ?>
                        </a>
                    <?php endforeach; ?>
                </div>
                <?php foreach (($group['sections'] ?? []) as $section) :
                    $section_label = (string) ($section['label']['en'] ?? '');
                    if ($active_category !== $section_label) {
                        continue;
                    }
                ?>
                    <div class="kl-map-tabs__items">
                        <a class="<?php echo !$active_subcategory ? 'is-active' : ''; ?>" href="<?php echo esc_url(add_query_arg('category', $section_label, kiswani_collection_url($slug))); ?>"><?php esc_html_e('All', 'kiswani-lights'); ?></a>
                        <?php foreach (($section['items'] ?? []) as $item) :
                            $item_label = (string) ($item['label']['en'] ?? '');
                            $url = add_query_arg([
                                'category' => $section_label,
                                'subcategory' => $item_label,
                            ], kiswani_collection_url($slug));
                        ?>
                            <a class="<?php echo $active_subcategory === $item_label ? 'is-active' : ''; ?>" href="<?php echo esc_url($url); ?>"><?php echo esc_html($item_label); ?></a>
                        <?php endforeach; ?>
                    </div>
                <?php endforeach; ?>
            </div>
        </section>
    <?php endif; ?>

    <section id="collection-products" class="kl-section">
        <div class="kl-wrap">
            <div class="kl-section-header"><p class="kl-kicker"><?php esc_html_e('Products', 'kiswani-lights'); ?></p><h2><?php echo esc_html($active_subcategory ?: ($active_category ?: $title)); ?></h2></div>
            <?php if (!empty($products)) : ?>
                <div class="kl-product-grid">
                    <?php foreach ($products as $product) : kiswani_product_card_from_data($product); endforeach; ?>
                </div>
            <?php else : ?>
                <div class="kl-empty-state"><h2><?php esc_html_e('No products in this collection yet.', 'kiswani-lights'); ?></h2></div>
            <?php endif; ?>
        </div>
    </section>

    <section class="kl-section kl-section--yellow">
        <div class="kl-wrap kl-cta-row"><h2><?php esc_html_e('Need help choosing the right light?', 'kiswani-lights'); ?></h2><a class="kl-button kl-button--dark" href="<?php echo esc_url(home_url('/#contact')); ?>"><?php esc_html_e('Talk to Kiswani', 'kiswani-lights'); ?></a></div>
    </section>
</main>
<?php get_footer(); ?>