<?php
function add_theme_scripts() {
    wp_enqueue_style( 'styles', get_template_directory_uri() . '/assets/css/style.css');
    wp_enqueue_script( 'script', get_template_directory_uri() . '/assets/js/site-min.js', array ( 'jquery' ), 1.1, true);
}
  
add_action( 'wp_enqueue_scripts', 'add_theme_scripts' );
  
  
function archive_agenda( $context, $tries = 0, $override_offset = false ) {
    
    $context[ 'category' ] = Timber::get_term(['taxonomy'=>'categorie']);
    $context[ 'cat' ] = Timber::get_terms('categorie');
    
    /* get current category */
    $cat = get_category(get_query_var('categorie'));
    $cat_slug = $cat->slug;
    $context['currentcat'] = $cat_slug;
    
    define('DH_EVENTS_HOUR_OFFSET', 2);
    
    $dh_is_ajax = false;
    if( isset( $_POST['offset'] ) ) {
        
        $dh_is_ajax = true;
        $offset = intval( $_POST['offset'] );
    }
    if( $override_offset ) {
        
        $dh_is_ajax = true;
        $offset = $override_offset;
    }
    
    if( $dh_is_ajax ) {
        $templates = 'partials/archive-evenementen-single.twig';
        $_GET['category']   = $_POST['category'];
        $_GET['date']       = $_POST['date'];
        $_GET['time']       = $_POST['time'];
        
    }
    
    $context['dh_agenda_ajaxurl']       = home_url( $_SERVER['REDIRECT_URL'] );
    $context['dh_agenda_ajaxoffset']    = DH_EVENTS_HOUR_OFFSET;
    
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
    
    $hasdate = false;
    if( isset( $_GET['date'] ) && $_GET['date'] ) {
        if( $_GET['date'] == 'tomorrow' ) {
            $_GET['date'] = date('d/m/Y', strtotime( 'tomorrow' ) );
        }
        
        $tmp = explode( '/', $_GET['date'] );
        if( count( $tmp ) == 3 && intval( $tmp[0] ) > 1 && intval( $tmp[1] ) > 0 && intval( $tmp[2] ) > 0 ) {
            $date = str_pad( intval( $tmp[2] ), 2, '0', STR_PAD_LEFT ).str_pad( intval( $tmp[1] ), 2, '0', STR_PAD_LEFT ).str_pad( intval( $tmp[0] ), 2, '0', STR_PAD_LEFT );
            $context['date_sanitized'] = str_pad( intval( $tmp[0] ), 2, '0', STR_PAD_LEFT ).'/'.str_pad( intval( $tmp[1] ), 2, '0', STR_PAD_LEFT ).'/'.str_pad( intval( $tmp[2] ), 2, '0', STR_PAD_LEFT );
            
            if(ICL_LANGUAGE_CODE==en){
                $context[ 'date_filter_full' ] = date('l d F', strtotime( $date ) );
                $context[ 'day_filter_full' ]  = date('l', strtotime( $date ) );
            }
            else {
                setlocale(LC_ALL, 'nl_NL');
                $context[ 'date_filter_full' ] = strftime('%A %e %B', strtotime( $date ) );
                $context[ 'day_filter_full' ]  = strftime('%A', strtotime( $date ) );
            }
            
            $context[ 'date_filter_short' ] = date('d.m.Y', strtotime( $date ));
            
            $hasdate = true;
        }
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
    
    if( $dh_is_ajax ) {
        $first_slot = strtotime( $date. ' '.$timestart . ' + '.$offset.' hours');
        $date = date( 'Ymd', $first_slot);
        $timestart = date( 'H:i:00', $first_slot);
    }
    
    $args_evenementen = array(
        'post_type' => 'evenementen',
        'posts_per_page' => - 1,
        'meta_query' => array(
            'relation' => 'AND',
            array(
                'key' => 'datum',
                'compare' => '=',
                'value' => $date
            ),
        ),
        'meta_key' => 'begintijd',
        'orderby' => 'meta_value',
        'order' => 'ASC'
    );
    
    if( $hastime ) {
        $args_evenementen['meta_query'][] =
        array(
            'key' => 'begintijd',
            'compare' => '>=',
            'value' => $timestart
        );
    }
    
    // Limit by DH_EVENTS_HOUR_OFFSET hours up front
    $next_slot = strtotime( $date. ' '.$timestart . ' + '.DH_EVENTS_HOUR_OFFSET.' hours');
    
    $args_evenementen['meta_query'][] =
    array(
        'key' => 'datum',
        'compare' => '<=',
        'value' => date( 'Ymd', $next_slot),
    );
    $args_evenementen['meta_query'][] =
    array(
        'key' => 'begintijd',
        'compare' => '<',
        'value' => date( 'H:i:00', $next_slot),
    );
    
    if( is_array( $cat_ids ) && count( $cat_ids ) > 0 ) {
        $args_evenementen['tax_query'] = array(
            'relation' => 'OR');
        
        foreach( $cat_ids as $cat_id ) {
            $args_evenementen['tax_query'][] =
            array(
                'taxonomy' => 'categorie',
                'field'    => 'term_id',
                'terms'    => $cat_ids,
            );
        }
    }
    
    /*
     print_r($args_evenementen);
     */
    $context['evenementen'] = Timber::get_posts($args_evenementen);
    
    if( $dh_is_ajax ) {
        
        // Recursive
        if( count( $context['evenementen'] )== 0 && $tries < 4 ) {
            $tries++;
            $context = archive_agenda( $context, $tries, ($offset+DH_EVENTS_HOUR_OFFSET) );
        }
        
        $body = Timber::compile( $templates, $context  );
        
        
        echo json_encode( array('offsetvalue' => ($tries+1)*DH_EVENTS_HOUR_OFFSET, 'body' => $body ) );
        die();
    }
    
    return $context;
}
?>