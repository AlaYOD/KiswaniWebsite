<?php
/**
 * Generic page template.
 *
 * The four information routes (about/support/privacy/terms) never reach this
 * file: inc/source-routes.php intercepts them via template_include and renders
 * templates/source-information.php instead.
 */

get_header();
?>
<main class="kiswani-site-content">
	<?php while ( have_posts() ) : the_post(); ?>
		<article <?php post_class(); ?>>
			<h1><?php the_title(); ?></h1>
			<?php the_content(); ?>
		</article>
	<?php endwhile; ?>
</main>
<?php get_footer();
