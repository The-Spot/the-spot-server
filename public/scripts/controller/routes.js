'use strict';


page('/', index);
page('/search', search);
page('/enter', enterSite);


function index() {
  $('.container').hide();
  $('.home').show(500);
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
