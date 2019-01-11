(function($) {
  $( document ).ready(function() {
    $('body').scrollspy({
        target: "#jarenmenu", 
        offset: 50
    }); 
    
    var howmanyyears = $('#jarenmenu li').length;
    var percentageperyear = 100 / howmanyyears;
    
    
  	var activeyear = $('#jarenmenu li:has(a.active)').index('#jarenmenu li');
    var activeyearno = activeyear + 1;
    var progresspercentage = activeyearno * percentageperyear;
    $('.js-jarenprogress').css('width', progresspercentage + '%');
	    
	    
    $(window).on('activate.bs.scrollspy', function () {
			var activeyear = $('#jarenmenu li:has(a.active)').index('#jarenmenu li');
	    var activeyearno = activeyear + 1;
	    var progresspercentage = activeyearno * percentageperyear;
	    $('.js-jarenprogress').css('width', progresspercentage + '%');
    });
  });
  
  $(window).on( 'scroll', function(){
	  if ( !$('#jarenmenu li a').hasClass("active") ) {
		  $('.js-jarenprogress').css('width', '0%');
	  }
	});

}(jQuery));