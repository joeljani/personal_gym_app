const log4js = require('log4js')
const WorkoutModel = require('../domain/workout')
const logger = log4js.getLogger('controller')


exports.findAll = (req, res) => {
    WorkoutModel.find((err, workouts) => {
        if (err) return res.status(400).send('database error')
        logger.debug(`Found ${workouts.length} workouts`)
        res.status(200).json(workouts)
    })
}

exports.create = (req, res) => {
    WorkoutModel.find((err, workouts) => {
        const existingWorkout = workouts.find(w => w.date === req.body.date)
        if (existingWorkout === undefined) {
            let workout = new WorkoutModel()
            workout.date = req.body.date
            workout.name = req.body.name
            workout.notes = req.body.notes
            workout.exercises = req.body.exercises

            logger.debug(workout)

            workout.save((err, workoutCreated) => {
                if (err) {
                    logger.error(`Could not create new Workout`)
                    res.status(412).send('database error')
                } else {
                    logger.debug(`Successfully created Workout with id "${workout.id}"`)
                    res.status(201).json(workoutCreated)
                }
            })
        } else {
            logger.error(`Workout already exists at that date`)
            res.status(412).send('database error')
        }
    })
}

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

        workout.save(err => {
            if (err) {
                return res.status(404).send('database error')
            }
            logger.debug(`Successfully updated workout with id "${workout.id}"`)
            res.status(200).json(workout)
        })
    })
}
