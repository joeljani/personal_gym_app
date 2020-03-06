const Exercise = require('../domain/exercise')
const log4js = require('log4js')
const logger = log4js.getLogger('service')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;
const Promise = require('Bluebird')



/**
 * Saves exercises of a workout to collection
 * @param workoutId
 * @param exercises
 */
const saveExercises = (workoutId, exercises) => {

}


/**
 * Updates exercises
 * @param exercises
 */
const updateExercises = exercises => {
    exercises.forEach(e => {
        let o_id = ObjectId(e._id)
        Exercise.ExerciseModel.findById({"_id": o_id}, (err, existingExercise) => {
            console.log(e._id)
            if (err) {
                logger.error(`Could not update exercise with id "${e._id}"`)
            } else {
                existingExercise.name = e.name
                existingExercise.achieved = e.achieved
                existingExercise.sets = e.sets
                existingExercise.reps = e.reps
                existingExercise.kg = e.kg
                existingExercise.goal = e.goal

                existingExercise.save(err => {
                    if (err) {
                        logger.error(`Could not save exercise with id "${e._id}"`)
                    }
                    logger.debug(`Successfully updated exercise with id "${e.id}"`)
                })
            }
        })
    })
}

module.exports = {
    saveExercises: saveExercises,
    updateExercises: updateExercises
}
