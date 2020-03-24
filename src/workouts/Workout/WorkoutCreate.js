import React, {useState} from "react";
import WorkoutNav from "./WorkoutNav";
import {Input} from "reactstrap";
import WorkoutExerciseList from "./WorkoutExercises/WorkoutExerciseList";
import "./Workout.css"


const WorkoutCreate = ({emptyWorkout, setSelectedWorkout}) => {
    const [currentWorkout, setCurrentWorkout] = useState(emptyWorkout)
    const [editMode, setEditMode] = useState(false)

    const handleInput = event => {
        setEditMode(true)
        const updatedWorkout = {...currentWorkout, [event.target.name]: event.target.value}
        setCurrentWorkout(updatedWorkout)
    }

    const addExercise = exercise => {
        setEditMode(true)
        setCurrentWorkout({...currentWorkout, exercises: currentWorkout.exercises.concat(exercise)})
    }

    return (
        <div className={"workoutBodyWrapper"}>
            <div className={"workoutBody"}>
                <WorkoutNav currentWorkout={currentWorkout}
                            setSelectedWorkout={setSelectedWorkout}
                            editMode={editMode}/>
                <div className={"workoutInfoHeader"}>
                    <h3>
                        <Input value={currentWorkout.name}
                               className={"workoutNameInput"}
                               name={"name"}
                               onChange={handleInput}
                               placeholder="Workout name..."/>
                    </h3>
                        <Input type={"textarea"}
                               value={currentWorkout.description}
                               className={"workoutDescriptionInput"}
                               name={"description"}
                               onChange={handleInput}
                               placeholder="Workout description..."/>
                </div>
                <WorkoutExerciseList workout={currentWorkout}
                                     editMode={true}
                                     addExercise={addExercise}/>
            </div>
        </div>
    )
}


export default WorkoutCreate;
