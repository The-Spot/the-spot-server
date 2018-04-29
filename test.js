'use strict';

require('dotenv').config();


// Application dependencies
const express = require('express');
// const cors = require('cors');
// Application Setup
const app = express();
const PORT = process.env.PORT;
// const CLIENT_URL = process.env.CLIENT_URL;
// Application Middleware
// app.use(cors({origin: '*'}));
app.use(express.urlencoded({extended:true}));
app.use(express.static('./public'));





// app.post('/', (req, res) => {
//   res.sendFile('data.json', {root: './'})
//     .then(console.log('got it '+ req.body.budget + req.body.location + req.body.datetime));
// });

app.get('/viewData', (req, res) => {
 console.log(res);
 
  res.sendFile('data.json', {root: './'})
})




console.log(PORT);

app.listen(PORT, () => console.log('Listening on port: '+ PORT));

