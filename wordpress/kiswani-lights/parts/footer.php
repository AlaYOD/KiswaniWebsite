<?php
/**
 * Site footer.
 *
 * @package KiswaniLights
 */
?>
<footer class="kl-footer">
    <div class="kl-wrap">
        <div class="kl-footer__grid">
            <div>
                <img class="kl-footer__logo" src="<?php echo kiswani_logo_url(true); ?>" alt="<?php esc_attr_e('Kiswani Lights', 'kiswani-lights'); ?>">
                <p class="kl-footer__statement"><?php esc_html_e('Lighting is not decoration. It is the soul of the space.', 'kiswani-lights'); ?></p>
            </div>
            <div>
                <h2><?php esc_html_e('Explore', 'kiswani-lights'); ?></h2>
                <nav aria-label="<?php esc_attr_e('Footer explore links', 'kiswani-lights'); ?>">
                    <a href="<?php echo esc_url(home_url('/#collections')); ?>"><?php esc_html_e('Collections', 'kiswani-lights'); ?></a>
                    <a href="<?php echo esc_url(home_url('/#types')); ?>"><?php esc_html_e('Lighting types', 'kiswani-lights'); ?></a>
                    <a href="<?php echo esc_url(home_url('/products/')); ?>"><?php esc_html_e('Products', 'kiswani-lights'); ?></a>
                    <a href="<?php echo esc_url(home_url('/projects/')); ?>"><?php esc_html_e('Projects', 'kiswani-lights'); ?></a>
                </nav>
            </div>
            <div>
                <h2><?php esc_html_e('Information', 'kiswani-lights'); ?></h2>
                <nav aria-label="<?php esc_attr_e('Footer information links', 'kiswani-lights'); ?>">
                    <a href="<?php echo esc_url(home_url('/about/')); ?>"><?php esc_html_e('About us', 'kiswani-lights'); ?></a>
                    <a href="<?php echo esc_url(home_url('/support/')); ?>"><?php esc_html_e('Support', 'kiswani-lights'); ?></a>
                    <a href="<?php echo esc_url(home_url('/privacy/')); ?>"><?php esc_html_e('Privacy policy', 'kiswani-lights'); ?></a>
                    <a href="<?php echo esc_url(home_url('/terms/')); ?>"><?php esc_html_e('Terms of use', 'kiswani-lights'); ?></a>
                </nav>
            </div>
            <div>
                <h2><?php esc_html_e('Contact', 'kiswani-lights'); ?></h2>
                <div class="kl-footer__contact">
                    <a href="mailto:info@kiswanilights.com">info@kiswanilights.com</a>
                    <a href="tel:+970599671209">+970 599 67 12 09</a>
                    <span><?php esc_html_e('Ramallah, Palestine', 'kiswani-lights'); ?></span>
                    <a class="kl-button kl-button--outline" href="<?php echo esc_url(home_url('/#contact')); ?>"><?php esc_html_e('Start a project', 'kiswani-lights'); ?></a>
                </div>
            </div>
        </div>
        <div class="kl-footer__bottom">
            <span>© <?php echo esc_html(date_i18n('Y')); ?> <?php esc_html_e('Kiswani Lights', 'kiswani-lights'); ?></span>
            <span><?php esc_html_e('Decorative · Technical · Architectural', 'kiswani-lights'); ?></span>
        </div>
    </div>
</footer>
