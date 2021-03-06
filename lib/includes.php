<?php

	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL && ~E_NOTICE);

function add_theme_scripts() {
    if (!is_page_template('page-blanco.php')) {
        wp_enqueue_style( 'styles', get_template_directory_uri() . '/assets/css/style.css', array(), '4.12.0');
        wp_enqueue_script( 'clamp-js', get_template_directory_uri() . '/assets/js/scripts/clamp.min.js', array ( 'jquery' ), 1.5, true);
        wp_enqueue_script( 'script', get_template_directory_uri() . '/assets/js/site-min.js', array ( 'jquery' ), 1.5, true);
        wp_enqueue_script( 'script-nomin', get_template_directory_uri() . '/assets/js/site.js', array ( 'jquery' ), 1.5, true);
    }
}

add_action( 'wp_enqueue_scripts', 'add_theme_scripts' );


add_action('pmxi_update_post_meta', 'mp_pmxi_update_post_meta', 10, 3);

function mp_pmxi_update_post_meta($pid, $m_key, $m_value) {
    global $wpdb;
    if ( $m_key == 'evenement' && $m_value == 'will_be_auto_imported') {
        $parent_guid = get_post_meta( $pid, '_parent_guid', true);
        
        if( $parent_guid ) {
            $sql = $wpdb->prepare( "SELECT post_id FROM `".$wpdb->postmeta."` WHERE `meta_value` = %s AND meta_key = '_guid'", $parent_guid );
            $myrows = $wpdb->get_results( $sql );
            
            foreach( $myrows as $row ) {
                $parent_id = $row->post_id;
                
                update_post_meta( $pid, 'evenement', array( $parent_id ) );
            }
        }
    }
    if ( $m_key == 'locatie' && $m_value ) {
        update_post_meta( $pid, 'locatie', array( $m_value ) );
    }
}

add_action('pmxi_saved_post', 'mp_pmxi_saved_post', 10, 1);
function mp_pmxi_saved_post( $pid ) {
    global $wpdb;
    
    // Set ACF image
    $image_id = get_post_meta( $pid, '_thumbnail_id', true);
    if( $image_id ) {
        update_post_meta( $pid, 'afbeelding', $image_id );
    }
    
    
    
    /*
     * Cleanup
     */
    $parent_guid = get_post_meta( $pid, '_parent_guid', true);
    $_internal_run = get_post_meta( $pid, '_internal_run', true);
    
    $sql = $wpdb->prepare( "SELECT guid_link.post_id FROM (SELECT post_id FROM `".$wpdb->postmeta."` WHERE `meta_value` = %s AND meta_key = '_parent_guid') AS guid_link JOIN (SELECT post_id FROM `".$wpdb->postmeta."` WHERE `meta_value` < %d AND meta_key = '_internal_run') AS time_link ON guid_link.post_id = time_link.post_id", $parent_guid, $_internal_run );
    
    $myrows = $wpdb->get_results( $sql );
    foreach( $myrows as $row ) {
        wp_delete_post( $row->post_id );
    }
    /*
     * /Cleanup
     */
    
}


/**
 * Migrate from evenementen_datetime to evenementen array
 *
 * @param unknown $events_datetimes
 * @param $timestart
 * @return array
 */
function archive_agenda_list_helper( $events_datetimes, $timestart = false ) {
    
    if( is_array( $events_datetimes ) && count( $events_datetimes ) > 0 ) {
        
        $tmp = wp_list_pluck( $events_datetimes, 'custom' );
        
        $events_datetimes = array();
        foreach( $tmp as $single_datetime ) {
            
            $single_id = $single_datetime['evenement'][0];
            $args_event = array( 'post_type' => 'evenementen', 'post__in' =>  array( $single_id  ) );
            $main_event = Timber::get_posts( $args_event );
            
           
            
            if( is_array( $main_event) && count( $main_event ) == 1 ) {
            
                $events_datetimes[ $single_id ] = $main_event[0];
                
                if( !is_object($events_datetimes[ $single_id ]) || !property_exists($events_datetimes[ $single_id ], 'custom') ) {
                    if( !is_object($events_datetimes[ $single_id ]) ) {
                        $events_datetimes[ $single_id ] = new \stdClass();
                    }
                    $events_datetimes[ $single_id ]->custom = array( );
                }
                
                
                if( isset( $single_datetime['doorlopend_event'] ) && $single_datetime['doorlopend_event'] ) {
                    $tmptime = explode( ':', $timestart );
                    $single_datetime['doorlopend_event_timestart'] = $tmptime[0];
                }
                
                $events_datetimes[ $single_id ]->custom = array_merge( $events_datetimes[ $single_id ]->custom, $single_datetime );
            }
        }
        
        
        // Now sort by time ascending
        $events_datetimes_sorted = array();
        foreach( $events_datetimes as $single_datetime ) {
            $date_ID = ( isset( $single_datetime->custom['doorlopend_event'] ) && $single_datetime->custom['doorlopend_event'] ) ? $single_datetime->custom['doorlopend_event_timestart'] : $single_datetime->custom['begintijd'];
            $date_ID_key = $date_ID . $single_datetime->ID;
            $events_datetimes_sorted[$date_ID_key] = $single_datetime;
        }
        
        $events_datetimes = $events_datetimes_sorted;
        // Falltrough
    }
    
    return $events_datetimes;
}

