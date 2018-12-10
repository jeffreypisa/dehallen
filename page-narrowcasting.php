<?php
/**
 * Template Name: Narrowcaster template
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