const log4js = require('log4js')
const WorkoutModel = require('../domain/workout')
const Exercise = require('../domain/exercise')
const ExerciseService = require('../service/exerciseService')
const WorkoutService = require('../service/workoutService')
const logger = log4js.getLogger('controller')


/**
 * Returns all workouts
 * HTTP-GET to '/workouts'
 */
exports.findAll = (req, res) => {
    WorkoutModel.find((err, workouts) => {
        if (err) return res.status(400).send('database error')
        logger.debug(`Found ${workouts.length} workouts`)
        res.status(200).json(workouts)
    })
}

/**
 * Creates a new workout
 * HTTP-POST to '/workouts'
 */
exports.createWorkout = (req, res) => {
    WorkoutModel.find(async (err, workouts) => {
        const existingWorkout = workouts.find(w => w.date === req.body.date)
        if (existingWorkout === undefined) {
            let workout = await WorkoutModel.create({
                date: req.body.date,
                name: req.body.name,
                notes: req.body.notes,
                exercises: []
            })
            await ExerciseService.saveExercises(workout._id, req.body.exercises)
            workout.exercises = await ExerciseService.getExercisesOfWorkout(workout._id)
            await workout.save(err => {
                if (err) {return res.status(404).send('database error')}
                logger.debug(`Successfully created workout with id "${workout.id}"`)
                res.status(200).json(workout)
            })
        } else {
            logger.error(`Workout already exists at that date`)
            res.status(412).send('database error')
        }
    })
}

/**
 * Deletes a given workout
 * HTTP-DELETE to to '/workouts/{id}'
 */
exports.delete = (req, res) => {
    WorkoutModel.findById(req.params.id, async (err, workout) => {
        if (err) logger.error(`Could not find Workout with id "${req.params.id}"`)
        else await ExerciseService.deleteExercises(workout.exercises)

        await WorkoutModel.deleteOne({_id: req.params.id}, err => {
            if (err) {
                logger.error(`Could not delete Workout with id "${req.params.id}"`)
                return res.status(404).send('database error')
            }
            logger.debug(`Successfully deleted Workout with id "${req.params.id}"`)
            res.status(200).send('deleted successfully')
        })
    })

}

/**
 * Updates a given workout
 * HTTP-UPDATE to to '/workouts/{id}'
 */
exports.update = (req, res) => {
    WorkoutModel.findById(req.params.id, async (err, workout) => {
        if (err) {
            logger.error(`Could not update workout with id "${req.params.id}"`)
            return res.status(404).send('database error')
        }
        workout.date = req.body.date
        workout.name = req.body.name
        workout.notes = req.body.notes
        workout.exercises = req.body.exercises

        await ExerciseService.updateExercises(workout.exercises)

        await workout.save(err => {
            if (err) {
                return res.status(404).send('database error')
            }
            logger.debug(`Successfully updated workout with id "${workout.id}"`)
            res.status(200).json(workout)
        })
    })
}