define('DH_EVENTS_HOUR_OFFSET', 1);

function get_args_event_datetime_equals_date( $date, $exact = false ) {
    
    
    // Limit by DH_EVENTS_HOUR_OFFSET hours up front
    $next_slot = strtotime( $date. ' + '.DH_EVENTS_HOUR_OFFSET.' hours');
    
    $operator_start = '=';
    $operator_end = '=';
    if( !$exact ) {
        $operator_start = '<=';
        $operator_end = '>=';
    }
    
    
    $args_evenementen_datetime = array(
        'post_type' => 'evenementen_datetime',
        'posts_per_page' => - 1,
        'meta_query' => array(
            'relation' => 'AND',
            'date1' => array(
                'key' => 'datum',
                'compare' => $operator_start,
                'value' => $date
            ),
        ),
        'meta_key' => 'begintijd',
        'orderby' => 'meta_value',
        'order' => 'ASC'
    );
    
    
    $args_evenementen_datetime['meta_query']['date2'] =
    array(
        'key' => 'einddatum',
        'compare' => $operator_end,
        'value' => date( 'Ymd', $next_slot),
    );
    
    return $args_evenementen_datetime;
}

function get_args_event_datetime_greaterequals_date( $date ) {
    
    $args_evenementen_datetime = get_args_event_datetime_equals_date( $date );
    $args_evenementen_datetime['meta_query']['date1']['compare'] = '>=';
    
    return $args_evenementen_datetime;
    
}

