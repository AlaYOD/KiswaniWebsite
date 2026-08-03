<?php
/**
 * Front page fallback for Docker preview.
 *
 * @package HelloKiswaniChild
 */

get_header();
while (have_posts()) {
    the_post();
    the_content();
}
get_footer();
