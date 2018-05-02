'use strict';

// $(document).ready(function() {
//   $('.container').hide();
//   $('.home').show();
// });

function cycle() {
  var container = $('#result-view');
  $('.result-view').show();
  container.find('.event-result')
    .hide()
    .slice(0, 3)
    .appendTo(container)
    .show()
}

$(function() {
  $('.right').click(function() {
    cycle();
  });
  $('.left').click(function() {
    cycle(-1);
  });
});

// $('.enter').click('submit', (event) => {
//   event.preventDefault();
//   $('.container').hide();
//   $('.form').fadeIn('slow');
//   // $('.results').show()
// });

// $('.about-us').on('click', (event) => {
//   event.preventDefault();
//   $('.container').hide();
//   $('.about').fadeIn('slow');
// })
