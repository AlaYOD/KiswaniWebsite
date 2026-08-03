<?php
/**
 * Shared rendering helpers for Elementor widgets.
 *
 * @package KiswaniElementorCore
 */

if (!defined('ABSPATH')) {
    exit;
}

function kiswani_elementor_language(): string
{
    $language = isset($_GET['lang']) ? sanitize_key((string) wp_unslash($_GET['lang'])) : 'en';
    return in_array($language, ['en', 'ar', 'he'], true) ? $language : 'en';
}

function kiswani_elementor_is_rtl(string $language): bool
{
    return in_array($language, ['ar', 'he'], true);
}

function kiswani_elementor_text(string $language, string $english, string $arabic = '', string $hebrew = ''): string
{
    if ($language === 'ar' && $arabic !== '') {
        return $arabic;
    }
    if ($language === 'he' && $hebrew !== '') {
        return $hebrew;
    }
    return $english;
}

function kiswani_elementor_asset_url(string $path): string
{
    $path = ltrim($path, '/');
    if (str_starts_with($path, 'images/') || str_starts_with($path, 'downloads/')) {
        return KISWANI_ELEMENTOR_CORE_URL . 'assets/' . $path;
    }
    return KISWANI_ELEMENTOR_CORE_URL . 'assets/' . $path;
}

function kiswani_elementor_term_label(WP_Term $term, string $language = 'en'): string
{
    if ($language === 'ar') {
        $value = (string) get_term_meta($term->term_id, '_kiswani_label_ar', true);
        return $value !== '' ? $value : $term->name;
    }
    if ($language === 'he') {
        $value = (string) get_term_meta($term->term_id, '_kiswani_label_he', true);
        return $value !== '' ? $value : $term->name;
    }
    return $term->name;
}

function kiswani_elementor_term_image(WP_Term $term): string
{
    $image = (string) get_term_meta($term->term_id, '_kiswani_image', true);
    return $image !== '' ? kiswani_elementor_asset_url($image) : kiswani_elementor_asset_url('images/editorial/hero-interior.webp');
}

function kiswani_elementor_term_source(WP_Term $term): string
{
    return (string) get_term_meta($term->term_id, '_kiswani_source_type', true);
}

function kiswani_elementor_terms_by_source(string $source_type, int $parent = 0): array
{
    $terms = get_terms([
        'taxonomy' => 'kiswani_collection',
        'hide_empty' => false,
        'parent' => $parent,
        'meta_query' => [
            [
                'key' => '_kiswani_source_type',
                'value' => $source_type,
            ],
        ],
    ]);

    return is_wp_error($terms) ? [] : $terms;
}

function kiswani_elementor_collection_from_request(?string $fallback_slug = null): ?WP_Term
{
    $queried = get_queried_object();
    if ($queried instanceof WP_Term && $queried->taxonomy === 'kiswani_collection') {
        return $queried;
    }

    $slug = $fallback_slug ?: (isset($_GET['collection']) ? sanitize_title((string) wp_unslash($_GET['collection'])) : '');
    if ($slug === '') {
        return null;
    }

    $term = get_term_by('slug', $slug, 'kiswani_collection');
    return $term instanceof WP_Term ? $term : null;
}

function kiswani_elementor_product_matches(WP_Post $product, array $needles): bool
{
    $haystack = strtolower(implode(' ', array_filter([
        get_the_title($product),
        (string) get_post_meta($product->ID, '_kiswani_code', true),
        (string) get_post_meta($product->ID, '_kiswani_category_label', true),
        (string) get_post_meta($product->ID, '_kiswani_category_label_ar', true),
        (string) get_post_meta($product->ID, '_kiswani_description_ar', true),
        $product->post_excerpt,
        $product->post_content,
    ])));

    foreach ($needles as $needle) {
        $needle = strtolower(trim((string) $needle));
        if ($needle !== '' && str_contains($haystack, $needle)) {
            return true;
        }
    }

    return false;
}

