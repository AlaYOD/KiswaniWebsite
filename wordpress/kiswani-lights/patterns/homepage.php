<?php
/**
 * Title: Kiswani editable homepage
 * Slug: kiswani-lights/homepage
 * Categories: featured, kiswani
 * Description: Pixel-aligned Kiswani homepage sections converted from the Next.js experience.
 *
 * @package KiswaniLights
 */
?>
<section id="top" class="kl-hero alignfull">
    <div class="kl-hero__image">
        <img src="<?php echo kiswani_asset('images/kiswani-hero-2026.webp'); ?>" alt="<?php esc_attr_e('Warm architectural lighting interior', 'kiswani-lights'); ?>">
    </div>
    <div class="kl-hero__content kl-wrap">
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

<section class="kl-metrics alignfull" aria-label="<?php esc_attr_e('Kiswani service metrics', 'kiswani-lights'); ?>">
    <div class="kl-wrap kl-metrics__grid">
        <div class="kl-metric"><strong>90+</strong><span><?php esc_html_e('High-CRI light', 'kiswani-lights'); ?></span></div>
        <div class="kl-metric"><strong>48H</strong><span><?php esc_html_e('Project support', 'kiswani-lights'); ?></span></div>
        <div class="kl-metric"><strong>360°</strong><span><?php esc_html_e('Decorative + technical', 'kiswani-lights'); ?></span></div>
    </div>
</section>

<section class="kl-section kl-section--paper alignfull">
    <div class="kl-wrap">
        <div class="kl-section-header">
            <p class="kl-kicker"><?php esc_html_e('Brand statement', 'kiswani-lights'); ?></p>
            <h2><?php esc_html_e('Lighting is the soul of the space.', 'kiswani-lights'); ?></h2>
            <p><?php esc_html_e('The right fixture does more than illuminate. It gives materials depth, creates a focal point, and changes how the whole space feels.', 'kiswani-lights'); ?></p>
        </div>
    </div>
</section>

<section id="collections" class="kl-section kl-section--sand alignfull">
    <div class="kl-wrap">
        <div class="kl-section-header">
            <p class="kl-kicker"><?php esc_html_e('Lighting collections', 'kiswani-lights'); ?></p>
            <h2><?php esc_html_e('Find the light that belongs in your space.', 'kiswani-lights'); ?></h2>
        </div>
        <div class="kl-category-grid">
            <a class="kl-category-card" href="<?php echo esc_url(home_url('/collections/decorative/')); ?>">
                <img src="<?php echo kiswani_asset('images/kiswani-decorative-2026.webp'); ?>" alt="">
                <div class="kl-category-card__body"><span></span><h3><?php esc_html_e('Decorative lighting', 'kiswani-lights'); ?></h3><p><?php esc_html_e('Statement pieces that give the room its character.', 'kiswani-lights'); ?></p></div>
            </a>
            <a class="kl-category-card" href="<?php echo esc_url(home_url('/collections/interior/')); ?>">
                <img src="<?php echo kiswani_asset('images/kiswani-hero-2026.webp'); ?>" alt="">
                <div class="kl-category-card__body"><span></span><h3><?php esc_html_e('Interior lighting', 'kiswani-lights'); ?></h3><p><?php esc_html_e('Warm, considered light for everyday living.', 'kiswani-lights'); ?></p></div>
            </a>
            <a class="kl-category-card" href="<?php echo esc_url(home_url('/collections/technical/')); ?>">
                <img src="<?php echo kiswani_asset('images/kiswani-technical-2026.webp'); ?>" alt="">
                <div class="kl-category-card__body"><span></span><h3><?php esc_html_e('Technical lighting', 'kiswani-lights'); ?></h3><p><?php esc_html_e('Precise systems for architectural performance.', 'kiswani-lights'); ?></p></div>
            </a>
            <a class="kl-category-card" href="<?php echo esc_url(home_url('/collections/accent/')); ?>">
                <img src="<?php echo kiswani_asset('images/kiswani-accent-2026.webp'); ?>" alt="">
                <div class="kl-category-card__body"><span></span><h3><?php esc_html_e('Accent lighting', 'kiswani-lights'); ?></h3><p><?php esc_html_e('Focused moments that reveal material and mood.', 'kiswani-lights'); ?></p></div>
            </a>
        </div>
    </div>
