<?php
/**
 * Secure local order-request storage and AJAX endpoint.
 *
 * @package Kiswani_Lights_V2
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function kiswani_register_orders() {
	register_post_type(
		'kiswani_order',
		array(
			'labels' => array(
				'name'          => __( 'Order Requests', 'kiswani-lights' ),
				'singular_name' => __( 'Order Request', 'kiswani-lights' ),
			),
			'public'       => false,
			'show_ui'      => true,
			'show_in_rest' => false,
			'menu_icon'    => 'dashicons-cart',
			'supports'     => array( 'title' ),
			'capability_type' => 'post',
		)
	);
}
add_action( 'init', 'kiswani_register_orders' );

function kiswani_submit_order() {
	check_ajax_referer( 'kiswani_checkout', 'nonce' );

	$ip        = isset( $_SERVER['REMOTE_ADDR'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) ) : 'unknown';
	$rate_key  = 'kiswani_order_rate_' . md5( $ip );
	$rate_data = get_transient( $rate_key );
	$rate_data = is_array( $rate_data ) ? $rate_data : array( 'count' => 0 );
	if ( $rate_data['count'] >= 5 ) {
		wp_send_json_error( array( 'message' => __( 'Too many attempts. Please wait before trying again.', 'kiswani-lights' ) ), 429 );
	}
	$rate_data['count']++;
	set_transient( $rate_key, $rate_data, MINUTE_IN_SECONDS );

	$name         = isset( $_POST['name'] ) ? sanitize_text_field( wp_unslash( $_POST['name'] ) ) : '';
	$phone        = isset( $_POST['phone'] ) ? sanitize_text_field( wp_unslash( $_POST['phone'] ) ) : '';
	$email        = isset( $_POST['email'] ) ? sanitize_email( wp_unslash( $_POST['email'] ) ) : '';
	$city         = isset( $_POST['city'] ) ? sanitize_text_field( wp_unslash( $_POST['city'] ) ) : '';
	$project_type = isset( $_POST['project_type'] ) ? sanitize_text_field( wp_unslash( $_POST['project_type'] ) ) : '';
	$address      = isset( $_POST['address'] ) ? sanitize_text_field( wp_unslash( $_POST['address'] ) ) : '';
	$notes        = isset( $_POST['notes'] ) ? sanitize_textarea_field( wp_unslash( $_POST['notes'] ) ) : '';
	$lines_json   = isset( $_POST['lines'] ) ? wp_unslash( $_POST['lines'] ) : '[]';
	$lines        = json_decode( $lines_json, true );

	if ( ! $name || ! $phone || ! is_email( $email ) || ! $city || ! $project_type ) {
		wp_send_json_error( array( 'message' => __( 'Please complete all required customer fields.', 'kiswani-lights' ) ), 422 );
	}
	if ( ! is_array( $lines ) || ! $lines ) {
		wp_send_json_error( array( 'message' => __( 'Your cart is empty.', 'kiswani-lights' ) ), 422 );
	}

	$clean_lines = array();
	$subtotal    = 0;
	$total_items = 0;
	foreach ( $lines as $line ) {
		$code     = isset( $line['code'] ) ? sanitize_text_field( $line['code'] ) : '';
		$quantity = isset( $line['quantity'] ) ? min( 999, max( 1, absint( $line['quantity'] ) ) ) : 0;
		$product  = $code ? kiswani_catalog_product_by_code( $code ) : null;
		if ( ! $product || ! $quantity ) {
			continue;
		}
		$price = (float) get_post_meta( $product->ID, '_kiswani_price', true );
		$clean_lines[] = array( 'code' => $code, 'name' => $product->post_title, 'quantity' => $quantity, 'unit_price' => $price, 'total' => $price * $quantity );
		$subtotal += $price * $quantity;
		$total_items += $quantity;
	}

	if ( ! $clean_lines ) {
		wp_send_json_error( array( 'message' => __( 'No valid catalog products were found in the cart.', 'kiswani-lights' ) ), 422 );
	}

	$order_id = wp_insert_post(
		array(
			'post_type'   => 'kiswani_order',
			'post_status' => 'private',
			'post_title'  => sprintf( 'Order — %s — %s', $name, current_time( 'Y-m-d H:i' ) ),
		),
		true
	);
	if ( is_wp_error( $order_id ) ) {
		wp_send_json_error( array( 'message' => __( 'Could not save the order. Please try again.', 'kiswani-lights' ) ), 500 );
	}

	foreach ( array(
		'_kiswani_order_name' => $name,
		'_kiswani_order_phone' => $phone,
		'_kiswani_order_email' => $email,
		'_kiswani_order_city' => $city,
		'_kiswani_order_project_type' => $project_type,
		'_kiswani_order_address' => $address,
		'_kiswani_order_notes' => $notes,
		'_kiswani_order_lines' => $clean_lines,
		'_kiswani_order_subtotal' => $subtotal,
		'_kiswani_order_total_items' => $total_items,
	) as $key => $value ) {
		update_post_meta( $order_id, $key, $value );
	}

	wp_mail( get_option( 'admin_email' ), sprintf( 'New Kiswani order request #%d', $order_id ), sprintf( "Name: %s\nPhone: %s\nEmail: %s\nLocation: %s\nPieces: %d\nSubtotal: %s", $name, $phone, $email, $city, $total_items, $subtotal ) );
	wp_send_json_success( array( 'orderId' => $order_id ) );
}
add_action( 'wp_ajax_kiswani_submit_order', 'kiswani_submit_order' );
add_action( 'wp_ajax_nopriv_kiswani_submit_order', 'kiswani_submit_order' );

