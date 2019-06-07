<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after
 *
 * @package Simpel
 */
?>

		</div><!-- #content -->
	</div><!-- #page -->

	<footer id="colophon" class="site-footer" role="contentinfo">
        <?php get_sidebar('footer'); ?>
		<div class="site-info">
			<a href="<?php echo esc_url( __( 'http://wordpress.org/', 'simpel' ) ); ?>"><?php printf( __( 'Proudly powered by %s', 'simpel' ), 'WordPress' ); ?></a>
			<span class="sep"> | </span>
			<?php printf( __( 'Theme: %1$s by %2$s.', 'simpel' ), 'Simpel', '<a href="http://www.divjot.co" rel="designer">Divjot Singh</a>' ); ?>
		</div><!-- .site-info -->
	</footer><!-- #colophon -->
	
<?php wp_footer(); ?>

</body>
</html>
