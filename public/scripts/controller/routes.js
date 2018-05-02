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
  $('.result view').fadeIn('slow');
}

function enterSite(){
  $('.container').hide();
  $('.form').fadeIn('slow');
}

function about(){
  $('.container').hide();
  $('.about').fadeIn('slow');
}

page.start();
