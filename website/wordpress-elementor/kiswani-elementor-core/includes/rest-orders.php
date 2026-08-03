<?php
/**
 * Order REST routes.
 *
 * @package KiswaniElementorCore
 */

if (!defined('ABSPATH')) {
    exit;
}

function kiswani_register_order_rest_routes(): void
{
    register_rest_route('kiswani/v1', '/orders', [
        'methods' => WP_REST_Server::CREATABLE,
        'permission_callback' => '__return_true',
        'callback' => 'kiswani_rest_create_order',
    ]);

    register_rest_route('kiswani/v1', '/admin/orders', [
        'methods' => WP_REST_Server::READABLE,
        'permission_callback' => static fn(): bool => current_user_can('manage_options'),
        'callback' => 'kiswani_rest_list_orders',
    ]);

    register_rest_route('kiswani/v1', '/admin/orders/(?P<id>\d+)', [
        'methods' => WP_REST_Server::EDITABLE,
        'permission_callback' => static fn(): bool => current_user_can('manage_options'),
        'callback' => 'kiswani_rest_update_order',
    ]);
}

function kiswani_rest_create_order(WP_REST_Request $request): WP_REST_Response
{
    $payload = (array) $request->get_json_params();
    $name = sanitize_text_field((string) ($payload['name'] ?? ''));
    $email = sanitize_email((string) ($payload['email'] ?? ''));
    $whatsapp = sanitize_text_field((string) ($payload['whatsapp'] ?? ''));
    $location = sanitize_text_field((string) ($payload['location'] ?? ''));
    $lines = is_array($payload['lines'] ?? null) ? $payload['lines'] : [];

    if ($name === '' || $email === '' || $whatsapp === '' || $location === '') {
        return new WP_REST_Response(['error' => __('Name, email, WhatsApp number, and location are required.', 'kiswani-elementor-core')], 400);
    }
    if (empty($lines)) {
        return new WP_REST_Response(['error' => __('Order must include at least one product.', 'kiswani-elementor-core')], 400);
    }

    $clean_lines = [];
    $total_pieces = 0;
    $subtotal = 0;

    foreach ($lines as $line) {
        if (!is_array($line)) {
            continue;
        }
        $code = sanitize_text_field((string) ($line['code'] ?? ''));
        $quantity = max(1, (int) ($line['quantity'] ?? 0));
        $product = kiswani_find_product_by_code($code);
        if (!$product) {
            continue;
        }
        $unit_price = (int) get_post_meta($product->ID, '_kiswani_price', true);
        $line_total = $unit_price * $quantity;
        $clean_lines[] = [
            'productCode' => $code,
            'productName' => get_the_title($product),
            'quantity' => $quantity,
            'unitPrice' => $unit_price,
            'lineTotal' => $line_total,
        ];
        $total_pieces += $quantity;
        $subtotal += $line_total;
    }

    if (empty($clean_lines)) {
        return new WP_REST_Response(['error' => __('Order contains an invalid product or quantity.', 'kiswani-elementor-core')], 400);
    }

    $order_id = wp_insert_post([
        'post_type' => 'kiswani_order',
        'post_status' => 'publish',
        'post_title' => sprintf('Order - %s - %s', $name, current_time('mysql')),
    ], true);

    if (is_wp_error($order_id)) {
        return new WP_REST_Response(['error' => $order_id->get_error_message()], 500);
    }

    update_post_meta($order_id, '_kiswani_customer_email', $email);
    update_post_meta($order_id, '_kiswani_customer_whatsapp', $whatsapp);
    update_post_meta($order_id, '_kiswani_customer_location', $location);
    update_post_meta($order_id, '_kiswani_project_type', sanitize_text_field((string) ($payload['projectType'] ?? '')));
    update_post_meta($order_id, '_kiswani_notes', sanitize_textarea_field((string) ($payload['notes'] ?? '')));
    update_post_meta($order_id, '_kiswani_language', sanitize_text_field((string) ($payload['language'] ?? 'en')));
    update_post_meta($order_id, '_kiswani_total_pieces', (string) $total_pieces);
    update_post_meta($order_id, '_kiswani_subtotal', (string) $subtotal);
    update_post_meta($order_id, '_kiswani_status', 'new');
    update_post_meta($order_id, '_kiswani_admin_note', '');
    update_post_meta($order_id, '_kiswani_whatsapp_message', sanitize_textarea_field((string) ($payload['whatsappMessage'] ?? '')));
    update_post_meta($order_id, '_kiswani_line_items', $clean_lines);

    return new WP_REST_Response(['orderId' => $order_id], 201);
}

