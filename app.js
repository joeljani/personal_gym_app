"use strict";

const log4js = require('log4js');
const dotenv = require('dotenv-extended');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./web/dispatcher');
require('dotenv').config();

const app = express();

/*
 * Configurations of app
 */
log4js.configure('log4js.json');
const logger = log4js.getLogger('app');
app.use(bodyParser.json());
app.use(cors()); // Enable CORS (for all requests) //TODO: change
app.use('', routes); // Configure the dispatcher with all its controllers
dotenv.load({ silent: true }); // Read the properties from file '.env' and '.env.defaults'
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Running on port ${PORT}!`)); // Start app as HTTP server
logger.info(`Server started on port ${PORT}`);

/*
 * Connection to mongoDB
 */
mongoose.Promise = global.Promise;
const url = 'mongodb://workoutPlannerDB:27017/workoutPlanner';
logger.info(`Database used '%s'`, url);
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });


module.exports = app;
