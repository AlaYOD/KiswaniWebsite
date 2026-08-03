<?php
/**
 * Elementor admin orders widget.
 *
 * @package KiswaniElementorCore
 */

if (!defined('ABSPATH')) {
    exit;
}

class Kiswani_Admin_Orders_Widget extends \Elementor\Widget_Base
{
    public function get_name(): string
    {
        return 'kiswani_admin_orders';
    }

    public function get_title(): string
    {
        return __('Kiswani Admin Orders', 'kiswani-elementor-core');
    }

    public function get_icon(): string
    {
        return 'eicon-lock-user';
    }

    public function get_categories(): array
    {
        return ['kiswani'];
    }

    protected function render(): void
    {
        if (!is_user_logged_in()) {
            echo '<section class="kiswani-admin-panel"><h1>' . esc_html__('Kiswani admin', 'kiswani-elementor-core') . '</h1><p>' . esc_html__('Log in with your WordPress super user account to manage products, collections, categories, and orders.', 'kiswani-elementor-core') . '</p><a class="kiswani-button" href="' . esc_url(wp_login_url(get_permalink())) . '">' . esc_html__('Log in', 'kiswani-elementor-core') . '</a></section>';
            return;
        }

        if (!current_user_can('manage_options')) {
            echo '<section class="kiswani-admin-panel"><p>' . esc_html__('This page is only available to WordPress administrators.', 'kiswani-elementor-core') . '</p></section>';
            return;
        }

        $orders = get_posts(['post_type' => 'kiswani_order', 'post_status' => 'publish', 'numberposts' => 100, 'orderby' => 'date', 'order' => 'DESC']);
        ?>
        <section class="kiswani-admin-panel">
            <div class="kiswani-section-head">
                <div><p class="kiswani-kicker"><?php esc_html_e('Admin workspace', 'kiswani-elementor-core'); ?></p><h1><?php esc_html_e('Products, collections, categories, and orders.', 'kiswani-elementor-core'); ?></h1></div>
                <div class="kiswani-admin-actions">
                    <a class="kiswani-button" href="<?php echo esc_url(admin_url('post-new.php?post_type=kiswani_product')); ?>"><?php esc_html_e('Add product', 'kiswani-elementor-core'); ?></a>
                    <a class="kiswani-button kiswani-button--outline" href="<?php echo esc_url(admin_url('edit-tags.php?taxonomy=kiswani_collection&post_type=kiswani_product')); ?>"><?php esc_html_e('Edit collections', 'kiswani-elementor-core'); ?></a>
                </div>
            </div>
            <div class="kiswani-admin-cards">
                <a href="<?php echo esc_url(admin_url('edit.php?post_type=kiswani_product')); ?>"><strong><?php echo esc_html(wp_count_posts('kiswani_product')->publish ?? 0); ?></strong><span><?php esc_html_e('Products', 'kiswani-elementor-core'); ?></span></a>
                <a href="<?php echo esc_url(admin_url('edit-tags.php?taxonomy=kiswani_collection&post_type=kiswani_product')); ?>"><strong><?php echo esc_html(wp_count_terms(['taxonomy' => 'kiswani_collection', 'hide_empty' => false])); ?></strong><span><?php esc_html_e('Collections/categories', 'kiswani-elementor-core'); ?></span></a>
                <a href="<?php echo esc_url(admin_url('edit.php?post_type=kiswani_order')); ?>"><strong><?php echo esc_html(count($orders)); ?></strong><span><?php esc_html_e('Orders', 'kiswani-elementor-core'); ?></span></a>
            </div>
            <div class="kiswani-admin-table-wrap">
                <table class="kiswani-admin-table">
                    <thead><tr><th><?php esc_html_e('Order', 'kiswani-elementor-core'); ?></th><th><?php esc_html_e('Customer', 'kiswani-elementor-core'); ?></th><th><?php esc_html_e('Pieces', 'kiswani-elementor-core'); ?></th><th><?php esc_html_e('Subtotal', 'kiswani-elementor-core'); ?></th><th><?php esc_html_e('Status', 'kiswani-elementor-core'); ?></th><th></th></tr></thead>
                    <tbody>
                    <?php foreach ($orders as $order) : ?>
                        <tr>
                            <td><?php echo esc_html('KL-' . str_pad((string) $order->ID, 5, '0', STR_PAD_LEFT)); ?></td>
                            <td><strong><?php echo esc_html($order->post_title); ?></strong><span><?php echo esc_html((string) get_post_meta($order->ID, '_kiswani_customer_whatsapp', true)); ?></span></td>
                            <td><?php echo esc_html((string) get_post_meta($order->ID, '_kiswani_total_pieces', true)); ?></td>
                            <td><?php echo esc_html(kiswani_elementor_format_price((int) get_post_meta($order->ID, '_kiswani_subtotal', true))); ?></td>
                            <td><?php echo esc_html((string) get_post_meta($order->ID, '_kiswani_status', true)); ?></td>
                            <td><a href="<?php echo esc_url(get_edit_post_link($order->ID)); ?>"><?php esc_html_e('Open', 'kiswani-elementor-core'); ?></a></td>
                        </tr>
                    <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </section>
        <?php
    }
}
