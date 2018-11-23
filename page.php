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
    

$context = Timber::get_context();

$post = new TimberPost();

$context['post'] = $post;

// for 'now' functionality date and time in filter

$context[ 'date_now' ] = date('d/m/Y');
// for 'now' functionality date and time in filter
setlocale(LC_TIME, 'NL_nl');
$context[ 'date_now' ] = date('d/m/Y');
date_default_timezone_set('Europe/Amsterdam');
$context[ 'time_now' ] =  date('H:i', strtotime("now Europe/Amsterdam") );

/* Load evenementen vandaag */
$today = date('Ymd');
$date = $today;

$args_evenementen_datetime = get_args_event_datetime_equals_date( $date );

$args_event = array( 'post_type' => 'evenementen', 'posts_per_page' => -1, 'fields' => 'ids',
    'meta_query' =>
        array(
            array(
                'key'       => 'special',
                'value'     => 1,
            )
        )
);
$args_event['tax_query'] = array(
    array(
        'taxonomy' => 'categorie',
        'field'    => 'term_id',
        'terms'    => 4, // 4 =film
        'operator'    => 'NOT IN',
    )
);


$tax_query_results = new WP_Query( $args_event );

$search_posts = array();
foreach( $tax_query_results->posts as $parent_id ) {
    if( $parent_id != $currentID ) {
        $search_posts[] = serialize(array("$parent_id"));
    }
}

$args_evenementen_datetime['meta_query']['parents'] =
array(
    'key' => 'evenement',
    'compare' => 'IN',
    'value' => $search_posts,
);

$events = Timber::get_posts( $args_evenementen_datetime );

$context['evenementen_vandaag'] = archive_agenda_list_helper( $events );
$context['evenementen_vandaag_special'] = $context['evenementen_vandaag'];

$vandaag_notspecial_count = 3 - count( $context['evenementen_vandaag'] );
if( $vandaag_notspecial_count > 0 ) {
    
    
    $args_evenementen_datetime = get_args_event_datetime_equals_date( $date );
    
    $args_event = array( 'post_type' => 'evenementen', 'posts_per_page' => -1, 'fields' => 'ids',
        'post__not_in'=> (( $vandaag_notspecial_count > 0) ? wp_list_pluck( $context['evenementen_vandaag'], 'ID'  ) : array() ),
    );
    $args_event['tax_query'] = array(
        array(
            'taxonomy' => 'categorie',
            'field'    => 'term_id',
            'terms'    => 4, // 4 =film
            'operator'    => 'NOT IN',
        )
    );
    
    $tax_query_results = new WP_Query( $args_event );
    
    $search_posts = array();
    foreach( $tax_query_results->posts as $parent_id ) {
        if( $parent_id != $currentID ) {
            $search_posts[] = serialize(array("$parent_id"));
        }
    }
    
    $args_evenementen_datetime['meta_query']['parents'] =
    array(
        'key' => 'evenement',
        'compare' => 'IN',
        'value' => $search_posts,
    );
    
    $events = Timber::get_posts( $args_evenementen_datetime );

    $context['evenementen_vandaag_addendum'] = archive_agenda_list_helper( $events );
    
    
}

if( isset( $context['evenementen_vandaag_addendum'] ) && is_array( $context['evenementen_vandaag_addendum'] ) && count( $context['evenementen_vandaag_addendum'] ) > 0 ) {
	$context['evenementen_vandaag'] = array_merge( $context['evenementen_vandaag'], $context['evenementen_vandaag_addendum'] );
}

if( is_array( $context['evenementen_vandaag'] ) && count( $context['evenementen_vandaag'] ) > 0 ) {
	// Randomize
	shuffle( $context['evenementen_vandaag'] );
	// Cut only first 3
	$context['evenementen_vandaag'] = array_slice( $context['evenementen_vandaag'], 0, 3 );
}
/* /Load evenementen vandaag */

/* Load evenementen morgen */
$tomorrow = date('Ymd', strtotime('+1 day') );

