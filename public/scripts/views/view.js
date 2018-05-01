'use strict';

$(document).ready(function() {
  $('.container').hide();
  $('.home').show(500);
});

$('.enter').click('submit', (event) => {
  event.preventDefault();
  $('.container').hide(500);
  $('.form').show(500);
  $('.results').show(500)
});




// $('.show-results').click('submit', (event) => {
//   event.preventDefault();
//   $('.container').hide();
//   $('.results').show();
// });

