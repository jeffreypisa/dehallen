(function($) {
  $( document ).ready(function() {
    $(".js-menu").on("click", function() {
      $("body").toggleClass("menuopen");
      $("body").toggleClass("opensidemenu");
      $(".js-mobilemenu").toggleClass("open");
    });
  
    jQuery( window ).resize(function() {
      $("body").removeClass("menuopen").removeClass("opensidemenu");
    });
  });
}(jQuery));