function archive_agenda( $context, $tries = 0, $override_offset = false, $force_no_xhr = false ) {
    
    $context[ 'category' ] = Timber::get_term(['taxonomy'=>'categorie']);
    $context[ 'cat' ] = Timber::get_terms('categorie');
    
    /* get current category */
    $cat = get_category(get_query_var('categorie'));
    $cat_slug = $cat->slug;
    $context['currentcat'] = $cat_slug;
    
    $dh_is_ajax = false;
    if( isset( $_POST['offset'] ) ) {
        $dh_is_ajax = true;
        $offset = intval( $_POST['offset'] );
    }

    if( $override_offset ) {
        $dh_is_ajax = true;
        if( $force_no_xhr ) {
            $dh_is_ajax = false;
        }
        $offset = $override_offset;
    }
    
    if( $dh_is_ajax ) {
        $templates = 'partials/archive-evenementen-single.twig';
        $_GET['category']   = $_POST['category'];
        $_GET['date']       = $_POST['date'];
        $_GET['time']       = $_POST['time'];
    }
    
    $context['dh_agenda_ajaxurl']       = home_url( (isset($_SERVER['REDIRECT_URL']) && $_SERVER['REDIRECT_URL']) ? $_SERVER['REDIRECT_URL'] : $_SERVER['REQUEST_URI'] );
    $context['dh_agenda_ajaxoffset']    = $offset+DH_EVENTS_HOUR_OFFSET; //DH_EVENTS_HOUR_OFFSET;
    
    $context['selected_cats'] = array();
    $cats = $context[ 'cat' ];
    $context['date_sanitized'] = '';
    $context['time_sanitized'] = '';
    
    $cat_ids = array();
    if( isset( $_GET['category'] ) && is_array( $_GET['category'] ) && count( $_GET['category'] ) > 0 ) {
        foreach( $_GET['category'] as $request_cat ) {
            foreach( $cats as $cat ) {
                if( $cat->slug == $request_cat ) {
                    $cat_ids[] = $cat->term_id;
                    $context['selected_cats'][$cat->slug] = $cat->slug;
                }
            }
        }
    }
    
    $today = date('Ymd');
    $date = $today;
    
    if( !isset ( $_GET['date'] ) || !$_GET['date'] ) {
        $_GET['date'] = 'today';
    }
    
    $hasdate = false;
    if( isset( $_GET['date'] ) && $_GET['date'] ) {
        if( $_GET['date'] == 'tomorrow' ) {
            $_GET['date'] = date('d/m/Y', strtotime( 'tomorrow' ) );
        }
        if( $_GET['date'] == 'today' ) {
            $_GET['date'] = date('d/m/Y', strtotime( 'today' ) );
        }
        
        $tmp = explode( '/', $_GET['date'] );
        if( count( $tmp ) == 3 && intval( $tmp[0] ) > 0 && intval( $tmp[1] ) > 0 && intval( $tmp[2] ) > 0 ) {
            $date = str_pad( intval( $tmp[2] ), 2, '0', STR_PAD_LEFT ).str_pad( intval( $tmp[1] ), 2, '0', STR_PAD_LEFT ).str_pad( intval( $tmp[0] ), 2, '0', STR_PAD_LEFT );
            $context['date_sanitized'] = str_pad( intval( $tmp[0] ), 2, '0', STR_PAD_LEFT ).'/'.str_pad( intval( $tmp[1] ), 2, '0', STR_PAD_LEFT ).'/'.str_pad( intval( $tmp[2] ), 2, '0', STR_PAD_LEFT );
            
            if(ICL_LANGUAGE_CODE=="en"){
                $context[ 'date_filter_full' ] = date('l F jS', strtotime( $date ) );
                $context[ 'day_filter_full' ]  = date('l', strtotime( $date ) );
            }
            else {
                setlocale(LC_ALL, 'nl_NL');
                $context[ 'date_filter_full' ] = strftime('%A %e %B', strtotime( $date ) );
                $context[ 'day_filter_full' ]  = strftime('%A', strtotime( $date ) );
            }
            
            
            $context[ 'date_filter_unixtime' ] = strtotime( $date ) ;
            
            $hasdate = true;
        }
    }
    
    if(ICL_LANGUAGE_CODE=="en"){
        $context[ 'date_filter_short' ] = strftime('%d %h %y', strtotime( $date ) );
    } else {
        setlocale(LC_ALL, 'nl_NL');
        $context[ 'date_filter_short' ] = strftime('%d %h %y', strtotime( $date ) );
    }
    
    
    $timestart = '00:00:00';
    $hastime = false;
    
    if(!isset($_GET['time'])){
    	// TODO: the agenda should show events further than the current hour, myabe for the
    	// next 2 hours
    	// if not time is passed, use curren time
    	$_GET['time'] = date('H:00');
    }

    // if time has been passed as parameter, set $timeastart and $hastime to
    // query posts for this time
    if( isset( $_GET['time'] ) && $_GET['time'] ) {
        $tmp = explode( ':', $_GET['time'] );
        if( count( $tmp ) == 2 && (intval( $tmp[0] ) > 1 || $tmp[0] == '00') && (intval( $tmp[1] ) > 1 || $tmp[1] == '00') ) {
            // Discard minutes
            // $timestart = str_pad( intval( $tmp[0] ), 2, '0', STR_PAD_LEFT ).':'.str_pad( intval( $tmp[1] ), 2, '0', STR_PAD_LEFT ).':00';
            $timestart = str_pad( 14, 2, '0', STR_PAD_LEFT ).':00:00';
            
            $context['time_sanitized'] = str_pad( intval( $tmp[0] ), 2, '0', STR_PAD_LEFT ).':'.str_pad( intval( $tmp[1] ), 2, '0', STR_PAD_LEFT );
            $hastime = true;
        }
    }

    
    if( $dh_is_ajax || $force_no_xhr ) {
        $first_slot = strtotime( $date. ' '.$timestart . ' + '.$offset.' hours');
        $date = date( 'Ymd', $first_slot);
        $timestart = date( 'H:i:00', $first_slot);
    }
    
    
    $args_evenementen = array(
        'post_type' => 'evenementen_datetime',
        'posts_per_page' => - 1,
        'meta_query' => array(
            'relation' => 'AND',
            
            'date1' => array(
                'key' => 'einddatum',
                'compare' => '>=',
                'value' => $date
            ),
            
            'no_continuous' =>  array( // Make sure
                'key' => 'doorlopend_event',
                'compare' => '=',
                'value' => '0'
            ),
        ),
        'meta_key' => 'begintijd',
        'orderby' => 'meta_value',
        'order' => 'ASC'
    );
    
    // offset with AJAX OR Hastime (time) set
    if( $dh_is_ajax || $hastime ) {
        $args_evenementen['meta_query']['hastime1'] =
        array(
            'key' => 'begintijd',
            'compare' => '>=',
            'value' => $timestart
        );
    }
    
    // Limit by DH_EVENTS_HOUR_OFFSET hours up front
    $next_slot = strtotime( $date. ' '.$timestart . ' + '.DH_EVENTS_HOUR_OFFSET.' hours');
    
    $args_evenementen['meta_query']['date2'] =
    array(
        'key' => 'datum',
        'compare' => '<=',
        'value' => date( 'Ymd', $next_slot),
    );
    
    $args_evenementen['meta_query']['hastime2'] =
    array(
        'key' => 'begintijd',
        'compare' => '<',
        'value' => date( 'H:i:00', $next_slot)
    );
    
    
    // Shift cats to upper
    if( is_array( $cat_ids ) && count( $cat_ids ) > 0 ) {
        $args_event = array( 'post_type' => 'evenementen', 'posts_per_page' => -1, 'fields' => 'ids' );
        $args_event['tax_query'] = array(
            'relation' => 'OR');
        
        foreach( $cat_ids as $cat_id ) {
            $args_event['tax_query'][] =
            array(
                'taxonomy' => 'categorie',
                'field'    => 'term_id',
                'terms'    => $cat_ids,
            );
        }
        
        $tax_query_results = new WP_Query( $args_event );
        
        $search_posts = array();
        foreach( $tax_query_results->posts as $parent_id ) {
            $search_posts[] = serialize(array("$parent_id"));
        }
        
        $args_evenementen['meta_query']['categories'] =
        array(
            'key' => 'evenement',
            'compare' => 'IN',
            'value' => $search_posts,
        );
    }

    $args_evenementen_continuous = $args_evenementen;
    unset( $args_evenementen_continuous['meta_query']['no_continuous'] );
    
    $args_evenementen_continuous['meta_query']['hastime1'] =
    array(
        'relation' => 'OR',
        array(
            'key' => 'begintijd',
            'compare' => '<=',
            'value' => $timestart,
        ),
        array(
            'key' => 'begintijd',
            'compare' => '<',
            'value' => date( 'H:i:00', $next_slot),
        ),
    );
    /*
     $args_evenementen_continuous['meta_query']['hastime2'] =
     array(
     'relation' => 'AND',
     array(
     'key' => 'eindtijd',
     'compare' => '<',
     'value' => date( 'H:i:00', $next_slot),
     ),
     array(
     'key' => 'doorlopend_event',
     'compare' => '=',
     'value' => 1
     ),
     );
     */
    $args_evenementen_continuous['meta_query']['hastime3'] =
    array(
        'relation' => 'AND',
        array(
            'key' => 'eindtijd',
            'compare' => '>',
            'value' => $timestart,
        ),
        array(
            'key' => 'doorlopend_event',
            'compare' => '=',
            'value' => 1
        ),
    );
    
    
    
    $events = Timber::get_posts( $args_evenementen );
    $events = archive_agenda_list_helper( $events );
    
    $events_continuous = Timber::get_posts( $args_evenementen_continuous );
    $events_continuous = archive_agenda_list_helper( $events_continuous, $timestart );
    
    
    /*
     print_R($args_evenementen);
     print_R( new WP_Query( $args_evenementen ) );
     print_r($events);die();
     
     
     print_R($args_evenementen_continuous);
     print_R( new WP_Query( $args_evenementen_continuous ) );
     print_r($events_continuous);die();
     */
    $context['evenementen'] = array_merge( $events , $events_continuous);
    if( false && count( $events_continuous ) && count( $events ) ) {
        print_r( $events );
        print_r( $events_continuous );
        die();
    }
    
    if( $dh_is_ajax ) {
        
        // Recursive
        if( count( $events ) == 0 && count( $events_continuous ) == 0 ) {
            $tries++;
            
            // Untill last hour this day
            if( date( 'H', $next_slot) < 9 ) {
                $context = archive_agenda( $context, $tries, ($offset+DH_EVENTS_HOUR_OFFSET) );
            }
        }
        
        // Do not cross date
        if( $_GET['date'] != date('d/m/Y', $next_slot ) ) {
            $context['evenementen'] = array();
        }
        $body = Timber::compile( $templates, $context  );
        
        
        echo json_encode( array('offsetvalue' => ($tries+1)*DH_EVENTS_HOUR_OFFSET, 'body' => $body ) );
        die();
    }
    
    
    
    return array(
        'context' => $context,
        'date_filter_unixtime' => $context[ 'date_filter_unixtime' ],
        'next_slot' => $next_slot,
        'count_events_single' => count( $events ),
        'count_events_continuous' => count( $events_continuous ),
        'offset' => $offset,
    )
    ;
}

