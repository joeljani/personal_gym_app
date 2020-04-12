const dispatcher = require('express').Router();

const workoutController = require('./workoutController')
const exerciseController = require('./exerciseController')

dispatcher.route('/workouts').get(workoutController.findAll)
dispatcher.route('/workouts').post(workoutController.createWorkout)
dispatcher.route('/workouts/:id').delete(workoutController.delete)
dispatcher.route('/workouts/:id').put(workoutController.update)

dispatcher.route('/exercises').get(exerciseController.findAll)
dispatcher.route('/exercises/:eId/workout/:wId').delete(exerciseController.deleteExercise)

module.exports = dispatcher;
