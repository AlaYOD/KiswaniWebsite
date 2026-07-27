<?php
/**
 * Custom content model for the Kiswani catalog.
 *
 * @package KiswaniLights
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('init', 'kiswani_register_content_types');
function kiswani_register_content_types(): void
{
    register_taxonomy('kiswani_product_collection', ['kiswani_product'], [
        'labels' => [
            'name' => __('Lighting collections', 'kiswani-lights'),
            'singular_name' => __('Lighting collection', 'kiswani-lights'),
        ],
        'hierarchical' => true,
        'public' => true,
        'show_in_rest' => true,
        'show_admin_column' => true,
        'rewrite' => ['slug' => 'collections'],
    ]);

    register_post_type('kiswani_product', [
        'labels' => [
            'name' => __('Products', 'kiswani-lights'),
            'singular_name' => __('Product', 'kiswani-lights'),
            'add_new_item' => __('Add product', 'kiswani-lights'),
            'edit_item' => __('Edit product', 'kiswani-lights'),
        ],
        'public' => true,
        'show_in_rest' => true,
        'menu_icon' => 'dashicons-lightbulb',
        'supports' => ['title', 'editor', 'excerpt', 'thumbnail', 'revisions', 'custom-fields'],
        'has_archive' => 'products',
        'rewrite' => ['slug' => 'products'],
        'taxonomies' => ['kiswani_product_collection'],
    ]);

    register_post_type('kiswani_project', [
        'labels' => [
            'name' => __('Projects', 'kiswani-lights'),
            'singular_name' => __('Project', 'kiswani-lights'),
        ],
        'public' => true,
        'show_in_rest' => true,
        'menu_icon' => 'dashicons-format-gallery',
        'supports' => ['title', 'editor', 'excerpt', 'thumbnail', 'revisions'],
        'has_archive' => 'projects',
        'rewrite' => ['slug' => 'projects'],
    ]);

    if (get_option('kiswani_flush_rewrite_rules')) {
        flush_rewrite_rules();
        delete_option('kiswani_flush_rewrite_rules');
    }
}

add_action('after_switch_theme', 'kiswani_schedule_rewrite_flush');
function kiswani_schedule_rewrite_flush(): void
{
    update_option('kiswani_flush_rewrite_rules', '1', false);
}
