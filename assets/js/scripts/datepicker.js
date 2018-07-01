(function($) {
  $( document ).ready(function() {
    jQuery('.js-now').on('click', function() {
      var date_now = $('.datenow').text();
      var time_now = $('.timenow').text();
      $('.js-datepicker').attr('value', date_now);
      $('.js-timepicker').attr('value', time_now);
    });
  });
}(jQuery));