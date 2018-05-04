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
  $('#landing-form').on('submit', (e) => {
    e.preventDefault()
    page('/search');
  })
  app.SearchObj.localHis();
}

function about(){
  $('.container').hide();
  $('.about').fadeIn('slow');
}

page.start();
