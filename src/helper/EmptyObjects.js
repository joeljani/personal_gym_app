import {transformDateString} from "./DateHelperMethods";
var uuid = require("uuid");
var id = uuid.v4();

const emptyExercise = id => {
    return {
        id: id,
        name: " ",
        achieved: false,
        sets: 0,
        reps: 0,
        kg: 0,
        goal: ""
    }
}

const emptyWorkout = (id, date) => {
    console.log(id)
    console.log(date)
    return {
        id: id,
        date: transformDateString(date),
        name: "",
        notes: "",
        exercises: []
    }
}

export {emptyExercise, emptyWorkout}
