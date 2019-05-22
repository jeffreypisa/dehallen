//

jQuery(document).ready(function($) {
	reescaleElements();
	$(window).resize(function() {
		reescaleElements();
	});
	// adjust clampped lines
	$('.clamp-2').each(function(){
		$clamp($(this)[0], {clamp: 2});	
    });
    

    $('.mod-pageheader.with-credits').on('click', function(e){
        e.preventDefault();
        $($(this).find('button').data('target')).collapse('toggle');
    });


    $("a[href='#to-form']").on('click', function(e){
        console.log('scroll to form');
        e.preventDefault();
        console.log($(document).height());
        //window.scrollTo(0, $(".nf-form-layout").offset().top);
        $("html, body").animate({ scrollTop: $(".nf-form-layout").offset().top }, 1000);
    })

	
});

function reescaleElements(){
	if(jQuery('.agenda-continuous-events').length > 0 && jQuery('.hour:first-child').length > 0){
		var top = jQuery('.agenda-continuous-events .card:first-child').offset().top;
		var hourtop = jQuery('.hour:first-child').offset().top;
		var diff = hourtop - top;
		jQuery('.line-style').remove();
		jQuery('<style class="line-style">.mod-agenda .hourblock.with-continuous:first-child .meta:after { top: -' + diff + 'px!important; }</style>').appendTo('head');
	}
}