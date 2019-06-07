<?php
function simpel_customize_register_social($wp_customize) {
    $wp_customize-> add_section(
        'simpel_social_section',
        array(
            'title'			=> __('Social Settings','simpel'),
            'description'	=> __('Manage the Social Icon Setings of your site.','simpel'),
            'priority'		=> 20,
            'panel' => 'simpel_header_panel'
        )
    );

    $wp_customize-> add_setting(
        'simpel_social_enable',
        array(
            'priority'	=> 'simpel_sanitize_checkbox',
        )
    );

    $wp_customize-> add_control(
        'simpel_social_enable',
        array(
            'type'		=> 'checkbox',
            'label'		=> __('Enable Social Icons','simpel'),
            'section'	=> 'simpel_social_section',
            'settings'  => 'simpel_social_enable',
            'priority'	=> 1,
        )
    );

    $social_networks = array( //Redefinied in Sanitization Function.
        'none' => __('-','simpel'),
        'facebook' => __('Facebook','simpel'),
        'twitter' => __('Twitter','simpel'),
        'google-plus' => __('Google Plus','simpel'),
        'instagram' => __('Instagram','simpel'),
        'rss' => __('RSS Feeds','simpel'),
        'vine' => __('Vine','simpel'),
        'vimeo-square' => __('Vimeo','simpel'),
        'youtube' => __('Youtube','simpel'),
        'flickr' => __('Flickr','simpel'),
    );

    $social_count = count($social_networks);

    for ($x = 1 ; $x <= ($social_count - 3) ; $x++) :

        $wp_customize->add_setting(
            'simpel_social_'.$x, array(
            'sanitize_callback' => 'simpel_sanitize_social',
            'default' => 'none'
        ));

        $wp_customize->add_control( 'simpel_social_'.$x, array(
            'settings' => 'simpel_social_'.$x,
            'label' => __('Icon ','simpel').$x,
            'section' => 'simpel_social_section',
            'type' => 'select',
            'choices' => $social_networks,
        ));

        $wp_customize->add_setting(
            'simpel_social_url'.$x, array(
            'sanitize_callback' => 'esc_url_raw'
        ));

        $wp_customize->add_control( 'simpel_social_url'.$x, array(
            'settings' => 'simpel_social_url'.$x,
            'description' => __('Icon ','simpel').$x.__(' Url','simpel'),
            'section' => 'simpel_social_section',
            'type' => 'url',
            'choices' => $social_networks,
        ));

    endfor;

    function simpel_sanitize_social( $input ) {
        $social_networks = array(
            'none' ,
            'facebook',
            'twitter',
            'google-plus',
            'instagram',
            'rss',
            'vine',
            'vimeo-square',
            'youtube',
            'flickr'
        );
        if ( in_array($input, $social_networks) )
            return $input;
        else
            return '';
    }
}
add_action('customize_register', 'simpel_customize_register_social');