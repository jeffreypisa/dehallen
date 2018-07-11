<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * To generate specific templates for your pages you can use:
 * /mytheme/views/page-mypage.twig
 * (which will still route through this PHP file)
 * OR
 * /mytheme/page-mypage.php
 * (in which case you'll want to duplicate this file and save to the above path)
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */


require_once 'lib/mobiledetect.php';
$detect = new Mobile_Detect;

if ( is_page(249) && $detect->isMobile()) {
  
  $newURL = get_post_type_archive_link( 'locaties' );
  
  header('Location: '.$newURL);
  die();
}
    

$context = Timber::get_context();

$post = new TimberPost();

$context['post'] = $post;

// for 'now' functionality date and time in filter

$context[ 'date_now' ] = date('d/m/Y');
$context[ 'time_now' ] = date('H:i', strtotime('+2 hours'));

/* Load evenementen vandaag */

$args_evenementen_vandaag = array(
  'post_type'			  => 'evenementen',
  'orderby'         => 'date',
  'order'           => 'DESC',
	'posts_per_page'  => 3
);

$context['evenementen_vandaag'] = Timber::get_posts($args_evenementen_vandaag);

/* Load evenementen morgen */

$args_evenementen_morgen = array(
  'post_type'			  => 'evenementen',
  'orderby'         => 'date',
  'order'           => 'DESC',
	'posts_per_page'  => 3
); 

$context['evenementen_morgen'] = Timber::get_posts($args_evenementen_morgen);


$context[ 'category' ] = Timber::get_terms(['taxonomy'=>'categorie_locaties']);

$context[ 'cat' ] = Timber::get_terms('categorie');

if ( is_front_page() ) {	
	Timber::render( array( 'page-frontpage.twig' ), $context );
} else {
  Timber::render( array( 'page-' . $post->post_name . '.twig', 'page.twig' ), $context );
}