<?php
/* Template Name: Narrowcaster template */

    

$context = Timber::get_context();

$post = new TimberPost();

$context['post'] = $post;

//if ( false === ( $slides = get_transient( 'mp_narrowcasting1'.ICL_LANGUAGE_CODE ) ) ) {
    $slides = narrowcasting_today();
    set_transient( 'mp_narrowcasting1'.ICL_LANGUAGE_CODE, $slides, 1 * HOUR_IN_SECONDS );
//}

$context['narrowcasting_event_ids'] = $slides;


Timber::render( array( 'page-' . $post->post_name . '.twig', 'page.twig' ), $context );