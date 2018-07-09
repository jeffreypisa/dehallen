<?php
/**
 * Template Name: Blog archive
 */
 
$templates = array( 'archive.twig', 'index.twig' );

$context = Timber::get_context();

$args_blog = array(
    'post_type'         => 'post',
    'posts_per_page'    => -1,
);

$context['posts'] = Timber::get_posts($args_blog);


$terms = \Timber::get_terms(array('taxonomy' => 'category', 'hide_empty' => true));
$context['category'] = $terms;


Timber::render( $templates, $context );