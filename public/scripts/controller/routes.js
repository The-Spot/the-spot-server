'use strict';


page('/', index);
page('/search', search);
page('/enter', enterSite);
page('/about', about);

function index() {
  $('.container').hide();
  $('.home').fadeIn('slow');
}

function search(){
  app.SearchObj.submit()
}

function enterSite(){
  $('.container').hide();
  $('.form').fadeIn('slow');
  app.SearchObj.localHis();
}

function about(){
  $('.container').hide();
  $('.about').fadeIn('slow');
}


$('body').click(function() {
  page('./')
})

page.start();
