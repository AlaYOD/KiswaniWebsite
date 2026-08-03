<?php
/**
 * Elementor checkout widget.
 *
 * @package KiswaniElementorCore
 */

if (!defined('ABSPATH')) {
    exit;
}

class Kiswani_Checkout_Widget extends \Elementor\Widget_Base
{
    public function get_name(): string
    {
        return 'kiswani_checkout';
    }

    public function get_title(): string
    {
        return __('Kiswani Checkout', 'kiswani-elementor-core');
    }

    public function get_icon(): string
    {
        return 'eicon-cart';
    }

    public function get_categories(): array
    {
        return ['kiswani'];
    }

    protected function render(): void
    {
        $products = kiswani_elementor_products_for_collection(null, '', -1);
        ?>
        <main class="kiswani-checkout">
            <script type="application/json" id="kiswani-product-data"><?php echo wp_json_encode(kiswani_elementor_product_payload($products)); ?></script>
            <section class="kiswani-checkout-hero">
                <div class="kiswani-wrap">
                    <a class="kiswani-back-link" href="<?php echo esc_url(home_url('/#products')); ?>"><?php esc_html_e('Continue shopping', 'kiswani-elementor-core'); ?></a>
                    <p class="kiswani-kicker"><?php esc_html_e('Kiswani checkout', 'kiswani-elementor-core'); ?></p>
                    <h1><?php esc_html_e('Complete your lighting order.', 'kiswani-elementor-core'); ?></h1>
                    <span><strong data-kiswani-cart-count>0</strong> <?php esc_html_e('pieces', 'kiswani-elementor-core'); ?></span>
                </div>
            </section>
            <section class="kiswani-checkout-body">
                <div class="kiswani-wrap kiswani-checkout-grid">
                    <div>
                        <div class="kiswani-section-head"><h2><?php esc_html_e('Order summary', 'kiswani-elementor-core'); ?></h2><button type="button" data-kiswani-cart-clear><?php esc_html_e('Clear', 'kiswani-elementor-core'); ?></button></div>
                        <div class="kiswani-order-summary" data-kiswani-checkout-summary></div>
                        <div class="kiswani-order-total"><span><?php esc_html_e('Initial subtotal', 'kiswani-elementor-core'); ?></span><strong data-kiswani-cart-subtotal>0 ILS</strong></div>
                    </div>
                    <form class="kiswani-checkout-form" data-kiswani-checkout-form>
                        <div class="kiswani-yellow-rule"></div>
                        <h2><?php esc_html_e('Customer and delivery details', 'kiswani-elementor-core'); ?></h2>
                        <p><?php esc_html_e('Enter your details and WhatsApp will open with your prepared order and calculated subtotal.', 'kiswani-elementor-core'); ?></p>
                        <div class="kiswani-form-grid">
                            <label><?php esc_html_e('Full name', 'kiswani-elementor-core'); ?><input required name="name"></label>
                            <label><?php esc_html_e('WhatsApp number', 'kiswani-elementor-core'); ?><input required name="phone" inputmode="tel"></label>
                            <label><?php esc_html_e('Email', 'kiswani-elementor-core'); ?><input required name="email" type="email"></label>
                            <label><?php esc_html_e('Location', 'kiswani-elementor-core'); ?><input required name="city"></label>
                            <label class="is-wide"><?php esc_html_e('Project type', 'kiswani-elementor-core'); ?><select required name="projectType"><option value=""><?php esc_html_e('Select project type', 'kiswani-elementor-core'); ?></option><option>Home / Residential</option><option>Office / Commercial</option><option>Hospitality</option><option>Retail</option><option>Other</option></select></label>
                            <label class="is-wide"><?php esc_html_e('Address or site details', 'kiswani-elementor-core'); ?><input name="address"></label>
                            <label class="is-wide"><?php esc_html_e('Order notes', 'kiswani-elementor-core'); ?><textarea name="notes" rows="4"></textarea></label>
                        </div>
                        <button class="kiswani-button" type="submit"><?php esc_html_e('Send order via WhatsApp', 'kiswani-elementor-core'); ?></button>
                        <p class="kiswani-form-message" data-kiswani-checkout-message role="status"></p>
                    </form>
                </div>
            </section>
        </main>
        <?php
    }
}
