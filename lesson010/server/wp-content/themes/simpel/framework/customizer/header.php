<?php
function simpel_customize_register_header_settings($wp_customize) {
    $wp_customize-> get_section('title_tagline')->panel = 'simpel_header_panel';
    $wp_customize-> get_section('header_image')->panel = 'simpel_header_panel';

    $wp_customize-> add_panel('simpel_header_panel', array(
       'title' => __('Header Settings', 'simpel'),
       'priority' => 20
    ));
}
add_action('customize_register', 'simpel_customize_register_header_settings');