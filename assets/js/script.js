$("#passwordCheckbox").click(function() {
    if ($("#password").attr("type") == "password" || $("#confirmPassword").attr("type")== "password") {
        $("#password").attr("type", "text");
        $("#confirmPassword").attr("type", "text");
    } else {
        $("#password").attr("type", "password");
        $("#confirmPassword").attr("type", "password");
    }
});

$(document).ready(function() {
  var menuToggle = $('#js-centered-navigation-mobile-menu').unbind();
  $('#js-centered-navigation-menu').removeClass("show");
  
  menuToggle.on('click', function(e) {
    e.preventDefault();
    $('#js-centered-navigation-menu').slideToggle(function(){
      if($('#js-centered-navigation-menu').is(':hidden')) {
        $('#js-centered-navigation-menu').removeAttr('style');
      }
    });
  });
});