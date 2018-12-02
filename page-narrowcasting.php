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

if ( false === ( $slides = get_transient( 'mp_narrowcasting_'.ICL_LANGUAGE_CODE ) ) ) {
    $slides = narrowcasting_today();
    set_transient( 'mp_narrowcasting_'.ICL_LANGUAGE_CODE, $slides, 1 * HOUR_IN_SECONDS );
}

$context['narrowcasting_event_ids'] = $slides;
/**
Array
(
    [1084] => Array
        (
            [id] => 1084
            [is_film] => 1
            [source] => narrow_settings
        )

    [1086] => Array
        (
            [id] => 1086
            [is_film] => 1
            [source] => narrow_settings
        )

    [1056] => Array
        (
            [id] => 1056
            [is_film] => 1
            [source] => narrow_query_today
        )

)
 */


Timber::render( array( 'page-' . $post->post_name . '.twig', 'page.twig' ), $context );