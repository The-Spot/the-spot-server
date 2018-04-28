'use strict';

var app = app || {};

const ENV = {};

ENV.isProduction = window.location.protocol === 'https:';
ENV.productionApiUrl = 'https://tr-ab-bookapp.herokuapp.com';
ENV.developmentApiUrl = 'http://localhost:3000';
ENV.apiUrl = ENV.isProduction ? ENV.productionApiUrl : ENV.developmentApiUrl;


(function(module) {

  var SearchObj = {};

  // function SearchObj

  SearchObj.create = function(key) {
    $.post(`${ENV.apiUrl}/`, {
      budget: key.budget,
      location: key.location,
      datetime: key.datetime
    })
      .then(console.log('searchobj create'))
      .catch(err => console.error(err));
  };

  SearchObj.submit = event => {
    event.preventDefault();
    let key = {
      budget : $('#budget').val(),
      location : $('#location').val(),
      datetime : $('#date-time').val()
    };
    console.log('key', key)
    SearchObj.create(key);
    $('#budget').val(''),
    $('#location').val(''),
    $('#date-time').val('')
    $('.container').hide();
    $('.results').show();

  }

  $('#landing-form').on('submit', SearchObj.submit);

  module.SearchObj = SearchObj;

})(app);
