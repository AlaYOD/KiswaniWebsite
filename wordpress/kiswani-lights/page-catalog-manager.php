<?php
/**
 * Template Name: Catalog Manager
 *
 * @package KiswaniLights
 */
$error = kiswani_catalog_manager_handle_actions();
get_header();
$manager_url = kiswani_catalog_manager_url();
?>
<main id="primary" class="kl-manager">
    <section class="kl-page-hero kl-page-hero--dark">
        <div class="kl-wrap kl-manager-hero">
            <div>
                <p class="kl-kicker"><?php esc_html_e('WordPress catalog manager', 'kiswani-lights'); ?></p>
                <h1><?php esc_html_e('Manage Kiswani products and collections.', 'kiswani-lights'); ?></h1>
                <p><?php esc_html_e('Add, edit, and organize products, collections, categories, and subcategories from the website using a WordPress administrator account.', 'kiswani-lights'); ?></p>
            </div>
            <?php if (is_user_logged_in()) : ?>
                <a class="kl-button kl-button--outline" href="<?php echo esc_url(wp_logout_url($manager_url)); ?>"><?php esc_html_e('Log out', 'kiswani-lights'); ?></a>
            <?php endif; ?>
        </div>
    </section>

    <section class="kl-section kl-section--paper">
        <div class="kl-wrap">
            <?php if ($error instanceof WP_Error) : ?>
                <div class="kl-manager-notice kl-manager-notice--error"><?php echo esc_html($error->get_error_message()); ?></div>
            <?php elseif (isset($_GET['updated'])) : ?>
                <div class="kl-manager-notice"><?php esc_html_e('Changes saved.', 'kiswani-lights'); ?></div>
            <?php endif; ?>

            <?php if (!is_user_logged_in()) : ?>
                <form class="kl-manager-card kl-manager-login" method="post">
                    <h2><?php esc_html_e('Administrator login', 'kiswani-lights'); ?></h2>
                    <p><?php esc_html_e('Use the WordPress super user username and password for this website.', 'kiswani-lights'); ?></p>
                    <input type="hidden" name="kiswani_manager_action" value="login">
                    <?php wp_nonce_field('kiswani_catalog_login', 'kiswani_login_nonce'); ?>
                    <label><?php esc_html_e('Username', 'kiswani-lights'); ?><input type="text" name="log" autocomplete="username" required></label>
                    <label><?php esc_html_e('Password', 'kiswani-lights'); ?><input type="password" name="pwd" autocomplete="current-password" required></label>
                    <label class="kl-manager-check"><input type="checkbox" name="rememberme" value="1"> <?php esc_html_e('Remember me', 'kiswani-lights'); ?></label>
                    <button class="kl-button" type="submit"><?php esc_html_e('Log in', 'kiswani-lights'); ?></button>
                </form>
            <?php elseif (!current_user_can('manage_options')) : ?>
                <div class="kl-manager-card"><h2><?php esc_html_e('Administrator access required', 'kiswani-lights'); ?></h2><p><?php esc_html_e('This area is only available to WordPress administrators.', 'kiswani-lights'); ?></p></div>
            <?php else :
                $products = kiswani_catalog_manager_products();
                $terms = kiswani_catalog_manager_terms();
                $edit_product_id = isset($_GET['edit_product']) ? absint($_GET['edit_product']) : 0;
                $edit_product = $edit_product_id ? get_post($edit_product_id) : null;
                if (!$edit_product instanceof WP_Post || get_post_type($edit_product) !== 'kiswani_product') {
                    $edit_product = null;
                    $edit_product_id = 0;
                }
                $static_product = $edit_product ? kiswani_current_static_product($edit_product) : null;
                $selected_terms = $edit_product_id ? wp_get_object_terms($edit_product_id, 'kiswani_product_collection', ['fields' => 'ids']) : [];
                $selected_terms = is_wp_error($selected_terms) ? [] : array_map('intval', $selected_terms);
                $edit_term_id = isset($_GET['edit_term']) ? absint($_GET['edit_term']) : 0;
                $edit_term = $edit_term_id ? get_term($edit_term_id, 'kiswani_product_collection') : null;
                if (!$edit_term instanceof WP_Term || is_wp_error($edit_term)) {
                    $edit_term = null;
                    $edit_term_id = 0;
                }
            ?>
                <div class="kl-manager-toolbar">
                    <a href="#products"><?php esc_html_e('Products', 'kiswani-lights'); ?></a>
                    <a href="#collections"><?php esc_html_e('Collections & categories', 'kiswani-lights'); ?></a>
                    <a href="<?php echo esc_url($manager_url); ?>"><?php esc_html_e('New product', 'kiswani-lights'); ?></a>
                </div>

                <?php if (empty($products)) : ?>
                    <form class="kl-manager-card" method="post">
                        <h2><?php esc_html_e('Import default Kiswani catalog', 'kiswani-lights'); ?></h2>
                        <p><?php esc_html_e('No WordPress products exist yet. Import the prepared Kiswani catalog products and collections.', 'kiswani-lights'); ?></p>
                        <input type="hidden" name="kiswani_manager_action" value="seed_catalog">
                        <?php wp_nonce_field('kiswani_catalog_manager', 'kiswani_manager_nonce'); ?>
                        <button class="kl-button" type="submit"><?php esc_html_e('Import catalog', 'kiswani-lights'); ?></button>
                    </form>
                <?php endif; ?>

                <div id="products" class="kl-manager-grid">
                    <form class="kl-manager-card kl-manager-form" method="post" enctype="multipart/form-data">
                        <h2><?php echo $edit_product ? esc_html__('Edit product', 'kiswani-lights') : esc_html__('Add product', 'kiswani-lights'); ?></h2>
                        <input type="hidden" name="kiswani_manager_action" value="save_product">
                        <input type="hidden" name="product_id" value="<?php echo esc_attr((string) $edit_product_id); ?>">
                        <?php wp_nonce_field('kiswani_catalog_manager', 'kiswani_manager_nonce'); ?>

                        <div class="kl-manager-two">
                            <label><?php esc_html_e('Product name', 'kiswani-lights'); ?><input type="text" name="product_title" value="<?php echo esc_attr($edit_product ? $edit_product->post_title : ''); ?>" required></label>
                            <label><?php esc_html_e('SKU / model', 'kiswani-lights'); ?><input type="text" name="product_sku" value="<?php echo esc_attr($edit_product_id ? kiswani_product_meta($edit_product_id, 'sku') : ''); ?>"></label>
                            <label><?php esc_html_e('Initial price', 'kiswani-lights'); ?><input type="text" name="product_price" value="<?php echo esc_attr($edit_product_id ? kiswani_product_meta($edit_product_id, 'price') : ''); ?>"></label>
                            <label><?php esc_html_e('Arabic name', 'kiswani-lights'); ?><input type="text" name="product_name_ar" value="<?php echo esc_attr($edit_product_id ? kiswani_product_meta($edit_product_id, 'name_ar') : ''); ?>"></label>
                        </div>

                        <label><?php esc_html_e('Short description', 'kiswani-lights'); ?><textarea name="product_excerpt" rows="3"><?php echo esc_textarea($edit_product ? $edit_product->post_excerpt : ''); ?></textarea></label>
                        <label><?php esc_html_e('Full description', 'kiswani-lights'); ?><textarea name="product_content" rows="5"><?php echo esc_textarea($edit_product ? $edit_product->post_content : ''); ?></textarea></label>
                        <label><?php esc_html_e('Arabic short description', 'kiswani-lights'); ?><textarea name="product_short_ar" rows="3"><?php echo esc_textarea($edit_product_id ? kiswani_product_meta($edit_product_id, 'short_ar') : ''); ?></textarea></label>

                        <fieldset class="kl-manager-fieldset">
                            <legend><?php esc_html_e('Collections, categories, and subcategories', 'kiswani-lights'); ?></legend>
                            <div class="kl-manager-checkgrid">
                                <?php foreach ($terms as $term) : ?>
                                    <label><input type="checkbox" name="product_terms[]" value="<?php echo esc_attr((string) $term->term_id); ?>" <?php checked(in_array((int) $term->term_id, $selected_terms, true)); ?>> <?php echo esc_html($term->name); ?></label>
                                <?php endforeach; ?>
                            </div>
                        </fieldset>

                        <fieldset class="kl-manager-fieldset">
                            <legend><?php esc_html_e('Specifications', 'kiswani-lights'); ?></legend>
                            <div class="kl-manager-two">
                                <?php foreach (KISWANI_PRODUCT_FIELDS as $key => $label) : if (in_array($key, ['sku', 'name_ar', 'short_ar'], true)) continue; ?>
                                    <label><?php echo esc_html($label); ?><input type="text" name="product_<?php echo esc_attr($key); ?>" value="<?php echo esc_attr($edit_product_id ? kiswani_product_meta($edit_product_id, $key) : ''); ?>"></label>
                                <?php endforeach; ?>
                            </div>
                        </fieldset>

                        <label><?php esc_html_e('Product image', 'kiswani-lights'); ?><input type="file" name="product_image" accept="image/*"></label>
                        <?php if ($edit_product_id && has_post_thumbnail($edit_product_id)) : ?><div class="kl-manager-thumb"><?php echo get_the_post_thumbnail($edit_product_id, 'medium'); ?></div><?php elseif ($static_product) : ?><div class="kl-manager-thumb"><img src="<?php echo esc_url(kiswani_asset_path((string) ($static_product['image'] ?? ''))); ?>" alt=""></div><?php endif; ?>

                        <div class="kl-manager-actions">
                            <button class="kl-button" type="submit"><?php esc_html_e('Save product', 'kiswani-lights'); ?></button>
                            <?php if ($edit_product_id) : ?><a class="kl-button kl-button--outline" href="<?php echo esc_url(get_permalink($edit_product_id)); ?>"><?php esc_html_e('View product', 'kiswani-lights'); ?></a><?php endif; ?>
                        </div>
                    </form>

                    <div class="kl-manager-card">
                        <h2><?php esc_html_e('Products', 'kiswani-lights'); ?></h2>
                        <div class="kl-manager-list">
                            <?php foreach ($products as $product_post) : ?>
                                <article>
                                    <div><strong><?php echo esc_html(get_the_title($product_post)); ?></strong><span><?php echo esc_html(kiswani_product_meta($product_post->ID, 'sku')); ?></span></div>
                                    <div class="kl-manager-row-actions"><a href="<?php echo esc_url(add_query_arg('edit_product', $product_post->ID, $manager_url)); ?>#products"><?php esc_html_e('Edit', 'kiswani-lights'); ?></a><a href="<?php echo esc_url(get_permalink($product_post)); ?>"><?php esc_html_e('View', 'kiswani-lights'); ?></a></div>
                                </article>
                            <?php endforeach; ?>
                        </div>
                    </div>
                </div>

                <div id="collections" class="kl-manager-grid kl-manager-grid--terms">
                    <form class="kl-manager-card kl-manager-form" method="post">
                        <h2><?php echo $edit_term ? esc_html__('Edit collection/category', 'kiswani-lights') : esc_html__('Add collection/category', 'kiswani-lights'); ?></h2>
                        <input type="hidden" name="kiswani_manager_action" value="save_term">
                        <input type="hidden" name="term_id" value="<?php echo esc_attr((string) $edit_term_id); ?>">
                        <?php wp_nonce_field('kiswani_catalog_manager', 'kiswani_manager_nonce'); ?>
                        <div class="kl-manager-two">
                            <label><?php esc_html_e('Name', 'kiswani-lights'); ?><input type="text" name="term_name" value="<?php echo esc_attr($edit_term ? $edit_term->name : ''); ?>" required></label>
                            <label><?php esc_html_e('Slug', 'kiswani-lights'); ?><input type="text" name="term_slug" value="<?php echo esc_attr($edit_term ? $edit_term->slug : ''); ?>"></label>
                            <label><?php esc_html_e('Type', 'kiswani-lights'); ?><select name="term_type">
                                <?php $term_type = $edit_term_id ? (string) get_term_meta($edit_term_id, '_kiswani_term_type', true) : 'category'; ?>
                                <option value="collection" <?php selected($term_type, 'collection'); ?>><?php esc_html_e('Collection', 'kiswani-lights'); ?></option>
                                <option value="category" <?php selected($term_type, 'category'); ?>><?php esc_html_e('Category', 'kiswani-lights'); ?></option>
                                <option value="subcategory" <?php selected($term_type, 'subcategory'); ?>><?php esc_html_e('Sub category', 'kiswani-lights'); ?></option>
                            </select></label>
                            <label><?php esc_html_e('Parent', 'kiswani-lights'); ?><select name="term_parent"><?php kiswani_catalog_manager_term_options($edit_term ? (int) $edit_term->parent : 0, $edit_term_id); ?></select></label>
                        </div>
                        <label><?php esc_html_e('Description', 'kiswani-lights'); ?><textarea name="term_description" rows="4"><?php echo esc_textarea($edit_term ? $edit_term->description : ''); ?></textarea></label>
                        <label><?php esc_html_e('Image URL', 'kiswani-lights'); ?><input type="url" name="term_image" value="<?php echo esc_attr($edit_term_id ? (string) get_term_meta($edit_term_id, '_kiswani_term_image', true) : ''); ?>" placeholder="https://..."></label>
                        <button class="kl-button" type="submit"><?php esc_html_e('Save collection/category', 'kiswani-lights'); ?></button>
                    </form>

                    <div class="kl-manager-card">
                        <h2><?php esc_html_e('Collections and categories', 'kiswani-lights'); ?></h2>
                        <div class="kl-manager-list">
                            <?php foreach ($terms as $term) : ?>
                                <article>
                                    <div><strong><?php echo esc_html($term->name); ?></strong><span><?php echo esc_html(get_term_meta($term->term_id, '_kiswani_term_type', true) ?: 'category'); ?> · <?php echo esc_html($term->slug); ?></span></div>
                                    <div class="kl-manager-row-actions"><a href="<?php echo esc_url(add_query_arg('edit_term', $term->term_id, $manager_url)); ?>#collections"><?php esc_html_e('Edit', 'kiswani-lights'); ?></a><a href="<?php echo esc_url(get_term_link($term)); ?>"><?php esc_html_e('View', 'kiswani-lights'); ?></a></div>
                                </article>
                            <?php endforeach; ?>
                        </div>
                    </div>
                </div>
            <?php endif; ?>
        </div>
    </section>
</main>
<?php get_footer(); ?>