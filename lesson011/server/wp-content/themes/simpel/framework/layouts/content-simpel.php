<?php
/**
 * @package simpel
 */
?>


<article id="post-<?php the_ID(); ?>" <?php post_class('simpel simpels col-lg-4 col-md-4 col-sm-12 col-xs-12'); ?>>
    <div class = "featured-wrapper">

        <div class="featured-image"><a href="<?php the_permalink(); ?>" rel="bookmark">
            <div class="mask"></div>
            <?php if (has_post_thumbnail()) : ?>
                <a href="<?php the_permalink(); ?>"><?php the_post_thumbnail('featured-thumb'); ?></a>
            <?php else: ?>
        	    <a href="<?php the_permalink(); ?>"> <img src="<?php echo get_template_directory_uri()."/assets/images/dthumb.jpg";?>"></a>
            <?php endif;?>
        </div>
    </div>
    <header class="entry-header">
		<?php if (strlen(get_the_title()) >= 30) : ?>
            <h1 class="entry-title">
                <a href="<?php the_permalink(); ?>" data-title="<?php the_title(); ?>" rel="bookmark">
                    <?php echo substr(get_the_title(), 0, 29)."...";	?>
                </a>
            </h1>
		<?php else : ?>
			<h1 class="entry-title">
                <a href="<?php the_permalink(); ?>" rel="bookmark">
                    <?php the_title(); ?>
                </a>
            </h1>
        <?php endif; ?>
	</header><!-- .entry-header -->

</article><!-- #post-## -->
