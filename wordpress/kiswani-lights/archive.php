<?php
/** Generic archive template. */
get_header(); ?>
<main id="primary">
    <section class="kl-page-hero kl-page-hero--dark"><div class="kl-wrap"><p class="kl-kicker"><?php esc_html_e('Archive', 'kiswani-lights'); ?></p><h1><?php the_archive_title(); ?></h1><?php the_archive_description('<p>', '</p>'); ?></div></section>
    <section class="kl-section"><div class="kl-wrap kl-post-list"><?php if (have_posts()) : while (have_posts()) : the_post(); ?><article class="kl-manager-card"><h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2><?php the_excerpt(); ?></article><?php endwhile; the_posts_pagination(); else : ?><div class="kl-empty-state"><h2><?php esc_html_e('Nothing found.', 'kiswani-lights'); ?></h2></div><?php endif; ?></div></section>
</main>
<?php get_footer(); ?>