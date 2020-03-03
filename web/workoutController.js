const log4js = require('log4js')
const Workout = require('../domain/workout')
const logger = log4js.getLogger('controller')


exports.findAll = (req, res) => {
    Workout.find((err, workouts) => {
        if (err) {
            return res.status(400).send('database error')
        }
        logger.debug(`Found ${workouts.length} workouts`)
        res.status(200).json(workouts)
    })
}

exports.create = (req, res) => {
    // Create a new instance of the Questionnaire model
    Workout.find((err, workouts) => {
        const existingWorkout = workouts.find(w => w.date === req.body.date)
        if(existingWorkout === undefined) {
            let workout = new Workout()
            workout.date = req.body.date
            workout.name = req.body.name
            workout.notes = req.body.notes
            workout.exercises = req.body.exercises

            // Save the questionnaire and check for errors
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
