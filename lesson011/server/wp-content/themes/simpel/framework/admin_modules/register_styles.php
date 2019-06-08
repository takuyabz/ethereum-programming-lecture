<?php
/**
 * Enqueue scripts and styles.
 */
function simpel_scripts() {
    wp_enqueue_style( 'simpel-style', get_stylesheet_uri() );

    wp_enqueue_style('simpel-title-font', '//fonts.googleapis.com/css?family='.str_replace(" ", "+", esc_html(get_theme_mod('simpel_title_font', 'Oswald')) ).':100,300,400,700' );

    wp_enqueue_style('simpel-body-font', '//fonts.googleapis.com/css?family='.str_replace(" ", "+", esc_html(get_theme_mod('simpel_body_font', 'Lato') ) ).':100,300,400,700' );

    wp_enqueue_style('simpel-bootstrap-style',get_template_directory_uri()."/assets/bootstrap/bootstrap.min.css", array('simpel-style'));

    wp_enqueue_style('simpel-main-skin',get_template_directory_uri()."/assets/theme-styles/css/".get_theme_mod('simpel_skin', 'default').'.css', array(), null  );

    wp_enqueue_style('simpel-font-awesome', get_template_directory_uri()."/assets/font-awesome/css/font-awesome.min.css", array('simpel-main-skin'));

    wp_enqueue_script("jquery");

    wp_enqueue_script( 'simpel-navigation', get_template_directory_uri() . '/js/navigation.js', array(), '20120206', true );

    wp_enqueue_script( 'simpel-external', get_template_directory_uri() . '/js/external.js', array('jquery'), '20120206', true );

    wp_enqueue_script( 'simpel-skip-link-focus-fix', get_template_directory_uri() . '/js/skip-link-focus-fix.js', array(), '20130115', true );

    if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
        wp_enqueue_script( 'comment-reply' );
    }

    wp_enqueue_script( 'simpel-custom-js', get_template_directory_uri() . '/js/custom.js' );

}
add_action( 'wp_enqueue_scripts', 'simpel_scripts' );