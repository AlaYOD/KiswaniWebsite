<?php
/**
 * Page fallback for Docker preview pages.
 *
 * @package HelloKiswaniChild
 */

get_header();
while (have_posts()) {
    the_post();
    the_content();
}
get_footer();
