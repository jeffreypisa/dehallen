(function($) {
  $( document ).ready(function() {   

		
		$('.collapse').on('shown.bs.collapse', function () {
	    var $panel = $(this).find('.card');
	    $('html,body').animate({
	        scrollTop: $panel.offset().top - 40
	    }, 500); 
		}); 
		
		// Scroll to link
		$('a[href^="#"].js-scrollto').click(function(e){
	    var jump = $(this).attr('href');
	    var new_position = $(jump).offset();
	    $('html, body').stop().animate({ scrollTop: new_position.top - 40}, 800);
	    e.preventDefault();
		});
  });
}(jQuery));