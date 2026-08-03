<?php
/**
 * Elementor homepage sections widget.
 *
 * @package KiswaniElementorCore
 */

if (!defined('ABSPATH')) {
    exit;
}

class Kiswani_Home_Sections_Widget extends \Elementor\Widget_Base
{
    public function get_name(): string
    {
        return 'kiswani_home_sections';
    }

    public function get_title(): string
    {
        return __('Kiswani Home Sections', 'kiswani-elementor-core');
    }

    public function get_icon(): string
    {
        return 'eicon-home';
    }

    public function get_categories(): array
    {
        return ['kiswani'];
    }

    protected function register_controls(): void
    {
        $this->start_controls_section('content', ['label' => __('Content', 'kiswani-elementor-core')]);
        $this->add_control('product_limit', [
            'label' => __('Featured products', 'kiswani-elementor-core'),
            'type' => \Elementor\Controls_Manager::NUMBER,
            'default' => 8,
            'min' => 4,
            'max' => 24,
        ]);
        $this->end_controls_section();
    }

    private function section_intro(string $kicker, string $title, bool $dark = false): void
    {
        ?>
        <div class="kiswani-section-intro<?php echo $dark ? ' kiswani-section-intro--dark' : ''; ?>">
            <div class="kiswani-section-intro__kicker"><span aria-hidden="true"></span><p><?php echo esc_html($kicker); ?></p></div>
            <h2><?php echo esc_html($title); ?></h2>
        </div>
        <?php
    }

    private function icon(string $name): void
    {
        $paths = [
            'bulb' => '<path d="M9 18h6M10 22h4M8.5 14.5a6 6 0 1 1 7 0c-.9.7-1.5 1.7-1.5 2.5h-4c0-.8-.6-1.8-1.5-2.5Z"/>',
            'desk' => '<path d="m9 7 6 6M5 19h14M12 3 4 11l4 4 8-8-4-4Z"/>',
            'floor' => '<path d="M12 3v18M7 21h10M8 3h8l2 7H6l2-7Z"/>',
            'gauge' => '<path d="M12 14 16 8M4 14a8 8 0 1 1 16 0M6 18h12"/>',
            'sun' => '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>',
        ];
        echo '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round">' . ($paths[$name] ?? $paths['bulb']) . '</svg>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
    }

