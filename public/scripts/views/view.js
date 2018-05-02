'use strict';

$(document).ready(function() {
  $('.container').hide();
  $('.home').show();
});

$('.enter').click('submit', (event) => {
  event.preventDefault();
  $('.container').hide();
  $('.form').fadeIn('slow');
  // $('.results').show()
});

$('.about-us').on('click', (event) => {
  event.preventDefault();
  $('.container').hide();
  $('.about').fadeIn('slow');
})


// $('.show-results').click('submit', (event) => {
//   event.preventDefault();
//   $('.container').hide();
//   $('.results').show();
// });

