<?php
/* Template Name: Narrowcaster template */

    

$context = Timber::get_context();

$post = new TimberPost();

$context['post'] = $post;

if ( false === ( $slides = get_transient( 'mp_narrowcasting1'.ICL_LANGUAGE_CODE ) ) ) {
    $slides = narrowcasting_today();
    set_transient( 'mp_narrowcasting1'.ICL_LANGUAGE_CODE, $slides, 1 * HOUR_IN_SECONDS );
}

$context['narrowcasting_event_ids'] = $slides;
/**
Array
(
    [3920] => Array
        (
            [id] => 3920
            [is_film] => 
            [source] => narrow_settings
            [datum] => 20181203
            [einddatum] => 20181231
        )

    [3960] => Array
        (
            [id] => 3960
            [is_film] => 1
            [source] => narrow_query_today
            [datum] => 20181214
            [einddatum] => 20181214
        )

    [3964] => Array
        (
            [id] => 3964
            [is_film] => 1
            [source] => narrow_query_today
            [datum] => 20181214
            [einddatum] => 20181214
        )
)
 */


Timber::render( array( 'page-' . $post->post_name . '.twig', 'page.twig' ), $context );