function kiswani_rest_list_orders(): WP_REST_Response
{
    $orders = get_posts([
        'post_type' => 'kiswani_order',
        'post_status' => 'publish',
        'numberposts' => 100,
        'orderby' => 'date',
        'order' => 'DESC',
    ]);

    return new WP_REST_Response(['orders' => array_map('kiswani_prepare_order_response', $orders)], 200);
}

function kiswani_rest_update_order(WP_REST_Request $request): WP_REST_Response
{
    $order_id = (int) $request['id'];
    if (get_post_type($order_id) !== 'kiswani_order') {
        return new WP_REST_Response(['error' => __('Order not found.', 'kiswani-elementor-core')], 404);
    }

    $payload = (array) $request->get_json_params();
    $status = sanitize_key((string) ($payload['status'] ?? 'new'));
    $allowed = ['new', 'contacted', 'approved', 'fulfilled', 'cancelled'];
    if (!in_array($status, $allowed, true)) {
        return new WP_REST_Response(['error' => __('Invalid order status.', 'kiswani-elementor-core')], 400);
    }

    update_post_meta($order_id, '_kiswani_status', $status);
    update_post_meta($order_id, '_kiswani_admin_note', sanitize_textarea_field((string) ($payload['adminNote'] ?? '')));

    return new WP_REST_Response(['order' => kiswani_prepare_order_response(get_post($order_id))], 200);
}

function kiswani_find_product_by_code(string $code): ?WP_Post
{
    $matches = get_posts([
        'post_type' => 'kiswani_product',
        'post_status' => 'publish',
        'numberposts' => 1,
        'meta_key' => '_kiswani_code',
        'meta_value' => $code,
    ]);

    return $matches[0] ?? null;
}

function kiswani_prepare_order_response(?WP_Post $order): array
{
    if (!$order) {
        return [];
    }

    return [
        'id' => $order->ID,
        'customerName' => $order->post_title,
        'customerEmail' => (string) get_post_meta($order->ID, '_kiswani_customer_email', true),
        'customerWhatsapp' => (string) get_post_meta($order->ID, '_kiswani_customer_whatsapp', true),
        'customerLocation' => (string) get_post_meta($order->ID, '_kiswani_customer_location', true),
        'projectType' => (string) get_post_meta($order->ID, '_kiswani_project_type', true),
        'notes' => (string) get_post_meta($order->ID, '_kiswani_notes', true),
        'language' => (string) get_post_meta($order->ID, '_kiswani_language', true),
        'totalPieces' => (int) get_post_meta($order->ID, '_kiswani_total_pieces', true),
        'subtotal' => (int) get_post_meta($order->ID, '_kiswani_subtotal', true),
        'status' => (string) get_post_meta($order->ID, '_kiswani_status', true),
        'adminNote' => (string) get_post_meta($order->ID, '_kiswani_admin_note', true),
        'whatsappMessage' => (string) get_post_meta($order->ID, '_kiswani_whatsapp_message', true),
        'createdAt' => get_post_time(DATE_ATOM, true, $order),
        'updatedAt' => get_post_modified_time(DATE_ATOM, true, $order),
        'items' => (array) get_post_meta($order->ID, '_kiswani_line_items', true),
    ];
}

