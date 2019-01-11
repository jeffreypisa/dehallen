(function($) {
  $( document ).ready(function() {   
	  // Scroll to link
		$('a[href^="#"].js-scrollto').click(function(){
	    $('html, body').animate({
		    scrollTop: $( $.attr(this, 'href') ).offset().top - 40
		  }, 800);
		  return false;
		});
		
		$('.collapse').on('shown.bs.collapse', function () {
	    var $panel = $(this).find('.card');
	    $('html,body').animate({
	        scrollTop: $panel.offset().top - 40
	    }, 500); 
		}); 
  });
}(jQuery));