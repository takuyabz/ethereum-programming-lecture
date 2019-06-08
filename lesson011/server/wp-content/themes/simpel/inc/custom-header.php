<?php
/**
 * Sample implementation of the Custom Header feature
 * http://codex.wordpress.org/Custom_Headers
 *
 * You can add an optional custom header image to header.php like so ...

	<?php if ( get_header_image() ) : ?>
	<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
		<img src="<?php header_image(); ?>" width="<?php echo esc_attr( get_custom_header()->width ); ?>" height="<?php echo esc_attr( get_custom_header()->height ); ?>" alt="">
	</a>
	<?php endif; // End header image check. ?>

 *
 * @package Simpel
 */

/**
 * Set up the WordPress core custom header feature.
 *
 * @uses simpel_header_style()
 * @uses simpel_admin_header_style()
 * @uses simpel_admin_header_image()
 */
function simpel_custom_header_setup() {
	add_theme_support( 'custom-header', apply_filters( 'simpel_custom_header_args', array(
		'default-image'          => get_template_directory_uri() . '/assets/images/header.jpg',
		'default-text-color'     => '000000',
		'width'                  => 1920,
		'height'                 => 500,
		'flex-height'            => true,
		'wp-head-callback'       => 'simpel_header_style',
		'admin-head-callback'    => 'simpel_admin_header_style',
		'admin-preview-callback' => 'simpel_admin_header_image',
	) ) );
}
add_action( 'after_setup_theme', 'simpel_custom_header_setup' );

if ( ! function_exists( 'simpel_header_style' ) ) :
/**
 * Styles the header image and text displayed on the blog
 *
 * @see simpel_custom_header_setup().
 */
function simpel_header_style() {
	$header_image = get_header_image();

	// If no custom options for text are set, let's bail
	if ( empty( $header_image ) && display_header_text() ) {
		return;
	}


	// If we get this far, we have custom styles. Let's do this.
	?>
	<style type="text/css">
	<?php
	
		// Has a Custom Header been added?
		if ( ! empty( $header_image ) ) :
	?>
		.header-image {
			background: url(<?php header_image(); ?>) no-repeat 50% 50%;
			-webkit-background-size: cover;
			-moz-background-size:    cover;
			-o-background-size:      cover;
			background-size:         cover;
		}

		@media screen and (min-width: 59.6875em) {
			body:before {
				background: url(<?php header_image(); ?>) no-repeat 100% 50%;
				-webkit-background-size: cover;
				-moz-background-size:    cover;
				-o-background-size:      cover;
				background-size:         cover;
				border-right: 0;
			}

			.site-header {
				background: transparent;
			}
		}
	<?php
		endif;

		// Has the text been hidden?
		if ( ! display_header_text() ) :
	?>
		.site-title,
		.site-description {
			clip: rect(1px, 1px, 1px, 1px);
			position: absolute;
		}
	<?php endif; ?>
	</style>
	<?php
}
endif; // simpel_header_style

if ( ! function_exists( 'simpel_admin_header_style' ) ) :
/**
 * Styles the header image displayed on the Appearance > Header admin panel.
 *
 * @see simpel_custom_header_setup().
 */
function simpel_admin_header_style() {
?>
	<style type="text/css">
		.appearance_page_custom-header #headimg {
			border: none;
		}
		#headimg h1,
		#desc {
		}
		#headimg h1 {
		}
		#headimg h1 a {
		}
		#desc {
		}
		#headimg img {
		}
	</style>
<?php
}
endif; // simpel_admin_header_style

if ( ! function_exists( 'simpel_admin_header_image' ) ) :
/**
 * Custom header image markup displayed on the Appearance > Header admin panel.
 *
 * @see simpel_custom_header_setup().
 */
function simpel_admin_header_image() {
	$style = sprintf( ' style="color:#%s;"', get_header_textcolor() );
?>
	<div id="headimg">
		<h1 class="displaying-header-text"><a id="name"<?php echo $style; ?> onclick="return false;" href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php bloginfo( 'name' ); ?></a></h1>
		<div class="displaying-header-text" id="desc"<?php echo $style; ?>><?php bloginfo( 'description' ); ?></div>
		<?php if ( get_header_image() ) : ?>
		<img src="<?php header_image(); ?>" alt="">
		<?php endif; ?>
	</div>
<?php
}
endif; // simpel_admin_header_image