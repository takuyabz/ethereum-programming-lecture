<?php
function simpel_customize_register_misc($wp_customize) {
    //Upgrade to Pro
    $wp_customize->add_section(
        'simpel_sec_pro',
        array(
            'title'     => __('Important Links','simpel'),
            'priority'  => 10,
        )
    );

    $wp_customize->add_setting(
        'simpel_pro',
        array( 'sanitize_callback' => 'esc_textarea' )
    );

    $wp_customize->add_control(
        new Simpel_WP_Customize_Upgrade_Control(
            $wp_customize,
            'simpel_pro',
            array(
                'description'	=> '<a class="simpel-important-links" href="https://inkhive.com/contact-us/" target="_blank">'.__('InkHive Support Forum', 'simpel').'</a>
                                    <a class="simpel-important-links" href="https://inkhive.com/documentation/simpel" target="_blank">'.__('Simpel Documentation', 'simpel').'</a>
                                    <a class="simpel-important-links" href="https://demo.inkhive.com/simpel-plus/" target="_blank">'.__('Simpel Plus Live Demo', 'simpel').'</a>
                                    <a class="simpel-important-links" href="https://www.facebook.com/inkhivethemes/" target="_blank">'.__('We Love Our Facebook Fans', 'simpel').'</a>
                                    <a class="simpel-important-links" href="https://wordpress.org/support/theme/simpel/reviews" target="_blank">'.__('Review Simpel on WordPress', 'simpel').'</a>',
                'section' => 'simpel_sec_pro',
                'settings' => 'simpel_pro',
            )
        )
    );
}
add_action('customize_register', 'simpel_customize_register_misc');