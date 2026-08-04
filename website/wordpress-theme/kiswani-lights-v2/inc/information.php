<?php
/** Editable content model for About, Support, Privacy, and Terms pages. */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function kiswani_information_defaults() {
	return array(
		'about' => array(
			'eyebrow' => 'ABOUT KISWANI',
			'title'    => 'We shape atmosphere through light.',
			'lead'     => 'Kiswani Lights brings decorative presence, technical precision, and practical project support together for spaces that feel complete.',
			'notice'   => '',
			'sections' => array(
				array( 'title' => 'Our point of view', 'body' => 'Lighting is not an object added at the end of a project. It determines how materials read, how people move, and how a room feels from the first moment.' ),
				array( 'title' => 'Decorative and technical', 'body' => 'We balance statement fixtures with precise architectural systems. The result is lighting that is expressive where it should be and quiet where performance matters most.' ),
				array( 'title' => 'A project partner', 'body' => 'From selecting a fixture to reviewing specifications and availability, our team helps homeowners, designers, contractors, and businesses make confident lighting decisions.' ),
				array( 'title' => 'Rooted in Ramallah', 'body' => 'Kiswani serves the local market with a clear international outlook—combining trusted relationships, responsive support, and a contemporary approach to lighting.' ),
			),
		),
		'support' => array(
			'eyebrow' => 'LIGHTING SUPPORT',
			'title'    => 'Clear answers for every stage of your project.',
			'lead'     => 'Whether you are comparing products, checking specifications, or preparing an order, the Kiswani team is ready to help.',
			'notice'   => '',
			'sections' => array(
				array( 'title' => 'Choosing the right light', 'body' => 'Tell us about the room, ceiling height, materials, and desired atmosphere. We will help narrow the collection to fixtures that suit the space and its function.' ),
				array( 'title' => 'Specifications and downloads', 'body' => 'Product pages include the available technical data and downloadable PDF sheets. Contact us when a specification needs confirmation before tender or installation.' ),
				array( 'title' => 'Pricing and availability', 'body' => 'Prices, stock, lead time, and delivery options are confirmed by our team before an order is approved, so you receive current information for your exact request.' ),
				array( 'title' => 'Delivery and installation', 'body' => 'We can clarify packaging, delivery coordination, and the installation information available for each fixture. Electrical installation should always be completed by a qualified professional.' ),
				array( 'title' => 'After-order assistance', 'body' => 'Keep your product code and order details ready when contacting us. This helps the team identify the item and respond more quickly.' ),
			),
		),
		'privacy' => array(
			'eyebrow' => 'PRIVACY',
			'title'    => 'Your information, handled with care.',
			'lead'     => 'This page explains what information Kiswani Lights may receive through the website and how it is used to support your requests.',
			'notice'   => 'Last updated: July 2026',
			'sections' => array(
				array( 'title' => 'Information you provide', 'body' => 'When you contact us or prepare an order, you may provide your name, phone number, email, city, project details, delivery information, and the products you are interested in.' ),
				array( 'title' => 'How we use information', 'body' => 'We use this information to answer inquiries, prepare quotations, confirm availability, coordinate orders and delivery, improve support, and protect the website from misuse.' ),
				array( 'title' => 'Local website storage', 'body' => 'The website may store limited preferences on your device, such as language selection, cart contents, and whether the introduction has already been shown. This information supports the browsing experience.' ),
				array( 'title' => 'Sharing and service providers', 'body' => 'We do not sell personal information. Information may be shared only with providers needed to operate the website, communicate with you, or fulfill a confirmed request, subject to appropriate safeguards.' ),
				array( 'title' => 'Retention and security', 'body' => 'We retain information only as long as reasonably needed for service, operational, and record-keeping purposes. We use reasonable measures to protect it, while no online system can guarantee absolute security.' ),
				array( 'title' => 'Your choices and contact', 'body' => 'You may ask us to review, correct, or delete personal information held in connection with a website inquiry, subject to legitimate record-keeping needs. Contact info@kiswanilights.com.' ),
			),
		),
		'terms' => array(
			'eyebrow' => 'TERMS OF USE',
			'title'    => 'Clear terms for using the Kiswani website.',
			'lead'     => 'These terms govern use of this website and the product inquiry and order-request tools available through it.',
			'notice'   => 'Last updated: July 2026',
			'sections' => array(
				array( 'title' => 'Using this website', 'body' => 'You may use the website for lawful personal, professional, and project-planning purposes. Do not interfere with its operation, attempt unauthorized access, or use its content in a misleading or harmful way.' ),
				array( 'title' => 'Product information', 'body' => 'We aim to present product images, descriptions, and specifications accurately. Finishes, color appearance, dimensions, and technical details should be confirmed with the Kiswani team before purchase or installation.' ),
				array( 'title' => 'Prices, availability, and requests', 'body' => 'Website cart and checkout actions create an order request, not an automatically accepted sale. Pricing, availability, quantities, delivery, payment, and lead time are confirmed directly by Kiswani before an order becomes final.' ),
				array( 'title' => 'Installation and safe use', 'body' => 'Lighting products must be installed and used according to their specifications and applicable safety requirements. Electrical work should be carried out by a qualified professional.' ),
				array( 'title' => 'Intellectual property', 'body' => 'The Kiswani name, logo, website design, text, product presentation, and original media are protected. They may not be copied, modified, or used commercially without permission from the relevant rights holder.' ),
				array( 'title' => 'Third-party services', 'body' => 'The website may link to messaging, maps, downloads, or other third-party services. Their availability and privacy practices are controlled by those providers.' ),
				array( 'title' => 'Changes and contact', 'body' => 'We may update these terms when the website or services change. The latest version will appear on this page. Questions may be sent to info@kiswanilights.com.' ),
			),
		),
	);
}

