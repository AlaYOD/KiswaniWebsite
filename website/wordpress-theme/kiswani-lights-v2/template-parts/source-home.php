<?php
$asset = static fn( $path ) => get_stylesheet_directory_uri() . '/assets/images/' . $path;
$categories = array(
	array( 'Decorative lighting', 'Statement pieces that give the room its character.', 'kiswani-decorative-2026.webp' ),
	array( 'Interior lighting', 'Warm, considered light for everyday living.', 'kiswani-scene-1.webp' ),
	array( 'Technical lighting', 'Precise systems for architectural performance.', 'kiswani-technical-2026.webp' ),
	array( 'Accent lighting', 'Focused moments that reveal material and mood.', 'kiswani-accent-2026.webp' ),
);
$products = array(
	array( 'Golden Wall Lamp - 2 Bulb', 'KL-GL-001', 'Decorative', 'Brush-gold wall lamp with crystal detail and a warm classic profile.', '₪285', 'products/kiswani-product-01.jpg' ),
	array( 'Golden Wall Lamp - 6 Bulb', 'KL-GL-002', 'Decorative', 'Six-light golden chandelier wall lamp with crystal accents.', '₪690', 'products/kiswani-product-02.jpg' ),
	array( 'Golden Wall Lamp - 15 Bulb', 'KL-GL-003', 'Decorative', 'Large golden chandelier with layered arms and crystal drops.', '₪1,450', 'products/kiswani-product-03.jpg' ),
	array( 'Golden Wall Lamp - 8 Bulb Long', 'KL-GL-004', 'Decorative', 'Long eight-light gold chandelier for dining and reception spaces.', '₪980', 'products/kiswani-product-04.jpg' ),
	array( 'Amber Globe Wall Lamp', 'KL-AG-005', 'Accent', 'Black wall lamp with amber glass globe for warm accent lighting.', '₪220', 'products/kiswani-product-05.jpg' ),
	array( 'Travertine Oval Wall Light', 'KL-TV-006', 'Accent', 'Natural travertine wall light with a soft halo glow.', '₪260', 'products/kiswani-product-06.jpg' ),
	array( 'Travertine Glass Sconce', 'KL-TV-007', 'Accent', 'Travertine and glass wall sconce with integrated switch control.', '₪240', 'products/kiswani-product-07.jpg' ),
	array( 'Travertine Cylinder Wall Light', 'KL-TV-008', 'Accent', 'Cylindrical travertine wall light with up and down illumination.', '₪210', 'products/kiswani-product-08.jpg' ),
);
?>
<main class="ks-home">
<?php require get_template_directory() . '/template-parts/source-home-top.php'; ?>
<?php require get_template_directory() . '/template-parts/source-home-collections.php'; ?>
<?php require get_template_directory() . '/template-parts/source-home-stories.php'; ?>
<?php require get_template_directory() . '/template-parts/source-home-types.php'; ?>
<?php require get_template_directory() . '/template-parts/source-home-products.php'; ?>
<?php require get_template_directory() . '/template-parts/source-home-marquee.php'; ?>
<?php require get_template_directory() . '/template-parts/source-home-project.php'; ?>
<?php require get_template_directory() . '/template-parts/source-home-contact.php'; ?>
</main>
