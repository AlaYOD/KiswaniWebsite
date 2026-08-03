<?php
/**
 * Front-end catalog manager for trusted WordPress administrators.
 *
 * @package KiswaniLights
 */

if (!defined('ABSPATH')) {
    exit;
}

function kiswani_catalog_manager_url(): string
{
    $page = get_page_by_path('catalog-manager');
    return $page instanceof WP_Post ? get_permalink($page) : home_url('/catalog-manager/');
}

add_action('after_switch_theme', 'kiswani_create_catalog_manager_page');
function kiswani_create_catalog_manager_page(): void
{
    $page = get_page_by_path('catalog-manager');
    if ($page instanceof WP_Post) {
        update_post_meta($page->ID, '_wp_page_template', 'page-catalog-manager.php');
        return;
    }

    $page_id = wp_insert_post([
        'post_type' => 'page',
        'post_status' => 'publish',
        'post_title' => 'Catalog Manager',
        'post_name' => 'catalog-manager',
        'post_content' => '',
    ]);

    if ($page_id && !is_wp_error($page_id)) {
        update_post_meta((int) $page_id, '_wp_page_template', 'page-catalog-manager.php');
    }
}


add_action('init', 'kiswani_maybe_upgrade_native_catalog', 20);
function kiswani_maybe_upgrade_native_catalog(): void
{
    if (get_option('kiswani_native_catalog_version') === KISWANI_THEME_VERSION) {
        return;
    }

    kiswani_create_catalog_manager_page();
    kiswani_seed_default_terms();
    kiswani_seed_default_products();
    update_option('kiswani_native_catalog_version', KISWANI_THEME_VERSION, false);
    flush_rewrite_rules(false);
}
function kiswani_catalog_manager_can_access(): bool
{
    return is_user_logged_in() && current_user_can('manage_options');
}

function kiswani_catalog_manager_handle_actions(): ?WP_Error
{
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        return null;
    }

    $action = isset($_POST['kiswani_manager_action']) ? sanitize_key(wp_unslash($_POST['kiswani_manager_action'])) : '';

    if ($action === 'login') {
        if (!isset($_POST['kiswani_login_nonce']) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['kiswani_login_nonce'])), 'kiswani_catalog_login')) {
            return new WP_Error('kiswani_bad_nonce', __('Session expired. Please try again.', 'kiswani-lights'));
        }

        $credentials = [
            'user_login' => isset($_POST['log']) ? sanitize_user(wp_unslash($_POST['log'])) : '',
            'user_password' => isset($_POST['pwd']) ? (string) wp_unslash($_POST['pwd']) : '',
            'remember' => !empty($_POST['rememberme']),
        ];
        $user = wp_signon($credentials, is_ssl());
        if (is_wp_error($user)) {
            return $user;
        }
        wp_safe_redirect(kiswani_catalog_manager_url());
        exit;
    }

    if (!kiswani_catalog_manager_can_access()) {
        return new WP_Error('kiswani_forbidden', __('Only WordPress administrators can manage the catalog.', 'kiswani-lights'));
    }

    if (!isset($_POST['kiswani_manager_nonce']) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['kiswani_manager_nonce'])), 'kiswani_catalog_manager')) {
        return new WP_Error('kiswani_bad_nonce', __('Session expired. Please try again.', 'kiswani-lights'));
    }

    if ($action === 'save_product') {
        $result = kiswani_catalog_manager_save_product();
        if (is_wp_error($result)) {
            return $result;
        }
        wp_safe_redirect(add_query_arg(['updated' => 'product', 'edit_product' => (int) $result], kiswani_catalog_manager_url()) . '#products');
        exit;
    }

    if ($action === 'trash_product') {
        $post_id = isset($_POST['product_id']) ? absint($_POST['product_id']) : 0;
        if ($post_id && get_post_type($post_id) === 'kiswani_product') {
            wp_trash_post($post_id);
        }
        wp_safe_redirect(add_query_arg('updated', 'trashed', kiswani_catalog_manager_url()) . '#products');
        exit;
    }

    if ($action === 'save_term') {
        $result = kiswani_catalog_manager_save_term();
        if (is_wp_error($result)) {
            return $result;
        }
        wp_safe_redirect(add_query_arg(['updated' => 'term', 'edit_term' => (int) $result], kiswani_catalog_manager_url()) . '#collections');
        exit;
    }

    if ($action === 'seed_catalog') {
        kiswani_seed_default_terms();
        kiswani_seed_default_products();
        wp_safe_redirect(add_query_arg('updated', 'seeded', kiswani_catalog_manager_url()));
        exit;
    }

    return null;
}

