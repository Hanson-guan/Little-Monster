$(window).scroll(function() {
  if ($(document).scrollTop() > 200) {
    $('nav').addClass('shrink');
  } else {
    $('nav').removeClass('shrink');
  }
});