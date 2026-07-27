<?php
/**
 * Kiswani Lights theme bootstrap.
 *
 * @package KiswaniLights
 */

if (!defined('ABSPATH')) {
    exit;
}

define('KISWANI_THEME_VERSION', '1.0.0');
define('KISWANI_THEME_DIR', get_template_directory());
define('KISWANI_THEME_URI', get_template_directory_uri());

require_once KISWANI_THEME_DIR . '/inc/post-types.php';
require_once KISWANI_THEME_DIR . '/inc/meta-boxes.php';
require_once KISWANI_THEME_DIR . '/inc/template-tags.php';
require_once KISWANI_THEME_DIR . '/inc/seed-content.php';

add_action('after_setup_theme', 'kiswani_theme_setup');
function kiswani_theme_setup(): void
{
    add_theme_support('wp-block-styles');
    add_theme_support('align-wide');
    add_theme_support('editor-styles');
    add_theme_support('responsive-embeds');
    add_theme_support('custom-logo', [
        'height' => 96,
        'width' => 320,
        'flex-height' => true,
        'flex-width' => true,
    ]);

    add_editor_style('assets/css/editor.css');
    load_theme_textdomain('kiswani-lights', KISWANI_THEME_DIR . '/languages');

    register_nav_menus([
        'primary' => __('Primary navigation', 'kiswani-lights'),
        'footer' => __('Footer navigation', 'kiswani-lights'),
    ]);
}

add_action('wp_enqueue_scripts', 'kiswani_enqueue_assets');
function kiswani_enqueue_assets(): void
{
    wp_enqueue_style(
        'kiswani-fonts',
        'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap',
        [],
        null
    );

    wp_enqueue_style(
        'kiswani-theme',
        KISWANI_THEME_URI . '/assets/css/theme.css',
        [],
        KISWANI_THEME_VERSION
    );

    wp_enqueue_script(
        'kiswani-theme',
        KISWANI_THEME_URI . '/assets/js/theme.js',
        [],
        KISWANI_THEME_VERSION,
        true
    );
}

add_action('enqueue_block_editor_assets', 'kiswani_enqueue_editor_assets');
function kiswani_enqueue_editor_assets(): void
{
    wp_enqueue_style(
        'kiswani-editor-fonts',
        'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap',
        [],
        null
    );
}

add_filter('body_class', 'kiswani_body_classes');
function kiswani_body_classes(array $classes): array
{
    $classes[] = is_rtl() ? 'kiswani-rtl' : 'kiswani-ltr';
    return $classes;
}
