<?php
/**
 * Elementor global header widget.
 *
 * @package KiswaniElementorCore
 */

if (!defined('ABSPATH')) {
    exit;
}

class Kiswani_Header_Widget extends \Elementor\Widget_Base
{
    public function get_name(): string
    {
        return 'kiswani_header';
    }

    public function get_title(): string
    {
        return __('Kiswani Header', 'kiswani-elementor-core');
    }

    public function get_icon(): string
    {
        return 'eicon-nav-menu';
    }

    public function get_categories(): array
    {
        return ['kiswani'];
    }

    protected function render(): void
    {
        $language = kiswani_elementor_language();
        $groups = kiswani_elementor_terms_by_source('product_map_group');
        $categories = kiswani_elementor_terms_by_source('category');
        $logo = kiswani_elementor_asset_url('images/kiswani-logo-header-lockup.png');
        ?>
        <header class="kiswani-header" lang="<?php echo esc_attr($language); ?>" dir="<?php echo kiswani_elementor_is_rtl($language) ? 'rtl' : 'ltr'; ?>">
            <div class="kiswani-header-top">
                <span><?php esc_html_e('Kiswani Lights - decorative, technical, and architectural lighting', 'kiswani-elementor-core'); ?></span>
            </div>
            <div class="kiswani-header-main kiswani-wrap">
                <a class="kiswani-logo" href="<?php echo esc_url(home_url('/')); ?>" aria-label="Kiswani Lights">
                    <img src="<?php echo esc_url($logo); ?>" alt="Kiswani Lights" loading="eager">
                </a>
                <form class="kiswani-header-search" action="<?php echo esc_url(home_url('/')); ?>" method="get" role="search">
                    <label>
                        <span class="screen-reader-text"><?php esc_html_e('Search products', 'kiswani-elementor-core'); ?></span>
                        <input type="search" name="search" placeholder="<?php esc_attr_e('Search by product, code, or category', 'kiswani-elementor-core'); ?>">
                    </label>
                </form>
                <div class="kiswani-header-actions">
                    <a href="tel:+970599671209">+970 599 67 12 09</a>
                    <select data-kiswani-language aria-label="<?php esc_attr_e('Language', 'kiswani-elementor-core'); ?>">
                        <option value="en" <?php selected($language, 'en'); ?>>EN</option>
                        <option value="ar" <?php selected($language, 'ar'); ?>>AR</option>
                        <option value="he" <?php selected($language, 'he'); ?>>HE</option>
                    </select>
                    <a class="kiswani-cart-link" href="<?php echo esc_url(home_url('/checkout/')); ?>" aria-label="<?php esc_attr_e('Checkout', 'kiswani-elementor-core'); ?>">
                        <span><?php esc_html_e('Cart', 'kiswani-elementor-core'); ?></span>
                        <strong data-kiswani-cart-count>0</strong>
                    </a>
                    <button class="kiswani-mobile-toggle" type="button" data-kiswani-open="kiswani-mobile-menu" aria-controls="kiswani-mobile-menu">
                        <?php esc_html_e('Menu', 'kiswani-elementor-core'); ?>
                    </button>
                </div>
            </div>
            <nav class="kiswani-product-nav" aria-label="<?php esc_attr_e('Product navigation', 'kiswani-elementor-core'); ?>">
                <div class="kiswani-wrap kiswani-product-nav__inner">
                    <a href="<?php echo esc_url(home_url('/#products')); ?>"><?php esc_html_e('Products', 'kiswani-elementor-core'); ?></a>
                    <?php foreach ($groups as $group) : ?>
                        <div class="kiswani-nav-drop">
                            <a href="<?php echo esc_url(get_term_link($group)); ?>"><?php echo esc_html(kiswani_elementor_term_label($group, $language)); ?></a>
                            <div class="kiswani-mega-menu">
                                <?php foreach (get_terms(['taxonomy' => 'kiswani_collection', 'hide_empty' => false, 'parent' => $group->term_id]) as $section) : ?>
                                    <?php if (!$section instanceof WP_Term) { continue; } ?>
                                    <div>
                                        <a class="kiswani-mega-menu__title" href="<?php echo esc_url(add_query_arg('category', $section->slug, get_term_link($group))); ?>"><?php echo esc_html(kiswani_elementor_term_label($section, $language)); ?></a>
                                        <?php foreach (get_terms(['taxonomy' => 'kiswani_collection', 'hide_empty' => false, 'parent' => $section->term_id]) as $item) : ?>
                                            <?php if (!$item instanceof WP_Term) { continue; } ?>
                                            <a href="<?php echo esc_url(add_query_arg(['category' => $section->slug, 'subcategory' => $item->slug], get_term_link($group))); ?>"><?php echo esc_html(kiswani_elementor_term_label($item, $language)); ?></a>
                                        <?php endforeach; ?>
                                    </div>
                                <?php endforeach; ?>
                            </div>
                        </div>
                    <?php endforeach; ?>
                    <?php foreach ($categories as $category) : ?>
                        <a href="<?php echo esc_url(get_term_link($category)); ?>"><?php echo esc_html(kiswani_elementor_term_label($category, $language)); ?></a>
                    <?php endforeach; ?>
                    <a href="<?php echo esc_url(home_url('/projects/')); ?>"><?php esc_html_e('Projects', 'kiswani-elementor-core'); ?></a>
                </div>
            </nav>
            <div id="kiswani-mobile-menu" class="kiswani-drawer kiswani-mobile-menu" aria-hidden="true">
                <div class="kiswani-mobile-menu__panel">
                    <button type="button" class="kiswani-mobile-menu__close" data-kiswani-close="kiswani-mobile-menu"><?php esc_html_e('Close', 'kiswani-elementor-core'); ?></button>
                    <a class="kiswani-mobile-menu__link" href="<?php echo esc_url(home_url('/#products')); ?>"><?php esc_html_e('Products', 'kiswani-elementor-core'); ?></a>
                    <?php foreach ($groups as $group) : ?>
                        <details class="kiswani-mobile-collection">
                            <summary><?php echo esc_html(kiswani_elementor_term_label($group, $language)); ?></summary>
                            <a href="<?php echo esc_url(get_term_link($group)); ?>"><?php esc_html_e('All products', 'kiswani-elementor-core'); ?></a>
                            <?php foreach (get_terms(['taxonomy' => 'kiswani_collection', 'hide_empty' => false, 'parent' => $group->term_id]) as $section) : ?>
                                <?php if (!$section instanceof WP_Term) { continue; } ?>
                                <details>
                                    <summary><?php echo esc_html(kiswani_elementor_term_label($section, $language)); ?></summary>
                                    <a href="<?php echo esc_url(add_query_arg('category', $section->slug, get_term_link($group))); ?>"><?php esc_html_e('All', 'kiswani-elementor-core'); ?></a>
                                    <?php foreach (get_terms(['taxonomy' => 'kiswani_collection', 'hide_empty' => false, 'parent' => $section->term_id]) as $item) : ?>
                                        <?php if (!$item instanceof WP_Term) { continue; } ?>
                                        <a href="<?php echo esc_url(add_query_arg(['category' => $section->slug, 'subcategory' => $item->slug], get_term_link($group))); ?>"><?php echo esc_html(kiswani_elementor_term_label($item, $language)); ?></a>
                                    <?php endforeach; ?>
                                </details>
                            <?php endforeach; ?>
                        </details>
                    <?php endforeach; ?>
                    <details class="kiswani-mobile-collection">
                        <summary><?php esc_html_e('Categories', 'kiswani-elementor-core'); ?></summary>
                        <?php foreach ($categories as $category) : ?>
                            <a href="<?php echo esc_url(get_term_link($category)); ?>"><?php echo esc_html(kiswani_elementor_term_label($category, $language)); ?></a>
                        <?php endforeach; ?>
                    </details>
                    <a class="kiswani-mobile-menu__link" href="<?php echo esc_url(home_url('/projects/')); ?>"><?php esc_html_e('Projects', 'kiswani-elementor-core'); ?></a>
                    <a class="kiswani-button" href="<?php echo esc_url(home_url('/checkout/')); ?>"><?php esc_html_e('Checkout', 'kiswani-elementor-core'); ?></a>
                </div>
            </div>
        </header>
        <?php
    }
}
