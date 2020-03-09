import {transformDateString} from "./DateHelperMethods";

const emptyExercise = id => {
    return {
        _id: id,
        name: "",
        achieved: false,
        sets: 0,
        reps: 0,
        kg: 0,
        goal: ""
    }
}

const emptyWorkout = (id, date) => {
    return {
        _id: id,
        date: date,
        name: "",
        notes: "",
        exercises: []
    }
}


export {emptyExercise, emptyWorkout}
