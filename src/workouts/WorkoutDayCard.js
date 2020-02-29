import React, {useEffect, useState} from "react";
import {Card, CardBody, CardTitle, Dropdown, DropdownToggle, DropdownItem, DropdownMenu} from "reactstrap";
import WorkoutExercise from "./WorkoutExercises/WorkoutExercise";
import addIcon from "../misc/addIcon.png";
import editIcon from "../misc/editIcon.png";
import WorkoutExerciseEdit from "./WorkoutExercises/WorkoutExerciseEdit";

const WorkoutDayCard = ({workout, createWorkout, updateWorkout, deleteWorkout, deleteExercise}) => {
    const [currentWorkout, setCurrentWorkout] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    console.log(workout)

    useEffect(() => {
        setCurrentWorkout(workout)
    }, [workout])

    const onDeleteWorkout = () => deleteWorkout(workout)
    const onCreateWorkout = () => createWorkout(workout)

    const onUpdateWorkout = exercise => {
        if (exercise === null || exercise === undefined) updateWorkout(currentWorkout)
        else { // exercise changed
            const updatedExercises = currentWorkout.exercises.filter(e => e.id !== exercise.id);
            const updatedWorkout = {...currentWorkout, exercises: updatedExercises}
            console.log(updatedWorkout)
            updateWorkout(updatedWorkout);
        }
    }

    const updateExercise = exercise => onUpdateWorkout(exercise)

    const onDeleteExercise = exercise => {
        deleteExercise(exercise.id, currentWorkout.id)
        onUpdateWorkout(exercise)
    }


    const toggle = () => setDropdownOpen(prevState => !prevState);

    const noWorkout = () => workout === undefined;

    /*const exerciseAchieved = exercise => {
        exercise.achieved = exercise.achieved === true ? false : true
        workout.exercises = workout.exercises.map(e => e.id === exercise.id ? exercise : e)
        updateWorkout(workout);
    }*/

    const onEditWorkout = () => {
        editMode ? setEditMode(false) : setEditMode(true);
    }


    return (
        <Card className={"workoutCards"}>
            <button onClick={() => console.log(currentWorkout)}>HEY</button>
            <CardTitle className={"cardTitleGrid"}>
                <div className={"workoutName"}>{noWorkout() ? ("") : workout.name}</div>
                <div className={"editWorkout"}>
                    {noWorkout() ?
                        <button className={"editWorkoutButton"} onClick={() => setEditMode(true)}><img
                            className={"editWorkoutIcon"} src={addIcon} alt={"editWokrkout"}/></button>
                        :
                        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                            <DropdownToggle tag={"span"}>
                                <button className={"editWorkoutButton"}>
                                    <img className={"editWorkoutIcon"} src={editIcon} alt={"editWorkout"}/>
                                </button>
                            </DropdownToggle>
                            <DropdownMenu className={"editWorkoutDropdownMenu"}>
                                <DropdownItem onClick={onEditWorkout}>Edit Workout</DropdownItem>
                                <DropdownItem onClick={onDeleteWorkout}>Delete Workout</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    }
                </div>
            </CardTitle>
            <div className={"cardBodyContainer"}>
                <CardBody className={"cardBody"}>
                    <div className={"cardBodyInside"}>
                        {noWorkout() ?
                            "No Workout"
                            :
                            editMode ?
                                (workout.exercises.map(e => <WorkoutExerciseEdit key={e.id}
                                                                                 exercise={e}
                                                                                 updateExercise={updateExercise}
                                                                                 onDeleteExercise={onDeleteExercise}/>))
                                :
                                (workout.exercises.map(e => <WorkoutExercise key={e.id} exercise={e}/>))
                        }
                    </div>
                </CardBody>
            </div>
        </Card>
    )
};

export default WorkoutDayCard;
