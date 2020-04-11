import React, {useState} from 'react';
import {emptyExercise} from "../../../../helper/EmptyObjects";
import ExerciseInfo from "./ExerciseInfo";
import ExerciseTabs from "./ExerciseTabs";
import "./WorkoutExercise.css"


const WorkoutExercises = ({exercises, addExercise, updateExercises, deleteExercise}) => {
    const [selectedExerciseIndex, setSelectedExerciseIndex] = useState(0)

    const hasExercises = _ => exercises.length !== 0;

    return (
        <div className={"exercisesInfoContainer"}>
            <ExerciseTabs exercises={hasExercises()? exercises : []}
                          selectedExercise={hasExercises() ? exercises[selectedExerciseIndex] : emptyExercise(Date.now())}
                          addExercise={addExercise}
                          updateExercise={updateExercises}
                          deleteExercise={deleteExercise}
                          setSelectedExerciseIndex={setSelectedExerciseIndex}
            />
            <ExerciseInfo exercise={hasExercises()?
                                    exercises[selectedExerciseIndex] === undefined?
                                        exercises[0] : exercises[selectedExerciseIndex]
                                    : undefined}
                          updateExercise={updateExercises}
            />
        </div>
    );
};


export default WorkoutExercises;
