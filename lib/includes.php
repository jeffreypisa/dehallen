<?php
function add_theme_scripts() {
    if (!is_page_template('page-blanco.php')) {
        wp_enqueue_style( 'styles', get_template_directory_uri() . '/assets/css/style.css');
        wp_enqueue_script( 'script', get_template_directory_uri() . '/assets/js/site-min.js', array ( 'jquery' ), 1.1, true);
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
        
        
        // Now sort by time ascending
        $events_datetimes_sorted = array();
        foreach( $events_datetimes as $single_datetime ) {
            $events_datetimes_sorted[$single_datetime->custom['begintijd'].$single_datetime->ID] = $single_datetime;
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
            
            if(ICL_LANGUAGE_CODE==en){
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
    
    if(ICL_LANGUAGE_CODE==en){
        $context[ 'date_filter_short' ] = strftime('%d %h %y', strtotime( $date ) );
    } else {
        setlocale(LC_ALL, 'nl_NL');
        $context[ 'date_filter_short' ] = strftime('%d %h %y', strtotime( $date ) );
    }
    
    $timeday = '00:00:00';
    $timestart = $timeday;
    $hastime = false;
    if( isset( $_GET['time'] ) && $_GET['time'] ) {
        $tmp = explode( ':', $_GET['time'] );
        if( count( $tmp ) == 2 && (intval( $tmp[0] ) > 1 || $tmp[0] == '00') && (intval( $tmp[1] ) > 1 || $tmp[1] == '00') ) {
            // Discard minutes
            // $timestart = str_pad( intval( $tmp[0] ), 2, '0', STR_PAD_LEFT ).':'.str_pad( intval( $tmp[1] ), 2, '0', STR_PAD_LEFT ).':00';
            $timestart = str_pad( intval( $tmp[0] ), 2, '0', STR_PAD_LEFT ).':00:00';
            
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
    
    
    if( $dh_is_ajax ) {
        
        // Recursive
        if( count( $events ) == 0 && count( $events_continuous ) == 0 ) {
            $tries++;
            
            // Untill last hour this day
            if( date( 'H', $next_slot) < 7 ) {
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
        
        $date = get_field( 'datum', $post->ID);
        $dateunix = strtotime( get_field( 'datum', $post->ID) );
        if( $date && $dateunix ) {
            return date( 'd-M-Y' ,  $dateunix) .  ': '. $title;
        }
    }
    return $title;
}
add_filter('acf/fields/post_object/result/key=field_5b2cfe6e8b795', 'mp_home_slider_post_object_result_add_date', 10, 4);


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
        );
    }
        
    return $slides;
}
/**
 * /Narrowcasting, all fields and ALL movies of today. But NO duplicate movies
 */

