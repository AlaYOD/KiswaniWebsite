<?php
/**
 * Editing UI for the Kiswani product fields.
 *
 * The importer stores every product detail as protected meta (`_kiswani_*`),
 * which WordPress hides from the editor entirely — so without this screen a
 * product's price, code, image, specs and Arabic copy cannot be changed from
 * wp-admin at all, only re-imported.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/** Specs are stored as JSON [[label, value], ...]; the box edits them as "Label | Value" lines. */
function kiswani_specs_to_text( $json ) {
	$rows = json_decode( (string) $json, true );

	if ( ! is_array( $rows ) ) {
		return '';
	}

	$lines = array();

	foreach ( $rows as $row ) {
		if ( is_array( $row ) && isset( $row[0] ) ) {
			$lines[] = $row[0] . ' | ' . ( isset( $row[1] ) ? $row[1] : '' );
		}
	}

	return implode( "\n", $lines );
}

function kiswani_specs_from_text( $text ) {
	$rows = array();

	foreach ( preg_split( '/\r\n|\r|\n/', (string) $text ) as $line ) {
		$line = trim( $line );

		if ( '' === $line ) {
			continue;
		}

		$parts = explode( '|', $line, 2 );
		$label = sanitize_text_field( trim( $parts[0] ) );

		if ( '' === $label ) {
			continue;
		}

		$rows[] = array( $label, sanitize_text_field( trim( isset( $parts[1] ) ? $parts[1] : '' ) ) );
	}

	return $rows;
}

function kiswani_register_product_meta_box() {
	add_meta_box(
		'kiswani-product-fields',
		__( 'Kiswani product details', 'kiswani-lights' ),
		'kiswani_render_product_meta_box',
		'kiswani_product',
		'normal',
		'high'
	);
}
add_action( 'add_meta_boxes', 'kiswani_register_product_meta_box' );

function kiswani_render_product_meta_box( $post ) {
	wp_nonce_field( 'kiswani_save_product_fields', 'kiswani_product_nonce' );

	$code     = (string) get_post_meta( $post->ID, '_kiswani_code', true );
	$price    = (string) get_post_meta( $post->ID, '_kiswani_price', true );
	$image    = (string) get_post_meta( $post->ID, '_kiswani_source_image', true );
	$arabic   = (string) get_post_meta( $post->ID, '_kiswani_arabic_name', true );
	$arabic_d = (string) get_post_meta( $post->ID, '_kiswani_arabic_description', true );
	$specs    = kiswani_specs_to_text( get_post_meta( $post->ID, '_kiswani_specs', true ) );
	?>
	<style>
		.kiswani-fields { display: grid; gap: 16px; }
		.kiswani-fields label { display: block; font-weight: 600; margin-bottom: 4px; }
		.kiswani-fields input[type="text"], .kiswani-fields textarea { width: 100%; }
		.kiswani-fields .kiswani-row { display: grid; gap: 16px; grid-template-columns: 1fr 1fr; }
		.kiswani-fields p.description { margin: 4px 0 0; }
	</style>
	<div class="kiswani-fields">
		<div class="kiswani-row">
			<div>
				<label for="kiswani-code"><?php esc_html_e( 'Product code', 'kiswani-lights' ); ?></label>
				<input type="text" id="kiswani-code" name="kiswani_code" value="<?php echo esc_attr( $code ); ?>">
				<p class="description"><?php esc_html_e( 'Used for the product URL. Changing it changes the link.', 'kiswani-lights' ); ?></p>
			</div>
			<div>
				<label for="kiswani-price"><?php esc_html_e( 'Price', 'kiswani-lights' ); ?></label>
				<input type="text" id="kiswani-price" name="kiswani_price" value="<?php echo esc_attr( $price ); ?>">
				<p class="description"><?php esc_html_e( 'Numbers only, for example 285.', 'kiswani-lights' ); ?></p>
			</div>
		</div>

		<div>
			<label for="kiswani-image"><?php esc_html_e( 'Image path', 'kiswani-lights' ); ?></label>
			<input type="text" id="kiswani-image" name="kiswani_image" value="<?php echo esc_attr( $image ); ?>">
			<p class="description"><?php esc_html_e( 'Path inside the theme assets folder, for example /images/products/kiswani-product-01.jpg', 'kiswani-lights' ); ?></p>
		</div>

		<div class="kiswani-row">
			<div>
				<label for="kiswani-arabic"><?php esc_html_e( 'Arabic name', 'kiswani-lights' ); ?></label>
				<input type="text" id="kiswani-arabic" name="kiswani_arabic_name" value="<?php echo esc_attr( $arabic ); ?>" dir="rtl">
			</div>
			<div>
				<label for="kiswani-arabic-description"><?php esc_html_e( 'Arabic description', 'kiswani-lights' ); ?></label>
				<textarea id="kiswani-arabic-description" name="kiswani_arabic_description" rows="3" dir="rtl"><?php echo esc_textarea( $arabic_d ); ?></textarea>
			</div>
		</div>

		<div>
			<label for="kiswani-specs"><?php esc_html_e( 'Specifications', 'kiswani-lights' ); ?></label>
			<textarea id="kiswani-specs" name="kiswani_specs" rows="6"><?php echo esc_textarea( $specs ); ?></textarea>
			<p class="description"><?php esc_html_e( 'One per line, as "Label | Value". For example: Height | 56 cm', 'kiswani-lights' ); ?></p>
		</div>
	</div>
	<?php
}

