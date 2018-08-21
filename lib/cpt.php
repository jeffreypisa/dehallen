<?php 
add_filter( 'pre_post_link', 'dh_pre_post_link', 3, 3);
function dh_pre_post_link( $permalink, $post, $leavename ) {
    if( get_post_type( $post ) != 'post' ) {
        return $permalink;
    } 
    return '/blog/%postname%/';
}


/**
 * Rewrites blog/(*) to $1/
 */
function dh_parse_request( $wp ){
    if ( strpos( $wp->request, 'blog/') === 0) { 
            $tmp = explode( '/', $wp->request );
            $last_bit = end( $tmp ) ;
            
            $wp->query_vars = array('page' => '', 'name' => $last_bit );
            $wp->request = $last_bit;        
    }
}
add_action( 'parse_request', 'dh_parse_request' );

      
  function create_posttype() {
  
      
     
  	register_post_type( 'evenementen',
  	// CPT Options
  		array(
  			'labels' => array(
  				'name'                  => __( 'Evenementen' ),
  				'singular_name'         => __( 'Evenement' ),
      		'all_items'             => __( 'Alle evenementen' ),
      		'add_new_item'          => __( 'Nieuw evenement toevoegen' ),
      		'new_item'              => __( 'Nieuw evenement' ),
          'add_new'               => __( 'Nieuw evenement' ),
      		'edit_item'             => __( 'Bewerk evenement' ),
      		'update_item'           => __( 'Update evenement' ),
      		'view_item'             => __( 'Bekijk evenement' ),
      		'search_items'          => __( 'Zoek evenement' ),
  			),
  			'menu_icon'               => 'dashicons-calendar',
  			'public'                  => true,
  			'has_archive'             => true,
  			'rewrite'                 => array('slug' => 'agenda'),
  		)
  	);

  	register_post_type( 'evenementen_datetime',
  	    // CPT Options
  	    array(
  	        'labels' => array(
  	            'name'                  => __( 'Kalender' ),
  	            'singular_name'         => __( 'Evenement_datetime' ),
  	            'all_items'             => __( 'Alle evenementen' ),
  	            'add_new_item'          => __( 'Nieuw evenement toevoegen' ),
  	            'new_item'              => __( 'Nieuw evenement' ),
  	            'add_new'               => __( 'Nieuw evenement' ),
  	            'edit_item'             => __( 'Bewerk evenement' ),
  	            'update_item'           => __( 'Update evenement' ),
  	            'view_item'             => __( 'Bekijk evenement' ),
  	            'search_items'          => __( 'Zoek evenement' ),
  	        ),
  	        'menu_icon'               => 'dashicons-calendar',
  	        'public'                  => true,
  	        'has_archive'             => true,
  	        'rewrite'                 => array('slug' => 'agenda_datetime'),
  	    )
  	);
  	
  	register_post_type( 'locaties',
  	// CPT Options
  		array(
  			'labels' => array(
  				'name'                  => __( 'Aanbod' ),
  				'singular_name'         => __( 'Locatie' ),
      		'all_items'             => __( 'Alle locaties' ),
      		'add_new_item'          => __( 'Nieuwe locatie toevoegen' ),
      		'new_item'              => __( 'Nieuwe locatie' ),
          'add_new'               => __( 'Nieuwe locatie' ),
      		'edit_item'             => __( 'Bewerk locatie' ),
      		'update_item'           => __( 'Update locatie' ),
      		'view_item'             => __( 'Bekijk locatie' ),
      		'search_items'          => __( 'Zoek locatie' ),
  			),
  			'menu_icon'               => 'dashicons-store',
  			'public'                  => true,
  			'has_archive'             => true,
  			'rewrite'                 => array('slug' => 'aanbod'),
  		)
  	);
  	
  	register_post_type( 'zaalhuur',
  	// CPT Options
  		array(
  			'labels' => array(
  				'name'                  => __( 'Zaalhuur' ),
  				'singular_name'         => __( 'Locatie' ),
      		'all_items'             => __( 'Alle locaties' ),
      		'add_new_item'          => __( 'Nieuwe locatie toevoegen' ),
      		'new_item'              => __( 'Nieuwe locatie' ),
          'add_new'               => __( 'Nieuwe locatie' ),
      		'edit_item'             => __( 'Bewerk locatie' ),
      		'update_item'           => __( 'Update locatie' ),
      		'view_item'             => __( 'Bekijk locatie' ),
      		'search_items'          => __( 'Zoek locatie' ),
  			),
  			'menu_icon'               => 'dashicons-groups',
  			'public'                  => true,
  			'has_archive'             => true,
  			'rewrite'                 => array('slug' => 'zaalhuur'),
  		)
  	);
  		
  }
  // Hooking up our function to theme setup
  add_action( 'init', 'create_posttype' ); 

?>