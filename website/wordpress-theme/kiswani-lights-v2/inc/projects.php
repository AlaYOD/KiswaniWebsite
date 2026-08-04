<?php
/**
 * Editable project studies used by the source-matched projects page.
 *
 * @package Kiswani_Lights_V2
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function kiswani_register_projects() {
	register_post_type(
		'kiswani_project',
		array(
			'labels' => array(
				'name'          => __( 'Projects', 'kiswani-lights' ),
				'singular_name' => __( 'Project', 'kiswani-lights' ),
				'add_new_item'  => __( 'Add Project', 'kiswani-lights' ),
				'edit_item'     => __( 'Edit Project', 'kiswani-lights' ),
			),
			'public'       => false,
			'show_ui'      => true,
			'show_in_rest' => true,
			'menu_icon'    => 'dashicons-format-gallery',
			'supports'     => array( 'title', 'editor', 'excerpt', 'page-attributes', 'thumbnail' ),
		)
	);

	register_taxonomy(
		'kiswani_project_category',
		'kiswani_project',
		array(
			'labels'       => array(
				'name'          => __( 'Project Categories', 'kiswani-lights' ),
				'singular_name' => __( 'Project Category', 'kiswani-lights' ),
			),
			'public'       => false,
			'show_ui'      => true,
			'show_in_rest' => true,
			'hierarchical' => false,
		)
	);
}
add_action( 'init', 'kiswani_register_projects' );

function kiswani_project_meta_box() {
	add_meta_box(
		'kiswani-project-details',
		__( 'Project Display Details', 'kiswani-lights' ),
		'kiswani_render_project_meta_box',
		'kiswani_project',
		'normal',
		'high'
	);
}
add_action( 'add_meta_boxes', 'kiswani_project_meta_box' );

function kiswani_render_project_meta_box( $post ) {
	wp_nonce_field( 'kiswani_save_project', 'kiswani_project_nonce' );
	$fields = array(
		'_kiswani_project_location' => __( 'Location', 'kiswani-lights' ),
		'_kiswani_project_year'     => __( 'Year', 'kiswani-lights' ),
		'_kiswani_project_image'    => __( 'Theme image path', 'kiswani-lights' ),
	);

	foreach ( $fields as $key => $label ) {
		$value = (string) get_post_meta( $post->ID, $key, true );
		?>
		<p>
			<label for="<?php echo esc_attr( $key ); ?>"><strong><?php echo esc_html( $label ); ?></strong></label><br>
			<input class="widefat" id="<?php echo esc_attr( $key ); ?>" name="<?php echo esc_attr( $key ); ?>" value="<?php echo esc_attr( $value ); ?>">
		</p>
		<?php
	}
}

function kiswani_save_project_meta( $post_id ) {
	if ( ! isset( $_POST['kiswani_project_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['kiswani_project_nonce'] ) ), 'kiswani_save_project' ) ) {
		return;
	}
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}
	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}

	foreach ( array( '_kiswani_project_location', '_kiswani_project_year', '_kiswani_project_image' ) as $key ) {
		if ( isset( $_POST[ $key ] ) ) {
			update_post_meta( $post_id, $key, sanitize_text_field( wp_unslash( $_POST[ $key ] ) ) );
		}
	}
}
add_action( 'save_post_kiswani_project', 'kiswani_save_project_meta' );

function kiswani_projects_data( $category = '' ) {
	$arguments = array(
		'post_type'      => 'kiswani_project',
		'post_status'    => 'publish',
		'posts_per_page' => -1,
		'orderby'        => array( 'menu_order' => 'ASC', 'date' => 'ASC' ),
	);

	if ( $category ) {
		$arguments['tax_query'] = array(
			array(
				'taxonomy' => 'kiswani_project_category',
				'field'    => 'slug',
				'terms'    => sanitize_key( $category ),
			),
		);
	}

	$posts = get_posts( $arguments );
	return array_map(
		static function ( $post ) {
			$terms = wp_get_post_terms( $post->ID, 'kiswani_project_category' );
			return array(
				'id'       => $post->post_name,
				'title'    => $post->post_title,
				'category' => $terms && ! is_wp_error( $terms ) ? $terms[0]->slug : 'residential',
				'location' => (string) get_post_meta( $post->ID, '_kiswani_project_location', true ),
				'year'     => (string) get_post_meta( $post->ID, '_kiswani_project_year', true ),
				'image'    => (string) get_post_meta( $post->ID, '_kiswani_project_image', true ),
				'summary'  => $post->post_excerpt ? $post->post_excerpt : wp_strip_all_tags( $post->post_content ),
			);
		},
		$posts
	);
}

