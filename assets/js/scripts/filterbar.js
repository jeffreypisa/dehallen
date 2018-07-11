(function($) {
  $( document ).ready(function() {
    if( $('.mod-filterbar label').hasClass('active')) {
      $('.mod-filterbar').addClass('active');
    } else {
      $('.mod-filterbar').removeClass('active');
    }
      
    $('.mod-filterbar label').click(function() {
      if( $(this).closest('.mod-filterbar').find('input').is(':checked')) {
        $(this).closest('.mod-filterbar').addClass('active');
      } else {
        $(this).closest('.mod-filterbar').removeClass('active');
      }
    });
  });
}(jQuery));