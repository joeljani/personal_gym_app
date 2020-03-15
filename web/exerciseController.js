const log4js = require('log4js')
const Exercise = require('../domain/exercise')
const logger = log4js.getLogger('controller')

exports.findAll = (req, res) => {
    Exercise.ExerciseModel.find((err, exercises) => {
        if (err) return res.status(400).send('database error')
        logger.debug(`Found ${exercises.length} exercises`)
        res.status(200).json(exercises)
    })
}

exports.deleteExercise = (req, res) => {
    Exercise.ExerciseModel.deleteOne({_id: req.params.eId}, (err, exercise) => {
        if (err) return res.status(400).send('database error')
        console.log(exercise)
        logger.debug(`successfully deleted exercise with id: ${exercise._id}`)
        res.status(200).send('deleted successfully')
    })
}
