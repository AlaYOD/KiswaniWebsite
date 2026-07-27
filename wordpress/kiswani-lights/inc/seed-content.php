<?php
/**
 * Optional seed content for a fresh WordPress install.
 *
 * @package KiswaniLights
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('after_switch_theme', 'kiswani_seed_default_terms');
function kiswani_seed_default_terms(): void
{
    $terms = [
        'decorative' => ['Decorative lighting', 'Statement pieces that give the room its character.'],
        'interior' => ['Interior lighting', 'Warm, considered light for everyday living.'],
        'technical' => ['Technical lighting', 'Precise systems for architectural performance.'],
        'accent' => ['Accent lighting', 'Focused moments that reveal material and mood.'],
    ];

    foreach ($terms as $slug => [$name, $description]) {
        if (!term_exists($slug, 'kiswani_product_collection')) {
            wp_insert_term($name, 'kiswani_product_collection', [
                'slug' => $slug,
                'description' => $description,
            ]);
        }
    }
}

add_action('after_switch_theme', 'kiswani_seed_default_products');
function kiswani_seed_default_products(): void
{
    if (get_posts(['post_type' => 'kiswani_product', 'posts_per_page' => 1, 'fields' => 'ids'])) {
        return;
    }

    $products = [
        ['Halo Chandelier', 'decorative', 'KL-HC-120', 'Layered glass and warm illumination for a confident, timeless centerpiece.', '96W', '3000K', '', '', '', '1200mm', 'Suspended', 'kiswani-decorative-2026.webp'],
        ['Luma Tier', 'decorative', 'KL-LT-860', 'A refined tiered chandelier that brings a soft architectural rhythm to reception spaces.', '', '3000K', '', '', 'Smoke glass', '', 'Suspended', 'kiswani-decorative-2026.webp'],
        ['Prism Cluster', 'decorative', 'KL-PC-450', 'A compact glass composition designed for entrances, lounges, and intimate dining rooms.', '', '3000K', '', '', 'Black', '', 'Suspended', 'kiswani-decorative-2026.webp'],
        ['Flow Linear', 'interior', 'KL-FL-240', 'A flowing pendant that turns the dining table into a calm visual center.', '48W', '3000K', '', '90+', 'Black', '', 'Suspended', 'kiswani-hero-2026.webp'],
        ['Orbit Floor', 'interior', 'KL-OF-180', 'A slender floor light for reading corners and softly layered living spaces.', '', '3000K', '', '', 'Graphite', '', 'Floor', 'kiswani-hero-2026.webp'],
        ['Cove Wall', 'interior', 'KL-CW-320', 'A quiet wall light that washes textured surfaces with comfortable indirect light.', '12W', '3000K', 'Indirect', '', 'Warm black', '', 'Wall', 'kiswani-hero-2026.webp'],
        ['Axis Seven', 'technical', 'KL-AS-700', 'Seven suspended light points create an architectural rhythm over long surfaces.', '7 x 8W', '2700K-4000K', '', '95', '', '', 'Suspended', 'kiswani-technical-2026.webp'],
        ['Beam Track', 'technical', 'KL-BT-035', 'A flexible track spotlight for precise highlights and changing architectural layouts.', '35W', '3000K', '24°', '90+', '', '', 'Track', 'kiswani-technical-2026.webp'],
        ['Recess Pro', 'technical', 'KL-RP-018', 'A discreet recessed downlight engineered for visual comfort and consistent performance.', '18W', '3000K', '', '90+', '', '95mm cutout', 'Recessed', 'kiswani-technical-2026.webp'],
        ['Aura Pendant', 'accent', 'KL-AP-140', 'A luminous stone-like pendant that creates an intimate pool of bedside light.', '12W', '2700K', '', '', 'Black', '', 'Suspended', 'kiswani-accent-2026.webp'],
        ['Line Wall', 'accent', 'KL-LW-600', 'A slim wall line that reveals texture without adding visual noise.', '18W', '3000K', '', '', '', '600mm', 'Wall', 'kiswani-accent-2026.webp'],
        ['Mini Focus', 'accent', 'KL-MF-009', 'A compact adjustable spotlight for artwork, shelves, and material details.', '9W', '3000K', '18°', '95', '', '', 'Adjustable spotlight', 'kiswani-accent-2026.webp'],
    ];

    foreach ($products as [$title, $collection_slug, $sku, $excerpt, $wattage, $cct, $beam, $cri, $finish, $dimensions, $installation, $image]) {
        $post_id = wp_insert_post([
            'post_type' => 'kiswani_product',
            'post_status' => 'publish',
            'post_title' => $title,
            'post_name' => strtolower($sku),
            'post_excerpt' => $excerpt,
            'post_content' => '<p>' . esc_html__('Confirm final technical data with the product supplier before publishing live catalog information.', 'kiswani-lights') . '</p>',
        ]);

        if (is_wp_error($post_id) || !$post_id) {
            continue;
        }

        wp_set_object_terms($post_id, $collection_slug, 'kiswani_product_collection');

        $meta = [
            'sku' => $sku,
            'wattage' => $wattage,
            'cct' => $cct,
            'beam_angle' => $beam,
            'cri' => $cri,
            'finish' => $finish,
            'dimensions' => $dimensions,
            'installation' => $installation,
            'availability' => __('Inquiry', 'kiswani-lights'),
            'datasheet_url' => KISWANI_THEME_URI . '/assets/downloads/' . $sku . '.pdf',
        ];
        foreach ($meta as $key => $value) {
            if ($value !== '') {
                update_post_meta($post_id, '_kiswani_' . $key, $value);
            }
        }

        $attachment_id = kiswani_seed_attachment($image);
        if ($attachment_id) {
            set_post_thumbnail($post_id, $attachment_id);
        }
    }
}

function kiswani_seed_attachment(string $file_name): int
{
    $existing = get_posts([
        'post_type' => 'attachment',
        'posts_per_page' => 1,
        'fields' => 'ids',
        'meta_key' => '_kiswani_seed_asset',
        'meta_value' => $file_name,
    ]);
    if (!empty($existing)) {
        return (int) $existing[0];
    }

    $source = KISWANI_THEME_DIR . '/assets/images/' . $file_name;
    if (!file_exists($source)) {
        return 0;
    }

    $upload = wp_upload_bits($file_name, null, file_get_contents($source));
    if (!empty($upload['error'])) {
        return 0;
    }

    $attachment_id = wp_insert_attachment([
        'post_mime_type' => wp_check_filetype($upload['file'])['type'] ?: 'image/webp',
        'post_title' => sanitize_file_name(pathinfo($file_name, PATHINFO_FILENAME)),
        'post_content' => '',
        'post_status' => 'inherit',
    ], $upload['file']);

    if (!$attachment_id || is_wp_error($attachment_id)) {
        return 0;
    }

    require_once ABSPATH . 'wp-admin/includes/image.php';
    $metadata = wp_generate_attachment_metadata($attachment_id, $upload['file']);
    wp_update_attachment_metadata($attachment_id, $metadata);
    update_post_meta($attachment_id, '_kiswani_seed_asset', $file_name);
    return (int) $attachment_id;
}
