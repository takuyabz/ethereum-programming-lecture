<?php
/**
 *	All the custom CSS codes get loaded from here.
 **/
function simpel_custom_css_mods() {

    echo "<style id='custom-css-mods'>";

    if ( get_theme_mod('simpel-title-color') ) :
        echo "#masthead h1.site-title a { color: ".get_theme_mod('simpel-title-color')."; }";
    endif;

    if ( get_theme_mod('header_textcolor') ) :
        echo "#masthead h2.site-description { color: #".get_theme_mod('header_textcolor')."; }";
    endif;

    if (!display_header_text()):
        echo "#masthead .site-branding #text-title-desc { display: none; }";
    endif;

    if ( get_theme_mod('simpel_title_font','Oswald') ) :
        echo ".title-font, h1, h2 { font-family: ".esc_html(get_theme_mod('simpel_title_font', 'Oswald'))."; }";
    endif;

    if ( get_theme_mod('simpel_body_font','Lato') ) :
        echo "body { font-family: ".esc_html(get_theme_mod('simpel_body_font', 'Lato'))."; }";
    endif;

    if ( get_theme_mod('simpel_sidebar_alignment') == 'left' ) :
        echo "#secondary { float: left; }#primary,#primary-mono { float: right; }";
    endif;

    echo "</style>";
}

add_action('wp_head','simpel_custom_css_mods');