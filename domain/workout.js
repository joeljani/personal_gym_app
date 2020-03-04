const mongoose=require('mongoose')
const exercise = require('../domain/exercise')
const Schema=mongoose.Schema


const workoutSchema = new Schema({
        date: {
            type: String
        },
        name: {
            type: String
        },
        notes: {
            type: String
        },
        exercises: {type: [exercise.ExerciseSchema]}
    },
    {
        collection: 'workouts'
    }
)

module.exports = mongoose.model('Workout', workoutSchema)
