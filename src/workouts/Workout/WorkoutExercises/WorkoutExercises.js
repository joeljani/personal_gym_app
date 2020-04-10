import React, {useEffect, useState} from 'react';
import {emptyExercise} from "../../../helper/EmptyObjects";
import ExerciseInfo from "./ExerciseInfo";
import ExerciseTabs from "./ExerciseTabs";
import {Button} from "reactstrap";
import "./WorkoutExercise.css"

const WorkoutExercises = ({exercises, onSaveWorkout}) => {
    const [selectedExerciseIndex, setSelectedExerciseIndex] = useState(0)
    const [currentExercises, setCurrentExercises] = useState([])

    useEffect(() => {
        setCurrentExercises(exercises)
    }, [exercises])

    const hasExercises = _ => currentExercises.length !== 0;

    const addExercise = exercise => setCurrentExercises(currentExercises.concat(exercise));

    const updateExercise = exercise =>
        setCurrentExercises(currentExercises.map(e => e._id === exercise._id ? exercise : e))

    return (
        <div className={"exercisesInfoContainer"}>
            <ExerciseTabs exercises={hasExercises()? currentExercises : []}
                          selectedExercise={hasExercises() ? currentExercises[selectedExerciseIndex] : emptyExercise(Date.now())}
                          addExercise={addExercise}
                          updateExercise={updateExercise}
                          setSelectedExerciseIndex={setSelectedExerciseIndex}
            />
            <ExerciseInfo exercise={hasExercises()?
                                            currentExercises[selectedExerciseIndex] === undefined?
                                            currentExercises[0] : currentExercises[selectedExerciseIndex]
                                        : emptyExercise(Date.now())}
                          updateExercise={updateExercise}
            />
            <Button onClick={() => onSaveWorkout(currentExercises)}>Save Workout</Button>
        </div>
    );
};


export default WorkoutExercises;