function mp_get_all_dates_for_event( $event_id, $only_future_and_today = true ) {
    global $wpdb;
    
    // Serialized ..
    // a:1:{i:0;s:4:"1086";}
    $sql = $wpdb->prepare( 'SELECT post_id FROM '.$wpdb->postmeta. ' WHERE meta_key = %s AND meta_value = ', 'evenement' ). '\'a:1:{i:0;s:'.strlen($event_id).':"'.$event_id.'";}\'';
    
    $myrows = $wpdb->get_results( $sql );
    
    $today = date('Ymd');
    $event_datetime_posts = array();
    foreach( $myrows as $row ) {
        $post = $row->post_id;
        
        $event_datetime_posts[$post] = get_metadata( 'post', $post );
        if( $only_future_and_today ) {
            if( !( $event_datetime_posts[$post]['einddatum'][0] >= $today ) ) {
                unset( $event_datetime_posts[$post] );
            }
        }
    }
    
    // Sort on date (start)
    usort($event_datetime_posts, 'sortbydatestart');
    
    return $event_datetime_posts;
}


function sortbydatestart($a, $b) {
    return strcmp($a['datum'][0], $b['datum'][0]);
}

function mp_home_slider_post_object_result_add_date( $title, $post, $field, $post_id ) {
    if( $post->ID ) {
        
        $date = get_post_meta( $post->ID, 'datum', true );
        
        $year = substr( $date, 0, 4 );
        $month = substr( $date, 4, 2 );
        $day = substr( $date, 6, 2 );
        
        $dateunix = strtotime( $year. '-'.$month. '-'.$day );
        
        if( $date && $dateunix ) {
            return date( 'd-M-Y' ,  $dateunix) .  ': '. $title;
        }
    }
    return $title;
}
add_filter('acf/fields/post_object/result/key=field_5b2cfe6e8b795', 'mp_home_slider_post_object_result_add_date', 10, 4);
add_filter('acf/fields/post_object/result/key=field_5c000eb34e054', 'mp_home_slider_post_object_result_add_date', 10, 4);

