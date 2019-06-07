<?php
/**
 * The header for our theme.
 *
 * Displays all of the <head> section and everything up till <div id="content">
 *
 * @package Simpel
 */
get_template_part('modules/header/head'); ?>

<body <?php body_class(); ?>>

<?php get_template_part('modules/navigation/primary', 'menu'); ?>

<?php get_template_part('modules/header/masthead'); ?>

<div id="page" class="hfeed site">
    <a class="skip-link screen-reader-text" href="#content"><?php _e( 'Skip to content', 'simpel' ); ?></a>

    <div id="content" class="site-content container">
