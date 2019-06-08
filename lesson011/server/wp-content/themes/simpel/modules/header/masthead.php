<header id="masthead" class="site-header" role="banner">
    <div class="header-image">


        <div class="site-branding container">
            <?php if ( simpel_has_logo() ) : ?>
                <div id="site-logo">
                    <?php simpel_logo(); ?>
                </div>
            <?php else: ?>
                <div id="text-title-desc">
                    <h1 class="site-title title-font"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
                    <h2 class="site-description"><?php bloginfo( 'description' ); ?></h2>
                </div>
            <?php endif; ?>
        </div><!-- .site-branding -->


        <div class="search-wrapper">
            <div class="container">
                <?php get_template_part('modules/header/searchform'); ?>
                <?php get_template_part('modules/social/social', 'fa'); ?>
            </div>
        </div>
    </div>


</header><!-- #masthead -->