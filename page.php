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
$context[ 'time_now' ] = date('H:i', strtotime('+2 hours'));

/* Load evenementen vandaag */

$today = date('Ymd');

$args_evenementen_vandaag = array(
    'post_type' => 'evenementen',
    'posts_per_page'  => 3,
    'meta_query' => array(
        'relation' => 'AND',
        array(
            'key'       => 'special',
            'value'     => 1,
        ),       
        array(
            'key' => 'datum',
            'compare' => '=',
            'value' => $today
        )
    ),
    'orderby' => 'rand',
);
$context['evenementen_vandaag'] = Timber::get_posts( $args_evenementen_vandaag );
$vandaag_notspecial_count = 3 - count( $context['evenementen_vandaag'] );
if( $vandaag_notspecial_count > 0 ) {
    $args_evenementen_vandaag = array(
        'post_type' => 'evenementen',
        'posts_per_page'  => $vandaag_notspecial_count,
        'post__not_in'=> (( $vandaag_notspecial_count > 0) ? wp_list_pluck( $context['evenementen_vandaag'], 'ID'  ) : array() ),
        'meta_query' => array(
            array(
                'key' => 'datum',
                'compare' => '=',
                'value' => $today
            )
        ),
        'orderby' => 'rand',
    );
}
$context['evenementen_vandaag'] = array_merge( $context['evenementen_vandaag'], Timber::get_posts( $args_evenementen_vandaag ) );

/* /Load evenementen vandaag */

/* Load evenementen morgen */

$tomorrow = date('Ymd', strtotime('+1 day'));

$args_evenementen_morgen = array(
    'post_type' => 'evenementen',
    'posts_per_page'  => 3,
    'meta_query' => array(
        'relation' => 'AND',
        array(
            'key'       => 'special',
            'value'     => 1,
        ),
        array(
            'key' => 'datum',
            'compare' => '=',
            'value' => $tomorrow
        )
    ),
    'orderby' => 'rand',
);
$context['evenementen_morgen'] = Timber::get_posts( $args_evenementen_morgen );
$morgen_notspecial_count = 3 - count( $context['evenementen_morgen'] );
if( $morgen_notspecial_count > 0 ) {
    $args_evenementen_morgen = array(
        'post_type' => 'evenementen',
        'posts_per_page'  => $morgen_notspecial_count,
        'post__not_in'=> (( $morgen_notspecial_count > 0) ? wp_list_pluck( $context['evenementen_morgen'], 'ID'  ) : array() ),
        'meta_query' => array(
            array(
                'key' => 'datum',
                'compare' => '=',
                'value' => $tomorrow
            )
        ),
        'orderby' => 'rand',
    );
}
$context['evenementen_morgen'] = array_merge( $context['evenementen_morgen'], Timber::get_posts( $args_evenementen_morgen ) );

/* /Load evenementen morgen */


// Get categories

$context[ 'category' ] = Timber::get_terms(['taxonomy'=>'categorie_locaties']);

$context[ 'cat' ] = Timber::get_terms('categorie');

if ( is_front_page() ) {	
	Timber::render( array( 'page-frontpage.twig' ), $context );
} else {
  Timber::render( array( 'page-' . $post->post_name . '.twig', 'page.twig' ), $context );
}