</section>

<section id="types" class="kl-section kl-section--dark alignfull">
    <div class="kl-wrap">
        <div class="kl-section-header">
            <p class="kl-kicker"><?php esc_html_e('A distinctive visual language', 'kiswani-lights'); ?></p>
            <h2><?php esc_html_e('Every line has a purpose.', 'kiswani-lights'); ?></h2>
            <p><?php esc_html_e('From the product silhouette to the way light lands, Kiswani combines decorative presence with technical precision.', 'kiswani-lights'); ?></p>
        </div>
        <div class="kl-project-grid">
            <div class="kl-metric"><strong>01</strong><span><?php esc_html_e('Pendants and chandeliers', 'kiswani-lights'); ?></span></div>
            <div class="kl-metric"><strong>02</strong><span><?php esc_html_e('Track and recessed systems', 'kiswani-lights'); ?></span></div>
            <div class="kl-metric"><strong>03</strong><span><?php esc_html_e('Wall, floor, and accent lighting', 'kiswani-lights'); ?></span></div>
        </div>
    </div>
</section>

<section id="products" class="kl-section alignfull">
    <div class="kl-wrap">
        <div class="kl-section-header">
            <p class="kl-kicker"><?php esc_html_e('Featured lighting', 'kiswani-lights'); ?></p>
            <h2><?php esc_html_e('Selected pieces, clearly specified.', 'kiswani-lights'); ?></h2>
        </div>
        <div class="kl-product-grid">
            <?php
            $featured = new WP_Query([
                'post_type' => 'kiswani_product',
                'posts_per_page' => 8,
                'no_found_rows' => true,
            ]);
            if ($featured->have_posts()) :
                while ($featured->have_posts()) :
                    $featured->the_post();
                    kiswani_product_card();
                endwhile;
                wp_reset_postdata();
            else :
                foreach (['Decorative lighting', 'Interior lighting', 'Technical lighting', 'Accent lighting'] as $label) :
                    ?>
                    <article class="kl-product-card">
                        <div class="kl-product-card__media"><img src="<?php echo kiswani_asset('images/kiswani-decorative-2026.webp'); ?>" alt=""><span>KL</span></div>
                        <div class="kl-product-card__body"><p><?php esc_html_e('Sample product', 'kiswani-lights'); ?></p><h3><?php echo esc_html($label); ?></h3><div class="kl-product-card__excerpt"><?php esc_html_e('Add products in WordPress admin to replace this editable placeholder.', 'kiswani-lights'); ?></div></div>
                    </article>
                    <?php
                endforeach;
            endif;
            ?>
        </div>
    </div>
</section>

<section id="contact" class="kl-section kl-section--yellow alignfull">
    <div class="kl-wrap">
        <div class="kl-section-header">
            <p class="kl-kicker"><?php esc_html_e('Designing a space?', 'kiswani-lights'); ?></p>
            <h2><?php esc_html_e('Let’s light your next space.', 'kiswani-lights'); ?></h2>
            <p><?php esc_html_e('Decorative lighting, technical systems, and practical project support in one place.', 'kiswani-lights'); ?></p>
            <div class="kl-actions">
                <a class="kl-button kl-button--dark" href="mailto:info@kiswanilights.com"><?php esc_html_e('Contact Kiswani', 'kiswani-lights'); ?></a>
                <a class="kl-button kl-button--outline" href="https://wa.me/970599671209"><?php esc_html_e('Talk to a lighting advisor', 'kiswani-lights'); ?></a>
            </div>
        </div>
    </div>
</section>
