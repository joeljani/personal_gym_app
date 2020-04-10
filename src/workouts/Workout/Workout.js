import React, {useEffect, useState} from "react";
import WorkoutNav from "./WorkoutNav";
import "./Workout.css"
import WorkoutExercises from "./WorkoutExercises/WorkoutExercises";


const Workout = ({workout, setSelectedWorkout, createWorkout, updateWorkout, deleteWorkout}) => {
    const [currentWorkout, setCurrentWorkout] = useState(workout);
    const [canDisplayNav, setCanDisplayNav] = useState(false);
    const [canCreate, setCanCreate] = useState(false);

    useEffect(() => {
        if(canCreate) createWorkout(currentWorkout)
    }, [canCreate]);

    const handleInput = event => {
        setCanDisplayNav(true);
        const updatedWorkout = {...currentWorkout, [event.target.name]: event.target.value};
        setCurrentWorkout(updatedWorkout)
    };

    const onSaveWorkout = exercises => {
        setCanDisplayNav(true)
        if(exercises.length !== 0) {
            setCurrentWorkout({...currentWorkout, exercises: exercises});
            if(currentWorkout.name !== "") {
                setCanCreate(true)
            } else {
                alert("no name")
            }
        } else {
            alert("no exercises")
        }
    };

    const onUpdateWorkout = _ => updateWorkout(currentWorkout)


    return (
        <div className={"workoutBodyWrapper"}>
            <div className={"workoutBody"}>
                <WorkoutNav currentWorkout={currentWorkout}
                            setSelectedWorkout={setSelectedWorkout}
                            canDisplayNav={canDisplayNav}
                            canNavigateBack={canCreate}
                            deleteWorkout={deleteWorkout}
                />
                <div className={"workoutInfoHeader"}>
                    <h3>
                        <input value={currentWorkout.name}
                               className={"workoutNameInput"}
                               name={"name"}
                               onChange={handleInput}
                               placeholder="Workout name..."/>
                    </h3>
                        <input value={currentWorkout.description}
                               className={"workoutDescriptionTextArea"}
                               name={"description"}
                               onChange={handleInput}
                               placeholder="Workout description..."/>
                </div>
                <div className={"exercisesField"}>
                    <div className={"exerciseInfoTitle"}>
                        <span className={"exercisesHeader"}>Exercises</span>
                    </div>
                    <WorkoutExercises exercises={currentWorkout.exercises}
                                      onSaveWorkout={onSaveWorkout}/>
                </div>
            </div>
        </div>
    )
};


export default Workout;
