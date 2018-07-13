<?php
/**
 * The template for displaying Archive pages.
 *
 * Used to display archive-type pages if nothing more specific matches a query.
 * For example, puts together date-based pages if no date.php file exists.
 *
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.2
 */

$templates = array( 'archive-' . $post->post_type . '.twig', 'index.twig' );

$posttype = $post->post_type;

$context = Timber::get_context();

// for 'now' functionality date and time in filter

$context[ 'date_now' ] = date('d/m/Y');
$context[ 'time_now' ] = date('H:i', strtotime('+2 hours'));

// Full date
if(ICL_LANGUAGE_CODE==en){
  $context[ 'date_filter_full' ] = date('l d F');
  $context[ 'day_filter_full' ]  = date('l');
}
else {
  setlocale(LC_ALL, 'nl_NL');
  $context[ 'date_filter_full' ] = strftime('%A %e %B');
  $context[ 'day_filter_full' ]  = strftime('%A');
}

$context[ 'day_now' ]  = date('D');
$day_filter  = date('D');
$context[ 'day_filter' ]  = strtolower($day_filter);

$context[ 'hour_now' ]  = date('H');
$context[ 'hour_filter' ]  = date('H');

/* Load Evenementen */

if ($posttype == 'evenementen') { 
    $context = archive_agenda( $context );
}

/* Load Winkels */

if ($posttype == 'evenementen' || $posttype == 'locaties') {
  $args_winkels = array(
    'post_type'			  => 'locaties',
  	'posts_per_page'  => -1,
    'taxonomy'        => 'categorie_locaties',
    'term'            => 'Shops',
  ); 
  $context['winkels'] = Timber::get_posts($args_winkels);
}

/* Load Horeca */

if ($posttype == 'evenementen' || $posttype == 'horeca') {
  $args_horeca = array(
    'post_type'			  => 'locaties',
  	'posts_per_page'  => -1,
    'taxonomy'        => 'categorie_locaties',
    'term'            => 'Horeca',
  ); 
  
  $context['horeca'] = Timber::get_posts($args_horeca);
}

/* Load Blog */

if ($posttype == 'post') {
  
  $terms = \Timber::get_terms(array('taxonomy' => 'category', 'hide_empty' => true));
  $context['category'] = $terms;
  
  $postcatid = get_queried_object()->term_id;
    
  $args_posts = array(
    'post_type'			  => 'post',
  	'posts_per_page'  => -1,
    'cat'             => $postcatid
  ); 
  
  $context['posts'] = Timber::get_posts($args_posts);
}

Timber::render( $templates, $context );