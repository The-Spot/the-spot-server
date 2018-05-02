'use strict';


page('/', index);
page('/search', search);
page('/enter', enterSite);



function index() {
  $('.container').hide();
  $('.home').show();
}

function search(){
  app.SearchObj.submit()
  $('.result view').show();
}

function enterSite(){
  $('.container').hide();
  $('.form').show();
}

page.start();
