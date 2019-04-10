<?php
/**
 * Template Name: Geschiedenis template
 */
    

$context = Timber::get_context();

$post = new TimberPost();
	
$context['post'] = $post;


Timber::render( array( 'page-geschiedenis.twig' ), $context );