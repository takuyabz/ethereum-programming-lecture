<?php
function simpel_customize_register_layouts($wp_customize) {
    $wp_customize->get_section('background_image')->panel = 'simpel_design_panel';
    $wp_customize->add_panel('simpel_design_panel', array(
        'title' => __('Design & Layout', 'simpel'),
        'priority' => 50,
    ));

    $wp_customize-> add_section(
        'simpel_sidebar_options',
        array(
            'title'	=> __('Sidebar Layout', 'simpel'),
            'priority' => 1,
            'panel' => 'simpel_design_panel'
        )
    );

    $wp_customize->add_setting(
        'simpel_disable_sidebar',
        array( 'sanitize_callback' => 'simpel_sanitize_checkbox' )
    );

    $wp_customize->add_control(
        'simpel_disable_sidebar', array(
            'settings' => 'simpel_disable_sidebar',
            'label'    => __( 'Disable Sidebar Everywhere.','simpel' ),
            'section'  => 'simpel_sidebar_options',
            'type'     => 'checkbox',
            'default'  => false
        )
    );

    $wp_customize->add_setting(
        'simpel_disable_sidebar_home',
        array( 'sanitize_callback' => 'simpel_sanitize_checkbox' )
    );

    $wp_customize->add_control(
        'simpel_disable_sidebar_home', array(
            'settings' => 'simpel_disable_sidebar_home',
            'label'    => __( 'Disable Sidebar on Home/Blog.','simpel' ),
            'section'  => 'simpel_sidebar_options',
            'type'     => 'checkbox',
            'active_callback' => 'simpel_show_sidebar_options',
            'default'  => false
        )
    );

    $wp_customize->add_setting(
        'simpel_disable_sidebar_front',
        array( 'sanitize_callback' => 'simpel_sanitize_checkbox' )
    );

    $wp_customize->add_control(
        'simpel_disable_sidebar_front', array(
            'settings' => 'simpel_disable_sidebar_front',
            'label'    => __( 'Disable Sidebar on Front Page.','simpel' ),
            'section'  => 'simpel_sidebar_options',
            'type'     => 'checkbox',
            'active_callback' => 'simpel_show_sidebar_options',
            'default'  => false
        )
    );


    $wp_customize->add_setting(
        'simpel_sidebar_width',
        array(
            'default' => 4,
            'sanitize_callback' => 'simpel_sanitize_positive_number' )
    );

    $wp_customize->add_control(
        'simpel_sidebar_width', array(
            'settings' => 'simpel_sidebar_width',
            'label'    => __( 'Sidebar Width','simpel' ),
            'description' => __('Min: 25%, Default: 33%, Max: 40%','simpel'),
            'section'  => 'simpel_sidebar_options',
            'type'     => 'range',
            'active_callback' => 'simpel_show_sidebar_options',
            'input_attrs' => array(
                'min'   => 3,
                'max'   => 5,
                'step'  => 1,
                'class' => 'sidebar-width-range',
                'style' => 'color: #0a0',
            ),
        )
    );

    $wp_customize-> add_setting(
        'simpel_sidebar_alignment',
        array(
            'default'	=> 'right',
            'transport' => 'refresh',
            'sanitize_callback'	=> 'simpel_sanitize_radio',
        )
    );

    $wp_customize->add_control(
        'simpel_sidebar_alignment',
        array(
            'type' => 'radio',
            'label' => 'Sidebar Layout',
            'section' => 'simpel_sidebar_options',
            'settings' => 'simpel_sidebar_alignment',
            'active_callback' => 'simpel_show_sidebar_options',
            'choices' => array(
                'left' => 'Left Sidebar',
                'right' => 'Right Sidebar',
            ),
        )
    );

    /* Active Callback Function */
    function simpel_show_sidebar_options($control) {

        $option = $control->manager->get_setting('simpel_disable_sidebar');
        return $option->value() == false ;

    }

    function simpel_sanitize_text( $input ) {
        return wp_kses_post( force_balance_tags( $input ) );
    }
    
    $wp_customize->add_section(
        'simpel_design_options',
        array(
            'title'     => __('Blog Layout','simpel'),
            'priority'  => 0,
            'panel'     => 'simpel_design_panel'
        )
    );


    $wp_customize->add_setting(
        'simpel_blog_layout',
        array( 'sanitize_callback' => 'simpel_sanitize_blog_layout' )
    );

    function simpel_sanitize_blog_layout( $input ) {
        if ( in_array($input, array('simpel', 'grid','grid_2_column') ) )
            return $input;
        else
            return '';
    }

    $wp_customize->add_control(
        'simpel_blog_layout',array(
            'label' => __('Select Layout','simpel'),
            'description' => __('Use 3 Column Layouts, only after disabling sidebar for the page.','simpel'),
            'settings' => 'simpel_blog_layout',
            'section'  => 'simpel_design_options',
            'type' => 'select',
            'choices' => array(
                'simpel' => __('Simpel Theme Layout','simpel'),
                'grid' => __('Standard Blog Layout','simpel'),
                'grid_2_column' => __('Grid - 2 Column','simpel'),
            )
        )
    );
}
add_action('customize_register', 'simpel_customize_register_layouts');