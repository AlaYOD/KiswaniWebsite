<?php
/**
 * Front-end helpers.
 *
 * @package KiswaniLights
 */

if (!defined('ABSPATH')) {
    exit;
}

function kiswani_asset(string $path): string
{
    return esc_url(KISWANI_THEME_URI . '/assets/' . ltrim($path, '/'));
}

function kiswani_asset_path(string $source): string
{
    $source = strtok($source, '?') ?: $source;
    $source = ltrim($source, '/');

    if (str_starts_with($source, 'images/')) {
        return kiswani_asset($source);
    }
    if (str_starts_with($source, 'downloads/')) {
        return kiswani_asset($source);
    }
    return esc_url($source);
}

function kiswani_logo_url(bool $white = false): string
{
    $file = $white ? 'images/kiswani-logo-since-1994.png' : 'images/kiswani-logo.png';
    return kiswani_asset($file);
}

function kiswani_slugify(string $value): string
{
    return sanitize_title($value);
}

function kiswani_product_slug(array $product): string
{
    return strtolower((string) ($product['code'] ?? kiswani_slugify((string) ($product['name'] ?? 'product'))));
}

function kiswani_product_url(array $product): string
{
    return home_url('/products/' . kiswani_product_slug($product) . '/');
}

function kiswani_collection_url(string $slug): string
{
    return home_url('/collections/' . sanitize_title($slug) . '/');
}

function kiswani_product_meta(int $post_id, string $key): string
{
    return trim((string) get_post_meta($post_id, '_kiswani_' . $key, true));
}

function kiswani_format_price($price): string
{
    return number_format((float) $price, 0) . ' ₪';
}

function kiswani_get_category(string $slug): ?array
{
    foreach (kiswani_static_categories() as $category) {
        if (($category['slug'] ?? '') === $slug) {
            return $category;
        }
    }
    return null;
}

function kiswani_get_product_map_group(string $slug): ?array
{
    foreach (kiswani_static_product_map_groups() as $group) {
        if (($group['id'] ?? '') === $slug) {
            return $group;
        }
    }
    return null;
}

function kiswani_get_product(string $slug): ?array
{
    $slug = strtolower($slug);
    foreach (kiswani_static_products() as $product) {
        if (strtolower((string) ($product['code'] ?? '')) === $slug || kiswani_product_slug($product) === $slug) {
            return $product;
        }
    }
    return null;
}

function kiswani_products_by_category(string $slug): array
{
    return array_values(array_filter(kiswani_static_products(), static function (array $product) use ($slug): bool {
        return ($product['categorySlug'] ?? '') === $slug;
    }));
}

function kiswani_related_products(array $product, int $limit = 3): array
{
    $related = [];
    foreach (kiswani_static_products() as $candidate) {
        if (($candidate['categorySlug'] ?? '') === ($product['categorySlug'] ?? '') && ($candidate['code'] ?? '') !== ($product['code'] ?? '')) {
            $related[] = $candidate;
        }
        if (count($related) >= $limit) {
            break;
        }
    }
    return $related;
}

function kiswani_product_matches(array $product, string $needle): bool
{
    $needle = strtolower(trim($needle));
    if ($needle === '') {
        return true;
    }
    $haystack = strtolower(implode(' ', [
        $product['name'] ?? '',
        $product['arabic'] ?? '',
        $product['category'] ?? '',
        $product['categoryAr'] ?? '',
        $product['code'] ?? '',
        $product['description'] ?? '',
        $product['descriptionAr'] ?? '',
    ]));
    return str_contains($haystack, $needle);
}

function kiswani_filter_products_for_map(array $group, ?string $category, ?string $subcategory): array
{
    $products = kiswani_static_products();
    $active_section = null;
    $active_item = null;

    foreach (($group['sections'] ?? []) as $section) {
        if (($section['label']['en'] ?? '') === $category) {
            $active_section = $section;
            break;
        }
    }

    if ($active_section && $subcategory) {
        foreach (($active_section['items'] ?? []) as $item) {
            if (($item['label']['en'] ?? '') === $subcategory) {
                $active_item = $item;
                break;
            }
        }
    }

    if ($active_item) {
        $needles = [$active_item['search'] ?? '', $active_item['label']['en'] ?? ''];
        $matched = array_values(array_filter($products, static function (array $product) use ($needles): bool {
            foreach ($needles as $needle) {
                if (kiswani_product_matches($product, $needle)) {
                    return true;
                }
            }
            return false;
        }));
        return $matched ?: $products;
    }

    if ($active_section) {
        $needles = [];
        foreach (($active_section['items'] ?? []) as $item) {
            $needles[] = $item['search'] ?? '';
            $needles[] = $item['label']['en'] ?? '';
        }
        $matched = array_values(array_filter($products, static function (array $product) use ($needles): bool {
            foreach ($needles as $needle) {
                if (kiswani_product_matches($product, $needle)) {
                    return true;
                }
            }
            return false;
        }));
        return $matched ?: $products;
    }

    return $products;
}

function kiswani_current_static_product(?WP_Post $post = null): ?array
{
    $post = $post ?: get_post();
    if (!$post instanceof WP_Post) {
        return null;
    }
    $sku = kiswani_product_meta($post->ID, 'sku');
    return kiswani_get_product($sku ?: $post->post_name);
}

