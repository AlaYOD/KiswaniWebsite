<?php
/**
 * Content type registration.
 *
 * @package KiswaniElementorCore
 */

if (!defined('ABSPATH')) {
    exit;
}

function kiswani_register_content_types(): void
{
    register_post_type('kiswani_product', [
        'labels' => [
            'name' => __('Products', 'kiswani-elementor-core'),
            'singular_name' => __('Product', 'kiswani-elementor-core'),
        ],
        'public' => true,
        'has_archive' => 'products',
        'rewrite' => ['slug' => 'products'],
        'menu_icon' => 'dashicons-lightbulb',
        'supports' => ['title', 'editor', 'excerpt', 'thumbnail', 'revisions', 'page-attributes'],
        'show_in_rest' => true,
    ]);

    register_post_type('kiswani_project', [
        'labels' => [
            'name' => __('Projects', 'kiswani-elementor-core'),
            'singular_name' => __('Project', 'kiswani-elementor-core'),
        ],
        'public' => true,
        'has_archive' => 'projects',
        'rewrite' => ['slug' => 'projects'],
        'menu_icon' => 'dashicons-format-gallery',
        'supports' => ['title', 'editor', 'excerpt', 'thumbnail', 'revisions', 'page-attributes'],
        'show_in_rest' => true,
    ]);

    register_post_type('kiswani_order', [
        'labels' => [
            'name' => __('Orders', 'kiswani-elementor-core'),
            'singular_name' => __('Order', 'kiswani-elementor-core'),
        ],
        'public' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'menu_icon' => 'dashicons-cart',
        'supports' => ['title', 'custom-fields'],
        'capability_type' => 'post',
        'map_meta_cap' => true,
        'show_in_rest' => false,
    ]);

    register_taxonomy('kiswani_collection', ['kiswani_product'], [
        'labels' => [
            'name' => __('Collections', 'kiswani-elementor-core'),
            'singular_name' => __('Collection', 'kiswani-elementor-core'),
        ],
        'public' => true,
        'hierarchical' => true,
        'rewrite' => ['slug' => 'collections'],
        'show_admin_column' => true,
        'show_in_rest' => true,
    ]);
}

