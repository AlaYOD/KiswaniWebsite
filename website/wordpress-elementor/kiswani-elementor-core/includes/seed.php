<?php
/**
 * Catalog seed/import logic.
 *
 * @package KiswaniElementorCore
 */

if (!defined('ABSPATH')) {
    exit;
}

function kiswani_elementor_seed_catalog(): void
{
    if (get_option('kiswani_elementor_seed_version') === KISWANI_ELEMENTOR_CORE_VERSION) {
        return;
    }

    kiswani_elementor_seed_terms();
    kiswani_elementor_seed_products();
    update_option('kiswani_elementor_seed_version', KISWANI_ELEMENTOR_CORE_VERSION);
}

function kiswani_elementor_seed_terms(): void
{
    foreach (kiswani_elementor_static_categories() as $category) {
        $slug = sanitize_title((string) ($category['slug'] ?? ''));
        if (!$slug) {
            continue;
        }
        kiswani_elementor_upsert_term((string) ($category['name'] ?? $slug), $slug, 0, [
            'source_type' => 'category',
            'image' => (string) ($category['image'] ?? ''),
            'detail' => (string) ($category['detail'] ?? ''),
        ]);
    }

    foreach (kiswani_elementor_static_product_map_groups() as $group) {
        $group_slug = sanitize_title((string) ($group['id'] ?? ''));
        if (!$group_slug) {
            continue;
        }
        $group_id = kiswani_elementor_upsert_term((string) ($group['label']['en'] ?? $group_slug), $group_slug, 0, [
            'source_type' => 'product_map_group',
            'image' => (string) ($group['image'] ?? ''),
            'detail' => (string) ($group['description']['en'] ?? ''),
            'label_ar' => (string) ($group['label']['ar'] ?? ''),
            'label_he' => (string) ($group['label']['he'] ?? ''),
        ]);

        foreach (($group['sections'] ?? []) as $section) {
            $section_slug = sanitize_title((string) ($section['label']['en'] ?? ''));
            if (!$section_slug) {
                continue;
            }
            $section_id = kiswani_elementor_upsert_term((string) ($section['label']['en'] ?? $section_slug), $section_slug, $group_id, [
                'source_type' => 'product_map_section',
                'image' => (string) ($section['image'] ?? ''),
                'label_ar' => (string) ($section['label']['ar'] ?? ''),
                'label_he' => (string) ($section['label']['he'] ?? ''),
            ]);

            foreach (($section['items'] ?? []) as $item) {
                $item_slug = sanitize_title((string) ($item['label']['en'] ?? ''));
                if (!$item_slug) {
                    continue;
                }
                kiswani_elementor_upsert_term((string) ($item['label']['en'] ?? $item_slug), $item_slug, $section_id, [
                    'source_type' => 'product_map_item',
                    'image' => (string) ($item['image'] ?? ''),
                    'search' => (string) ($item['search'] ?? ''),
                    'label_ar' => (string) ($item['label']['ar'] ?? ''),
                    'label_he' => (string) ($item['label']['he'] ?? ''),
                ]);
            }
        }
    }
}

function kiswani_elementor_upsert_term(string $name, string $slug, int $parent, array $meta): int
{
    $existing = get_term_by('slug', $slug, 'kiswani_collection');
    if ($existing instanceof WP_Term) {
        wp_update_term($existing->term_id, 'kiswani_collection', [
            'name' => $name,
            'parent' => $parent,
        ]);
        $term_id = $existing->term_id;
    } else {
        $created = wp_insert_term($name, 'kiswani_collection', [
            'slug' => $slug,
            'parent' => $parent,
        ]);
        if (is_wp_error($created)) {
            return 0;
        }
        $term_id = (int) $created['term_id'];
    }

    foreach ($meta as $key => $value) {
        update_term_meta($term_id, '_kiswani_' . sanitize_key($key), $value);
    }
    return $term_id;
}

function kiswani_elementor_seed_products(): void
{
    foreach (kiswani_elementor_static_products() as $index => $product) {
        $code = sanitize_text_field((string) ($product['code'] ?? ''));
        if ($code === '') {
            continue;
        }

        $existing = kiswani_find_product_by_code($code);
        $post_data = [
            'post_type' => 'kiswani_product',
            'post_status' => 'publish',
            'post_title' => sanitize_text_field((string) ($product['name'] ?? $code)),
            'post_name' => sanitize_title(strtolower($code)),
            'post_excerpt' => sanitize_text_field((string) ($product['description'] ?? '')),
            'post_content' => wp_kses_post((string) ($product['description'] ?? '')),
            'menu_order' => $index,
        ];

        if ($existing) {
            $post_data['ID'] = $existing->ID;
            $post_id = wp_update_post($post_data, true);
        } else {
            $post_id = wp_insert_post($post_data, true);
        }

        if (is_wp_error($post_id)) {
            continue;
        }

        update_post_meta($post_id, '_kiswani_code', $code);
        update_post_meta($post_id, '_kiswani_price', (string) (int) ($product['price'] ?? 0));
        update_post_meta($post_id, '_kiswani_name_ar', sanitize_text_field((string) ($product['arabic'] ?? '')));
        update_post_meta($post_id, '_kiswani_category_label', sanitize_text_field((string) ($product['category'] ?? '')));
        update_post_meta($post_id, '_kiswani_category_label_ar', sanitize_text_field((string) ($product['categoryAr'] ?? '')));
        update_post_meta($post_id, '_kiswani_category_slug', sanitize_title((string) ($product['categorySlug'] ?? '')));
        update_post_meta($post_id, '_kiswani_description_ar', sanitize_textarea_field((string) ($product['descriptionAr'] ?? '')));
        update_post_meta($post_id, '_kiswani_specs', is_array($product['specs'] ?? null) ? $product['specs'] : []);
        update_post_meta($post_id, '_kiswani_datasheet', 'downloads/' . $code . '.pdf');
        update_post_meta($post_id, '_kiswani_sort_order', (string) $index);

        $category_slug = sanitize_title((string) ($product['categorySlug'] ?? ''));
        if ($category_slug) {
            wp_set_object_terms($post_id, [$category_slug], 'kiswani_collection', false);
        }

        kiswani_elementor_set_product_thumbnail($post_id, (string) ($product['image'] ?? ''));
    }
}

function kiswani_elementor_set_product_thumbnail(int $post_id, string $image): void
{
    if (has_post_thumbnail($post_id) || $image === '') {
        return;
    }

    $relative = ltrim($image, '/');
    $source = KISWANI_ELEMENTOR_CORE_DIR . 'assets/' . $relative;
    if (!file_exists($source)) {
        return;
    }

    require_once ABSPATH . 'wp-admin/includes/image.php';
    $filename = basename($source);
    $upload = wp_upload_bits($filename, null, file_get_contents($source));
    if (!empty($upload['error'])) {
        return;
    }

    $attachment_id = wp_insert_attachment([
        'post_mime_type' => wp_check_filetype($filename)['type'] ?: 'image/jpeg',
        'post_title' => sanitize_file_name(pathinfo($filename, PATHINFO_FILENAME)),
        'post_content' => '',
        'post_status' => 'inherit',
    ], $upload['file'], $post_id);

    if (is_wp_error($attachment_id)) {
        return;
    }

    $metadata = wp_generate_attachment_metadata($attachment_id, $upload['file']);
    wp_update_attachment_metadata($attachment_id, $metadata);
    set_post_thumbnail($post_id, $attachment_id);
}
