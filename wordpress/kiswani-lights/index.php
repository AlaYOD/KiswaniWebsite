<?php
/**
 * Generic index.
 *
 * @package KiswaniLights
 */

get_header();
?>
<main id="main" class="kl-section">
    <div class="kl-wrap">
        <?php if (have_posts()) : ?>
            <div class="kl-product-grid">
                <?php while (have_posts()) : the_post(); ?>
                    <article class="kl-product-card">
                        <a class="kl-product-card__media" href="<?php the_permalink(); ?>">
                            <?php if (has_post_thumbnail()) : the_post_thumbnail('large'); endif; ?>
                        </a>
                        <div class="kl-product-card__body">
                            <p><?php echo esc_html(get_post_type()); ?></p>
                            <h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
                            <div class="kl-product-card__excerpt"><?php the_excerpt(); ?></div>
                        </div>
                    </article>
                <?php endwhile; ?>
            </div>
            <?php the_posts_pagination(); ?>
        <?php else : ?>
            <h1><?php esc_html_e('No content found', 'kiswani-lights'); ?></h1>
        <?php endif; ?>
    </div>
</main>
<?php
get_footer();
