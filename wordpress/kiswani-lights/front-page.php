<?php
/**
 * Front page fallback. The visible layout is editable in the Site Editor after import.
 *
 * @package KiswaniLights
 */

get_header();
?>
<main id="main">
    <?php
    if (have_posts()) {
        while (have_posts()) {
            the_post();
            the_content();
        }
    } else {
        get_template_part('patterns/homepage');
    }
    ?>
</main>
<?php
get_footer();
