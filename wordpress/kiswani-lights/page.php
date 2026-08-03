<?php
/** Standard page template. */
get_header();
while (have_posts()) : the_post(); ?>
<main id="primary">
    <section class="kl-page-hero kl-page-hero--dark"><div class="kl-wrap"><p class="kl-kicker"><?php esc_html_e('Kiswani Lights', 'kiswani-lights'); ?></p><h1><?php the_title(); ?></h1></div></section>
    <section class="kl-section"><div class="kl-wrap kl-content"><?php the_content(); ?></div></section>
</main>
<?php endwhile; get_footer(); ?>