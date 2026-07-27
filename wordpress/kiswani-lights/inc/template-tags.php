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

function kiswani_logo_url(bool $white = false): string
{
    $file = $white ? 'images/kiswani-logo-original-white.png' : 'images/kiswani-logo.png';
    return kiswani_asset($file);
}

function kiswani_product_meta(int $post_id, string $key): string
{
    return trim((string) get_post_meta($post_id, '_kiswani_' . $key, true));
}

function kiswani_product_specs(int $post_id): array
{
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

function kiswani_product_card(?WP_Post $post = null): void
{
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
    $message = kiswani_product_meta($post_id, 'whatsapp_message');
    if ($message === '') {
        $sku = kiswani_product_meta($post_id, 'sku');
        $message = sprintf('Hello Kiswani Lights, I am interested in %s%s.', get_the_title($post_id), $sku ? ' (' . $sku . ')' : '');
    }
    return 'https://wa.me/970599671209?text=' . rawurlencode($message);
}

function kiswani_fallback_primary_menu(): void
{
    $links = [
        [__('Collections', 'kiswani-lights'), home_url('/#collections')],
        [__('Lighting types', 'kiswani-lights'), home_url('/#types')],
        [__('Projects', 'kiswani-lights'), home_url('/projects/')],
        [__('Contact', 'kiswani-lights'), home_url('/#contact')],
    ];

    foreach ($links as [$label, $url]) {
        printf('<a href="%s">%s</a>', esc_url($url), esc_html($label));
    }
}