$date = $tomorrow;

$args_evenementen_datetime = get_args_event_datetime_equals_date( $date );

$args_event = array( 'post_type' => 'evenementen', 'posts_per_page' => -1, 'fields' => 'ids',
    'meta_query' =>
    array(
        array(
            'key'       => 'special',
            'value'     => 1,
        )
    )
);
$args_event['tax_query'] = array(
    array(
        'taxonomy' => 'categorie',
        'field'    => 'term_id',
        'terms'    => 4, // 4 =film
        'operator'    => 'NOT IN',
    )
);
$tax_query_results = new WP_Query( $args_event );

$search_posts = array();
foreach( $tax_query_results->posts as $parent_id ) {
    if( $parent_id != $currentID ) {
        $search_posts[] = serialize(array("$parent_id"));
    }
}

$args_evenementen_datetime['meta_query']['parents'] =
array(
    'key' => 'evenement',
    'compare' => 'IN',
    'value' => $search_posts,
);

$events = Timber::get_posts( $args_evenementen_datetime );
$context['evenementen_morgen'] = archive_agenda_list_helper( $events );

$morgen_notspecial_count = 3 - count( $context['evenementen_morgen'] );
if( $morgen_notspecial_count > 0 ) {
    
    
    $args_evenementen_datetime = get_args_event_datetime_equals_date( $date );
    
    $args_event = array( 'post_type' => 'evenementen', 'posts_per_page' => -1, 'fields' => 'ids',
        'post__not_in'=> (( $vandaag_notspecial_count > 0) ? wp_list_pluck( $context['evenementen_morgen'], 'ID'  ) : array() ),
    );
    $args_event['tax_query'] = array(
        array(
            'taxonomy' => 'categorie',
            'field'    => 'term_id',
            'terms'    => 4, // 4 =film
            'operator'    => 'NOT IN',
        )
    );
    
    $tax_query_results = new WP_Query( $args_event );
    
    $search_posts = array();
    foreach( $tax_query_results->posts as $parent_id ) {
        if( $parent_id != $currentID ) {
            $search_posts[] = serialize(array("$parent_id"));
        }
    }
    
    $args_evenementen_datetime['meta_query']['parents'] =
    array(
        'key' => 'evenement',
        'compare' => 'IN',
        'value' => $search_posts,
    );
    
    $events = Timber::get_posts( $args_evenementen_datetime );

    $context['evenementen_morgen_addendum'] = archive_agenda_list_helper( $events );
    
    
}
if( isset( $context['evenementen_morgen_addendum'] ) && is_array( $context['evenementen_morgen_addendum'] ) && count( $context['evenementen_morgen_addendum'] ) > 0 ) {
	$context['evenementen_morgen'] = array_merge( $context['evenementen_morgen'], $context['evenementen_morgen_addendum'] );
}

if( is_array( $context['evenementen_morgen'] ) && count( $context['evenementen_morgen'] ) > 0 ) {
	// Randomize
	shuffle( $context['evenementen_morgen'] );
	// Cut only first 3
	$context['evenementen_morgen'] = array_slice( $context['evenementen_morgen'], 0, 3 );
}
/* /Load evenementen morgen */


// Get categories

$context[ 'category' ] = Timber::get_terms(['taxonomy'=>'categorie_locaties']);

$context[ 'cat' ] = Timber::get_terms('categorie');


// Get special events today
// Randomize
shuffle( $context['evenementen_vandaag_special'] );
$context['special_today'] = $context['evenementen_vandaag_special'];



// Load aanbod
$args_aanbod = array(
    'post_type' => 'locaties',
    'posts_per_page'  => -1,
    'orderby' => 'title',
    'order'   => 'ASC',
);
$context['aanbod'] = Timber::get_posts( $args_aanbod );

if ( is_front_page() ) {	
	Timber::render( array( 'page-frontpage.twig' ), $context );
} else {
  Timber::render( array( 'page-' . $post->post_name . '.twig', 'page.twig' ), $context );
}