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
if(ICL_LANGUAGE_CODE == "en"){
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


	// set defaults if parameters are not passed
	if(empty($_GET['date'])) $_GET['date'] = date('d/m/Y'); 
	if(empty($_GET['time'])) $_GET['time'] = date('H:i'); 
	if(empty($_GET['category'])) $_GET['category'] = [];
	if(!empty($_POST['time'])) $_GET['time'] = $_POST['time'];
	
	// get continuous events for the date
	$continuous_events = getContinuousEventsForDate($_GET['date']);
	// get all events posts
	$events_posts = getAllEventsPost(); 
	// get all events for the day (we will show from the current hour on from twig)
	$events_day = getEventsForDay($_GET['date']);
	// link the post to each event for displaying data from twig
	$events_day = linkEventsWithPosts($events_day, $events_posts, $_GET['category']);
	// separate events per starting hour
	$events_day = organizeEventsPerHours($events_day);

	//print_r($events_day);
	//die();
	
	// save variables to $context for rendering
	$context[ 'cat' ] = Timber::get_terms('categorie');
	$context['current_date'] = $_GET['date'];
	$context['current_time'] = $_GET['time'];
	$context['current_hour'] = getHourFromTime($_GET['time']);
	$context['continuous_events'] = $continuous_events;
	$context['date_filter_full'] = humanDateTranslated($_GET['date']);
	$context['events_day'] = $events_day;
	$context['selected_cats'] = $_GET['category'];

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

/* Load Cultuur */

if ($posttype == 'evenementen' || $posttype == 'cultuur') {
  $args_cultuur = array(
    'post_type'			  => 'locaties',
  	'posts_per_page'  => -1,
    'taxonomy'        => 'categorie_locaties',
    'term'            => 'Cultuur',
  ); 
  
  $context['cultuur'] = Timber::get_posts($args_cultuur);
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
