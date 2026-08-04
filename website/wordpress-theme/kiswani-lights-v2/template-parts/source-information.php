<?php
/**
 * Shared source-faithful layout for the four information routes.
 * Content is deliberately kept in this theme layer until it is migrated to
 * Elementor widgets / WordPress fields; it mirrors the English source view.
 *
 * @var array $args
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$kind = isset( $args['kind'] ) ? sanitize_key( $args['kind'] ) : 'about';
$pages = array(
	'about' => array(
		'eyebrow' => 'ABOUT KISWANI',
		'title'   => 'We shape atmosphere through light.',
		'lead'    => 'Kiswani Lights brings decorative presence, technical precision, and practical project support together for spaces that feel complete.',
		'icon'    => 'âœ¦',
		'feature' => array( 'Lighting is the soul of the space.', 'KISWANI / 2026', 'kiswani-hero-2026.webp' ),
		'sections' => array(
			array( 'Our point of view', 'Lighting is not an object added at the end of a project. It determines how materials read, how people move, and how a room feels from the first moment.' ),
			array( 'Decorative and technical', 'We balance statement fixtures with precise architectural systems. The result is lighting that is expressive where it should be and quiet where performance matters most.' ),
			array( 'A project partner', 'From selecting a fixture to reviewing specifications and availability, our team helps homeowners, designers, contractors, and businesses make confident lighting decisions.' ),
			array( 'Rooted in Ramallah', 'Kiswani serves the local market with a clear international outlookâ€”combining trusted relationships, responsive support, and a contemporary approach to lighting.' ),
		),
	),
	'support' => array(
		'eyebrow' => 'LIGHTING SUPPORT',
		'title'   => 'Clear answers for every stage of your project.',
		'lead'    => 'Whether you are comparing products, checking specifications, or preparing an order, the Kiswani team is ready to help.',
		'icon'    => 'â—Œ',
		'contacts' => array(
			array( 'WhatsApp', '+970 599 67 12 09', 'https://wa.me/970599671209' ),
			array( 'Call us', '+970 599 67 12 09', 'tel:+970599671209' ),
			array( 'Email support', 'info@kiswanilights.com', 'mailto:info@kiswanilights.com' ),
			array( 'Showroom', 'Ramallah Â· Palestine', 'https://maps.google.com/?q=Ramallah+Palestine' ),
		),
		'sections' => array(
			array( 'Choosing the right light', 'Tell us about the room, ceiling height, materials, and desired atmosphere. We will help narrow the collection to fixtures that suit the space and its function.' ),
			array( 'Specifications and downloads', 'Product pages include the available technical data and downloadable PDF sheets. Contact us when a specification needs confirmation before tender or installation.' ),
			array( 'Pricing and availability', 'Prices, stock, lead time, and delivery options are confirmed by our team before an order is approved, so you receive current information for your exact request.' ),
			array( 'Delivery and installation', 'We can clarify packaging, delivery coordination, and the installation information available for each fixture. Electrical installation should always be completed by a qualified professional.' ),
			array( 'After-order assistance', 'Keep your product code and order details ready when contacting us. This helps the team identify the item and respond more quickly.' ),
		),
	),
	'privacy' => array(
		'eyebrow' => 'PRIVACY',
		'title'   => 'Your information, handled with care.',
		'lead'    => 'This page explains what information Kiswani Lights may receive through the website and how it is used to support your requests.',
		'notice'  => 'Last updated: July 2026',
		'icon'    => 'â—‡',
		'sections' => array(
			array( 'Information you provide', 'When you contact us or prepare an order, you may provide your name, phone number, email, city, project details, delivery information, and the products you are interested in.' ),
			array( 'How we use information', 'We use this information to answer inquiries, prepare quotations, confirm availability, coordinate orders and delivery, improve support, and protect the website from misuse.' ),
			array( 'Local website storage', 'The website may store limited preferences on your device, such as language selection, cart contents, and whether the introduction has already been shown. This information supports the browsing experience.' ),
			array( 'Sharing and service providers', 'We do not sell personal information. Information may be shared only with providers needed to operate the website, communicate with you, or fulfill a confirmed request, subject to appropriate safeguards.' ),
		),
	),
	'terms' => array(
		'eyebrow' => 'TERMS',
		'title'   => 'Clear terms for using Kiswani Lights.',
		'lead'    => 'These terms explain how the website, product information, cart requests, and related services are intended to be used.',
		'icon'    => 'â–¡',
		'sections' => array(
			array( 'Using this website', 'The website is provided to help visitors discover Kiswani Lights products, seek advice, prepare project requests, and contact the team. Please use it lawfully and respectfully.' ),
			array( 'Product information', 'We aim to present product images, descriptions, and specifications accurately. Finishes, colour appearance, dimensions, and technical details should be confirmed with the Kiswani team before purchase or installation.' ),
			array( 'Prices, availability, and requests', 'Website cart and checkout actions create an order request, not an automatically accepted sale. Pricing, availability, quantities, delivery, payment, and lead time are confirmed directly by Kiswani before an order becomes final.' ),
			array( 'Installation and safe use', 'Lighting products must be installed and used according to their specifications and applicable safety requirements. Electrical work should be carried out by a qualified professional.' ),
			array( 'Intellectual property', 'The Kiswani name, logo, website design, text, product presentation, and original media are protected. They may not be copied, modified, or used commercially without permission from the relevant rights holder.' ),
			array( 'Changes and contact', 'We may update these terms when the website or services change. The latest version will appear on this page. Questions may be sent to info@kiswanilights.com.' ),
		),
	),
);

$page = isset( $pages[ $kind ] ) ? $pages[ $kind ] : $pages['about'];
$all_pages = array( 'about' => 'About', 'support' => 'Support', 'privacy' => 'Privacy', 'terms' => 'Terms' );
$theme_uri = get_stylesheet_directory_uri();
?>
<main class="ks-information" id="top">
	<section class="ks-info-hero">
		<div class="ks-info-wrap">
			<div class="ks-crumb"><a href="<?php echo esc_url( home_url( '/' ) ); ?>">Kiswani Lights</a><span>/</span><b><?php echo esc_html( $page['eyebrow'] ); ?></b></div>
			<div class="ks-info-hero__content">
				<div><p class="ks-kicker"><span></span><?php echo esc_html( $page['eyebrow'] ); ?></p><h1><?php echo esc_html( $page['title'] ); ?></h1><p class="ks-info-lead"><?php echo esc_html( $page['lead'] ); ?></p><?php if ( ! empty( $page['notice'] ) ) : ?><p class="ks-info-notice"><?php echo esc_html( $page['notice'] ); ?></p><?php endif; ?></div>
				<div class="ks-info-symbol" aria-hidden="true"><i><?php echo esc_html( $page['icon'] ); ?></i><span>0<?php echo esc_html( (string) ( array_search( $kind, array_keys( $all_pages ), true ) + 1 ) ); ?> / 04</span></div>
			</div>
			<nav class="ks-info-tabs" aria-label="Information pages"><?php $counter = 1; foreach ( $all_pages as $slug => $label ) : ?><a<?php echo $slug === $kind ? ' aria-current="page"' : ''; ?> href="<?php echo esc_url( home_url( '/' . $slug . '/' ) ); ?>"><span><?php echo esc_html( $label ); ?></span><small>0<?php echo esc_html( (string) $counter ); ?></small></a><?php $counter++; endforeach; ?></nav>
		</div>
	</section>
	<?php if ( ! empty( $page['feature'] ) ) : ?><section class="ks-info-feature"><div><div style="background-image:url('<?php echo esc_url( $theme_uri . '/assets/images/' . $page['feature'][2] ); ?>')"></div><article><span>â—‰</span><p><?php echo esc_html( $page['feature'][1] ); ?></p><h2><?php echo esc_html( $page['feature'][0] ); ?></h2></article></div></section><?php endif; ?>
	<?php if ( ! empty( $page['contacts'] ) ) : ?><section class="ks-info-contacts"><div><p class="ks-kicker"><span></span>CONTACT THE SUPPORT TEAM</p><div><?php $counter = 1; foreach ( $page['contacts'] as $contact ) : ?><a href="<?php echo esc_url( $contact[2] ); ?>"<?php echo 0 === strpos( $contact[2], 'http' ) ? ' target="_blank" rel="noreferrer"' : ''; ?>><i>â†—</i><small>0<?php echo esc_html( (string) $counter ); ?></small><h3><?php echo esc_html( $contact[0] ); ?></h3><p><?php echo esc_html( $contact[1] ); ?></p></a><?php $counter++; endforeach; ?></div></div></section><?php endif; ?>
	<section class="ks-info-body"><div><aside><p>ON THIS PAGE</p><nav><?php $counter = 1; foreach ( $page['sections'] as $section ) : ?><a href="#section-<?php echo esc_attr( (string) $counter ); ?>"><span><?php echo esc_html( $section[0] ); ?></span><small>0<?php echo esc_html( (string) $counter ); ?></small></a><?php $counter++; endforeach; ?></nav></aside><div class="ks-info-articles"><?php $counter = 1; foreach ( $page['sections'] as $section ) : ?><article id="section-<?php echo esc_attr( (string) $counter ); ?>"><small>0<?php echo esc_html( (string) $counter ); ?></small><div><h2><?php echo esc_html( $section[0] ); ?></h2><p><?php echo esc_html( $section[1] ); ?></p></div></article><?php $counter++; endforeach; ?></div></div></section>
	<section class="ks-info-cta"><div><p>KISWANI SUPPORT</p><h2>Still need a clear answer? Talk to our team.</h2><a href="https://wa.me/970599671209" target="_blank" rel="noreferrer">Contact Kiswani <span>â†’</span></a></div></section>
</main>
