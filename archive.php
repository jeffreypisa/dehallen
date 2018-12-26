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
setlocale(LC_TIME, 'NL_nl');
$context[ 'date_now' ] = date('d/m/Y');
date_default_timezone_set('Europe/Amsterdam');
$context[ 'time_now' ] =  date('H:i', strtotime("now Europe/Amsterdam") );


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

/* Load Evenementen */

if ($posttype == 'evenementen') { 
    
    
    if( isset( $_GET['planbutton'] ) && isset( $_GET['offset'] ) ) {
        $_GET['offset'] = 0;
    }
    
    $offset = (isset($_GET['offset']) ) ? intval( $_GET['offset'] ) : 0;
    
    $agenda_arr = archive_agenda( $context );
        
    if( count( $agenda_arr['context']['evenementen'] ) == 0 ) {
        
        $tries = 0;
        
        while( date( 'H', $agenda_arr['next_slot'] ) < 9 && count( $agenda_arr['context']['evenementen'] ) == 0 ) {
            $offset = $agenda_arr['offset'];
            $agenda_arr = archive_agenda( $agenda_arr['context'], $tries, ($offset+DH_EVENTS_HOUR_OFFSET), true );
            
            $tries++;
        }
        
        // Repeat 4 times only for non-AJAX
        $i = 0;
        while( $i < 3 ) {
            if( ( !isset($_GET['offset']) || intval( $_GET['offset'] ) == 0 )  ) {
                // Sanity date check

                if( date( 'H', $agenda_arr['next_slot'] ) < 9 ) {
                    $agenda_evenementen_bak = $agenda_arr['context']['evenementen'];
                    
                    $offset = $agenda_arr['offset'];
                    $agenda_arr = archive_agenda( $agenda_arr['context'], null, ($offset+DH_EVENTS_HOUR_OFFSET), true );
                    
                    $agenda_arr['context']['evenementen'] = array_merge( $agenda_evenementen_bak, $agenda_arr['context']['evenementen'] );
                }
            }
            $i++;
        }
              
        $context = $agenda_arr['context'];
    } else {
        $context = $agenda_arr['context'];
    }
    
    $tmp = explode( '/', $context['date_sanitized']);
    $context['agenda_date_after_viewing_day'] = date('d/m/Y', strtotime( $tmp[2].'-'.$tmp[1].'-'.$tmp[0] . ' +1 day' ) );
    
}






$context['agenda_set_datetime_now'] = false;
if( !isset( $_GET['date'] ) ) {
	$context['agenda_set_datetime_now'] = true;
}

$context[ 'day_now' ]  = date('D');

// Onderstaand moet dag doorgeven waarop gefilterd wordt op de volgende manier voor bijvoorbeeld zondag : 'Sun' 
$context[ 'day_filter' ]  = date('D', isset( $context['date_filter_unixtime'] ) ? $context['date_filter_unixtime'] : time() );

$day_filter  = date('D');

$context[ 'hour_now' ]  = date('H');
$context[ 'hour_filter' ]  = date('H');

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
  $context['current_category'] = $postcatid;
  
  $args_posts = array(
    'post_type'			  => 'post',
  	'posts_per_page'  => -1,
    'cat'             => $postcatid
  );
  
  $context['posts'] = Timber::get_posts($args_posts);
}

/* Load Locatie */

if ($posttype == 'locaties') {
  
  $terms = \Timber::get_terms(array('taxonomy' => 'categorie_locaties', 'hide_empty' => true));
  $context['category'] = $terms;
  
  $postcatid = get_queried_object()->term_id;
  $context['current_category'] = $postcatid;
  
  if ( $postcatid ) {
    $args_posts = array(
      'post_type'			  => 'locaties',
    	'posts_per_page'  => -1,
      'orderby' => 'title',
      'order'   => 'DESC',
    	'tax_query' => array( 
          array( 
              'taxonomy' => 'categorie_locaties', //or tag or custom taxonomy
              'field' => 'id', 
              'terms' => $postcatid
          ) 
      )
    ); 
  } else {
    $args_posts = array(
      'post_type'			  => 'locaties',
    	'posts_per_page'  => -1,
      'orderby' => 'title',
      'order'   => 'ASC',
    ); 
  }
  
  $context['posts'] = Timber::get_posts($args_posts);
}

Timber::render( $templates, $context );
