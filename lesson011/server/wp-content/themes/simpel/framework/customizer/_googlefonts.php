<?php
function simpel_customize_register_googlefonts($wp_customize){
    $wp_customize->add_section(
        'simpel_typo_options',
        array(
            'title'     => __('Google Web Fonts','simpel'),
            'priority'  => 41,
            'panel' => 'simpel_design_panel'
        )
    );

    $font_array = array('HIND','Khula','Open Sans','Droid Sans','Droid Serif','Roboto','Roboto Condensed','Lato','Bree Serif','Oswald','Slabo','Lora','Source Sans Pro','Arimo','Bitter','Noto Sans');
    $fonts = array_combine($font_array, $font_array);

    $wp_customize->add_setting(
        'simpel_title_font',
        array(
            'default'=> 'Oswald',
            'sanitize_callback' => 'simpel_sanitize_gfont'
        )
    );

    function simpel_sanitize_gfont( $input ) {
        if ( in_array($input, array('HIND','Khula','Open Sans','Droid Sans','Droid Serif','Roboto','Roboto Condensed','Lato','Bree Serif','Oswald','Slabo','Lora','Source Sans Pro','Arimo','Bitter','Noto Sans') ) )
            return $input;
        else
            return '';
    }

    $wp_customize->add_control(
        'simpel_title_font',array(
            'label' => __('Title','simpel'),
            'settings' => 'simpel_title_font',
            'section'  => 'simpel_typo_options',
            'type' => 'select',
            'choices' => $fonts,
        )
    );

    $wp_customize->add_setting(
        'simpel_body_font',
        array(	'default'=> 'Lato',
            'sanitize_callback' => 'simpel_sanitize_gfont' )
    );

    $wp_customize->add_control(
        'simpel_body_font',array(
            'label' => __('Body','simpel'),
            'settings' => 'simpel_body_font',
            'section'  => 'simpel_typo_options',
            'type' => 'select',
            'choices' => $fonts
        )
    );
}
add_action('customize_register', 'simpel_customize_register_googlefonts');