function kiswani_elementor_products_for_collection(?WP_Term $term = null, string $query = '', int $limit = -1): array
{
    $args = [
        'post_type' => 'kiswani_product',
        'post_status' => 'publish',
        'numberposts' => $limit,
        'orderby' => 'menu_order title',
        'order' => 'ASC',
    ];

    if ($term && kiswani_elementor_term_source($term) === 'category') {
        $args['tax_query'] = [
            [
                'taxonomy' => 'kiswani_collection',
                'field' => 'term_id',
                'terms' => [$term->term_id],
                'include_children' => false,
            ],
        ];
    }

    $products = get_posts($args);

    if ($term && in_array(kiswani_elementor_term_source($term), ['product_map_section', 'product_map_item'], true)) {
        $needles = [];
        if (kiswani_elementor_term_source($term) === 'product_map_item') {
            $needles[] = get_term_meta($term->term_id, '_kiswani_search', true);
            $needles[] = $term->name;
        } else {
            $children = get_terms([
                'taxonomy' => 'kiswani_collection',
                'hide_empty' => false,
                'parent' => $term->term_id,
            ]);
            if (!is_wp_error($children)) {
                foreach ($children as $child) {
                    $needles[] = get_term_meta($child->term_id, '_kiswani_search', true);
                    $needles[] = $child->name;
                }
            }
        }
        $matched = array_values(array_filter($products, static fn(WP_Post $product): bool => kiswani_elementor_product_matches($product, $needles)));
        if (!empty($matched)) {
            $products = $matched;
        }
    }

    if ($query !== '') {
        $products = array_values(array_filter($products, static fn(WP_Post $product): bool => kiswani_elementor_product_matches($product, [$query])));
    }

    return $products;
}

function kiswani_elementor_product_gallery(WP_Post $product): array
{
    $gallery = get_post_meta($product->ID, '_kiswani_gallery', true);
    $images = is_array($gallery) ? array_values(array_filter(array_map('strval', $gallery))) : [];

    if (empty($images) && has_post_thumbnail($product)) {
        $images[] = (string) get_the_post_thumbnail_url($product, 'full');
    }

    return $images;
}

function kiswani_elementor_format_price(int $price): string
{
    return number_format($price, 0) . ' ILS';
}

function kiswani_render_product_card(WP_Post $product, bool $mobile_list = true): void
{
    $code = (string) get_post_meta($product->ID, '_kiswani_code', true);
    $price = (int) get_post_meta($product->ID, '_kiswani_price', true);
    $category = (string) get_post_meta($product->ID, '_kiswani_category_label', true);
    $class = $mobile_list ? ' kiswani-product-card--mobile-list' : '';
    ?>
    <article class="kiswani-product-card<?php echo esc_attr($class); ?>">
        <a class="kiswani-product-card__media" href="<?php echo esc_url(get_permalink($product)); ?>">
            <?php if (has_post_thumbnail($product)) : ?>
                <?php echo get_the_post_thumbnail($product, 'large', ['loading' => 'lazy']); ?>
            <?php endif; ?>
            <span class="kiswani-product-card__line" aria-hidden="true"></span>
        </a>
        <div class="kiswani-product-card__body">
            <p class="kiswani-product-card__category"><?php echo esc_html($category ?: __('Lighting', 'kiswani-elementor-core')); ?></p>
            <h3 class="kiswani-product-card__title"><a href="<?php echo esc_url(get_permalink($product)); ?>"><?php echo esc_html(get_the_title($product)); ?></a></h3>
            <?php if ($code !== '') : ?>
                <p class="kiswani-product-card__code"><?php echo esc_html($code); ?></p>
            <?php endif; ?>
            <?php if ($price > 0) : ?>
                <p class="kiswani-product-card__price"><?php echo esc_html(kiswani_elementor_format_price($price)); ?></p>
            <?php endif; ?>
            <div class="kiswani-product-card__footer">
                <button type="button" class="kiswani-button" data-kiswani-cart-add="<?php echo esc_attr($code); ?>"><?php esc_html_e('Add to cart', 'kiswani-elementor-core'); ?></button>
            </div>
        </div>
    </article>
    <?php
}

function kiswani_elementor_product_payload(array $products): array
{
    return array_map(static function (WP_Post $product): array {
        $code = (string) get_post_meta($product->ID, '_kiswani_code', true);
        return [
            'id' => $product->ID,
            'code' => $code,
            'name' => get_the_title($product),
            'price' => (int) get_post_meta($product->ID, '_kiswani_price', true),
            'url' => get_permalink($product),
            'image' => has_post_thumbnail($product) ? get_the_post_thumbnail_url($product, 'medium_large') : '',
        ];
    }, $products);
}
