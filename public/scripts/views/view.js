'use strict';

$(document).ready(function() {
  $('.container').hide();
  $('.home').show();
});

$('.enter').click('submit', (event) => {
  event.preventDefault();
  $('.container').hide();
  $('.form').show();
});


// $('.show-results').click('submit', (event) => {
//   event.preventDefault();
//   $('.container').hide();
//   $('.results').show();
// });


// $(document).scroll(function() {
//   var y = $(this).scrollTop();
//   if (y > 800) {
//     $('.footer').fadeIn();
//   } else {
//     $('.footer').fadeOut();
//   }
// });
