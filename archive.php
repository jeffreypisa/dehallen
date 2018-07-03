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
    
    $context['selected_cats'] = array();
    $cats = $context[ 'cat' ];
    $context['date_sanitized'] = '';
    $context['time_sanitized'] = '';
    
    $cat_ids = array();
    if( isset( $_GET['category'] ) && is_array( $_GET['category'] ) && count( $_GET['category'] ) > 0 ) {
        foreach( $_GET['category'] as $request_cat ) {
            foreach( $cats as $cat ) {
                if( $cat->slug == $request_cat ) {
                    $cat_ids[] = $cat->term_id;
                    $context['selected_cats'][$cat->slug] = $cat->slug;
                }
            }
        }
    }
        
    $today = date('Ymd');
    $date = $today;
    if( isset( $_GET['date'] ) && $_GET['date'] ) {
        if( $_GET['date'] == 'tomorrow' ) {
            $_GET['date'] = date('d/m/Y', strtotime( 'tomorrow' ) );
        }
        
        $tmp = explode( '/', $_GET['date'] );
        if( count( $tmp ) == 3 && intval( $tmp[0] ) > 1 && intval( $tmp[1] ) > 0 && intval( $tmp[2] ) > 0 ) {
            $date = str_pad( intval( $tmp[2] ), 2, '0', STR_PAD_LEFT ).str_pad( intval( $tmp[1] ), 2, '0', STR_PAD_LEFT ).str_pad( intval( $tmp[0] ), 2, '0', STR_PAD_LEFT );          
            $context['date_sanitized'] = str_pad( intval( $tmp[0] ), 2, '0', STR_PAD_LEFT ).'/'.str_pad( intval( $tmp[1] ), 2, '0', STR_PAD_LEFT ).'/'.str_pad( intval( $tmp[2] ), 2, '0', STR_PAD_LEFT );
            
            $context[ 'date_filter_full' ] = date('l d F', strtotime( $date ) );
        }
    }
    
    $timeday = '00:00:00';
    $timestart = $timeday;
    if( isset( $_GET['time'] ) && $_GET['time'] ) {
        $tmp = explode( ':', $_GET['time'] );
        if( count( $tmp ) == 2 && (intval( $tmp[0] ) > 1 || $tmp[0] == '00') && (intval( $tmp[1] ) > 1 || $tmp[1] == '00') ) {
            $timestart = str_pad( intval( $tmp[0] ), 2, '0', STR_PAD_LEFT ).':'.str_pad( intval( $tmp[1] ), 2, '0', STR_PAD_LEFT ).':00';
            
            $context['time_sanitized'] = str_pad( intval( $tmp[0] ), 2, '0', STR_PAD_LEFT ).':'.str_pad( intval( $tmp[1] ), 2, '0', STR_PAD_LEFT );
        }
    }
    
    $args_evenementen = array(
        'post_type' => 'evenementen',
        'posts_per_page' => - 1,
        'meta_query' => array(
            'relation' => 'AND',
            array(
                'key' => 'datum',
                'compare' => '=',
                'value' => $date
            ),
            array(
                'key' => 'begintijd',
                'compare' => '>=',
                'value' => $timestart
            )
        ),
        'meta_key' => 'begintijd',
        'orderby' => 'meta_value',
        'order' => 'ASC'
    );
  
    if( is_array( $cat_ids ) && count( $cat_ids ) > 0 ) {
        $args_evenementen['tax_query'] = array(
            'relation' => 'OR');
        
        foreach( $cat_ids as $cat_id ) {
            $args_evenementen['tax_query'][] =
                array(
                    'taxonomy' => 'categorie',
                    'field'    => 'term_id',
                    'terms'    => $cat_ids,
                );
        }
    }
    
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