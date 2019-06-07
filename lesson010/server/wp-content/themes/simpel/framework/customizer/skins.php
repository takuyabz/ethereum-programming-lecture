<?php
function simpel_customize_register_skins($wp_customize) {
    //---- Color Settings ----//
    $wp_customize->get_section( 'colors' )->panel	=	'simpel_design_panel';
    $wp_customize->get_section( 'colors' )->title	=	__('Theme Skin & Colors', 'simpel');
    $wp_customize->get_control( 'header_textcolor' )->label	=	__('Site Description Color', 'simpel');
    $wp_customize->get_control( 'header_textcolor' )->default =	'ffffff';

    $wp_customize-> add_setting(
        'simpel-title-color',
        array(
            'default'	=> 'ffffff',
            'sanitize_callback'	=> 'sanitize_hex_color',
            'transport'	=> 'postMessage'
        )
    );

    $wp_customize->add_control(
        new WP_Customize_Color_Control(
            $wp_customize,
            'simpel-title-color',
            array(
                'label' => __('Site Title Color','simpel'),
                'section' => 'colors',
                'settings' => 'simpel-title-color',
                'priority'	=> 2,
            )
        )
    );

    $wp_customize->add_setting(
        'simpel_skin',
        array(
            'default'=> 'default',
            'sanitize_callback' => 'simpel_sanitize_skin'
        )
    );

    $skins = array( 'default' => __('Default(Simpel)','simpel'),
        'orange' =>  __('Orange','simpel'),
        'brown' => __('Brown', 'simpel'),
    );

    $wp_customize->add_control(
        'simpel_skin',array(
            'settings' => 'simpel_skin',
            'section'  => 'colors',
            'label' => __('Choose Skin','simpel'),
            'description' => __('Free Version of Simpel Supports 3 Different Skin Colors.','simpel'),
            'type' => 'select',
            'choices' => $skins,
        )
    );

    function simpel_sanitize_skin( $input ) {
        if ( in_array($input, array('default','orange', 'brown') ) )
            return $input;
        else
            return '';
    }
}
add_action('customize_register', 'simpel_customize_register_skins');