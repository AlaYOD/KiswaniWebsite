<?php
/**
 * Editable page template.
 *
 * @package KiswaniLights
 */

get_header();
?>
<main id="main" class="kl-section">
    <div class="kl-wrap">
        <?php while (have_posts()) : the_post(); ?>
            <article <?php post_class(); ?>>
                <div class="kl-section-header">
                    <p class="kl-kicker"><?php echo esc_html(get_bloginfo('name')); ?></p>
                    <h1><?php the_title(); ?></h1>
                </div>
                <div class="entry-content"><?php the_content(); ?></div>
            </article>
        <?php endwhile; ?>
    </div>
</main>
<?php
get_footer();
