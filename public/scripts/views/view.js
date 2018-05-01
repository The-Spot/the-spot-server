'use strict';

$(document).ready(function() {
  $('.container').hide();
  $('.home').show();
});

$('.enter').click('submit', (event) => {
  event.preventDefault();
  $('.container').hide();
  $('.form').show();
  $('.results').show()
});




// $('.show-results').click('submit', (event) => {
//   event.preventDefault();
//   $('.container').hide();
//   $('.results').show();
// });

