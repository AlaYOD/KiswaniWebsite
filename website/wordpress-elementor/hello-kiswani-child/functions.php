<?php
/**
 * Hello Kiswani child theme bootstrap.
 *
 * @package HelloKiswaniChild
 */

if (!defined('ABSPATH')) {
    exit;
}

define('HELLO_KISWANI_CHILD_VERSION', '0.2.0');
define('HELLO_KISWANI_CHILD_DIR', get_stylesheet_directory());
define('HELLO_KISWANI_CHILD_URI', get_stylesheet_directory_uri());

add_action('wp_enqueue_scripts', 'hello_kiswani_child_enqueue_assets');
function hello_kiswani_child_enqueue_assets(): void
{
    wp_enqueue_style(
        'hello-kiswani-fonts',
        HELLO_KISWANI_CHILD_URI . '/assets/css/fonts.css',
        [],
        HELLO_KISWANI_CHILD_VERSION
    );

    wp_enqueue_style(
        'hello-kiswani-theme',
        HELLO_KISWANI_CHILD_URI . '/assets/css/kiswani-elementor.css',
        ['hello-elementor-theme-style'],
        HELLO_KISWANI_CHILD_VERSION
    );

    wp_enqueue_script(
        'hello-kiswani-theme',
        HELLO_KISWANI_CHILD_URI . '/assets/js/kiswani-elementor.js',
        [],
        HELLO_KISWANI_CHILD_VERSION,
        true
    );

    wp_localize_script('hello-kiswani-theme', 'kiswaniElementor', [
        'restUrl' => esc_url_raw(rest_url('kiswani/v1/orders')),
        'nonce' => wp_create_nonce('wp_rest'),
        'checkoutUrl' => home_url('/checkout/'),
        'whatsappNumber' => '970599671209',
    ]);
}

add_action('after_setup_theme', 'hello_kiswani_child_setup');
function hello_kiswani_child_setup(): void
{
    add_theme_support('custom-logo', [
        'height' => 96,
        'width' => 320,
        'flex-height' => true,
        'flex-width' => true,
    ]);

    register_nav_menus([
        'primary' => __('Primary navigation', 'hello-kiswani-child'),
        'footer_explore' => __('Footer explore links', 'hello-kiswani-child'),
        'footer_info' => __('Footer information links', 'hello-kiswani-child'),
    ]);
}
