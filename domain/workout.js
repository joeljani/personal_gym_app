const mongoose=require('mongoose')
const Schema=mongoose.Schema

const exerciseSchema = new Schema({
        name: {
            type: String
        },
        achieved: {
            type: Boolean
        },
        reps: {
            type: Number
        },
        sets: {
            type: Number
        },
        kg: {
            type: Number
        },
        goal: {
            type: String
        }
    },
    {
        collection: 'exercises'
    }
)

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
        exercises: {type: [exerciseSchema]}
    },
    {
        collection: 'workouts'
    }
)

module.exports = mongoose.model('Workout', workoutSchema)
