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
$context[ 'time_now' ] = date('H:i');

// Full date

$context[ 'date_filter_full' ] = date('l d F');
$context[ 'day_now' ]  = date('D');
$day_filter  = date('D');
$context[ 'day_filter' ]  = strtolower($day_filter);
$context[ 'day_filter_full' ]  = date('l');
$context[ 'hour_now' ]  = date('H');
$context[ 'hour_filter' ]  = date('H');


$context[ 'category' ] = Timber::get_term(['taxonomy'=>'categorie']);

$context[ 'cat' ] = Timber::get_terms('categorie');

/* get current category */
$cat = get_category(get_query_var('categorie'));

$cat_slug = $cat->slug;
$context['currentcat'] = $cat_slug;

/* Load Evenementen */
if ($posttype == 'evenementen') { 
  $today = date('Ymd');
  $open = '00:00:00';
  
  $args_evenementen = array(
    'post_type'			  => 'evenementen',
  	'posts_per_page'  => -1,
    'meta_query'      => array(
      'relation'      => 'AND',
  	  array(
          'key'		    => 'datum',
          'compare'	  => '=',
          'value'		  => $today,
      ),
      array(
          'key'		    => 'begintijd',
          'compare'	  => '>=',
          'value'     => $open,
      )
    ),
    'meta_key'        => 'begintijd',
    'orderby'         => 'meta_value',
  	'order'           => 'ASC'
  );
  $context['evenementen'] = Timber::get_posts($args_evenementen);
}

/* Load Winkels */
if ($posttype == 'evenementen' || $posttype == 'locaties') {
  $args_winkels = array(
    'post_type'			  => 'locaties',
  	'posts_per_page'  => -1,
    'taxonomy'        => 'categorie_locaties',
    'term'            => 'Winkels',
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

Timber::render( $templates, $context );