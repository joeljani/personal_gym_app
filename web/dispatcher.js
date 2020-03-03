const dispatcher = require('express').Router();

const workoutController = require('./workoutController')
const exerciseController = require('./exerciseController')

dispatcher.route('/workouts').get(workoutController.findAll)
dispatcher.route('/workouts').post(workoutController.create)


module.exports = dispatcher;
