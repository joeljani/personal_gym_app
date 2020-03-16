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
