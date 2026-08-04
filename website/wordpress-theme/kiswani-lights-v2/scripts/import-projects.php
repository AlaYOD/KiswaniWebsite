<?php
/**
 * Import/update the source project studies.
 *
 * Run: wp eval-file wp-content/themes/kiswani-lights-v2/scripts/import-projects.php
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$projects = array(
	array( 'ramallah-dining', 'Warm dining residence', 'residential', 'Ramallah', '2026', '/images/editorial/project-dining.webp', 'A sculptural pendant anchors the dining table while concealed light softens the surrounding joinery and walls.' ),
	array( 'bethlehem-lounge', 'Sculptural lounge', 'hospitality', 'Bethlehem', '2026', '/images/editorial/story-lounge.webp', 'A low, expressive fixture creates intimacy over the seating group and brings warmth to natural textures.' ),
	array( 'jerusalem-entrance', 'Halo entrance hall', 'hospitality', 'Jerusalem', '2026', '/images/editorial/hero-interior.webp', 'A suspended ring gives the tall entrance a clear visual center while warm reflected light reveals the timber ceiling.' ),
	array( 'nablus-table', 'Linear table lighting', 'retail', 'Nablus', '2026', '/images/editorial/hero-technical.webp', 'A precise linear fixture distributes comfortable task light while keeping the architectural view calm and uncluttered.' ),
	array( 'rawabi-living', 'Quiet living suite', 'residential', 'Rawabi', '2026', '/images/editorial/contact-room.webp', "Soft ambient layers support everyday living, with a clean pendant forming the room's main point of focus." ),
	array( 'albireh-stair', 'Night circulation', 'retail', 'Al-Bireh', '2026', '/images/editorial/story-stair.webp', 'Low-glare wall lighting guides movement along the stair while preserving the darker architectural atmosphere.' ),
	array( 'ramallah-entry-hall', 'Warm ring entrance', 'residential', 'Ramallah', '2026', '/images/projects/entry-hall.webp', 'A broad ring pendant defines the double-height entrance while warm reflected light reveals the timber ceiling and clean architectural lines.' ),
	array( 'jericho-terrace', 'Evening terrace glow', 'hospitality', 'Jericho', '2026', '/images/projects/terrace-wall-light.webp', 'A shaded wall fixture gives the terrace a soft pool of light, balancing visual comfort with a welcoming evening atmosphere.' ),
	array( 'nablus-gallery', 'Golden gallery pendant', 'retail', 'Nablus', '2026', '/images/projects/ring-pendant.webp', 'A luminous gold ring becomes the central display element, creating focused warmth against a restrained dark interior.' ),
	array( 'bethlehem-wall-light', 'Glass accent wall', 'residential', 'Bethlehem', '2026', '/images/projects/glass-wall-light.webp', 'Textured glass casts a layered pattern across the wall, turning a compact accent fixture into an atmospheric architectural detail.' ),
);

foreach ( array( 'residential' => 'Residential', 'hospitality' => 'Hospitality', 'retail' => 'Retail' ) as $slug => $name ) {
	if ( ! term_exists( $slug, 'kiswani_project_category' ) ) {
		wp_insert_term( $name, 'kiswani_project_category', array( 'slug' => $slug ) );
	}
}

foreach ( $projects as $index => $project ) {
	list( $slug, $title, $category, $location, $year, $image, $summary ) = $project;
	$existing = get_page_by_path( $slug, OBJECT, 'kiswani_project' );
	$payload  = array(
		'ID'           => $existing ? $existing->ID : 0,
		'post_type'    => 'kiswani_project',
		'post_status'  => 'publish',
		'post_name'    => $slug,
		'post_title'   => $title,
		'post_excerpt' => $summary,
		'menu_order'   => $index,
	);
	$post_id  = $existing ? wp_update_post( $payload, true ) : wp_insert_post( $payload, true );
	if ( is_wp_error( $post_id ) ) {
		WP_CLI::warning( $post_id->get_error_message() );
		continue;
	}
	wp_set_object_terms( $post_id, $category, 'kiswani_project_category', false );
	update_post_meta( $post_id, '_kiswani_project_location', $location );
	update_post_meta( $post_id, '_kiswani_project_year', $year );
	update_post_meta( $post_id, '_kiswani_project_image', $image );
}

WP_CLI::success( sprintf( 'Imported or updated %d project studies.', count( $projects ) ) );