function kiswani_product_specs(int $post_id): array
{
    $static = kiswani_current_static_product(get_post($post_id));
    if ($static && !empty($static['specs']) && is_array($static['specs'])) {
        return $static['specs'];
    }

    $map = [
        'sku' => __('Model / SKU', 'kiswani-lights'),
        'wattage' => __('Wattage', 'kiswani-lights'),
        'voltage' => __('Voltage', 'kiswani-lights'),
        'lumens' => __('Lumen output', 'kiswani-lights'),
        'cct' => __('Color temperature', 'kiswani-lights'),
        'beam_angle' => __('Beam angle', 'kiswani-lights'),
        'cri' => __('CRI', 'kiswani-lights'),
        'ip_rating' => __('IP rating', 'kiswani-lights'),
        'finish' => __('Finish', 'kiswani-lights'),
        'dimensions' => __('Dimensions', 'kiswani-lights'),
        'installation' => __('Installation', 'kiswani-lights'),
        'availability' => __('Availability', 'kiswani-lights'),
    ];

    $specs = [];
    foreach ($map as $key => $label) {
        $value = kiswani_product_meta($post_id, $key);
        if ($value !== '') {
            $specs[] = [$label, $value];
        }
    }
    return $specs;
}

function kiswani_product_card_from_data(array $product): void
{
    $name = (string) ($product['name'] ?? 'Kiswani product');
    $code = (string) ($product['code'] ?? '');
    $category = (string) ($product['category'] ?? 'Lighting');
    $image = (string) ($product['image'] ?? '/images/kiswani-hero-2026.webp');
    ?>
    <article class="kl-product-card">
        <a href="<?php echo esc_url(kiswani_product_url($product)); ?>" class="kl-product-card__media" aria-label="<?php echo esc_attr($name); ?>">
            <img src="<?php echo esc_url(kiswani_asset_path($image)); ?>" alt="<?php echo esc_attr($name); ?>" loading="lazy">
            <?php if ($code) : ?><span><?php echo esc_html($code); ?></span><?php endif; ?>
        </a>
        <div class="kl-product-card__body">
            <p><?php echo esc_html($category); ?></p>
            <h3><a href="<?php echo esc_url(kiswani_product_url($product)); ?>"><?php echo esc_html($name); ?></a></h3>
            <?php if (!empty($product['description'])) : ?>
                <div class="kl-product-card__excerpt"><?php echo esc_html((string) $product['description']); ?></div>
            <?php endif; ?>
        </div>
    </article>
    <?php
}

function kiswani_product_card(?WP_Post $post = null): void
{
    $static = kiswani_current_static_product($post ?: get_post());
    if ($static) {
        kiswani_product_card_from_data($static);
        return;
    }

    $post = $post ?: get_post();
    if (!$post instanceof WP_Post) {
        return;
    }
    $post_id = $post->ID;
    $sku = kiswani_product_meta($post_id, 'sku') ?: get_the_title($post_id);
    $terms = get_the_terms($post_id, 'kiswani_product_collection');
    $collection = !is_wp_error($terms) && !empty($terms) ? $terms[0]->name : __('Lighting', 'kiswani-lights');
    ?>
    <article class="kl-product-card">
        <a href="<?php echo esc_url(get_permalink($post_id)); ?>" class="kl-product-card__media" aria-label="<?php echo esc_attr(get_the_title($post_id)); ?>">
            <?php if (has_post_thumbnail($post_id)) : ?>
                <?php echo get_the_post_thumbnail($post_id, 'large', ['loading' => 'lazy']); ?>
            <?php else : ?>
                <img src="<?php echo kiswani_asset('images/kiswani-hero-2026.webp'); ?>" alt="">
            <?php endif; ?>
            <span><?php echo esc_html($sku); ?></span>
        </a>
        <div class="kl-product-card__body">
            <p><?php echo esc_html($collection); ?></p>
            <h3><a href="<?php echo esc_url(get_permalink($post_id)); ?>"><?php echo esc_html(get_the_title($post_id)); ?></a></h3>
            <?php if (has_excerpt($post_id)) : ?>
                <div class="kl-product-card__excerpt"><?php echo esc_html(get_the_excerpt($post_id)); ?></div>
            <?php endif; ?>
        </div>
    </article>
    <?php
}

function kiswani_whatsapp_url(int $post_id): string
{
    $product = kiswani_current_static_product(get_post($post_id));
    $message = kiswani_product_meta($post_id, 'whatsapp_message');
    if ($message === '') {
        $title = $product['name'] ?? get_the_title($post_id);
        $sku = $product['code'] ?? kiswani_product_meta($post_id, 'sku');
        $message = sprintf('Hello Kiswani Lights, I am interested in %s%s.', $title, $sku ? ' (' . $sku . ')' : '');
    }
    return 'https://wa.me/970599671209?text=' . rawurlencode($message);
}

function kiswani_fallback_primary_menu(): void
{
    $links = [
        [__('Collections', 'kiswani-lights'), home_url('/#collections')],
        [__('Products', 'kiswani-lights'), home_url('/products/')],
        [__('Projects', 'kiswani-lights'), home_url('/projects/')],
        [__('Contact', 'kiswani-lights'), home_url('/#contact')],
    ];

    foreach ($links as [$label, $url]) {
        printf('<a href="%s">%s</a>', esc_url($url), esc_html($label));
    }
}