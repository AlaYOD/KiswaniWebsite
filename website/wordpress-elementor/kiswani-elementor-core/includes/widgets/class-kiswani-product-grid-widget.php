<?php
/**
 * Elementor product grid widget.
 *
 * @package KiswaniElementorCore
 */

if (!defined('ABSPATH')) {
    exit;
}

class Kiswani_Product_Grid_Widget extends \Elementor\Widget_Base
{
    public function get_name(): string
    {
        return 'kiswani_product_grid';
    }

    public function get_title(): string
    {
        return __('Kiswani Product Grid', 'kiswani-elementor-core');
    }

    public function get_icon(): string
    {
        return 'eicon-products';
    }

    public function get_categories(): array
    {
        return ['kiswani'];
    }

    protected function register_controls(): void
    {
        $this->start_controls_section('content', [
            'label' => __('Content', 'kiswani-elementor-core'),
        ]);

        $this->add_control('limit', [
            'label' => __('Products to show', 'kiswani-elementor-core'),
            'type' => \Elementor\Controls_Manager::NUMBER,
            'default' => 8,
            'min' => 1,
            'max' => 48,
        ]);

        $this->add_control('mobile_list', [
            'label' => __('Mobile list layout', 'kiswani-elementor-core'),
            'type' => \Elementor\Controls_Manager::SWITCHER,
            'default' => 'yes',
        ]);

        $this->end_controls_section();
    }

    protected function render(): void
    {
        try {
            $settings = $this->get_settings_for_display();
        } catch (\Throwable $error) {
            $settings = [];
        }
        $limit = max(1, (int) ($settings['limit'] ?? 8));
        $mobile_list = ($settings['mobile_list'] ?? 'yes') === 'yes';
        $products = kiswani_elementor_products_for_collection(null, '', $limit);

        echo '<div class="kiswani-product-grid">';
        foreach ($products as $product) {
            kiswani_render_product_card($product, $mobile_list);
        }
        echo '</div>';
    }
}




