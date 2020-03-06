const Exercise = require('../domain/exercise')
const log4js = require('log4js')
const logger = log4js.getLogger('service')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

const saveWorkout = (workout, res) => {
    return workout.save((err, workoutCreated) => {
        if (err) {
            logger.error(`Could not create new Workout`)
            if (res) res.status(412).send('database error')
        } else {
            logger.debug(`Successfully created Workout with id "${workout.id}"`)
            if (res) res.status(201).json(workoutCreated)
            return workoutCreated
        }
    })
}

module.exports = {
    saveWorkout: saveWorkout
}
