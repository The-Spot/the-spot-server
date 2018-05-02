'use strict';

var app = app || {};

const ENV = {};

ENV.isProduction = window.location.protocol === 'https:';
ENV.productionApiUrl = 'https://the-spot-sea.herokuapp.com';
ENV.developmentApiUrl = 'http://localhost:3000';
ENV.apiUrl = ENV.isProduction ? ENV.productionApiUrl : ENV.developmentApiUrl;

(function(module) {
  var SearchObj = {};


  SearchObj.renderHandle = function (renderer) {
    let template = Handlebars.compile($('#result-view-template').text());

    console.log(renderer)
    return template(renderer)
  }

  SearchObj.create = function(key) {

    let formArray = [];

    $.get(`${ENV.apiUrl}/api/v1/tm`, {
      budget: key.budget,
      location: key.location,
      startDate: key.startDate,
      endDate: key.endDate})
      .then(formArray.push('key', key))
      .then(console.log(key))
      .then(data => {
        console.log(data)
        let stuff = data
        stuff[0].forEach(element => {
          console.log(element)
          $('#result-view').append(SearchObj.renderHandle(element))
          cycle();
        })

      })
      .catch(err => console.error(err));

    localStorage.setItem('key', JSON.stringify(formArray));

    const form = JSON.parse(localStorage.getItem('key'));

    console.log('dataaa?', form)

  };

  SearchObj.submit = function() {
    let key = {
      budget : $('#budget').val(),
      location : $('#location').val(),
      startDate : $('#startDate').val(),
      endDate : $('#endDate').val()
    };
    SearchObj.create(key);
    $('#budget').val(''),
    $('#location').val(''),
    $('#startDate').val(''),
    $('#endDate').val('');
    $('.container').hide();

    $('.result-view').fadeIn('slow');
    // $('.next-form').show();

    
    // let formArray = [];
    
    // localStorage.setItem(key, JSON.stringify(formArray));

    // let data = JSON.parse(localStorage.getItem(key));
    
    // console.log('dataaa?', data);
    

    
  }
  

  // $('.footer').hide();

  // $(window).scroll(function(){
  //   $('.footer').show();
  // });

  module.SearchObj = SearchObj;



})(app);
