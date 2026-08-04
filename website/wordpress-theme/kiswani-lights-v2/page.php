<?php
$kiswani_page_slug = get_post_field( 'post_name', get_queried_object_id() );

if ( in_array( $kiswani_page_slug, array( 'about', 'support', 'privacy', 'terms' ), true ) ) {
	wp_enqueue_style( 'kiswani-source-pages', get_stylesheet_directory_uri() . '/assets/css/source-pages.css', array( 'kiswani-lights' ), '0.1.0' );
	wp_enqueue_script( 'kiswani-source-home', get_stylesheet_directory_uri() . '/assets/js/source-home.js', array(), '0.1.0', true );
	wp_add_inline_script( 'kiswani-source-home', 'window.ksThemeUri = ' . wp_json_encode( get_stylesheet_directory_uri() ) . ';', 'before' );
	get_header( 'source' );
	get_template_part( 'template-parts/source-information', null, array( 'kind' => $kiswani_page_slug ) );
	get_footer( 'source' );
	return;
}

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