function kiswani_catalog_manager_save_product()
{
    $post_id = isset($_POST['product_id']) ? absint($_POST['product_id']) : 0;
    $title = isset($_POST['product_title']) ? sanitize_text_field(wp_unslash($_POST['product_title'])) : '';
    if ($title === '') {
        return new WP_Error('kiswani_missing_title', __('Product name is required.', 'kiswani-lights'));
    }

    $excerpt = isset($_POST['product_excerpt']) ? sanitize_textarea_field(wp_unslash($_POST['product_excerpt'])) : '';
    $content = isset($_POST['product_content']) ? wp_kses_post(wp_unslash($_POST['product_content'])) : '';
    $sku = isset($_POST['product_sku']) ? sanitize_text_field(wp_unslash($_POST['product_sku'])) : '';

    $post_data = [
        'post_type' => 'kiswani_product',
        'post_status' => 'publish',
        'post_title' => $title,
        'post_excerpt' => $excerpt,
        'post_content' => $content ?: '<p>' . esc_html($excerpt) . '</p>',
    ];

    if ($post_id && get_post_type($post_id) === 'kiswani_product') {
        $post_data['ID'] = $post_id;
        $saved_id = wp_update_post($post_data, true);
    } else {
        if ($sku !== '') {
            $post_data['post_name'] = strtolower($sku);
        }
        $saved_id = wp_insert_post($post_data, true);
    }

    if (is_wp_error($saved_id)) {
        return $saved_id;
    }

    $saved_id = (int) $saved_id;
    update_post_meta($saved_id, '_kiswani_sku', $sku);
    update_post_meta($saved_id, '_kiswani_price', isset($_POST['product_price']) ? sanitize_text_field(wp_unslash($_POST['product_price'])) : '');

    foreach (KISWANI_PRODUCT_FIELDS as $key => $label) {
        if (in_array($key, ['sku'], true)) {
            continue;
        }
        $field_name = 'product_' . $key;
        $value = isset($_POST[$field_name]) ? sanitize_text_field(wp_unslash($_POST[$field_name])) : '';
        if ($value === '') {
            delete_post_meta($saved_id, '_kiswani_' . $key);
        } else {
            update_post_meta($saved_id, '_kiswani_' . $key, $value);
        }
    }

    $term_ids = isset($_POST['product_terms']) && is_array($_POST['product_terms'])
        ? array_map('absint', wp_unslash($_POST['product_terms']))
        : [];
    wp_set_object_terms($saved_id, array_filter($term_ids), 'kiswani_product_collection');

    if (!empty($_FILES['product_image']['name'])) {
        require_once ABSPATH . 'wp-admin/includes/file.php';
        require_once ABSPATH . 'wp-admin/includes/media.php';
        require_once ABSPATH . 'wp-admin/includes/image.php';
        $attachment_id = media_handle_upload('product_image', $saved_id);
        if (!is_wp_error($attachment_id)) {
            set_post_thumbnail($saved_id, (int) $attachment_id);
        }
    }

    return $saved_id;
}

function kiswani_catalog_manager_save_term()
{
    $term_id = isset($_POST['term_id']) ? absint($_POST['term_id']) : 0;
    $name = isset($_POST['term_name']) ? sanitize_text_field(wp_unslash($_POST['term_name'])) : '';
    if ($name === '') {
        return new WP_Error('kiswani_missing_term_name', __('Name is required.', 'kiswani-lights'));
    }

    $parent = isset($_POST['term_parent']) ? absint($_POST['term_parent']) : 0;
    $description = isset($_POST['term_description']) ? sanitize_textarea_field(wp_unslash($_POST['term_description'])) : '';
    $slug = isset($_POST['term_slug']) ? sanitize_title(wp_unslash($_POST['term_slug'])) : '';
    $args = [
        'description' => $description,
        'parent' => $parent,
    ];
    if ($slug !== '') {
        $args['slug'] = $slug;
    }

    if ($term_id) {
        $result = wp_update_term($term_id, 'kiswani_product_collection', $args + ['name' => $name]);
    } else {
        $result = wp_insert_term($name, 'kiswani_product_collection', $args);
    }

    if (is_wp_error($result)) {
        return $result;
    }

    $saved_id = (int) ($result['term_id'] ?? $term_id);
    $type = isset($_POST['term_type']) ? sanitize_key(wp_unslash($_POST['term_type'])) : 'category';
    $image = isset($_POST['term_image']) ? esc_url_raw(wp_unslash($_POST['term_image'])) : '';
    update_term_meta($saved_id, '_kiswani_term_type', $type);
    update_term_meta($saved_id, '_kiswani_term_image', $image);

    return $saved_id;
}

function kiswani_catalog_manager_terms(): array
{
    $terms = get_terms([
        'taxonomy' => 'kiswani_product_collection',
        'hide_empty' => false,
        'orderby' => 'name',
        'order' => 'ASC',
    ]);
    return is_wp_error($terms) ? [] : $terms;
}

function kiswani_catalog_manager_products(): array
{
    return get_posts([
        'post_type' => 'kiswani_product',
        'post_status' => ['publish', 'draft', 'pending'],
        'posts_per_page' => -1,
        'orderby' => 'title',
        'order' => 'ASC',
    ]);
}

function kiswani_catalog_manager_term_options(int $selected = 0, int $exclude = 0): void
{
    echo '<option value="0">' . esc_html__('No parent', 'kiswani-lights') . '</option>';
    foreach (kiswani_catalog_manager_terms() as $term) {
        if ((int) $term->term_id === $exclude) {
            continue;
        }
        printf(
            '<option value="%1$d" %2$s>%3$s</option>',
            (int) $term->term_id,
            selected($selected, (int) $term->term_id, false),
            esc_html($term->name)
        );
    }
}