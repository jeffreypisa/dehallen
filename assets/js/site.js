//

jQuery(document).ready(function($) {
	reescaleElements();
	$(window).resize(function() {
		reescaleElements();
	});
});

function reescaleElements(){
	if(jQuery('.agenda-continuous-events').length > 0){
		var top = jQuery('.agenda-continuous-events .card:first-child').offset().top;
		var hourtop = jQuery('.hour:first-child').offset().top;
		var diff = hourtop - top;
		jQuery('.line-style').remove();
		jQuery('<style class="line-style">.mod-agenda .hourblock.with-continuous:first-child .meta:after { top: -' + diff + 'px!important; }</style>').appendTo('head');
	}
}