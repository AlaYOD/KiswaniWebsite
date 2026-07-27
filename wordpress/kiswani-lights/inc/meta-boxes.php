<?php
/**
 * Native product CMS fields. Works without ACF.
 *
 * @package KiswaniLights
 */

if (!defined('ABSPATH')) {
    exit;
}

const KISWANI_PRODUCT_FIELDS = [
    'sku' => 'Model / SKU',
    'name_ar' => 'Arabic name',
    'short_ar' => 'Arabic short description',
    'wattage' => 'Wattage',
    'voltage' => 'Voltage',
    'lumens' => 'Lumen output',
    'cct' => 'Color temperature',
    'beam_angle' => 'Beam angle',
    'cri' => 'CRI',
    'ip_rating' => 'IP rating',
    'finish' => 'Finish',
    'dimensions' => 'Dimensions',
    'installation' => 'Installation type',
    'availability' => 'Availability / inquiry state',
    'datasheet_url' => 'Datasheet URL',
    'whatsapp_message' => 'WhatsApp inquiry text',
];

add_action('add_meta_boxes', 'kiswani_add_product_meta_boxes');
function kiswani_add_product_meta_boxes(): void
{
    add_meta_box(
        'kiswani_product_specs',
        __('Product specifications', 'kiswani-lights'),
        'kiswani_render_product_meta_box',
        'kiswani_product',
        'normal',
        'high'
    );
}

function kiswani_render_product_meta_box(WP_Post $post): void
{
    wp_nonce_field('kiswani_save_product_meta', 'kiswani_product_meta_nonce');
    echo '<div class="kiswani-admin-grid">';
    foreach (KISWANI_PRODUCT_FIELDS as $key => $label) {
        $value = get_post_meta($post->ID, '_kiswani_' . $key, true);
        printf(
            '<p><label for="kiswani_%1$s"><strong>%2$s</strong></label><input class="widefat" id="kiswani_%1$s" name="kiswani_product[%1$s]" type="text" value="%3$s"></p>',
            esc_attr($key),
            esc_html($label),
            esc_attr((string) $value)
        );
    }
    echo '</div><p class="description">Leave fields empty when the specification does not apply. Empty rows are hidden on the public product page.</p>';
}

add_action('save_post_kiswani_product', 'kiswani_save_product_meta');
function kiswani_save_product_meta(int $post_id): void
{
    if (!isset($_POST['kiswani_product_meta_nonce']) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['kiswani_product_meta_nonce'])), 'kiswani_save_product_meta')) {
        return;
    }
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    $input = isset($_POST['kiswani_product']) && is_array($_POST['kiswani_product'])
        ? wp_unslash($_POST['kiswani_product'])
        : [];

    foreach (KISWANI_PRODUCT_FIELDS as $key => $label) {
        $value = isset($input[$key]) ? sanitize_text_field((string) $input[$key]) : '';
        if ($value === '') {
            delete_post_meta($post_id, '_kiswani_' . $key);
        } else {
            update_post_meta($post_id, '_kiswani_' . $key, $value);
        }
    }
}
