<?php
/**
 * Native Kiswani homepage.
 *
 * @package KiswaniLights
 */
get_header();
$categories = kiswani_static_categories();
$groups = kiswani_static_product_map_groups();
$featured = array_slice(kiswani_static_products(), 0, 8);
?>
<main id="primary">
    <section class="kl-hero">
        <div class="kl-hero__image"><img src="<?php echo esc_url(kiswani_asset('images/kiswani-intro-chandelier-2026.webp')); ?>" alt="<?php esc_attr_e('Warm Kiswani chandelier lighting', 'kiswani-lights'); ?>"></div>
        <div class="kl-wrap kl-hero__content">
            <div>
                <p class="kl-kicker"><?php esc_html_e('Kiswani Lights / 2026', 'kiswani-lights'); ?></p>
                <h1><?php esc_html_e('Lighting is not just', 'kiswani-lights'); ?> <mark><?php esc_html_e('a decorative piece.', 'kiswani-lights'); ?></mark></h1>
                <p><?php esc_html_e('Lighting is the soul of the space. We select decorative and technical solutions that make every room feel intentional.', 'kiswani-lights'); ?></p>
                <div class="kl-actions">
                    <a class="kl-button" href="<?php echo esc_url(home_url('/products/')); ?>"><?php esc_html_e('Explore lighting', 'kiswani-lights'); ?></a>
                    <a class="kl-button kl-button--outline" href="#contact"><?php esc_html_e('Start a project', 'kiswani-lights'); ?></a>
                </div>
            </div>
        </div>
    </section>

    <section class="kl-metrics" aria-label="<?php esc_attr_e('Kiswani strengths', 'kiswani-lights'); ?>">
        <div class="kl-wrap kl-metrics__grid">
            <div class="kl-metric"><strong>90+</strong><span><?php esc_html_e('High-CRI light', 'kiswani-lights'); ?></span></div>
            <div class="kl-metric"><strong>48H</strong><span><?php esc_html_e('Project support', 'kiswani-lights'); ?></span></div>
            <div class="kl-metric"><strong>360°</strong><span><?php esc_html_e('Decorative + technical', 'kiswani-lights'); ?></span></div>
        </div>
    </section>

    <section class="kl-section kl-section--paper">
        <div class="kl-wrap kl-statement-grid">
            <span class="kl-section-number">02</span>
            <h2 class="kl-display"><?php esc_html_e('Lighting is the soul of the space.', 'kiswani-lights'); ?></h2>
            <p><?php esc_html_e('The right fixture does more than illuminate. It gives materials depth, creates a focal point, and changes how the whole space feels.', 'kiswani-lights'); ?></p>
        </div>
    </section>

    <section id="collections" class="kl-section kl-section--sand">
        <div class="kl-wrap">
            <div class="kl-section-header">
                <p class="kl-kicker"><?php esc_html_e('Product collections', 'kiswani-lights'); ?></p>
                <h2><?php esc_html_e('Find the light that belongs in your space.', 'kiswani-lights'); ?></h2>
            </div>
            <div class="kl-category-grid">
                <?php foreach ($groups as $group) : ?>
                    <a class="kl-category-card" href="<?php echo esc_url(kiswani_collection_url((string) ($group['id'] ?? ''))); ?>">
                        <img src="<?php echo esc_url(kiswani_asset_path((string) ($group['image'] ?? '/images/editorial/hero-interior.webp'))); ?>" alt="<?php echo esc_attr((string) ($group['label']['en'] ?? 'Collection')); ?>" loading="lazy">
                        <div class="kl-category-card__body"><span></span><h3><?php echo esc_html((string) ($group['label']['en'] ?? 'Collection')); ?></h3><p><?php echo esc_html((string) ($group['description']['en'] ?? '')); ?></p></div>
                    </a>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <section id="types" class="kl-section">
        <div class="kl-wrap">
            <div class="kl-section-header">
                <p class="kl-kicker"><?php esc_html_e('Lighting categories', 'kiswani-lights'); ?></p>
                <h2><?php esc_html_e('Browse by decorative, technical, interior, and accent needs.', 'kiswani-lights'); ?></h2>
            </div>
            <div class="kl-category-grid">
                <?php foreach ($categories as $category) : ?>
                    <a class="kl-category-card" href="<?php echo esc_url(kiswani_collection_url((string) ($category['slug'] ?? ''))); ?>">
                        <img src="<?php echo esc_url(kiswani_asset_path((string) ($category['image'] ?? '/images/editorial/hero-interior.webp'))); ?>" alt="<?php echo esc_attr((string) ($category['name'] ?? 'Lighting')); ?>" loading="lazy">
                        <div class="kl-category-card__body"><span></span><h3><?php echo esc_html((string) ($category['name'] ?? 'Lighting')); ?></h3><p><?php echo esc_html((string) ($category['detail'] ?? '')); ?></p></div>
                    </a>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <section id="products" class="kl-section kl-section--paper">
        <div class="kl-wrap">
            <div class="kl-section-header">
                <p class="kl-kicker"><?php esc_html_e('Featured lighting', 'kiswani-lights'); ?></p>
                <h2><?php esc_html_e('Selected pieces, clearly specified.', 'kiswani-lights'); ?></h2>
            </div>
            <div class="kl-product-grid">
                <?php foreach ($featured as $product) : kiswani_product_card_from_data($product); endforeach; ?>
            </div>
            <div class="kl-actions"><a class="kl-button kl-button--dark" href="<?php echo esc_url(home_url('/products/')); ?>"><?php esc_html_e('View all products', 'kiswani-lights'); ?></a></div>
        </div>
    </section>

    <section class="kl-section kl-project-strip">
        <div class="kl-wrap">
            <div class="kl-section-header">
                <p class="kl-kicker"><?php esc_html_e('Projects', 'kiswani-lights'); ?></p>
                <h2><?php esc_html_e('Installed lighting for memorable spaces.', 'kiswani-lights'); ?></h2>
            </div>
            <div class="kl-project-grid">
                <?php foreach ([['project-dining.webp','Dining room'],['story-stair.webp','Stair lighting'],['story-wall.webp','Wall lighting']] as $project) : ?>
                    <article class="kl-project-card"><img src="<?php echo esc_url(kiswani_asset('images/editorial/' . $project[0])); ?>" alt="<?php echo esc_attr($project[1]); ?>" loading="lazy"><div><span></span><h3><?php echo esc_html($project[1]); ?></h3></div></article>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <section id="contact" class="kl-section kl-section--dark kl-contact-band">
        <div class="kl-wrap">
            <div class="kl-section-header">
                <p class="kl-kicker"><?php esc_html_e('Designing a space?', 'kiswani-lights'); ?></p>
                <h2><?php esc_html_e('Let’s light your next space.', 'kiswani-lights'); ?></h2>
                <p><?php esc_html_e('Decorative lighting, technical systems, and practical project support in one place.', 'kiswani-lights'); ?></p>
                <div class="kl-actions">
                    <a class="kl-button" href="https://wa.me/970599671209" target="_blank" rel="noreferrer"><?php esc_html_e('Contact Kiswani', 'kiswani-lights'); ?></a>
                    <a class="kl-button kl-button--outline" href="mailto:info@kiswanilights.com">info@kiswanilights.com</a>
                </div>
            </div>
        </div>
    </section>
</main>
<?php get_footer(); ?>