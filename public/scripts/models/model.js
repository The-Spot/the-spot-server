'use strict';

var app = app || {};

const ENV = {};

ENV.isProduction = window.location.href.includes('the-spot-sea');

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
        if (data[0].length === 0){
          $('.container').hide()
          $('.error').fadeIn('slow')
        }
        let stuff = data
        stuff[0].sort(function(a,b){
          return new Date(a.startDate) - new Date(b.startDate)})
        stuff[0].forEach(element => {
          $('#result-view').append(SearchObj.renderHandle(element))
        })
        cycle();
      })
      .catch(err => console.error(err));
    localStorage.setItem('key', JSON.stringify(formArray));
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

  const form = JSON.parse(localStorage.getItem('key'));

  SearchObj.localHis = function() {
    if (localStorage.getItem('key') === null) {
      return
    }
    $('#budget').val(form[1].budget)
    $('#location').val(form[1].location)
  }


  module.SearchObj = SearchObj;




})(app);