function kiswani_information_page_data( $kind, $post_id = 0 ) {
	$all  = kiswani_information_defaults();
	$data = isset( $all[ $kind ] ) ? $all[ $kind ] : null;
	if ( ! $data ) {
		return null;
	}
	$post_id = $post_id ? absint( $post_id ) : get_queried_object_id();
	foreach ( array( 'eyebrow', 'title', 'lead', 'notice' ) as $field ) {
		$value = get_post_meta( $post_id, '_kiswani_info_' . $field, true );
		if ( '' !== $value ) {
			$data[ $field ] = $value;
		}
	}
	$sections = get_post_meta( $post_id, '_kiswani_info_sections', true );
	if ( is_array( $sections ) && $sections ) {
		$data['sections'] = $sections;
	}
	return $data;
}

function kiswani_information_add_metabox() {
	$post = get_current_screen();
	if ( ! $post || 'page' !== $post->post_type ) {
		return;
	}
	$current = isset( $_GET['post'] ) ? get_post( absint( $_GET['post'] ) ) : null;
	if ( ! $current || ! in_array( $current->post_name, array( 'about', 'support', 'privacy', 'terms' ), true ) ) {
		return;
	}
	add_meta_box( 'kiswani-information-content', __( 'Kiswani page content', 'kiswani-lights' ), 'kiswani_information_metabox', 'page', 'normal', 'high' );
}
add_action( 'add_meta_boxes_page', 'kiswani_information_add_metabox' );

function kiswani_information_metabox( $post ) {
	$data = kiswani_information_page_data( $post->post_name, $post->ID );
	wp_nonce_field( 'kiswani_information_save', 'kiswani_information_nonce' );
	foreach ( array( 'eyebrow' => 'Eyebrow', 'title' => 'Hero title', 'lead' => 'Hero introduction', 'notice' => 'Update notice' ) as $field => $label ) {
		printf( '<p><label><strong>%1$s</strong><br><textarea style="width:100%%" rows="%2$d" name="kiswani_info_%3$s">%4$s</textarea></label></p>', esc_html( $label ), 'lead' === $field ? 3 : 1, esc_attr( $field ), esc_textarea( $data[ $field ] ) );
	}
	echo '<p><strong>Sections JSON</strong> — edit repeated title/body items.</p>';
	printf( '<textarea style="width:100%%;font-family:monospace" rows="18" name="kiswani_info_sections">%s</textarea>', esc_textarea( wp_json_encode( $data['sections'], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE ) ) );
}

function kiswani_information_save( $post_id ) {
	if ( ! isset( $_POST['kiswani_information_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['kiswani_information_nonce'] ) ), 'kiswani_information_save' ) || ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}
	foreach ( array( 'eyebrow', 'title', 'lead', 'notice' ) as $field ) {
		if ( isset( $_POST[ 'kiswani_info_' . $field ] ) ) {
			update_post_meta( $post_id, '_kiswani_info_' . $field, sanitize_textarea_field( wp_unslash( $_POST[ 'kiswani_info_' . $field ] ) ) );
		}
	}
	if ( isset( $_POST['kiswani_info_sections'] ) ) {
		$decoded = json_decode( wp_unslash( $_POST['kiswani_info_sections'] ), true );
		if ( is_array( $decoded ) ) {
			$clean = array();
			foreach ( $decoded as $section ) {
				if ( is_array( $section ) && isset( $section['title'], $section['body'] ) ) {
					$clean[] = array( 'title' => sanitize_text_field( $section['title'] ), 'body' => sanitize_textarea_field( $section['body'] ) );
				}
			}
			update_post_meta( $post_id, '_kiswani_info_sections', $clean );
		}
	}
}
add_action( 'save_post_page', 'kiswani_information_save' );
