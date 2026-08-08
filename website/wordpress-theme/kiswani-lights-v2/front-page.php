<?php
/**
 * Source-matched Kiswani homepage.
 *
 * WordPress gives front-page.php priority over any page template assigned to
 * the front page, which is what makes "Edit with Elementor" fail here: Elementor
 * looks for the_content() and this template never calls it.
 *
 * inc/source-routes.php now steps aside when the front page has a page template
 * assigned, so choosing an Elementor template in Page Attributes hands the
 * homepage to Elementor. Leaving the template as Default keeps the coded,
 * pixel-matched homepage below.
 */

get_header( 'source-home' );
get_template_part( 'template-parts/source-home' );
get_footer( 'source' );
