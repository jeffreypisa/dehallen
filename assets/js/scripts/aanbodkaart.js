(function($) {
  $( document ).ready(function() {

    $('a[data-aanbodfilter]').on('click', function(event) {
      event.preventDefault();
      $('.block').removeClass('active');
      $(this).addClass('active');
      $('.space .row').removeClass().addClass('row');
      $('.space .row .block').closest('.row').addClass('aanbod');

      var aanbodfilter = $(this).attr('data-aanbodfilter');
      var targetelement = $( '.space .' + aanbodfilter );

      targetelement.addClass('active');

      $('.space .row').addClass('active').addClass(aanbodfilter);

      if (targetelement.hasClass('links')) {
        targetelement.closest('.row').addClass('links').addClass(aanbodfilter);
      }
      if (targetelement.hasClass('rechts')) {
        targetelement.closest('.row').addClass('rechts').addClass(aanbodfilter);
      }
      if (targetelement.hasClass('detour')) {
        $('.hbar').closest('.row').addClass('rechts');
      }

    });

  });
}(jQuery));