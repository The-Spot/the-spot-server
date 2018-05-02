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
      .then(data => {
        let stuff = data
        stuff[0].sort(function(a,b){
          // console.log(data + 'sort?')
          return new Date(a.startDate) - new Date(b.startDate)})
        stuff[0].forEach(element => {
          $('#result-view').append(SearchObj.renderHandle(element))
         
        })
        cycle();
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

  }
  
  module.SearchObj = SearchObj;



})(app);
