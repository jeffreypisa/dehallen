<?php
  
include 'lib/includes.php';
include 'lib/timber.php';
include 'lib/optionspage.php';
include 'lib/svg.php';
include 'lib/cpt.php';
include 'lib/ctax.php';
include 'lib/categoryradio.php';


if ( is_page(249) && wp_is_mobile() ) {
  
  $newURL = get_post_type_archive_link( 'locaties' );
  
  header('Location: '.$newURL);
  die();
}