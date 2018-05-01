'use strict';

var app = app || {};

const ENV = {};

ENV.isProduction = window.location.protocol === 'https:';
ENV.productionApiUrl = 'https://the-spot-sea.herokuapp.com';
ENV.developmentApiUrl = 'http://localhost:3000';
ENV.apiUrl = ENV.isProduction ? ENV.productionApiUrl : ENV.developmentApiUrl;


(function(module) {

  var SearchObj = {};

  // function SearchObj
  // *** OLD FUNCTION, DON'T USE:
  // SearchObj.create = function(key) {
  //   $.post(`${ENV.apiUrl}/`, {
  //     budget: key.budget,
  //     location: key.location,
  //     datetime: key.datetime
  //   })
  //     .then(console.log('searchobj create'))
  //     .catch(err => console.error(err));
  // };
  SearchObj.renderHandle = function (renderer) {
    let template = Handlebars.compile($('#result-view-template').text());
    console.log(renderer)
    return template(renderer)
  }

  SearchObj.create = function(key) {

    // $.get(`${ENV.apiUrl}/viewData`, {
    //   budget: key.budget,
    //   location: key.location,
    //   datetime: key.datetime

    $.get(`${ENV.apiUrl}/api/v1/tm`, {
      budget: key.budget,
      location: key.location,
      startDate: key.startDate,
      endDate: key.endDate})
      .then(console.log(key))
      .then(data => {
        console.log(data)
        let stuff = data
        stuff.forEach(element => {
          $('#result-view').append(SearchObj.renderHandle(element))
        })
        $('#result-view').show();
      })

    // let arrEvent = []
    // $.get(`${ENV.apiUrl}/api/v1/tm`)
    //   .then(data => {
    //     let stuff = data
    //     stuff.forEach(element => {
    //       console.log(element)
    //       $('#result-view').append(SearchObj.renderHandle(element))
    //     })
    //     $('#result-view').show();
    //   })
      // .then(console.log(arrEvent))

      // .then(
    // arrEvent.forEach(element => {
    //   console.log(element)


      // }))

      .catch(err => console.error(err));
  };

  SearchObj.submit = event => {
    event.preventDefault();
    let key = {
      budget : $('#budget').val(),
      location : $('#location').val(),
      startDate : $('#startDate').val(),
      endDate : $('#endDate').val()
    };
    // console.log('key', key)
    SearchObj.create(key);
    $('#budget').val(''),
    $('#location').val(''),
    $('#startDate').val(''),
    $('#endDate').val(''),
    $('.container').hide();
    $('.results').show();

  }

  $('#landing-form').on('submit', SearchObj.submit);

  module.SearchObj = SearchObj;

})(app);
