<nav id="site-navigation" class="main-navigation" role="navigation">
    <div class = "container">
        <button class="menu-toggle" aria-controls="menu" aria-expanded="false"><?php _e( 'Primary Menu', 'simpel' ); ?></button>
        <?php wp_nav_menu( array( 'theme_location' => 'primary' ) ); ?>
    </div>
</nav><!-- #site-navigation -->