function kiswani_save_product_fields( $post_id ) {
	if ( ! isset( $_POST['kiswani_product_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['kiswani_product_nonce'] ) ), 'kiswani_save_product_fields' ) ) {
		return;
	}

	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}

	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}

	if ( isset( $_POST['kiswani_code'] ) ) {
		update_post_meta( $post_id, '_kiswani_code', strtoupper( sanitize_text_field( wp_unslash( $_POST['kiswani_code'] ) ) ) );
	}

	if ( isset( $_POST['kiswani_price'] ) ) {
		update_post_meta( $post_id, '_kiswani_price', (float) wp_unslash( $_POST['kiswani_price'] ) );
	}

	if ( isset( $_POST['kiswani_image'] ) ) {
		update_post_meta( $post_id, '_kiswani_source_image', sanitize_text_field( wp_unslash( $_POST['kiswani_image'] ) ) );
	}

	if ( isset( $_POST['kiswani_arabic_name'] ) ) {
		update_post_meta( $post_id, '_kiswani_arabic_name', sanitize_text_field( wp_unslash( $_POST['kiswani_arabic_name'] ) ) );
	}

	if ( isset( $_POST['kiswani_arabic_description'] ) ) {
		update_post_meta( $post_id, '_kiswani_arabic_description', sanitize_textarea_field( wp_unslash( $_POST['kiswani_arabic_description'] ) ) );
	}

	if ( isset( $_POST['kiswani_specs'] ) ) {
		update_post_meta( $post_id, '_kiswani_specs', wp_json_encode( kiswani_specs_from_text( wp_unslash( $_POST['kiswani_specs'] ) ) ) );
	}
}
add_action( 'save_post_kiswani_product', 'kiswani_save_product_fields' );

/** Price and code in the product list so the catalogue is scannable. */
function kiswani_product_columns( $columns ) {
	$updated = array();

	foreach ( $columns as $key => $label ) {
		$updated[ $key ] = $label;

		if ( 'title' === $key ) {
			$updated['kiswani_code']  = __( 'Code', 'kiswani-lights' );
			$updated['kiswani_price'] = __( 'Price', 'kiswani-lights' );
		}
	}

	return $updated;
}
add_filter( 'manage_kiswani_product_posts_columns', 'kiswani_product_columns' );

function kiswani_product_column_content( $column, $post_id ) {
	if ( 'kiswani_code' === $column ) {
		echo esc_html( (string) get_post_meta( $post_id, '_kiswani_code', true ) );
	}

	if ( 'kiswani_price' === $column ) {
		$price = get_post_meta( $post_id, '_kiswani_price', true );
		echo '' !== $price ? esc_html( number_format_i18n( (float) $price ) ) : '—';
	}
}
add_action( 'manage_kiswani_product_posts_custom_column', 'kiswani_product_column_content', 10, 2 );
