<?php
/**
 * The Template for displaying all single posts
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */

$context = Timber::get_context();
$post = Timber::query_post();

$context['post'] = $post;

$posttype = $post->post_type;
$posttype_archive = get_post_type_archive_link( $posttype );
$context['posttype'] = $posttype;

if ($posttype == 'post') {
  $context['posttype_archive'] = '/blog';
} else {
  $context['posttype_archive'] = $posttype_archive;
}
$currentID = get_the_ID();

/* 'More' */

if ($posttype == 'locaties') {
  $thetax = 'categorie_locaties';
} elseif ($posttype == 'post') {
  $thetax = 'category';
} elseif ($posttype == 'evenementen') {
  $thetax = 'categorie';   
} 
  
if ($posttype == 'locaties' || $posttype == 'post' || $posttype == 'evenementen' ) {
  /* For labeling 'more' */
  
  $terms = get_the_terms($post->ID, $thetax);
  
  foreach($terms as $term){
    $categorie = $term->slug;
    $categorie_link = $term->url;
  }  
  
  $context['categorie'] = $categorie;
  $context['categorielink'] = $categorie_link;
  
  $args_more = array(
    'post_type'			  => $posttype,
  	'posts_per_page'  => 3,
  	'post__not_in' => array($currentID),
    'taxonomy' => $thetax,
    'term' => $categorie
  ); 
  $context['more'] = Timber::get_posts($args_more);
  
  
} 



if ( post_password_required( $post->ID ) ) {
	Timber::render( 'single-password.twig', $context );
} else {
	Timber::render( array( 'single-' . $post->ID . '.twig', 'single-' . $post->post_type . '.twig', 'single.twig' ), $context );
}