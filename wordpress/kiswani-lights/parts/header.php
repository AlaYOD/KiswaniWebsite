<?php
/**
 * Site header.
 *
 * @package KiswaniLights
 */
?>
<header class="kl-site-header">
    <div class="kl-topline">
        <div class="kl-topline__inner">
            <span><?php esc_html_e('Lighting is the soul of the space', 'kiswani-lights'); ?></span>
            <div class="kl-topline__contact">
                <a href="tel:+970599671209">+970 599 67 12 09</a>
                <span><?php esc_html_e('Ramallah · Palestine', 'kiswani-lights'); ?></span>
            </div>
        </div>
    </div>
    <div class="kl-nav">
        <a class="kl-logo" href="<?php echo esc_url(home_url('/')); ?>" aria-label="<?php esc_attr_e('Kiswani Lights home', 'kiswani-lights'); ?>">
            <?php if (has_custom_logo()) : ?>
                <?php the_custom_logo(); ?>
            <?php else : ?>
                <img src="<?php echo kiswani_logo_url(true); ?>" alt="<?php esc_attr_e('Kiswani Lights', 'kiswani-lights'); ?>">
            <?php endif; ?>
        </a>
        <nav class="kl-primary-menu" aria-label="<?php esc_attr_e('Primary navigation', 'kiswani-lights'); ?>">
            <?php
            wp_nav_menu([
                'theme_location' => 'primary',
                'container' => false,
                'fallback_cb' => 'kiswani_fallback_primary_menu',
                'items_wrap' => '%3$s',
                'depth' => 1,
            ]);
            ?>
        </nav>
        <div class="kl-header-actions">
            <select class="kl-lang" data-kl-language aria-label="<?php esc_attr_e('Language', 'kiswani-lights'); ?>">
                <option value="en">EN</option>
                <option value="ar">AR</option>
                <option value="he">HE</option>
            </select>
            <a class="kl-button" href="<?php echo esc_url(home_url('/products/')); ?>"><?php esc_html_e('Catalog', 'kiswani-lights'); ?></a>
        </div>
    </div>
</header>