    protected function render(): void
    {
        try {
            $settings = $this->get_settings_for_display();
        } catch (\Throwable $error) {
            $settings = [];
        }

        $limit = max(4, (int) ($settings['product_limit'] ?? 8));
        $language = kiswani_elementor_language();
        $categories = kiswani_elementor_terms_by_source('category');
        $products = kiswani_elementor_products_for_collection(null, isset($_GET['search']) ? sanitize_text_field((string) wp_unslash($_GET['search'])) : '', $limit);
        $hero_scenes = [
            ['image' => 'images/editorial/hero-interior.webp', 'name' => __('Interior lighting', 'kiswani-elementor-core'), 'detail' => __('Layered light for living, dining, and hospitality spaces.', 'kiswani-elementor-core')],
            ['image' => 'images/editorial/hero-decorative.webp', 'name' => __('Decorative lighting', 'kiswani-elementor-core'), 'detail' => __('Statement pieces that define the character of the room.', 'kiswani-elementor-core')],
            ['image' => 'images/editorial/hero-technical.webp', 'name' => __('Technical lighting', 'kiswani-elementor-core'), 'detail' => __('Precise output, clean beams, and project-ready specifications.', 'kiswani-elementor-core')],
        ];
        ?>
        <main class="kiswani-home kiswani-next-home" lang="<?php echo esc_attr($language); ?>" dir="<?php echo kiswani_elementor_is_rtl($language) ? 'rtl' : 'ltr'; ?>">
            <section class="kiswani-intro" role="status" aria-live="polite" aria-label="Kiswani Lights brand introduction">
                <div class="kiswani-intro__glow" aria-hidden="true"></div><div class="kiswani-intro__frame" aria-hidden="true"></div>
                <div class="kiswani-intro__content"><img src="<?php echo esc_url(kiswani_elementor_asset_url('images/kiswani-logo-since-1994.png')); ?>" alt="Kiswani Lights"><span aria-hidden="true"></span><p>Lighting is the soul of the space</p><p dir="rtl">الإضاءة هي روح المكان</p></div>
                <div class="kiswani-intro__bottom"><div><span>Kiswani Lights</span><span>Est. 2026</span></div><i aria-hidden="true"></i></div>
            </section>

            <section id="top" class="kiswani-hero kiswani-next-hero" data-kiswani-hero>
                <?php foreach ($hero_scenes as $index => $scene) : ?>
                    <img class="kiswani-hero__scene<?php echo $index === 0 ? ' is-active' : ''; ?>" src="<?php echo esc_url(kiswani_elementor_asset_url($scene['image'])); ?>" alt="<?php echo esc_attr($scene['name']); ?>" loading="<?php echo $index === 0 ? 'eager' : 'lazy'; ?>">
                <?php endforeach; ?>
                <div class="kiswani-hero__gradient" aria-hidden="true"></div><div class="kiswani-hero__bottom-fade" aria-hidden="true"></div><div class="kiswani-hero__frame" aria-hidden="true"></div><div class="gold-hero-geometry" aria-hidden="true"></div>
                <div class="kiswani-hero__content"><div class="kiswani-hero__copy">
                    <div class="kiswani-hero__kicker"><span aria-hidden="true"></span><p>Kiswani Lights / 2026</p></div>
                    <h1><span>LIGHTING IS THE</span><span>SOUL OF SPACE</span></h1>
                    <p>Decorative, technical, architectural, and accent lighting selected for homes, designers, contractors, and trade buyers.</p>
                    <div class="kiswani-hero__actions"><a class="kiswani-button" href="#collections">Explore collections</a><a class="kiswani-button kiswani-button--outline kiswani-button--dark-outline" href="#contact">Start a project</a></div>
                    <div class="kiswani-hero__meta"><div><p data-kiswani-hero-name><?php echo esc_html($hero_scenes[0]['name']); ?></p><p data-kiswani-hero-detail><?php echo esc_html($hero_scenes[0]['detail']); ?></p></div><div><span data-kiswani-hero-index>01</span><div><?php foreach ($hero_scenes as $index => $scene) : ?><button type="button" class="<?php echo $index === 0 ? 'is-active' : ''; ?>" data-kiswani-hero-dot="<?php echo esc_attr((string) $index); ?>" data-name="<?php echo esc_attr($scene['name']); ?>" data-detail="<?php echo esc_attr($scene['detail']); ?>" aria-label="<?php echo esc_attr(sprintf(__('Show %s', 'kiswani-elementor-core'), $scene['name'])); ?>"></button><?php endforeach; ?></div></div></div>
                </div></div>
            </section>

            <section class="kiswani-metrics kiswani-next-metrics"><div class="kiswani-metrics__grid"><div><strong>90+</strong><span>High-CRI light</span></div><div><strong>48H</strong><span>Project support</span></div><div><strong>360°</strong><span>Decorative + technical</span></div></div></section>
            <div class="gold-motif-divider" aria-hidden="true"><span></span></div>

            <section class="kiswani-statement"><div><aside><span>02</span><i aria-hidden="true"></i></aside><p>LIGHTING IS NOT DECORATION. IT IS THE SOUL OF THE SPACE.</p><div>Every fixture is selected around the feeling it creates: warm atmosphere, precise function, and a visual language that belongs to the architecture.</div></div></section>

            <section id="collections" class="kiswani-home-section kiswani-home-section--sand kiswani-next-collections"><div class="kiswani-wall-sconce" aria-hidden="true"><i></i><b></b><span></span></div><div class="kiswani-wrap"><?php $this->section_intro('Lighting collections', 'Find the light that belongs in your space.'); ?><div class="kiswani-category-grid"><?php foreach ($categories as $index => $category) : ?><a class="kiswani-category-card kiswani-light-sweep<?php echo $index % 2 ? ' kiswani-category-card--offset' : ''; ?>" href="<?php echo esc_url(get_term_link($category)); ?>"><img src="<?php echo esc_url(kiswani_elementor_term_image($category)); ?>" alt="<?php echo esc_attr(kiswani_elementor_term_label($category, $language)); ?>"><span><?php echo esc_html(kiswani_elementor_term_label($category, $language)); ?></span></a><?php endforeach; ?></div></div></section>

            <section class="kiswani-visual-stories"><div class="kiswani-wrap"><div><?php $this->section_intro('Visual stories', 'Rooms shaped by the way the light lands.'); ?><p>Installed lighting scenes show scale, warmth, beam spread, and the relationship between fixture and material.</p></div><div class="kiswani-stories-grid"><article><img src="<?php echo esc_url(kiswani_elementor_asset_url('images/editorial/story-lounge.webp')); ?>" alt="Warm lounge lighting"><div><span>01</span><h3>Warm lounges</h3></div></article><article><img src="<?php echo esc_url(kiswani_elementor_asset_url('images/editorial/story-stair.webp')); ?>" alt="Stair lighting"><div><span>02</span><h3>Architectural stairs</h3></div></article><article><img src="<?php echo esc_url(kiswani_elementor_asset_url('images/editorial/story-wall.webp')); ?>" alt="Wall lighting"><div><span>03</span><h3>Textured walls</h3></div></article></div></div></section>

            <section id="types" class="kiswani-lighting-types"><div class="kiswani-lighting-types__fixture" aria-hidden="true"><i></i><b></b><span></span></div><div class="kiswani-wrap"><div class="kiswani-lighting-types__grid"><div><?php $this->section_intro('Lighting systems', 'A precise mix of decorative presence and technical control.', true); ?><p>Balance mood, task visibility, color temperature, beam control, and fixture presence in every space.</p></div><div class="kiswani-type-grid"><?php $types = [['bulb', 'Light sources', 'Color temperature and clarity for every use.'], ['desk', 'Decorative pieces', 'Visual presence that gives the space character.'], ['floor', 'Functional lighting', 'Useful light without visual noise.'], ['gauge', 'Technical control', 'Precision, visual comfort, and reliable output.']]; foreach ($types as $index => $type) : ?><article><div><?php $this->icon($type[0]); ?><span>0<?php echo esc_html((string) ($index + 1)); ?></span></div><h3><?php echo esc_html($type[1]); ?></h3><p><?php echo esc_html($type[2]); ?></p></article><?php endforeach; ?></div></div></div></section>

            <section id="products" class="kiswani-home-section kiswani-next-products"><div class="kiswani-track-lights" aria-hidden="true"><i></i><b></b><span></span></div><div class="kiswani-wrap"><div class="kiswani-section-head"><?php $this->section_intro('Featured lighting', 'Selected pieces, clearly specified.'); ?><form class="kiswani-inline-search" action="<?php echo esc_url(home_url('/')); ?>" method="get"><input type="search" name="search" value="<?php echo isset($_GET['search']) ? esc_attr((string) wp_unslash($_GET['search'])) : ''; ?>" placeholder="Search by product, code, or category"></form></div><div class="kiswani-product-grid"><?php foreach ($products as $product) : kiswani_render_product_card($product, true); endforeach; ?></div></div></section>

            <section class="kiswani-portfolio-strip" aria-label="Lighting collections and technologies"><div><p>Collections & technology</p><div><span>DECORATIVE</span><i></i><span>ARCHITECTURAL</span><i></i><span>TECHNICAL LIGHTING</span><i></i><span>DALI CONTROL</span><i></i><span>TRIAC DIMMING</span><i></i><span>CRI 90+</span><i></i><span>OUTDOOR LIGHTING</span></div></div></section>

            <section id="featured-project" class="kiswani-featured-project"><div class="kiswani-wrap"><div class="kiswani-featured-project__head"><div><?php $this->section_intro('Featured project', 'See how light changes the feeling of space.', true); ?></div><p>Drag the line to compare the quiet space before illumination with the final architectural scene, then explore how color temperature changes the atmosphere.</p></div><div class="kiswani-project-reveal" data-kiswani-project-reveal><img src="<?php echo esc_url(kiswani_elementor_asset_url('images/editorial/project-dining.webp')); ?>" alt="Interior lighting project before illumination"><div class="kiswani-project-reveal__after"><img src="<?php echo esc_url(kiswani_elementor_asset_url('images/editorial/project-dining.webp')); ?>" alt="Interior lighting project after illumination"></div><span class="kiswani-project-reveal__line" aria-hidden="true"><b></b></span><input type="range" min="8" max="92" value="64" aria-label="Move to compare before and after lighting"><div class="kiswani-project-reveal__labels"><span>BEFORE</span><span>AFTER</span></div></div><div class="kiswani-project-controls"><div><p>Select light temperature</p><div role="group" aria-label="Light temperature"><button type="button" class="is-active" data-temperature="warm">Warm<span>2700K</span></button><button type="button" data-temperature="neutral">Neutral<span>3500K</span></button><button type="button" data-temperature="cool">Cool<span>4000K</span></button></div></div><a class="kiswani-button" href="<?php echo esc_url(home_url('/products/kl-gl-004/')); ?>">Project & product details</a></div></div></section>

            <section id="contact" class="kiswani-contact-experience"><img src="<?php echo esc_url(kiswani_elementor_asset_url('images/editorial/contact-room.webp')); ?>" alt="Warmly lit living space"><div aria-hidden="true"></div><div class="kiswani-contact-experience__frame" aria-hidden="true"></div><div class="kiswani-wrap"><div><span><?php $this->icon('sun'); ?></span><h2>Let us light your next space.</h2><p>Share your room, ceiling height, mood, and product needs. Kiswani will help narrow the right collection and specifications.</p><button type="button" class="kiswani-button" data-kiswani-open="kiswani-contact-drawer">Start a project</button></div></div></section>
            <script type="application/json" id="kiswani-product-data"><?php echo wp_json_encode(kiswani_elementor_product_payload($products)); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></script>
        </main>
        <?php
    }
}
