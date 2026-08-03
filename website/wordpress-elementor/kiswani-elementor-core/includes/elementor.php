<?php
/**
 * Elementor integration bootstrap.
 *
 * @package KiswaniElementorCore
 */

if (!defined('ABSPATH')) {
    exit;
}

function kiswani_register_elementor_integration(): void
{
    if (!did_action('elementor/loaded')) {
        return;
    }

    add_action('elementor/elements/categories_registered', 'kiswani_register_elementor_category');
    add_action('elementor/widgets/register', 'kiswani_register_elementor_widgets');
}

function kiswani_register_elementor_category($elements_manager): void
{
    $elements_manager->add_category('kiswani', [
        'title' => __('Kiswani Lights', 'kiswani-elementor-core'),
        'icon' => 'fa fa-lightbulb',
    ]);
}

function kiswani_register_elementor_widgets($widgets_manager): void
{
    $widgets = [
        'class-kiswani-header-widget.php' => 'Kiswani_Header_Widget',
        'class-kiswani-home-sections-widget.php' => 'Kiswani_Home_Sections_Widget',
        'class-kiswani-collection-page-widget.php' => 'Kiswani_Collection_Page_Widget',
        'class-kiswani-product-grid-widget.php' => 'Kiswani_Product_Grid_Widget',
        'class-kiswani-product-detail-widget.php' => 'Kiswani_Product_Detail_Widget',
        'class-kiswani-checkout-widget.php' => 'Kiswani_Checkout_Widget',
        'class-kiswani-admin-orders-widget.php' => 'Kiswani_Admin_Orders_Widget',
        'class-kiswani-footer-widget.php' => 'Kiswani_Footer_Widget',
    ];

    foreach ($widgets as $file => $class_name) {
        require_once KISWANI_ELEMENTOR_CORE_DIR . 'includes/widgets/' . $file;
        if (class_exists($class_name)) {
            $widgets_manager->register(new $class_name());
        }
    }
}
