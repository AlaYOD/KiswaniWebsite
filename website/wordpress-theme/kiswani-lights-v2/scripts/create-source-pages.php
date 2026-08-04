<?php
/** Create only the local pages needed to exercise converted source templates. */

foreach (
	array(
		'about'   => 'About',
		'support' => 'Support',
		'privacy' => 'Privacy',
		'terms'   => 'Terms',
	) as $slug => $title
) {
	if ( ! get_page_by_path( $slug ) ) {
		wp_insert_post(
			array(
				'post_type'   => 'page',
				'post_status' => 'publish',
				'post_name'   => $slug,
				'post_title'  => $title,
			)
		);
	}

}
