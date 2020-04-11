const emptyExercise = id => {
    return {
        _id: id,
        name: "",
        sets: 0,
        reps: 0,
        kg: 0,
        goal: "",
        achieved: false,
        notes: ""
    }
}

const emptyWorkout = (id, date) => {
    return {
        _id: id,
        date: date,
        name: "",
        description: "",
        exercises: []
    }
}


export {emptyExercise, emptyWorkout}
