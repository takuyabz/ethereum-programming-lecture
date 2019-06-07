<?php
/*
 * @package oxane, Copyright Rohit Tripathi, rohitink.com
 * This file contains Custom Theme Related Functions.
 */

//Import Admin Modules
require get_template_directory() . '/framework/admin_modules/register_styles.php';
require get_template_directory() . '/framework/admin_modules/register_widgets.php';
require get_template_directory() . '/framework/admin_modules/theme_setup.php';
require get_template_directory() . '/framework/admin_modules/logo_compatibility.php';
require get_template_directory() . '/framework/admin_modules/admin_styles.php';

/*
** Function to check if Sidebar is enabled on Current Page 
*/

function simpel_load_sidebar() {
    $load_sidebar = true;
    if ( get_theme_mod('simpel_disable_sidebar') ) :
        $load_sidebar = false;
    elseif( get_theme_mod('simpel_disable_sidebar_home') && is_home() )	:
        $load_sidebar = false;
    elseif( get_theme_mod('simpel_disable_sidebar_front') && is_front_page() ) :
        $load_sidebar = false;
    endif;

    return  $load_sidebar;
}

/*
**	Determining Sidebar and Primary Width
*/
function simpel_primary_class() {
    $sw = get_theme_mod('simpel_sidebar_width',4);
    $class = "col-md-".(12-$sw);

    if ( !simpel_load_sidebar() )
        $class = "col-md-12";

    echo $class;
}
add_action('simpel_primary-width', 'simpel_primary_class');

function simpel_secondary_class() {
    $sw = get_theme_mod('simpel_sidebar_width',4);
    $class = "col-md-".$sw;

    echo $class;
}
add_action('simpel_secondary-width', 'simpel_secondary_class');


/*
** Function to Get Theme Layout 
*/
function simpel_get_blog_layout(){
    $ldir = 'framework/layouts/content';
    if (get_theme_mod('simpel_blog_layout') ) :
        get_template_part( $ldir , get_theme_mod('simpel_blog_layout') );
    else :
        get_template_part( $ldir ,'grid');
    endif;
}
add_action('simpel_blog_layout', 'simpel_get_blog_layout');
