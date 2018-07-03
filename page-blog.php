<?php
/**
 * Template Name: Blog archive
 */
$templates = array( 'archive-post.twig', 'index.twig' );

$posttype = $post->post_type;

$context = Timber::get_context();


$args_blog = array(
    'post_type'         => 'post',
    'posts_per_page'    => -1,
);

$context['posts'] = Timber::get_posts($args_blog);

Timber::render( $templates, $context );