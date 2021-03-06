'use strict';

require('dotenv').config();
const PORT = process.env.PORT;
const cors = require('cors');
const express = require('express');
const request = require('superagent');
const app = express();
const apiURLPrefix = process.env.API_URL_PREFIX;
let budgetPrice = 0;

const CLIENT_URL = process.env.CLIENT_URL;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('./public'));

app.get('/test', (req, res) => res.send('I am working'));

app.get('/api/v1/tm', (req, res) => {
  if (req &&
    req.query.location && req.query.location.length > 0 &&
    req.query.startDate && req.query.startDate.length > 0 &&
    req.query.endDate && req.query.endDate.length > 0 &&
    req.query.budget && req.query.budget.length > 0) {

    let location = req.query.location;
    let startDate = req.query.startDate + 'T00:00:00Z';
    let endDate = req.query.endDate + 'T00:00:00Z';
    budgetPrice = req.query.budget;

    let apiUrl = `${apiURLPrefix}&startDateTime=${startDate}&endDateTime=${endDate}&city=${location}`;

    request
      .get(apiUrl)
      .then(results => results.body._embedded.events)
      .then(resultsBody => resultsBody.filter(filterResults))
      .then(events => {
        let arrayOfEvents = [];
        arrayOfEvents.push(events.map(event => mapResults(event)));
        res.send(arrayOfEvents)
      })


      .catch(console.error);
  } else {
    res.send('Invalid Input');
  }
});

function filterResults (event) {
  if (event.priceRanges && event.priceRanges.length > 0 && event.classifications && event.classifications.length > 0) {
    return (event.classifications[0].segment.name !== 'Sports' && event.classifications[0].segment.name !== 'Miscellaneous' && event.priceRanges[0].min <= budgetPrice);
  } else {
    return false;
  }
}

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

app.use((req, res) => res.sendFile('404.html', {root: './public'}));
app.listen(PORT, () => console.log(`listen on port: ${PORT}`));