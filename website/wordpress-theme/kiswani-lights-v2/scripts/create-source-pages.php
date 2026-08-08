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
		// Without an author the page shows a blank Author column and drops out of
		// the "Mine" filter on the Pages screen.
		$kiswani_admins = get_users( array( 'role' => 'administrator', 'number' => 1, 'fields' => 'ID' ) );

		wp_insert_post(
			array(
				'post_type'   => 'page',
				'post_status' => 'publish',
				'post_name'   => $slug,
				'post_title'  => $title,
				'post_author' => $kiswani_admins ? (int) $kiswani_admins[0] : 1,
			)
		);
	}

}