function mp_cal_relationship_result_slug( $title, $post, $field, $post_id  ) {
    
    if( $post->ID ) {
        
        return $title. ' ( '. str_replace( get_option( 'siteurl' ), '', get_permalink( $post ) ). ' )';
        
        
        $date = get_post_meta( $post->ID, 'datum', true );
        
        $year = substr( $date, 0, 4 );
        $month = substr( $date, 4, 2 );
        $day = substr( $date, 6, 2 );
        
        $dateunix = strtotime( $year. '-'.$month. '-'.$day );
        
        if( $date && $dateunix ) {
            return date( 'd-M-Y' ,  $dateunix) .  ': '. $title;
        }
    }
    return $title;
}
add_filter('acf/fields/relationship/result/key=field_5b702d884eb7f', 'mp_cal_relationship_result_slug', 10, 4);



/**
 * Narrowcasting, all fields and ALL movies of today. But NO duplicate movies
 */
function narrowcasting_today() {
    $film_excludes = array();
    $slides = array();
    if( have_rows('Sectie') ) {
        while ( have_rows('Sectie') ) {
            the_row();
            if( get_row_layout() == 'narrowcaster' ) {
                while ( have_rows('slider') ) {
                    the_row();
                    $tmp = get_sub_field('slide');
                    
                    $event_datetimemeta = get_metadata( 'post', $tmp->ID  );
                    $post_id = maybe_unserialize( $event_datetimemeta['evenement'][0] );
                    $post_id = $post_id[0];
                    
                    
                    // The actual event, NOT the datetime
                    if( $post_id ) {
                        $cats = wp_get_post_terms( $post_id, array( 'categorie' ) );
                        $is_film = false;
                        if( is_array( $cats ) && count( $cats ) > 0 ) {
                            foreach( $cats as $cat ) {
                                if( $cat->slug == 'film' ) {
                                    $is_film = true;
                                    $film_excludes[] = $post_id;
                                }
                            }
                        }
                        $slides[$post_id] = array( 'id' => $post_id, 'is_film' => $is_film, 'source' => 'narrow_settings',
                            'datum' => $event_datetimemeta['datum'][0],
                            'einddatum' => $event_datetimemeta['einddatum'][0],
                            'begintijd' => $event_datetimemeta['begintijd'][0],
                            'eindtijd' => $event_datetimemeta['eindtijd'][0],
                        );
                    }
                }
            }
        }
    }
    
    
    // Get all movies today, excluding the ones already in list
    $today = date('Ymd');
    $date = $today;
    
    $args_evenementen_datetime = get_args_event_datetime_equals_date( $date, true );
    
    $args_event = array( 'post_type' => 'evenementen', 'posts_per_page' => -1, 'fields' => 'ids',
        'post__not_in' => $film_excludes,
    );
    $args_event['tax_query'] = array(
        array(
            'taxonomy' => 'categorie',
            'field'    => 'term_id',
            'terms'    => 4, // 4 =film
            'operator'    => 'IN',
        )
    );
    
    $search_posts = array();
    if( is_array( $tax_query_results->posts ) && count( $tax_query_results->posts ) > 0 ) {
        foreach( $tax_query_results->posts as $parent_id ) {
            if( $parent_id != $currentID ) {
                $search_posts[] = serialize(array("$parent_id"));
            }
        }
    }
    
    $args_evenementen_datetime['meta_query']['parents'] =
    array(
        'key' => 'evenement',
        'compare' => 'IN',
        'value' => $search_posts,
    );
    
    $events = Timber::get_posts( $args_evenementen_datetime );
    
    foreach( $events as $filmdatetime ) {
        $post_id = $filmdatetime->custom['evenement'][0];
        
        $slides[$post_id] = array( 'id' => $post_id, 'is_film' => true, 'source' => 'narrow_query_today',
            'datum' => $today,
            'einddatum' => $today,
            'begintijd' => $filmdatetime->custom['begintijd'],
            'eindtijd' => $filmdatetime->custom['eindtijd'],
        );
    }
    
    return $slides;
}
/**
 * /Narrowcasting, all fields and ALL movies of today. But NO duplicate movies
 */



