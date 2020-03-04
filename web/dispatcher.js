const dispatcher = require('express').Router();

const workoutController = require('./workoutController')
const exerciseController = require('./exerciseController')

dispatcher.route('/workouts').get(workoutController.findAll)
dispatcher.route('/workouts').post(workoutController.create)
dispatcher.route('/workouts/:id').delete(workoutController.delete)
dispatcher.route('/workouts/:id').put(workoutController.update)



module.exports = dispatcher;
