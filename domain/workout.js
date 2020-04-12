const mongoose = require('mongoose')
const Exercise = require('../domain/exercise')
const Schema = mongoose.Schema


const workoutSchema = new Schema({
        date: {
            type: String
        },
        name: {
            type: String
        },
        description: {
            type: String
        },
        exercises: [Exercise.ExerciseSchema]
    },
    {
        collection: 'workouts'
    }
)

module.exports = mongoose.model('Workout', workoutSchema)
