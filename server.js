'use strict';

// const pg = require('pg');
// const fs = require('fs');
require('dotenv').config();
const PORT = process.env.PORT;
const cors = require('cors');
const express = require('express');
const request = require('superagent');
const app = express();
const apiURLPrefix = process.env.API_URL_PREFIX;

// const app=express();
const CLIENT_URL = process.env.CLIENT_URL;

// const client = new pg.Client(process.env.DATABASE_
// URL);
// client.connect();
// client.on('error', err => console.error(err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('./public'));

app.get('/test', (req, res) => res.send('I am working'));

app.get('/api/v1/tm*', (req, res) => {
  console.log('entering TM api');
  // UNCOMMENT THIS FOR EMBEDDED PARAMETERS
  //   let location = req.query.location;
  //   let startDate = req.query.date + 'T00:00:00Z';
  //   let endDate = req.query.date + 'T00:00:00Z';
  //   let budget = req.query.budget;
  // UNCOMMENT THIS FOR EMBEDDED PARAMETERS
  // UNCOMMENT THIS FOR OBJECT PARAMETERS
  //   let location = req.body.location;
  //   let startDate = req.body.date + 'T00:00:00Z';
  //   let endDate = req.body.date + 'T00:00:00Z';
  // UNCOMMENT THIS FOR OBJECT PARAMETERS
  // UNCOMMENT THIS FOR PARAMETER SEARCH
  //   console.log('location', location);
  //   console.log('startDate', startDate);
  //   console.log('endDate', endDate);
  //   console.log('budget', budget);
  //   let apiUrl = apiURLPrefix + '&' + startDate +'&' + endDate + '&' +'city=' + location;
  // UNCOMMENT THIS FOR PARAMETER SEARCH
  request
  // UNCOMMENT THIS FOR PARAMETER SEARCH
    // .get(apiUrl)
    .get('https://app.ticketmaster.com/discovery/v2/events.JSON?apikey=VWGcUhYXgeUlrI8mQ1Ly0TGpp8RTHrJe&startDateTime=2018-05-02T22:25:00Z&endDateTime=2018-05-30T22:25:00Z&city=Seattle')
    .then(results => results.body._embedded.events)
    .then(events => {
    //   let arrayOfEvents = [];
      //   arrayOfEvents.push(events.map(event => event.name));
    //   arrayOfEvents.push(events.map(event => mapResults(event)));
      let arrayOfEvents = events.map(event => mapResults(event));
      res.send(arrayOfEvents)
    })

    // DANGER might have to handle an empty array

    .catch(console.error);
});

function mapResults (event) {
  let eventObject = {
    eventName:event.name,
    tmUrl:event.url,
    imageUrl:event.images[0].url,
    startDate:event.dates.start.localDate,
    priceMin:event.priceRanges[0].min,
    priceMax:event.priceRanges[0].max,
    venue:event._embedded.venues[0].name
  }
  return eventObject;
}

app.get('*', (req, res) => res.redirect(CLIENT_URL));
app.listen(PORT, () => console.log(`listen on port: ${PORT}`));