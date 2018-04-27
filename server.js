'use strict';

// const pg = require('pg');
// const fs = require('fs');
require('dotenv').config();
const PORT = process.env.PORT;
const cors = require('cors');
const express = require('express');
const request = require('superagent');
const app = express();
const apiURL = 'https://app.ticketmaster.com/discovery/v2/events.'

// const app=express();
const CLIENT_URL = process.env.CLIENT_URL; 

// const client = new pg.Client(process.env.DATABASE_
// URL);
// client.connect();
// client.on('error', err => console.error(err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/test', (req, res) => res.send('I am working'));

app.get('/api/v1/tm', (req, res) => {
    console.log('entering TM api');
    request
    .get('https://app.ticketmaster.com/discovery/v2/events.json?apikey=VWGcUhYXgeUlrI8mQ1Ly0TGpp8RTHrJe&city=seattler&radius=50&unit=miles&startDateTime=2018-04-27T18:50:00Z&endDateTime=2018-04-30T18:51:00Z')
    .then(results => res.send(JSON.parse(results)))
    .catch(console.error);
   });


// app.get('api/discovery/v2/events')



app.get('*', (req, res) => res.redirect(CLIENT_URL));
app.listen(PORT, () => console.log(`listen on port: ${PORT}`));