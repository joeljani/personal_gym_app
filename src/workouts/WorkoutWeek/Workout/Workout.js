import React, {useState} from "react";
import WorkoutNav from "./WorkoutNav";
import "./Workout.css"
import WorkoutExercises from "./WorkoutExercises/WorkoutExercises";


const Workout = ({workout, setSelectedWorkout, createWorkout, updateWorkout, deleteWorkout}) => {
    const [currentWorkout, setCurrentWorkout] = useState(workout);
    const [hideNav, setHideNav] = useState(false);

    const handleInput = event => {
        if(event.target.name === "name") { // could optimize performance
            const nameInput = document.getElementsByClassName("workoutNameInput")[0];
            nameInput.classList.remove("invalidInput");
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

const workoutValid = workout => {
    let isValid = true;
    if(workout.exercises.length === 0) {
        setExercisesValidation("errorMessageExercise");
        isValid = false;
    }
    if(workout.name === "") {
        setNameValidation("workoutNameInvalid");
        isValid = false;
    }
    return isValid;
};

const errorMessage = (message, id) => {
    const errorMessage = document.createElement("DIV");
    errorMessage.style.color = "red";
    errorMessage.innerText = message;
    errorMessage.id = id !== undefined ? id : "";
    return errorMessage;
};

const hasErrorMessage = (parent, id) => {
    let errorMessageExists = false;
    parent.childNodes.forEach(
        child => child.id === id ? errorMessageExists = true : null);
    return errorMessageExists;
};

const setExercisesValidation = id => {
    const exerciseTabs = document.getElementById("exerciseTabs");
    if(!hasErrorMessage(exerciseTabs, id))
        exerciseTabs.appendChild(errorMessage("Workout needs at least one exercise", id));
};

const setNameValidation = id => {
    const nameInput = document.getElementsByClassName("workoutNameInput")[0];
    nameInput.classList.add("invalidInput");
    const nameInputContainer = document.getElementById("workoutNameInputContainer");
    if(!hasErrorMessage(nameInputContainer, id))
        nameInputContainer.appendChild(errorMessage("Workout needs a name", id));
};


export default Workout;
