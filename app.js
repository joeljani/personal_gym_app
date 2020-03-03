"use strict"

const log4js = require('log4js')
const dotenv = require('dotenv-extended')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const routes = require('./web/dispatcher')


// Read the properties from file '.env' and '.env.defaults'
dotenv.load({ silent: true })

log4js.configure('log4js.json')
const logger = log4js.getLogger('app')

mongoose.Promise = global.Promise

const url = 'mongodb://' + process.env.MONGO_HOST + '/' + process.env.MONGO_DATABASE
logger.debug(`Database URL used '%s'`, url)
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })


const app = express()

app.use(bodyParser.json())

// Enable CORS (for all requests)
app.use(cors())


// Configure the dispatcher with all its controllers
app.use('', routes)

// Read PORT from the configuration, default to 9090
const PORT = process.env.PORT || 9090

// Start the App as HTTP server
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))

logger.info(`Server started on port ${PORT}`)

module.exports = app
