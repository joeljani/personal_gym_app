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
    WorkoutModel.find((err, workouts) => {
        const existingWorkout = workouts.find(w => w.date === req.body.date)
        if (existingWorkout === undefined) {
            (async () => {
                let workout = await WorkoutModel.create({
                    date: req.body.date,
                    name: req.body.name,
                    notes: req.body.notes,
                    exercises: []
                })
                await logger.debug(workout._id)
                for (const e of req.body.exercises) {
                    await Exercise.ExerciseModel.create({
                        name: e.name,
                        achieved: e.achieved,
                        sets: e.sets,
                        reps: e.reps,
                        kg: e.kg,
                        goal: e.goal,
                        workout: workout._id
                    })
                }

                let exercises = await Exercise.ExerciseModel.find((err, exercises) => {
                    if (err) return res.status(400).send('database error')
                    logger.debug(`Found ${exercises.length} exercises`)
                })

                await logger.debug(exercises)
                workout.exercises = await exercises
                await logger.debug(workout)
                await workout.save(err => {
                    if (err) {
                        return res.status(404).send('database error')
                    }
                    logger.debug(`Successfully created workout with id "${workout.id}"`)
                    res.status(200).json(workout)
                })
            })()

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
    WorkoutModel.deleteOne({_id: req.params.id}, err => {
        if (err) {
            logger.error(`Could not delete Workout with id "${req.params.id}"`)
            return res.status(404).send('database error')
        }
        logger.debug(`Successfully deleted Workout with id "${req.params.id}"`)
        res.status(200).send()
    })
}

/**
 * Updates a given workout
 * HTTP-UPDATE to to '/workouts/{id}'
 */
exports.update = (req, res) => {
    WorkoutModel.findById(req.params.id, (err, workout) => {
        if (err) {
            logger.error(`Could not update workout with id "${req.params.id}"`)
            return res.status(404).send('database error')
        }
        workout.date = req.body.date
        workout.name = req.body.name
        workout.notes = req.body.notes
        workout.exercises = req.body.exercises

        ExerciseService.updateExercises(workout.exercises)

        workout.save(err => {
            if (err) {
                return res.status(404).send('database error')
            }
            logger.debug(`Successfully updated workout with id "${workout.id}"`)
            res.status(200).json(workout)
        })
    })
}


