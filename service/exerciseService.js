const Exercise = require('../domain/exercise')
const log4js = require('log4js')
const logger = log4js.getLogger('service')
const mongoose = require('mongoose')


/**
 * Saves exercises of a workout to collection
 * @param workoutId
 * @param exercises
 */
const saveExercises = async (workoutId, exercises) => {
    let savedExercises = []
    if(!(exercises instanceof Array)) exercises = [exercises]
    for (const e of exercises) {
        let newExercise = {}
        Object.keys(e).forEach(prop => {
            if(prop !== "_id") { //let mongoose generate id
                newExercise[prop] = e[prop]
            }
        })
        await Exercise.ExerciseModel.create(newExercise).then((e) => savedExercises.push(e))
    }
    return savedExercises
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
        return exercises
    })
}


/**
 *
 * @param wId
 * @param exercises
 * @return {*[]}
 */
const updateExercises = async (wId, exercises) => {
    let newExercises = []
    let existingExercises = []
    for (const e of exercises) {
        if (mongoose.isValidObjectId(e._id) && e._id !== undefined) {
            existingExercises = existingExercises.concat(updateExercise(wId, e))
        } else newExercises =  newExercises.concat(await saveExercises(wId, e))
    }

    return existingExercises.concat(newExercises)
}


/**
 *
 * @param wId
 * @param e
 * @return {Promise<*>}
 */
const updateExercise = (wId, e) => {
    Exercise.ExerciseModel.findById(e._id,(err, existingExercise) => {
        if (err) {
            logger.error(`Could not update exercise with id "${e._id}": ${err}`)
        }
        if(existingExercise != null) {
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
    return e;
}

/**
 * Removes exercises
 * @param exercises
 */
const deleteExercises = exercises => {
    for (const e of exercises) {
        Exercise.ExerciseModel.deleteOne({_id: e._id}, (err) => {
            if (err) logger.error(`Could not delete exercise with id ${e._id}`)
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
