<?php
/**
 * Template Name: Rondleidingen template
 */
    

$context = Timber::get_context();

$post = new TimberPost();
	
$context['post'] = $post;

Timber::render( array( 'page-rondleidingen.twig' ), $context );