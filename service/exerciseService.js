const Exercise = require('../domain/exercise')
const log4js = require('log4js')
const logger = log4js.getLogger('service')


/**
 * Saves exercises of a workout to collection
 * @param workoutId
 * @param exercises
 */
const saveExercises = async (workoutId, exercises) => {
    for (const e of exercises) {
        await Exercise.ExerciseModel.create({
            name: e.name,
            achieved: e.achieved,
            sets: e.sets,
            reps: e.reps,
            kg: e.kg,
            goal: e.goal,
            workout: workoutId
        })
    }
}

/**
 * Gets exercises of a workout
 * @param workoutId
 *
 */
const getExercisesOfWorkout = async workoutId => {
    return await Exercise.ExerciseModel.find({workout: workoutId}, (err, exercises) => {
        if (err) logger.debug(`couldn't find any exercise for workout with workoutId ${workoutId}`)
        logger.debug(`Found ${exercises.length} exercises`)
    })
}

/**
 * Updates exercises
 * @param exercises
 */
const updateExercises = exercises => {
    for (const e of exercises) {
        Exercise.ExerciseModel.findById(e._id, (err, existingExercise) => {
            if (err) {
                logger.error(`Could not update exercise with id "${e._id}": ${err}`)
            }
            console.log(e._id)
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
        })
    }
}

/**
 * Removes exercises
 * @param exercises
 */
const deleteExercises = exercises => {
    for (const e of exercises) {
        Exercise.ExerciseModel.deleteOne({_id: e._id}, (err) => {
            if(err) logger.error(`Could not delete exercise with id ${e._id}`)
            logger.debug(`Successfully deleted exercise with id ${e._id}`)
        })
    }
}

module.exports = {
    saveExercises: saveExercises,
    updateExercises: updateExercises,
    getExercisesOfWorkout: getExercisesOfWorkout,
    deleteExercises: deleteExercises
}
