<?php

if( ! isset( $_GET['url'] ) ) {
	$url = 'xml.xml';
} else { 
	$url = htmlspecialchars( $_GET['url'] );
}

$xml = file_get_contents( $url );
if( ! isset( $_GET['type'] ) || $_GET['type'] == 'events' ) {
    echo $xml;die();
}



$xml = simplexml_load_string( $xml );

$internal_run = time();

echo '<?xml version="1.0" encoding="UTF-8"?>';
echo '<event_datetimes>';
$events = $xml->xpath('//event');

if( count( $events ) > 0 ) {
    foreach( $events as $event ) {
        $datetimes = $event->xpath('datetimes/datetime');
        
        if( count( $datetimes ) > 0 ) {
            
            foreach( $datetimes as $datetime ) {
                
                echo '<event_datetime>';
                echo '<internal_run>'.$internal_run.'</internal_run>';
                
                $out = '<event_parent_guid>'.$event->guid.'</event_parent_guid>';
                $out .= '<date_start>'.$datetime->date_start.'</date_start>';
                $out .= '<time_start>'.$datetime->time_start.'</time_start>';
                $out .= '<date_end>'.$datetime->date_end.'</date_end>';
                $out .= '<time_end>'.$datetime->time_end.'</time_end>';
                $out .= '<is_allowed_after_start>'.$datetime->is_allowed_after_start.'</is_allowed_after_start>';
                
                echo $out;
                
                echo '<internal_hash>'.md5( $out ) .'</internal_hash>';
                echo '</event_datetime>';
                
            }
            
        }        
    }
}

echo '</event_datetimes>';
