import WorkoutExerciseEdit from "./WorkoutExerciseEdit";
import WorkoutExercise from "./WorkoutExercise";
import React from "react";


const WorkoutExerciseContainer = ({workout, editMode, updateExercise, onDeleteExercise, addExercise}) => {
    if (editMode) {
        return workout.exercises.map(e => <WorkoutExerciseEdit key={e._id}
                                                               exercise={e}
                                                               onDeleteExercise={onDeleteExercise}
                                                               updateExercise={updateExercise}
                                                               addExercise={addExercise}/>)
    } else {
        return (workout.exercises.map(e => <WorkoutExercise key={e._id} exercise={e}/>))
    }
}

export default WorkoutExerciseContainer;
