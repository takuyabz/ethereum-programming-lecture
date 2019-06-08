<?php if (get_theme_mod("simpel_social_enable")) : ?>

    <?php
    /*
    ** Template to Render Social Icons on Top Bar
    */?>

    <div id="social-icons" class="col-md-6 col-s-6 col-xs-12">
        <?php
        for ($i = 1; $i < 8; $i++) :
            $social = esc_attr(get_theme_mod('simpel_social_'.$i));
            if ( ($social != 'none') && ($social != '') ) : ?>
                <a href="<?php echo esc_url( get_theme_mod('simpel_social_url'.$i) ); ?>"><i class="social-icon fa fa-<?php echo $social; ?>"></i></a>
            <?php endif;

        endfor; ?>
    </div>

<?php endif; ?>