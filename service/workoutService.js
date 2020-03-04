const Exercise = require('../domain/exercise')
const log4js = require('log4js')
const logger = log4js.getLogger('service')


/**
 * Saves exercises of a workout to collection
 * @param exercises
 */
const saveExercises = exercises => {
    exercises.forEach(e => {
        let exercise = new Exercise.ExerciseModel()
        exercise.name = e.name
        exercise.achieved = e.achieved
        exercise.sets = e.sets
        exercise.reps = e.reps
        exercise.kg = e.kg
        exercise.goal = e.goal

        Exercise.ExerciseModel.find({ name: exercise.name,
            sets: exercise.sets,
            reps: exercise.reps,
            kg: exercise.kg,
            goal: exercise.goal }, (err, arr) => {
            if(arr.length === 0) {
                exercise.save((err, exerciseCreated) => {
                    if(err) {
                        logger.error(`Could not save exercise with id ${exercise.id}`)
                        res.status(412).send('database error')
                    } else {
                        logger.debug(`Successfully created exercise with id "${exercise.id}"`)
                    }
                })
            } else logger.debug("exercise already exists")
        });
    })
}

module.exports = {
    saveExercises: saveExercises
}
