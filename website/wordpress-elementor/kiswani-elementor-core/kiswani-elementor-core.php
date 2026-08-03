<?php
/**
 * Plugin Name: Kiswani Elementor Core
 * Plugin URI: https://kiswanilights.com
 * Description: Products, collections, orders, REST routes, and Elementor widgets for the Kiswani Lights Elementor website.
 * Version: 0.2.0
 * Requires at least: 6.6
 * Requires PHP: 8.1
 * Author: Kiswani Lights
 * Text Domain: kiswani-elementor-core
 *
 * @package KiswaniElementorCore
 */

if (!defined('ABSPATH')) {
    exit;
}

define('KISWANI_ELEMENTOR_CORE_VERSION', '0.2.0');
define('KISWANI_ELEMENTOR_CORE_DIR', plugin_dir_path(__FILE__));
define('KISWANI_ELEMENTOR_CORE_URL', plugin_dir_url(__FILE__));

require_once KISWANI_ELEMENTOR_CORE_DIR . 'includes/post-types.php';
require_once KISWANI_ELEMENTOR_CORE_DIR . 'includes/meta.php';
require_once KISWANI_ELEMENTOR_CORE_DIR . 'includes/catalog-data.php';
require_once KISWANI_ELEMENTOR_CORE_DIR . 'includes/frontend-helpers.php';
require_once KISWANI_ELEMENTOR_CORE_DIR . 'includes/seed.php';
require_once KISWANI_ELEMENTOR_CORE_DIR . 'includes/rest-orders.php';
require_once KISWANI_ELEMENTOR_CORE_DIR . 'includes/elementor.php';
require_once KISWANI_ELEMENTOR_CORE_DIR . 'includes/shortcodes.php';

register_activation_hook(__FILE__, 'kiswani_elementor_core_activate');
function kiswani_elementor_core_activate(): void
{
    kiswani_register_content_types();
    kiswani_register_meta_fields();
    kiswani_elementor_seed_catalog();
    flush_rewrite_rules();
}

register_deactivation_hook(__FILE__, 'kiswani_elementor_core_deactivate');
function kiswani_elementor_core_deactivate(): void
{
    flush_rewrite_rules();
}

add_action('init', 'kiswani_register_content_types');
add_action('init', 'kiswani_register_meta_fields');
add_action('rest_api_init', 'kiswani_register_order_rest_routes');
add_action('plugins_loaded', 'kiswani_register_elementor_integration');




add_action('init', 'kiswani_elementor_register_shortcodes');

