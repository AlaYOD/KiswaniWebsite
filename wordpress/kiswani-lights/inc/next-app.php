<?php
/**
 * Next.js app shell integration.
 *
 * WordPress remains the installable CMS/admin surface, while public front-end
 * routes display the matching route from the deployed Kiswani Next.js app.
 *
 * @package KiswaniLights
 */

if (!defined('ABSPATH')) {
    exit;
}

const KISWANI_NEXT_APP_DEFAULT_URL = 'https://kiswani-website-82jb.vercel.app';

add_action('customize_register', 'kiswani_next_app_customize_register');
function kiswani_next_app_customize_register(WP_Customize_Manager $wp_customize): void
{
    $wp_customize->add_section('kiswani_next_app', [
        'title' => __('Next.js app shell', 'kiswani-lights'),
        'priority' => 35,
    ]);

    $wp_customize->add_setting('kiswani_next_app_url', [
        'default' => KISWANI_NEXT_APP_DEFAULT_URL,
        'sanitize_callback' => 'esc_url_raw',
        'transport' => 'refresh',
    ]);

    $wp_customize->add_control('kiswani_next_app_url', [
        'type' => 'url',
        'section' => 'kiswani_next_app',
        'label' => __('Next.js app URL', 'kiswani-lights'),
        'description' => __('The deployed Next.js app that WordPress should render for public pages.', 'kiswani-lights'),
    ]);
}

function kiswani_next_app_base_url(): string
{
    $url = get_theme_mod('kiswani_next_app_url', KISWANI_NEXT_APP_DEFAULT_URL);
    $url = $url ? untrailingslashit($url) : KISWANI_NEXT_APP_DEFAULT_URL;

    return untrailingslashit((string) apply_filters('kiswani_next_app_base_url', $url));
}

function kiswani_next_app_request_path(): string
{
    $request_uri = isset($_SERVER['REQUEST_URI']) ? wp_unslash((string) $_SERVER['REQUEST_URI']) : '/';
    $request_path = (string) wp_parse_url($request_uri, PHP_URL_PATH);
    $request_query = (string) wp_parse_url($request_uri, PHP_URL_QUERY);
    $home_path = (string) wp_parse_url(home_url('/'), PHP_URL_PATH);

    $home_prefix = untrailingslashit($home_path) . '/';
    if ($home_path && '/' !== $home_path && 0 === strpos($request_path, $home_prefix)) {
        $request_path = substr($request_path, strlen(untrailingslashit($home_path)));
    }

    $request_path = '/' . ltrim($request_path ?: '/', '/');

    return $request_path . ($request_query ? '?' . $request_query : '');
}

function kiswani_next_app_url(): string
{
    return esc_url(kiswani_next_app_base_url() . kiswani_next_app_request_path());
}

function kiswani_render_next_app(): void
{
    $next_url = kiswani_next_app_url();
    $site_name = get_bloginfo('name') ?: __('Kiswani Lights', 'kiswani-lights');
    ?>
    <!doctype html>
    <html <?php language_attributes(); ?>>
    <head>
        <meta charset="<?php bloginfo('charset'); ?>">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <?php wp_head(); ?>
    </head>
    <body <?php body_class('kl-next-app-shell'); ?>>
        <?php wp_body_open(); ?>
        <main class="kl-next-app" aria-label="<?php echo esc_attr($site_name); ?>">
            <iframe
                class="kl-next-app__frame"
                src="<?php echo $next_url; ?>"
                title="<?php echo esc_attr($site_name); ?>"
                loading="eager"
                referrerpolicy="strict-origin-when-cross-origin"
                allow="clipboard-write; fullscreen"
            ></iframe>
            <noscript>
                <div class="kl-next-app__fallback">
                    <h1><?php echo esc_html($site_name); ?></h1>
                    <p><?php esc_html_e('JavaScript is required to view the Kiswani Lights application.', 'kiswani-lights'); ?></p>
                    <a class="kl-button" href="<?php echo esc_url($next_url); ?>"><?php esc_html_e('Open the app', 'kiswani-lights'); ?></a>
                </div>
            </noscript>
        </main>
        <?php wp_footer(); ?>
    </body>
    </html>
    <?php
}