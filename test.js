'use strict';

require('dotenv').config();


// Application dependencies
const express = require('express');
const cors = require('cors');
// Application Setup
const app = express();
const PORT = process.env.PORT;
// const CLIENT_URL = process.env.CLIENT_URL;
// Application Middleware
app.use(cors({origin: '*'}));
app.use(express.urlencoded({extended:true}));


app.get('/api/v1/key', (req, res) => {
  console.log('server response')
    // client.query(`SELECT book_id, title, author, image_url, isbn FROM key;`)
    .then(res.send(console.log('message 2')))
    .catch(console.error);
});

console.log(PORT);

app.listen(PORT, () => console.log('Listening on port: '+ PORT));