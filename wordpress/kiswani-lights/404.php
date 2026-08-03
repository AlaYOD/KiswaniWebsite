<?php
/** Not found template. */
get_header(); ?>
<main id="primary">
    <section class="kl-page-hero kl-page-hero--dark"><div class="kl-wrap"><p class="kl-kicker"><?php esc_html_e('404', 'kiswani-lights'); ?></p><h1><?php esc_html_e('Page not found.', 'kiswani-lights'); ?></h1><p><?php esc_html_e('The page you requested could not be found. Continue browsing the Kiswani catalog.', 'kiswani-lights'); ?></p><div class="kl-actions"><a class="kl-button" href="<?php echo esc_url(home_url('/products/')); ?>"><?php esc_html_e('Open catalog', 'kiswani-lights'); ?></a></div></div></section>
</main>
<?php get_footer(); ?>