/**
 * Remove old sliders
 */
if ( false === ( $void = get_transient( 'mp_remove_home_old_slider' ) ) ) {
    mp_remove_home_old_slider();
    mp_remove_narrowcaster_old_slider();
    set_transient( 'mp_remove_home_old_slider', time(), 12 * HOUR_IN_SECONDS );
}
function mp_remove_home_old_slider() {
    $homepages = array( 82, 275 ); // Homepage ids, 82 = NL, 275 = EN
    
    foreach( $homepages as $homepageid ) {
        
        if( have_rows('Sectie', $homepageid) ) {
            while ( have_rows('Sectie', $homepageid) ) {
                the_row();
                if( get_row_layout() == 'slider' ) {
                    if( has_sub_field('slider', $homepageid)) {
                        $meta = get_metadata( 'post', $homepageid );
                        
                        $regex = '/(_)*Sectie_([0])+[_]slider[_]([0-9])+_slide/';
                        
                        $fields = array();
                        foreach ( $meta as $key => $val ) {
                            if( preg_match_all( $regex, $key) ) {
                                $fields[$key] = $val;
                            }
                        }
                        
                        $newfields = array();

                        $today = date('Ymd');
                        foreach( $fields as $field => $valarr ) {
                            
                            if( strpos( $field, 'Sectie') === 0 ) {
                                
                                $post = $valarr[0];
                                $einddatum = get_post_meta( $post, 'einddatum', true);
                                if( $einddatum > $today ) { // In the future?
                                    $newfields[] = $post;
                                }
                            } else {
                                $fieldkey = $valarr[0]; // Internal key , its the same for all fields
                            }
                        }
                        
                        // Remove all prev meta
                        foreach( $fields as $key => $void ) {
                            delete_post_meta( $homepageid, $key);
                        }
                        
                        // Add new meta
                        if( count( $newfields ) > 0 ) {
                            $i = 0;
                            foreach( $newfields as $field ) {
                                add_post_meta( $homepageid, 'Sectie_0_slider_'.$i. '_slide', $field );
                                add_post_meta( $homepageid, '_Sectie_0_slider_'.$i. '_slide', $fieldkey ); // Internal key
                                $i++;
                            }
                        }
                        
                        // Update counter
                        update_post_meta( $homepageid, 'Sectie_0_slider', $i );
                    }
                }
            }
        }
    }
}
function mp_remove_narrowcaster_old_slider() {
    $narrowcaster = array( 511 ); // Narrowcaster ids, 511 = NL, xxx = EN
    
    foreach( $narrowcaster as $narrowcasterpageid ) {
        
        if( have_rows('Sectie', $narrowcasterpageid) ) {
            while ( have_rows('Sectie', $narrowcasterpageid) ) {
                the_row();
                if( get_row_layout() == 'slider' ) {
                    if( has_sub_field('slider', $narrowcasterpageid)) {
                        $meta = get_metadata( 'post', $narrowcasterpageid );
                        
                        $regex = '/(_)*Sectie_([0])+[_]slider[_]([0-9])+_slide/';
                        
                        $fields = array();
                        foreach ( $meta as $key => $val ) {
                            if( preg_match_all( $regex, $key) ) {
                                $fields[$key] = $val;
                            }
                        }

                        $newfields = array();
                        
                        $today = date('Ymd');
                        foreach( $fields as $field => $valarr ) {
                            
                            if( strpos( $field, 'Sectie') === 0 ) {
                                
                                $post = $valarr[0];
                                $einddatum = get_post_meta( $post, 'einddatum', true);
                                echo "$einddatum > $today";
                                if( $einddatum > $today ) { // In the future?
                                    $newfields[] = $post;
                                }
                            } else {
                                $fieldkey = $valarr[0]; // Internal key , its the same for all fields
                            }
                        }
                        
                        // Remove all prev meta
                        foreach( $fields as $key => $void ) {
                            delete_post_meta( $narrowcasterpageid, $key);
                        }
                        
                        // Add new meta
                        if( count( $newfields ) > 0 ) {
                            $i = 0;
                            foreach( $newfields as $field ) {
                                add_post_meta( $narrowcasterpageid, 'Sectie_0_slider_'.$i. '_slide', $field );
                                add_post_meta( $narrowcasterpageid, '_Sectie_0_slider_'.$i. '_slide', $fieldkey ); // Internal key
                                $i++;
                            }
                        }
                        
                        // Update counter
                        update_post_meta( $narrowcasterpageid, 'Sectie_0_slider', $i );
                    }
                }
            }
        }
    }
}
/**
 * /Remove old sliders
 */


