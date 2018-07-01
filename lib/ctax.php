<?php
  
// hook into the init action and call create_book_taxonomies when it fires
add_action( 'init', 'create_kb_type', 0 );

function create_kb_type() {

	$labels = array(
		'name'              => _x( 'Categorie', 'taxonomy general name' ),
		'singular_name'     => _x( 'Categorie', 'taxonomy singular name' ),
		'search_items'      => __( 'Zoek categorie' ),
		'all_items'         => __( 'Alle categorie' ),
		'parent_item'       => __( 'Parent categorie' ),
		'parent_item_colon' => __( 'Parent categorie' ),
		'edit_item'         => __( 'Bewerk categorie' ),
		'update_item'       => __( 'Update categorie' ),
		'add_new_item'      => __( 'Nieuwe categorie toevoegen' ),
		'new_item_name'     => __( 'Naam nieuwe categorie' ),
		'menu_name'         => __( 'Categorieën' ),
	);

	$args = array(
		'hierarchical'      => true,
		'labels'            => $labels,
		'show_ui'           => true,
		'show_admin_column' => true,
		'query_var'         => true,
		'rewrite'           => array( 'slug' => 'categorie' ),
	);

  register_taxonomy('categorie', array('evenementen'), $args);

}

// hook into the init action and call create_book_taxonomies when it fires
add_action( 'init', 'create_kb2_type', 0 );

function create_kb2_type() {

	$labels = array(
		'name'              => _x( 'Categorie', 'taxonomy general name' ),
		'singular_name'     => _x( 'Categorie', 'taxonomy singular name' ),
		'search_items'      => __( 'Zoek categorie' ),
		'all_items'         => __( 'Alle categorie' ),
		'parent_item'       => __( 'Parent categorie' ),
		'parent_item_colon' => __( 'Parent categorie' ),
		'edit_item'         => __( 'Bewerk categorie' ),
		'update_item'       => __( 'Update categorie' ),
		'add_new_item'      => __( 'Nieuwe categorie toevoegen' ),
		'new_item_name'     => __( 'Naam nieuwe categorie' ),
		'menu_name'         => __( 'Categorieën' ),
	);

	$args = array(
		'hierarchical'      => true,
		'labels'            => $labels,
		'show_ui'           => true,
		'show_admin_column' => true,
		'query_var'         => true,
		'rewrite'           => array( 'slug' => 'categorie' ),
	);

  register_taxonomy('categorie_locaties', array('locaties'), $args);

}

?>