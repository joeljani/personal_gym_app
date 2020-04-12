const mongoose=require('mongoose')
const Schema=mongoose.Schema

const exerciseSchema = new Schema({
        name: {
            type: String
        },
        sets: {
            type: Number
        },
        reps: {
            type: Number
        },
        kg: {
            type: Number
        },
        achieved: {
            type: Boolean
        },
        goal: {
            type: String
        },
        notes: {
            type: String
        },
        workout: {
            type: Schema.Types.ObjectId, ref: 'workout'
        }
    },
    {
        strict: false,
        collection: 'exercises'
    }
)

module.exports = {
    ExerciseModel: mongoose.model('Exercise', exerciseSchema),
    ExerciseSchema: exerciseSchema
}
