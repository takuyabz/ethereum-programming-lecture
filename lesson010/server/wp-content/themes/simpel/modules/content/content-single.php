<?php
/**
 * @package Simpel
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<header class="entry-header">
		<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
	<div class="meta-wrapper">
		<div class="entry-meta">
				<?php simpel_posted_on(); ?>
			</div><!-- .entry-meta -->
		<div class="pattern"></div>
	</div>
	<?php if (get_theme_mod('simpel-featured') == true): ?>
		<div class = "home-featured">
		<?php 
		if ( has_post_thumbnail() ) { // check if the post has a Post Thumbnail assigned to it.
			the_post_thumbnail();
		} 
		?>
		</div>
	<?php endif; ?>

	</header><!-- .entry-header -->

	<div class="entry-content">
		<?php the_content(); ?>
		<?php
			wp_link_pages( array(
				'before' => '<div class="page-links">' . __( 'Pages:', 'simpel' ),
				'after'  => '</div>',
			) );
		?>
	</div><!-- .entry-content -->

	<footer class="entry-footer">
		<?php simpel_entry_footer(); ?>		
	</footer><!-- .entry-footer -->
	<?php edit_post_link( __( 'Edit', 'simpel' ), '<span class="edit-link">', '</span>' ); ?>
	<div class = "pattern">
		</div>
</article><!-- #post-## -->
