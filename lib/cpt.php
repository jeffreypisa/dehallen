<?php // Our custom post type function
  
  function create_posttype() {
  
    register_post_type( 'post',
    // CPT Options
      array(
        'public'                  => true,
        'has_archive'             => true,
        'rewrite'                 => array('slug' => 'blog'),
      )
    );
    
  	register_post_type( 'evenementen',
  	// CPT Options
  		array(
  			'labels' => array(
  				'name'                  => __( 'Agenda' ),
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