function getContinuousEventsForDate($date, $filter_categories){
	$date = humanDateToQueryDate($date); // format date

	$query = array(
        'post_type' => 'evenementen_datetime',
        'posts_per_page' => - 1,     
        'meta_query' => array(
        	'relation' => 'AND',
            'date_begin' =>  array( // where starting date >= $date
                'key' => 'datum',
                'compare' => '<=',
                'value' => $date
            ),
            'date_end' =>  array( // where ending date <= $date
                'key' => 'einddatum',
                'compare' => '>=',
                'value' => $date
            ),
            'continuous' =>  array( // where continuous = true
                'key' => 'doorlopend_event',
                'compare' => '=',
                'value' => '1'
            ),
        ),
        'orderby' => 'meta_value', // order by starting time
        'meta_key' => 'begintijd',
        'order' => 'ASC'
    );

	$events = Timber::get_posts($query);

	$result = [];

	foreach($events as $event){
		$query = array('post_type' => 'evenementen', 'post__in' =>  [$event->evenement[0]]);
		$post = Timber::get_posts($query)[0];
		$event_with_post = $event;
		$event_with_post->post = $post;	

		if(empty($filter_categories)){
			$result[] = $event_with_post;
		}else{
			$post_categories_slugs = [];
			foreach($post->terms('categorie') as $cat){
				$post_categories_slugs[] = $cat->slug;
			}
			$cats_matched = array_intersect($post_categories_slugs, $filter_categories);
			if(count($cats_matched) > 0){
				$result[] = $event_with_post;
			}
		}
	}

	return $result;
}

function getHourFromTime($time){
	return intval(substr($time, 0, 2));
}


function getAllEventsPost(){
	$query = array(
        'post_type' => 'evenementen',
        'posts_per_page' => - 1,     
    );
	$posts = Timber::get_posts($query);
	$result = [];
	foreach($posts as $post){
		$result[$post->id] = $post;
	}
	return $result;
}


function getEventsForDay($date){
	$date = humanDateToQueryDate($date); // format date
	$query = array(
        'post_type' => 'evenementen_datetime',
        'posts_per_page' => - 1,     
        'meta_query' => array(
        	'relation' => 'AND',
        	// dates 
            'date_start' =>  array( // where starting date >= $date
                'key' => 'datum',
                'compare' => '<=',
                'value' => $date
            ),
            'date_end' =>  array( // where ending date <= $date
                'key' => 'einddatum',
                'compare' => '>=',
                'value' => $date
            ),

            'continuous' =>  array( // where continuous = false
                'key' => 'doorlopend_event',
                'compare' => '=',
                'value' => '0'
            ),
        ),
        'orderby' => 'meta_value', // order by starting time
        'meta_key' => 'begintijd',
        'order' => 'ASC'
    );
	return Timber::get_posts($query);
}


function organizeEventsPerHours($events_day){
	$result = [];
	foreach($events_day as $event){
		$hour_start = intval(substr($event->custom['begintijd'], 0, 2));
		$hour_end = intval(substr($event->custom['eindtijd'], 0, 2));
		if($event->post && $event->post->terms('categorie')[0] == 'Film'){
			$result[$hour_start][] = $event;
		}else{	
			for($i = $hour_start; $i <= $hour_end; $i++){
				// dont add the event to the hour if its finishing at exactly that hour
				if($i != $hour_end || substr($event->custom['eindtijd'], -2) != '00'){
					$result[$i][] = $event;	
				}
			}
		}
	}
	return $result;
}


