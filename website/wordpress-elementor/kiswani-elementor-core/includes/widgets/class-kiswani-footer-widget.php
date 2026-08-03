<?php
/**
 * Elementor footer widget.
 *
 * @package KiswaniElementorCore
 */

if (!defined('ABSPATH')) {
    exit;
}

class Kiswani_Footer_Widget extends \Elementor\Widget_Base
{
    public function get_name(): string
    {
        return 'kiswani_footer';
    }

    public function get_title(): string
    {
        return __('Kiswani Footer', 'kiswani-elementor-core');
    }

    public function get_icon(): string
    {
        return 'eicon-footer';
    }

    public function get_categories(): array
    {
        return ['kiswani'];
    }

    protected function render(): void
    {
        $language = kiswani_elementor_language();
        $logo = kiswani_elementor_asset_url('images/kiswani-logo-since-1994.png');
        $explore = [
            [__('Collections', 'kiswani-elementor-core'), home_url('/#collections')],
            [__('Lighting types', 'kiswani-elementor-core'), home_url('/collections/lighting-fixtures/')],
            [__('Products', 'kiswani-elementor-core'), home_url('/#products')],
            [__('Projects', 'kiswani-elementor-core'), home_url('/projects/')],
        ];
        $info = [
            [__('About us', 'kiswani-elementor-core'), home_url('/about/')],
            [__('Support', 'kiswani-elementor-core'), home_url('/support/')],
            [__('Privacy policy', 'kiswani-elementor-core'), home_url('/privacy/')],
            [__('Terms of use', 'kiswani-elementor-core'), home_url('/terms/')],
        ];
        ?>
        <footer class="kiswani-footer" lang="<?php echo esc_attr($language); ?>" dir="<?php echo kiswani_elementor_is_rtl($language) ? 'rtl' : 'ltr'; ?>">
            <div class="kiswani-footer__rule" aria-hidden="true"></div>
            <div class="kiswani-wrap kiswani-footer__grid">
                <div class="kiswani-footer__brand">
                    <img src="<?php echo esc_url($logo); ?>" alt="Kiswani Lights">
                    <p><?php esc_html_e('Lighting is not decoration. It is the soul of the space.', 'kiswani-elementor-core'); ?></p>
                    <span>Decorative - Technical - Architectural</span>
                </div>
                <div>
                    <h2><?php esc_html_e('Explore', 'kiswani-elementor-core'); ?></h2>
                    <?php foreach ($explore as $index => $item) : ?>
                        <a href="<?php echo esc_url($item[1]); ?>"><span><?php echo esc_html($item[0]); ?></span><small><?php echo esc_html('0' . ($index + 1)); ?></small></a>
                    <?php endforeach; ?>
                </div>
                <div>
                    <h2><?php esc_html_e('Important links', 'kiswani-elementor-core'); ?></h2>
                    <?php foreach ($info as $index => $item) : ?>
                        <a href="<?php echo esc_url($item[1]); ?>"><span><?php echo esc_html($item[0]); ?></span><small><?php echo esc_html('0' . ($index + 1)); ?></small></a>
                    <?php endforeach; ?>
                </div>
                <div>
                    <h2><?php esc_html_e('Contact', 'kiswani-elementor-core'); ?></h2>
                    <p><a href="mailto:info@kiswanilights.com">info@kiswanilights.com</a></p>
                    <p><a href="tel:+970599671209">+970 599 67 12 09</a></p>
                    <p>Ramallah<br>Palestine</p>
                    <a class="kiswani-button kiswani-button--outline" href="<?php echo esc_url(home_url('/#contact')); ?>"><?php esc_html_e('Start a project', 'kiswani-elementor-core'); ?></a>
                </div>
            </div>
            <div class="kiswani-wrap kiswani-footer__bottom">
                <span>© 2026 Kiswani Lights</span>
                <a href="<?php echo esc_url(home_url('/checkout/')); ?>"><?php esc_html_e('Checkout', 'kiswani-elementor-core'); ?></a>
            </div>
        </footer>
        <?php
    }
}
