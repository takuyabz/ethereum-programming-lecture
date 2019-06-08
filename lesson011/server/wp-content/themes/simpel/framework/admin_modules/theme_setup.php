<?php
/**
 * Simpel functions and definitions
 *
 * @package Simpel
 */

/**
 * Set the content width based on the theme's design and stylesheet.
 */
if ( ! isset( $content_width ) ) {
    $content_width = 640; /* pixels */
}

if ( ! function_exists( 'simpel_setup' ) ) :
    /**
     * Sets up theme defaults and registers support for various WordPress features.
     *
     * Note that this function is hooked into the after_setup_theme hook, which
     * runs before the init hook. The init hook is too late for some features, such
     * as indicating support for post thumbnails.
     */
    function simpel_setup() {

        // Add default posts and comments RSS feed links to head.
        add_theme_support( 'automatic-feed-links' );

        /*
         *  Adding title tag
        */

        add_theme_support( 'title-tag' );

        add_theme_support( 'custom-logo', array(
            'height'      => 100,
            'width'       => 200,
            'flex-height' => true,
            'flex-width'  => true,
        ) );
        /*
         * Enable support for Post Thumbnails on posts and pages.
         *
         * @link http://codex.wordpress.org/Function_Reference/add_theme_support#Post_Thumbnails
         */
        add_theme_support( 'post-thumbnails' );

        add_image_size( 'featured-thumb', 800, 600, true );
        add_image_size('simpel-pop-thumb',542, 340, true );

        // This theme uses wp_nav_menu() in one location.
        register_nav_menus( array(
            'primary' => __( 'Primary Menu', 'simpel' ),
        ) );

        /*
         * Switch default core markup for search form, comment form, and comments
         * to output valid HTML5.
         */
        add_theme_support( 'html5', array(
            'search-form', 'comment-form', 'comment-list', 'gallery', 'caption',
        ) );

        /*
         * Enable support for Post Formats.
         * See http://codex.wordpress.org/Post_Formats
         */
        add_theme_support( 'post-formats', array(
            'aside', 'image', 'video', 'quote', 'link',
        ) );

        add_theme_support('custom-header');

        // Set up the WordPress core custom background feature.
        add_theme_support( 'custom-background', apply_filters( 'simpel_custom_background_args', array(
            'default-color' => '#ffffff',
            'default-image' => '',
        ) ) );
    }
endif; // simpel_setup
add_action( 'after_setup_theme', 'simpel_setup' );
