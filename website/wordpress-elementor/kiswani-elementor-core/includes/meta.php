<?php
/**
 * Meta field registration.
 *
 * @package KiswaniElementorCore
 */

if (!defined('ABSPATH')) {
    exit;
}

function kiswani_register_meta_fields(): void
{
    $product_fields = [
        'code' => 'string',
        'price' => 'number',
        'name_ar' => 'string',
        'name_he' => 'string',
        'category_label' => 'string',
        'category_label_ar' => 'string',
        'category_slug' => 'string',
        'description_ar' => 'string',
        'description_he' => 'string',
        'gallery' => 'array',
        'datasheet' => 'string',
        'specs' => 'array',
        'featured' => 'boolean',
        'sort_order' => 'number',
    ];

    foreach ($product_fields as $key => $type) {
        register_post_meta('kiswani_product', '_kiswani_' . $key, [
            'type' => $type,
            'single' => true,
            'show_in_rest' => true,
            'sanitize_callback' => $type === 'array' ? null : 'sanitize_text_field',
            'auth_callback' => static fn(): bool => current_user_can('edit_posts'),
        ]);
    }

    $order_fields = [
        'customer_email',
        'customer_whatsapp',
        'customer_location',
        'project_type',
        'notes',
        'language',
        'total_pieces',
        'subtotal',
        'status',
        'admin_note',
        'whatsapp_message',
        'line_items',
    ];

    foreach ($order_fields as $key) {
        register_post_meta('kiswani_order', '_kiswani_' . $key, [
            'type' => $key === 'line_items' ? 'array' : 'string',
            'single' => true,
            'show_in_rest' => false,
            'auth_callback' => static fn(): bool => current_user_can('manage_options'),
        ]);
    }
}

