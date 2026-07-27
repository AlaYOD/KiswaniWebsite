<?php
/**
 * Product collection archive.
 *
 * @package KiswaniLights
 */

$term = get_queried_object();
get_header();
?>
<main id="main">
    <section class="kl-section kl-section--dark">
        <div class="kl-wrap">
            <div class="kl-section-header">
                <p class="kl-kicker"><?php esc_html_e('Kiswani collection', 'kiswani-lights'); ?></p>
                <h1 class="kl-display"><?php echo esc_html($term instanceof WP_Term ? $term->name : single_term_title('', false)); ?></h1>
                <?php if ($term instanceof WP_Term && $term->description) : ?>
                    <p><?php echo esc_html($term->description); ?></p>
                <?php endif; ?>
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
                <p><?php esc_html_e('No products are assigned to this collection yet.', 'kiswani-lights'); ?></p>
            <?php endif; ?>
        </div>
    </section>
</main>
<?php
get_footer();
