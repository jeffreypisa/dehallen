<?php
/**
 * Template Name: Blanco template
 */
    

$context = Timber::get_context();

$post = new TimberPost();
	
$context['post'] = $post;

Timber::render( array( 'page-blanco.twig' ), $context );