import React, {useState} from "react";
import WorkoutNav from "./WorkoutNav";
import "./Workout.css"
import WorkoutExercises from "./WorkoutExercises/WorkoutExercises";
import {activateNameValidation, workoutValid} from "../../../helper/validation";


const Workout = ({workout, setSelectedWorkout, createWorkout, updateWorkout, deleteWorkout}) => {
    const [currentWorkout, setCurrentWorkout] = useState(workout);
    const [hideNav, setHideNav] = useState(false);

    const handleInput = event => {
        if(event.target.name === "name") { // could optimize performance
            if(event.target.value !== "") activateNameValidation("workoutNameInvalid", false)
        }
        const updatedWorkout = {...currentWorkout, [event.target.name]: event.target.value};
        setCurrentWorkout(updatedWorkout);
    };

    const addExercise = exercise => {
        const errorMessageExercise = document.getElementById("errorMessageExercise"); // validation
        if(errorMessageExercise !== null) errorMessageExercise.remove();
        setCurrentWorkout({...currentWorkout, exercises: currentWorkout.exercises.concat(exercise)});
    };

    const updateExercises = exercise => {
        setCurrentWorkout({
            ...currentWorkout, exercises: currentWorkout.exercises.map(e => e._id === exercise._id ? exercise : e)
            });
    };

    const deleteExercise = exercise =>
        setCurrentWorkout({...currentWorkout, exercises: currentWorkout.exercises.filter(e => e._id !== exercise._id)});

    const onSaveWorkout = _ => {
        if(workoutValid(currentWorkout)) {
            setHideNav(true);
            createWorkout(currentWorkout)
        }
    };

    const onUpdateWorkout = _ => {
        if(workoutValid(currentWorkout)) {
            setHideNav(true);
            updateWorkout(currentWorkout)
        }
    };

    const chooseWorkout = chosenWorkout => setCurrentWorkout(chosenWorkout);


    return (
        <div className={"workoutBodyWrapper"}>
            <div className={"workoutBody"}>
                <WorkoutNav currentWorkout={currentWorkout}
                            setSelectedWorkout={setSelectedWorkout}
                            hideNav={hideNav}
                            deleteWorkout={deleteWorkout}
                            chooseWorkout={chooseWorkout}
                />
                <div className={"workoutInfoHeader"}>
                    <div id={"workoutNameInputContainer"}>
                        <h3>
                            <input value={currentWorkout.name}
                                   className={"workoutNameInput"}
                                   name={"name"}
                                   onChange={handleInput}
                                   placeholder="Workout name"/>
                        </h3>
                    </div>
                        <input value={currentWorkout.description}
                               className={"workoutDescriptionTextArea"}
                               name={"description"}
                               onChange={handleInput}
                               placeholder="Workout description"/>
                </div>
                <div className={"exercisesField"}>
                    <div className={"exerciseInfoTitle"}>
                        <span className={"exercisesHeader"}>Exercises</span>
                    </div>
                    <WorkoutExercises exercises={currentWorkout.exercises}
                                      addExercise={addExercise}
                                      updateExercises={updateExercises}
                                      deleteExercise={deleteExercise}
                    />
                    <div style={{"float": "right"}}>
                        {workout.name === "" ?
                            <button className={"saveWorkoutButton"} onClick={() => onSaveWorkout()}>Create Workout</button>
                            :
                            <button className={"saveWorkoutButton"} onClick={() => onUpdateWorkout()}>Update Workout</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};


export default Workout;
