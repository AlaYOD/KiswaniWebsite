<?php
/**
 * Site header.
 *
 * @package KiswaniLights
 */
$groups = kiswani_static_product_map_groups();
$categories = kiswani_static_categories();
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
            <details class="kl-menu-dropdown">
                <summary><?php esc_html_e('Products', 'kiswani-lights'); ?></summary>
                <div class="kl-mega-menu">
                    <div class="kl-mega-menu__intro">
                        <span><?php esc_html_e('Kiswani catalog', 'kiswani-lights'); ?></span>
                        <strong><?php esc_html_e('Browse by collection or category.', 'kiswani-lights'); ?></strong>
                    </div>
                    <div class="kl-mega-menu__grid">
                        <div>
                            <p><?php esc_html_e('Collections', 'kiswani-lights'); ?></p>
                            <?php foreach ($groups as $group) : ?>
                                <a href="<?php echo esc_url(kiswani_collection_url((string) ($group['id'] ?? ''))); ?>"><?php echo esc_html((string) ($group['label']['en'] ?? 'Collection')); ?></a>
                            <?php endforeach; ?>
                        </div>
                        <div>
                            <p><?php esc_html_e('Categories', 'kiswani-lights'); ?></p>
                            <?php foreach ($categories as $category) : ?>
                                <a href="<?php echo esc_url(kiswani_collection_url((string) ($category['slug'] ?? ''))); ?>"><?php echo esc_html((string) ($category['name'] ?? 'Lighting')); ?></a>
                            <?php endforeach; ?>
                        </div>
                    </div>
                </div>
            </details>
            <a href="<?php echo esc_url(home_url('/#collections')); ?>"><?php esc_html_e('Collections', 'kiswani-lights'); ?></a>
            <a href="<?php echo esc_url(home_url('/projects/')); ?>"><?php esc_html_e('Projects', 'kiswani-lights'); ?></a>
            <a href="<?php echo esc_url(home_url('/about/')); ?>"><?php esc_html_e('About', 'kiswani-lights'); ?></a>
            <a href="<?php echo esc_url(home_url('/#contact')); ?>"><?php esc_html_e('Contact', 'kiswani-lights'); ?></a>
        </nav>

        <div class="kl-header-actions">
            <form class="kl-header-search" action="<?php echo esc_url(home_url('/products/')); ?>" method="get">
                <label class="screen-reader-text" for="kl-header-search-input"><?php esc_html_e('Search products', 'kiswani-lights'); ?></label>
                <input id="kl-header-search-input" type="search" name="s" placeholder="<?php esc_attr_e('Search', 'kiswani-lights'); ?>">
            </form>
            <select class="kl-lang" data-kl-language aria-label="<?php esc_attr_e('Language', 'kiswani-lights'); ?>">
                <option value="en">EN</option>
                <option value="ar">AR</option>
                <option value="he">HE</option>
            </select>
            <a class="kl-button" href="<?php echo esc_url(home_url('/products/')); ?>"><?php esc_html_e('Catalog', 'kiswani-lights'); ?></a>
            <details class="kl-mobile-menu">
                <summary aria-label="<?php esc_attr_e('Open mobile menu', 'kiswani-lights'); ?>"><span></span><span></span><span></span></summary>
                <div class="kl-mobile-menu__panel">
                    <a href="<?php echo esc_url(home_url('/')); ?>"><?php esc_html_e('Home', 'kiswani-lights'); ?></a>
                    <details>
                        <summary><?php esc_html_e('Products', 'kiswani-lights'); ?></summary>
                        <div>
                            <a href="<?php echo esc_url(home_url('/products/')); ?>"><?php esc_html_e('All products', 'kiswani-lights'); ?></a>
                            <?php foreach ($groups as $group) : ?>
                                <a href="<?php echo esc_url(kiswani_collection_url((string) ($group['id'] ?? ''))); ?>"><?php echo esc_html((string) ($group['label']['en'] ?? 'Collection')); ?></a>
                            <?php endforeach; ?>
                        </div>
                    </details>
                    <details>
                        <summary><?php esc_html_e('Categories', 'kiswani-lights'); ?></summary>
                        <div>
                            <?php foreach ($categories as $category) : ?>
                                <a href="<?php echo esc_url(kiswani_collection_url((string) ($category['slug'] ?? ''))); ?>"><?php echo esc_html((string) ($category['name'] ?? 'Lighting')); ?></a>
                            <?php endforeach; ?>
                        </div>
                    </details>
                    <a href="<?php echo esc_url(home_url('/projects/')); ?>"><?php esc_html_e('Projects', 'kiswani-lights'); ?></a>
                    <a href="<?php echo esc_url(home_url('/about/')); ?>"><?php esc_html_e('About', 'kiswani-lights'); ?></a>
                    <a href="<?php echo esc_url(home_url('/#contact')); ?>"><?php esc_html_e('Contact', 'kiswani-lights'); ?></a>
                </div>
            </details>
        </div>
    </div>
</header>