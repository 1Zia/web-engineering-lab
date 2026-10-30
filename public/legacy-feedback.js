$(document).ready(function () {
  var $form = $("form");

  $form.on("submit", function (e) {
    e.preventDefault();
    var name = $.trim($("#name").val());
    var email = $.trim($("#email").val());
    var ok = true;
    $(".error").remove();

    if (name === "") {
      $("#name").after('<span class="error" role="alert">Please enter your name.</span>');
      ok = false;
    }
    if (email.indexOf("@") === -1) {
      $("#email").after('<span class="error" role="alert">Please enter a valid email address.</span>');
      ok = false;
    }
    if (ok) {
      $("#status").text("Thanks, " + name + "! Your feedback was received.").hide().fadeIn(400);
      $form[0].reset();
    }
  });
});
