<?php
/**
 * Product archive.
 *
 * @package KiswaniLights
 */

get_header();
?>
<main id="main">
    <section class="kl-section kl-section--dark">
        <div class="kl-wrap">
            <div class="kl-section-header">
                <p class="kl-kicker"><?php esc_html_e('Kiswani catalog', 'kiswani-lights'); ?></p>
                <h1 class="kl-display"><?php esc_html_e('Lighting products for memorable spaces.', 'kiswani-lights'); ?></h1>
                <p><?php esc_html_e('Browse decorative and technical lighting with structured specifications. Product content is managed from the WordPress Products CMS area.', 'kiswani-lights'); ?></p>
            </div>
        </div>
    </section>
    <section class="kl-section">
        <div class="kl-wrap">
            <?php if (have_posts()) : ?>
                <div class="kl-product-grid">
                    <?php while (have_posts()) : the_post(); kiswani_product_card(); endwhile; ?>
                </div>
                <?php the_posts_pagination(); ?>
            <?php else : ?>
                <h2><?php esc_html_e('No products yet', 'kiswani-lights'); ?></h2>
                <p><?php esc_html_e('Add products in the WordPress admin to populate this catalog.', 'kiswani-lights'); ?></p>
            <?php endif; ?>
        </div>
    </section>
</main>
<?php
get_footer();
