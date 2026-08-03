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
    foreach (kiswani_static_categories() as $category) {
        kiswani_upsert_catalog_term(
            (string) ($category['name'] ?? 'Lighting'),
            (string) ($category['slug'] ?? ''),
            (string) ($category['detail'] ?? ''),
            0,
            'category',
            (string) ($category['image'] ?? '')
        );
    }

    foreach (kiswani_static_product_map_groups() as $group) {
        $group_id = kiswani_upsert_catalog_term(
            (string) ($group['label']['en'] ?? 'Collection'),
            (string) ($group['id'] ?? ''),
            (string) ($group['description']['en'] ?? ''),
            0,
            'collection',
            (string) ($group['image'] ?? '')
        );

        foreach (($group['sections'] ?? []) as $section) {
            $section_name = (string) ($section['label']['en'] ?? 'Category');
            $section_slug = sanitize_title(($group['id'] ?? 'collection') . '-' . $section_name);
            $section_id = kiswani_upsert_catalog_term(
                $section_name,
                $section_slug,
                '',
                $group_id,
                'category',
                (string) ($section['image'] ?? '')
            );

            foreach (($section['items'] ?? []) as $item) {
                $item_name = (string) ($item['label']['en'] ?? 'Sub category');
                $item_slug = sanitize_title($section_slug . '-' . $item_name);
                kiswani_upsert_catalog_term(
                    $item_name,
                    $item_slug,
                    (string) ($item['search'] ?? ''),
                    $section_id,
                    'subcategory',
                    (string) ($item['image'] ?? '')
                );
            }
        }
    }
}

function kiswani_upsert_catalog_term(string $name, string $slug, string $description = '', int $parent = 0, string $type = 'category', string $image = ''): int
{
    $slug = sanitize_title($slug ?: $name);
    if ($slug === '') {
        return 0;
    }

    $term = get_term_by('slug', $slug, 'kiswani_product_collection');
    if ($term instanceof WP_Term) {
        wp_update_term($term->term_id, 'kiswani_product_collection', [
            'name' => $name,
            'description' => $description,
            'parent' => $parent,
        ]);
        $term_id = (int) $term->term_id;
    } else {
        $result = wp_insert_term($name, 'kiswani_product_collection', [
            'slug' => $slug,
            'description' => $description,
            'parent' => $parent,
        ]);
        if (is_wp_error($result)) {
            return 0;
        }
        $term_id = (int) ($result['term_id'] ?? 0);
    }

    if ($term_id) {
        update_term_meta($term_id, '_kiswani_term_type', $type);
        update_term_meta($term_id, '_kiswani_term_image', $image);
    }
    return $term_id;
}

add_action('after_switch_theme', 'kiswani_seed_default_products');
function kiswani_seed_default_products(): void
{
    kiswani_seed_default_terms();

    foreach (kiswani_static_products() as $product) {
        $code = (string) ($product['code'] ?? '');
        if ($code === '') {
            continue;
        }

        $existing = get_posts([
            'post_type' => 'kiswani_product',
            'post_status' => 'any',
            'posts_per_page' => 1,
            'fields' => 'ids',
            'meta_key' => '_kiswani_sku',
            'meta_value' => $code,
        ]);

        if (!empty($existing)) {
            continue;
        }

        $post_id = wp_insert_post([
            'post_type' => 'kiswani_product',
            'post_status' => 'publish',
            'post_title' => (string) ($product['name'] ?? $code),
            'post_name' => strtolower($code),
            'post_excerpt' => (string) ($product['description'] ?? ''),
            'post_content' => '<p>' . esc_html((string) ($product['description'] ?? '')) . '</p>',
        ]);

        if (is_wp_error($post_id) || !$post_id) {
            continue;
        }

        $collection_slug = (string) ($product['categorySlug'] ?? '');
        if ($collection_slug !== '') {
            wp_set_object_terms($post_id, $collection_slug, 'kiswani_product_collection');
        }

        update_post_meta($post_id, '_kiswani_sku', $code);
        update_post_meta($post_id, '_kiswani_name_ar', (string) ($product['arabic'] ?? ''));
        update_post_meta($post_id, '_kiswani_short_ar', (string) ($product['descriptionAr'] ?? ''));
        update_post_meta($post_id, '_kiswani_availability', __('Inquiry', 'kiswani-lights'));
        update_post_meta($post_id, '_kiswani_datasheet_url', KISWANI_THEME_URI . '/assets/downloads/' . $code . '.pdf');
        update_post_meta($post_id, '_kiswani_price', (string) ($product['price'] ?? ''));

        $specs = is_array($product['specs'] ?? null) ? $product['specs'] : [];
        foreach ($specs as $spec) {
            if (!is_array($spec) || count($spec) < 2) {
                continue;
            }
            $label = strtolower((string) $spec[0]);
            $value = (string) $spec[1];
            $field = match (true) {
                str_contains($label, 'power'), str_contains($label, 'watt') => 'wattage',
                str_contains($label, 'temperature'), str_contains($label, 'cct') => 'cct',
                str_contains($label, 'beam') => 'beam_angle',
                str_contains($label, 'cri') => 'cri',
                str_contains($label, 'finish'), str_contains($label, 'body') => 'finish',
                str_contains($label, 'diameter'), str_contains($label, 'height'), str_contains($label, 'length'), str_contains($label, 'size'), str_contains($label, 'dimension') => 'dimensions',
                str_contains($label, 'installation'), str_contains($label, 'socket') => 'installation',
                default => '',
            };
            if ($field !== '' && kiswani_product_meta($post_id, $field) === '') {
                update_post_meta($post_id, '_kiswani_' . $field, $value);
            }
        }

        $attachment_id = kiswani_seed_attachment_from_source((string) ($product['image'] ?? ''));
        if ($attachment_id) {
            set_post_thumbnail($post_id, $attachment_id);
        }
    }
}

function kiswani_seed_attachment_from_source(string $source): int
{
    $source = strtok($source, '?') ?: $source;
    $relative = ltrim($source, '/');
    if (!str_starts_with($relative, 'images/')) {
        return 0;
    }

    $file_name = basename($relative);
    $existing = get_posts([
        'post_type' => 'attachment',
        'posts_per_page' => 1,
        'fields' => 'ids',
        'meta_key' => '_kiswani_seed_asset',
        'meta_value' => $relative,
    ]);
    if (!empty($existing)) {
        return (int) $existing[0];
    }

    $source_file = KISWANI_THEME_DIR . '/assets/' . $relative;
    if (!file_exists($source_file)) {
        return 0;
    }

    $upload = wp_upload_bits($file_name, null, file_get_contents($source_file));
    if (!empty($upload['error'])) {
        return 0;
    }

    $attachment_id = wp_insert_attachment([
        'post_mime_type' => wp_check_filetype($upload['file'])['type'] ?: 'image/jpeg',
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
    update_post_meta($attachment_id, '_kiswani_seed_asset', $relative);
    return (int) $attachment_id;
}