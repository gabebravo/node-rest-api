const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const server = express();

// Mongoose DB connection --------------
const url = 'mongodb://localhost:27017/graphTeams';
mongoose.Promise = global.Promise;
mongoose.connect(url, { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
    console.log('Connection with database succeeded.');
});

// Express Routing Middleware --------------

// THIS MUST BE BEFORE THE ROUTES
server.use(bodyParser.json());

// routing middleware >> 2 params >> name of route and routes imported from router
const team = require('./routes/team');
server.use('/team', cors(), team);

const player = require('./routes/player');
server.use('/player', cors(), player);

// THIS MUST BE AFTER THE ROUTES
server.use( (err, req, res, next) => {
  res.json(err);
});

// Express Server Connection --------------
server.listen( 4000, () => {
  console.log('listening on port 4000')
})