import {Card, CardBody} from "reactstrap";
import WorkoutExerciseEdit from "./WorkoutExerciseEdit";
import WorkoutExercise from "./WorkoutExercise";
import React from "react";
import {emptyExercise} from "../../helper/EmptyObjects";


const WorkoutExerciseContainer = ({workout, editMode, saveMode, updateExercise, onDeleteExercise}) => {
    if(workout.id === "" && saveMode === true) {
        return <WorkoutExerciseEdit key={emptyExercise.id}
                                    exercise={emptyExercise(Date.now())}
                                    updateExercise={updateExercise}
                                    onDeleteExercise={onDeleteExercise}/>
    } else if (editMode) {
            return (workout.exercises.map(e => <WorkoutExerciseEdit key={e.id}
                                                                    exercise={e}
                                                                    updateExercise={updateExercise}
                                                                    onDeleteExercise={onDeleteExercise}/>))
        } else return (workout.exercises.map(e => <WorkoutExercise key={e.id} exercise={e}/>))
}

export default WorkoutExerciseContainer;
