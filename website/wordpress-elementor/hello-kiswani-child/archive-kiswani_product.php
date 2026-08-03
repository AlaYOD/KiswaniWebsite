<?php
/**
 * Kiswani product archive fallback template.
 *
 * @package HelloKiswaniChild
 */

get_header();
echo do_shortcode('[kiswani_header]');
echo '<main class="kiswani-home-section"><div class="kiswani-wrap"><p class="kiswani-kicker">Products</p><h1>All Kiswani lighting products.</h1>';
echo do_shortcode('[kiswani_product_grid limit="48"]');
echo '</div></main>';
echo do_shortcode('[kiswani_footer]');
get_footer();
