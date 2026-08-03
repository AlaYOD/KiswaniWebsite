<?php
/**
 * Shortcode wrappers for local Docker previews and non-Pro fallback pages.
 *
 * @package KiswaniElementorCore
 */

if (!defined('ABSPATH')) {
    exit;
}

function kiswani_elementor_register_shortcodes(): void
{
    $shortcodes = [
        'kiswani_header' => 'Kiswani_Header_Widget',
        'kiswani_home_sections' => 'Kiswani_Home_Sections_Widget',
        'kiswani_collection_page' => 'Kiswani_Collection_Page_Widget',
        'kiswani_product_grid' => 'Kiswani_Product_Grid_Widget',
        'kiswani_product_detail' => 'Kiswani_Product_Detail_Widget',
        'kiswani_checkout' => 'Kiswani_Checkout_Widget',
        'kiswani_admin_orders' => 'Kiswani_Admin_Orders_Widget',
        'kiswani_footer' => 'Kiswani_Footer_Widget',
    ];

    foreach ($shortcodes as $tag => $class_name) {
        add_shortcode($tag, static fn($atts = []): string => kiswani_elementor_render_shortcode_widget($class_name, (array) $atts));
    }
}

function kiswani_elementor_render_shortcode_widget(string $class_name, array $atts = []): string
{
    if (!class_exists('\\Elementor\\Widget_Base')) {
        return '<div class="kiswani-empty-state">' . esc_html__('Elementor must be active to render this Kiswani block.', 'kiswani-elementor-core') . '</div>';
    }

    kiswani_elementor_require_widget_class($class_name);
    if (!class_exists($class_name)) {
        return '<div class="kiswani-empty-state">' . esc_html__('Kiswani widget is not available.', 'kiswani-elementor-core') . '</div>';
    }

    $widget = new $class_name(['settings' => $atts], []);
    $method = new ReflectionMethod($widget, 'render');
    $method->setAccessible(true);

    ob_start();
    $method->invoke($widget);
    return (string) ob_get_clean();
}

function kiswani_elementor_require_widget_class(string $class_name): void
{
    $files = [
        'Kiswani_Header_Widget' => 'class-kiswani-header-widget.php',
        'Kiswani_Home_Sections_Widget' => 'class-kiswani-home-sections-widget.php',
        'Kiswani_Collection_Page_Widget' => 'class-kiswani-collection-page-widget.php',
        'Kiswani_Product_Grid_Widget' => 'class-kiswani-product-grid-widget.php',
        'Kiswani_Product_Detail_Widget' => 'class-kiswani-product-detail-widget.php',
        'Kiswani_Checkout_Widget' => 'class-kiswani-checkout-widget.php',
        'Kiswani_Admin_Orders_Widget' => 'class-kiswani-admin-orders-widget.php',
        'Kiswani_Footer_Widget' => 'class-kiswani-footer-widget.php',
    ];

    if (isset($files[$class_name])) {
        require_once KISWANI_ELEMENTOR_CORE_DIR . 'includes/widgets/' . $files[$class_name];
    }
}

