<?php
function simpel_customize_register_basic($wp_customize) {
    $wp_customize->add_section('simpel_basic_settings', array(
        'title' => __('Basic Settings', 'simpel'),
        'priority' => 10,
        'panel' => 'simpel_design_panel'
    ));

    $wp_customize->add_setting(
        'simpel-featured',
        array(
            'default'	=> true,
            'sanitize_callback'	=> 'simpel_sanitize_checkbox'
        )
    );

    $wp_customize->add_control(
        'simpel-featured',
        array(
            'type'	=> 'checkbox',
            'label'	=> __('Show the Featured Image in Posts','simpel'),
            'section'	=> 'simpel_basic_settings'
        )
    );

}
add_action('customize_register', 'simpel_customize_register_basic');