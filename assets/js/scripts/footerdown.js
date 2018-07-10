(function($) {
  $( document ).ready(function() {
    // Matchheight

    function footerdown() {
      var fo = jQuery("footer").height();
      var he = jQuery("header").height();
      var dohi = jQuery(window).height();
      var minhe = dohi - fo - he - 35;
      jQuery("#content").css("min-height", minhe);
    }

    footerdown();

    jQuery( window ).resize(function() {
      footerdown();
    });
  });
}(jQuery));