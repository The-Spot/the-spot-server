'use strict';


function cycle() {
  var container = $('#result-view');
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


$('.footer').hide();

$(window).scroll(function(){
  $('.footer').show();
});
