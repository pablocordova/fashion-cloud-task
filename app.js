
// External modules
require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');

// My API routes
const cache = require('./routes/cache');

var app = express();

/**
 * INITIAL CONFIGURATIONS
 */

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Connection with Mongo

let mongo_path= process.env.MONGO_PATH;

mongoose.connect(mongo_path, { useMongoClient: true }, err => {
  if (!err) console.log('Success connection to Mongo!');
});

/**
 * ROUTES
 */

app.use('api/cache', cache);

/**
 * INTIALIZE SERVER
 */

// Get port from environment and store in Express
const port = process.env.SERVER_PORT;
app.set('port', port);

// Create HTTP sever
const server = http.createServer(app);

// Listen on provided port, on all network interfaces
server.listen(port);

module.exports = app;