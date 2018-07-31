(function($) {
  $( document ).ready(function() {
    
    $(".mod-filterblocks a").mouseover(function() {
      var aanbodfilter = $(this).attr('data-aanbodfilter');
      $("a." + aanbodfilter).addClass('opacity1');
    });
    
    $(".mod-filterblocks a").mouseleave(function() {
      $("a").removeClass('opacity1');
    });

    $('a[data-aanbodfilter]').on('click', function(event) {
      event.preventDefault();
      $('.block').removeClass('active');
      $(this).addClass('active');
      $('.space .row').removeClass().addClass('row');
      $('.space .row .block').closest('.row').addClass('aanbod');

      var aanbodfilter = $(this).attr('data-aanbodfilter');
      var targetelement = $( '.space .' + aanbodfilter );

      targetelement.addClass('active');


      $( ".space .row" ).each(function() {
        $(this).addClass('active').addClass(aanbodfilter);
        if ($(this).find('.block').is('.links.active')) {
          $(this).addClass('links');
        }
        if ($(this).find('.block').is('.rechts.active')) {
          $(this).addClass('rechts');
        }
      });

      if (targetelement.hasClass('detour')) {
        $('.hbar').closest('.row').addClass('rechts');
      }

    });

  });
}(jQuery));