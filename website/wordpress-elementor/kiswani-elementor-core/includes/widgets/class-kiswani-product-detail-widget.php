<?php
/**
 * Elementor product detail widget.
 *
 * @package KiswaniElementorCore
 */

if (!defined('ABSPATH')) {
    exit;
}

class Kiswani_Product_Detail_Widget extends \Elementor\Widget_Base
{
    public function get_name(): string
    {
        return 'kiswani_product_detail';
    }

    public function get_title(): string
    {
        return __('Kiswani Product Detail', 'kiswani-elementor-core');
    }

    public function get_icon(): string
    {
        return 'eicon-product-images';
    }

    public function get_categories(): array
    {
        return ['kiswani'];
    }

    protected function render(): void
    {
        $post = get_post();
        if (!$post instanceof WP_Post || $post->post_type !== 'kiswani_product') {
            echo '<div class="kiswani-empty-state">' . esc_html__('Use this widget on a Kiswani product single template.', 'kiswani-elementor-core') . '</div>';
            return;
        }

        $language = kiswani_elementor_language();
        $code = (string) get_post_meta($post->ID, '_kiswani_code', true);
        $price = (int) get_post_meta($post->ID, '_kiswani_price', true);
        $category = (string) get_post_meta($post->ID, '_kiswani_category_label', true);
        $category_slug = (string) get_post_meta($post->ID, '_kiswani_category_slug', true);
        $description = $language === 'ar' ? (string) get_post_meta($post->ID, '_kiswani_description_ar', true) : $post->post_excerpt;
        $specs = get_post_meta($post->ID, '_kiswani_specs', true);
        $gallery = kiswani_elementor_product_gallery($post);
        $datasheet = (string) get_post_meta($post->ID, '_kiswani_datasheet', true);
        $message = rawurlencode('Hello Kiswani Lights, I am interested in ' . get_the_title($post) . ' (' . $code . '). Initial catalog price: ' . kiswani_elementor_format_price($price) . '.');
        ?>
        <main class="kiswani-product-detail" lang="<?php echo esc_attr($language); ?>" dir="<?php echo kiswani_elementor_is_rtl($language) ? 'rtl' : 'ltr'; ?>">
            <section class="kiswani-product-hero">
                <div class="kiswani-wrap kiswani-product-hero__grid">
                    <div class="kiswani-product-gallery">
                        <div class="kiswani-product-gallery__main">
                            <?php if (!empty($gallery)) : ?><img src="<?php echo esc_url($gallery[0]); ?>" alt="<?php echo esc_attr(get_the_title($post)); ?>"><?php endif; ?>
                            <span><?php echo esc_html($code); ?></span>
                        </div>
                        <?php if (count($gallery) > 1) : ?>
                            <div class="kiswani-product-gallery__thumbs">
                                <?php foreach ($gallery as $image) : ?><img src="<?php echo esc_url($image); ?>" alt=""><?php endforeach; ?>
                            </div>
                        <?php endif; ?>
                    </div>
                    <div class="kiswani-product-summary">
                        <a class="kiswani-back-link" href="<?php echo esc_url(home_url('/collections/' . $category_slug . '/')); ?>"><?php echo esc_html($category); ?></a>
                        <h1><?php echo esc_html(get_the_title($post)); ?></h1>
                        <p><?php echo esc_html($description); ?></p>
                        <div class="kiswani-price-panel">
                            <span><?php esc_html_e('Initial catalog price', 'kiswani-elementor-core'); ?></span>
                            <strong><?php echo esc_html(kiswani_elementor_format_price($price)); ?></strong>
                        </div>
                        <?php if (is_array($specs)) : ?>
                            <div class="kiswani-spec-preview">
                                <?php foreach (array_slice($specs, 0, 4) as $spec) : ?>
                                    <?php if (!is_array($spec) || count($spec) < 2) { continue; } ?>
                                    <div><span><?php echo esc_html((string) $spec[0]); ?></span><strong><?php echo esc_html((string) $spec[1]); ?></strong></div>
                                <?php endforeach; ?>
                            </div>
                        <?php endif; ?>
                        <div class="kiswani-product-actions">
                            <button type="button" class="kiswani-button" data-kiswani-cart-add="<?php echo esc_attr($code); ?>"><?php esc_html_e('Add to project cart', 'kiswani-elementor-core'); ?></button>
                            <?php if ($datasheet !== '') : ?><a class="kiswani-button kiswani-button--outline" href="<?php echo esc_url(kiswani_elementor_asset_url($datasheet)); ?>" download><?php esc_html_e('Datasheet PDF', 'kiswani-elementor-core'); ?></a><?php endif; ?>
                            <a class="kiswani-button kiswani-button--outline" href="https://wa.me/970599671209?text=<?php echo esc_attr($message); ?>" target="_blank" rel="noreferrer"><?php esc_html_e('Ask about it', 'kiswani-elementor-core'); ?></a>
                        </div>
                    </div>
                </div>
            </section>
            <?php if (is_array($specs)) : ?>
                <section class="kiswani-product-data">
                    <div class="kiswani-wrap kiswani-product-data__grid">
                        <div>
                            <p class="kiswani-kicker"><?php esc_html_e('Product data', 'kiswani-elementor-core'); ?></p>
                            <h2><?php esc_html_e('Precise details for a confident decision.', 'kiswani-elementor-core'); ?></h2>
                        </div>
                        <dl class="kiswani-spec-list">
                            <?php foreach ($specs as $index => $spec) : ?>
                                <?php if (!is_array($spec) || count($spec) < 2) { continue; } ?>
                                <div><dt><?php echo esc_html(sprintf('%02d', $index + 1)); ?> / <?php echo esc_html((string) $spec[0]); ?></dt><dd><?php echo esc_html((string) $spec[1]); ?></dd></div>
                            <?php endforeach; ?>
                        </dl>
                    </div>
                </section>
            <?php endif; ?>
        </main>
        <?php
    }
}
