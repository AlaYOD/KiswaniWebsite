<?php
/**
 * Elementor collection page widget.
 *
 * @package KiswaniElementorCore
 */

if (!defined('ABSPATH')) {
    exit;
}

class Kiswani_Collection_Page_Widget extends \Elementor\Widget_Base
{
    public function get_name(): string
    {
        return 'kiswani_collection_page';
    }

    public function get_title(): string
    {
        return __('Kiswani Collection Page', 'kiswani-elementor-core');
    }

    public function get_icon(): string
    {
        return 'eicon-archive';
    }

    public function get_categories(): array
    {
        return ['kiswani'];
    }

    protected function register_controls(): void
    {
        $this->start_controls_section('content', ['label' => __('Content', 'kiswani-elementor-core')]);
        $this->add_control('fallback_collection', [
            'label' => __('Fallback collection slug', 'kiswani-elementor-core'),
            'type' => \Elementor\Controls_Manager::TEXT,
            'default' => '',
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
        $language = kiswani_elementor_language();
        $collection = kiswani_elementor_collection_from_request((string) ($settings['fallback_collection'] ?? ''));

        if (!$collection) {
            echo '<div class="kiswani-empty-state">' . esc_html__('Choose a collection term or use this widget on a collection archive.', 'kiswani-elementor-core') . '</div>';
            return;
        }

        $source = kiswani_elementor_term_source($collection);
        $group = $collection;
        if ($source === 'product_map_section') {
            $parent = get_term($collection->parent, 'kiswani_collection');
            $group = $parent instanceof WP_Term ? $parent : $collection;
        } elseif ($source === 'product_map_item') {
            $section = get_term($collection->parent, 'kiswani_collection');
            $parent = $section instanceof WP_Term ? get_term($section->parent, 'kiswani_collection') : null;
            $group = $parent instanceof WP_Term ? $parent : $collection;
        }

        $requested_section = isset($_GET['category']) ? sanitize_title((string) wp_unslash($_GET['category'])) : '';
        $requested_item = isset($_GET['subcategory']) ? sanitize_title((string) wp_unslash($_GET['subcategory'])) : '';
        $active_section = $requested_section !== '' ? get_term_by('slug', $requested_section, 'kiswani_collection') : null;
        $active_item = $requested_item !== '' ? get_term_by('slug', $requested_item, 'kiswani_collection') : null;
        $scoped_term = $active_item instanceof WP_Term ? $active_item : ($active_section instanceof WP_Term ? $active_section : $collection);
        $query = isset($_GET['q']) ? sanitize_text_field((string) wp_unslash($_GET['q'])) : '';
        $products = kiswani_elementor_products_for_collection($scoped_term, $query, -1);
        $all_groups = kiswani_elementor_terms_by_source($source === 'category' ? 'category' : 'product_map_group');
        ?>
        <main class="kiswani-collection" lang="<?php echo esc_attr($language); ?>" dir="<?php echo kiswani_elementor_is_rtl($language) ? 'rtl' : 'ltr'; ?>">
            <section class="kiswani-collection-hero">
                <div class="kiswani-wrap kiswani-collection-hero__grid">
                    <div class="kiswani-collection-hero__copy">
                        <a class="kiswani-back-link" href="<?php echo esc_url(home_url('/#collections')); ?>"><?php esc_html_e('Back to collections', 'kiswani-elementor-core'); ?></a>
                        <p class="kiswani-kicker"><?php echo $source === 'category' ? esc_html__('Kiswani collection', 'kiswani-elementor-core') : esc_html__('Product collection', 'kiswani-elementor-core'); ?></p>
                        <h1><?php echo esc_html(kiswani_elementor_term_label($collection, $language)); ?></h1>
                        <p><?php echo esc_html((string) get_term_meta($collection->term_id, '_kiswani_detail', true)); ?></p>
                        <div class="kiswani-collection-hero__actions">
                            <a class="kiswani-button" href="#collection-products"><?php esc_html_e('Browse products', 'kiswani-elementor-core'); ?></a>
                            <span><?php echo esc_html(sprintf(_n('%d product', '%d products', count($products), 'kiswani-elementor-core'), count($products))); ?></span>
                        </div>
                    </div>
                    <div class="kiswani-collection-hero__media">
                        <img src="<?php echo esc_url(kiswani_elementor_term_image($collection)); ?>" alt="<?php echo esc_attr(kiswani_elementor_term_label($collection, $language)); ?>">
                    </div>
                </div>
            </section>
            <nav class="kiswani-collection-switcher" aria-label="<?php esc_attr_e('Collections', 'kiswani-elementor-core'); ?>">
                <div class="kiswani-wrap">
                    <?php foreach ($all_groups as $term) : ?>
                        <a class="<?php echo $term->term_id === $collection->term_id || $term->term_id === $group->term_id ? 'is-active' : ''; ?>" href="<?php echo esc_url(get_term_link($term)); ?>"><?php echo esc_html(kiswani_elementor_term_label($term, $language)); ?></a>
                    <?php endforeach; ?>
                </div>
            </nav>
            <?php if ($source !== 'category') : ?>
                <section class="kiswani-collection-tabs">
                    <div class="kiswani-wrap">
                        <div class="kiswani-tabs-row">
                            <a class="<?php echo !$active_section ? 'is-active' : ''; ?>" href="<?php echo esc_url(get_term_link($group)); ?>">
                                <strong><?php esc_html_e('All products', 'kiswani-elementor-core'); ?></strong>
                                <span><?php esc_html_e('Full collection', 'kiswani-elementor-core'); ?></span>
                            </a>
                            <?php foreach (get_terms(['taxonomy' => 'kiswani_collection', 'hide_empty' => false, 'parent' => $group->term_id]) as $section) : ?>
                                <?php if (!$section instanceof WP_Term) { continue; } ?>
                                <a class="<?php echo $active_section instanceof WP_Term && $active_section->term_id === $section->term_id ? 'is-active' : ''; ?>" href="<?php echo esc_url(add_query_arg('category', $section->slug, get_term_link($group))); ?>">
                                    <img src="<?php echo esc_url(kiswani_elementor_term_image($section)); ?>" alt="">
                                    <strong><?php echo esc_html(kiswani_elementor_term_label($section, $language)); ?></strong>
                                </a>
                            <?php endforeach; ?>
                        </div>
                        <?php if ($active_section instanceof WP_Term) : ?>
                            <div class="kiswani-subtabs-row">
                                <a class="<?php echo !$active_item ? 'is-active' : ''; ?>" href="<?php echo esc_url(add_query_arg('category', $active_section->slug, get_term_link($group))); ?>"><?php esc_html_e('All', 'kiswani-elementor-core'); ?></a>
                                <?php foreach (get_terms(['taxonomy' => 'kiswani_collection', 'hide_empty' => false, 'parent' => $active_section->term_id]) as $item) : ?>
                                    <?php if (!$item instanceof WP_Term) { continue; } ?>
                                    <a class="<?php echo $active_item instanceof WP_Term && $active_item->term_id === $item->term_id ? 'is-active' : ''; ?>" href="<?php echo esc_url(add_query_arg(['category' => $active_section->slug, 'subcategory' => $item->slug], get_term_link($group))); ?>">
                                        <img src="<?php echo esc_url(kiswani_elementor_term_image($item)); ?>" alt="">
                                        <span><?php echo esc_html(kiswani_elementor_term_label($item, $language)); ?></span>
                                    </a>
                                <?php endforeach; ?>
                            </div>
                        <?php endif; ?>
                    </div>
                </section>
            <?php endif; ?>
            <section id="collection-products" class="kiswani-home-section">
                <div class="kiswani-wrap">
                    <div class="kiswani-section-head">
                        <div>
                            <p class="kiswani-kicker"><?php esc_html_e('Products', 'kiswani-elementor-core'); ?></p>
                            <h2><?php echo esc_html($active_item instanceof WP_Term ? kiswani_elementor_term_label($active_item, $language) : ($active_section instanceof WP_Term ? kiswani_elementor_term_label($active_section, $language) : kiswani_elementor_term_label($collection, $language))); ?></h2>
                        </div>
                        <form class="kiswani-inline-search" method="get">
                            <?php if ($active_section instanceof WP_Term) : ?><input type="hidden" name="category" value="<?php echo esc_attr($active_section->slug); ?>"><?php endif; ?>
                            <?php if ($active_item instanceof WP_Term) : ?><input type="hidden" name="subcategory" value="<?php echo esc_attr($active_item->slug); ?>"><?php endif; ?>
                            <input type="search" name="q" value="<?php echo esc_attr($query); ?>" placeholder="<?php esc_attr_e('Search by name or code', 'kiswani-elementor-core'); ?>">
                        </form>
                    </div>
                    <?php if (empty($products)) : ?>
                        <div class="kiswani-empty-state"><?php esc_html_e('No products match this collection search.', 'kiswani-elementor-core'); ?></div>
                    <?php else : ?>
                        <div class="kiswani-product-grid">
                            <?php foreach ($products as $product) : ?>
                                <?php kiswani_render_product_card($product, true); ?>
                            <?php endforeach; ?>
                        </div>
                    <?php endif; ?>
                </div>
            </section>
        </main>
        <?php
    }
}

