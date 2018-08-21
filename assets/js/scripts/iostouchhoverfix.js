(function($) {
  $(document).ready(function() {
    // tablet "one touch (click)" X "hover" > link redirection
    $('a[href]').on('touchmove touchend', function(e) {
    
        // if touchmove>touchend, set the data() for this element to true. then leave touchmove & let touchend fail(data=true) redirection
        if (e.type == 'touchmove') {
            $.data(this, "touchmove_cancel_redirection", true );
            return;
        }
    
        // if it's a simple touchend, data() for this element doesn't exist.
        if (e.type == 'touchend' && !$.data(this, "touchmove_cancel_redirection")) {
            var el = $(this);
            var link = el.attr('href');
            window.location = link;
        }
    
        // if touchmove>touchend, to be redirected on a future simple touchend for this element
        $.data(this, "touchmove_cancel_redirection", false );
    });
  });
}(jQuery));