function getEventsForDateAndTime($date, $hour){
	$date = humanDateToQueryDate($date); // format date

	$query = array(
        'post_type' => 'evenementen_datetime',
        'posts_per_page' => - 1,     
        'meta_query' => array(
        	'relation' => 'AND',
        	// dates 
            'date_start' =>  array( // where starting date >= $date
                'key' => 'datum',
                'compare' => '<=',
                'value' => $date
            ),
            'date_end' =>  array( // where ending date <= $date
                'key' => 'einddatum',
                'compare' => '>=',
                'value' => $date
            ),
            
            // events starting this hour
            // OR
            // events starting before and not finished

            // time
            'starting_time' =>  array( 
                'key' => 'begintijd',
                'compare' => '<=',
                'value' => $hour . '00:00',
            ),
            'ending_time' =>  array( // where time = $time
                'key' => 'eindtijd',
                'compare' => '>=',
                'value' => $hour . '00:00',
            ),

            'continuous' =>  array( // where continuous = false
                'key' => 'doorlopend_event',
                'compare' => '=',
                'value' => '0'
            ),
        ),
        'orderby' => 'meta_value', // order by starting time
        'meta_key' => 'begintijd',
        'order' => 'ASC'
    );
	$events = Timber::get_posts($query);

	return $events;
}

// convert date from dd/mm/yyyy to timestamp
function humanDateToTimestamp($date){
	return strtotime(str_replace('/', '-', $date));
}

// convert date from dd/mm/yyyy to yyyymmdd
function humanDateToQueryDate($date){
	return date('Ymd', humanDateToTimestamp($date));
}

// converts date from dd/mm/yyyy to Wednesday 6 March
function humanDateTranslated($date){
	$timestamp = humanDateToTimestamp($date);
	if(ICL_LANGUAGE_CODE == "en"){
  		return date('l d F', $timestamp);
	}
	setlocale(LC_ALL, 'nl_NL');
	return strftime('%A %e %B', $timestamp);
}

// converts date from dd/mm/yyyy to Wednesday
function humanDayTranslated($date){
	$timestamp = humanDateToTimestamp($date);
	if(ICL_LANGUAGE_CODE == "en"){
  		return date('l', $timestamp);
	}else{
		setlocale(LC_ALL, 'nl_NL');
  		return strftime('%A', $timestamp);
	}
}

function filterOutEventsPreviouslyAdded($events_per_hour, $events){
	$filtered = [];
	foreach($events as $event){
		$add = true;
		foreach($events_per_hour as $hour => $added_events){
			foreach($added_events as $added_event){
				if($added_event->id == $event->id) $add = false;
			}
		}
		if($add) array_push($filtered, $event);
	}
	return $filtered;
}

function linkEventsWithPosts($events_day, $events_posts, $filter_categories){
	$result = [];
	foreach($events_day as $event){
		$event_with_post = $event;
		$post = $events_posts[$event->evenement[0]];
		$event_with_post->post = $post;
		
		if(empty($filter_categories)){
			$result[] = $event_with_post;
		}else{
			$post_categories_slugs = [];
			foreach($post->terms('categorie') as $cat){
				$post_categories_slugs[] = $cat->slug;
			}
			$cats_matched = array_intersect($post_categories_slugs, $filter_categories);
			if(count($cats_matched) > 0){
				$result[] = $event_with_post;
			}
		}
		
	}
	return $result;
}


function getEventPostsForCategory($category){
	 $query = array(
     	'post_type' => 'evenementen',
    	'posts_per_page'  => -1,
    	'tax_query' => array( 
          	array( 
              'taxonomy' => 'categorie', //or tag or custom taxonomy
              'field' => 'slug', 
              'terms' => $category
          	) 
      	)
    );
    return Timber::get_posts($query); 
}

function getEventsFromRange($start_date, $end_date){
	$start_date = humanDateToQueryDate($start_date); // format date
	$end_date = humanDateToQueryDate($end_date); // format date
	
	$query = array(
        'post_type' => 'evenementen_datetime',
        'posts_per_page' => - 1,     
        'meta_query' => array(
        	'relation' => 'AND',
        	// dates 
            'date_start' =>  array( // where starting date >= $date
                'key' => 'datum',
                'compare' => '>=',
                'value' => $start_date
            ),
            'date_end' =>  array( // where ending date <= $date
                'key' => 'einddatum',
                'compare' => '<=',
                'value' => $end_date
            ),
            /*
            'continuous' =>  array( // where continuous = false
                'key' => 'doorlopend_event',
                'compare' => '=',
                'value' => '0'
            ),
            */
        ),

        'orderby' => 'meta_value', // order by starting date
        'meta_key' => 'datum',
        'type' => 'DATE',
        'order' => 'ASC'
    );
    return Timber::get_posts($query); 
}

function getPostById($id){
	 $query = array(
     	'post_type' => 'evenementen',
    	'post__in' =>  [$id]
    );
    return Timber::get_posts($query); 
}
