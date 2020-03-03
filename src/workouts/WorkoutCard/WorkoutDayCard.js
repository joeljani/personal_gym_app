import React, {useEffect, useState} from "react";
import {
    Card,
    CardBody,
    CardTitle,
    Dropdown,
    DropdownToggle,
    DropdownItem,
    DropdownMenu,
    Row,
    Col,
    Button
} from "reactstrap";
import addIcon from "../../misc/addIcon.png";
import editIcon from "../../misc/editIcon.png";
import saveIcon from "../../misc/saveIcon.png";
import WorkoutExerciseContainer from "../WorkoutExercises/WorkoutExerciseContainer";
import {emptyExercise, emptyWorkout} from "../../helper/EmptyObjects";

var uuid = require("uuid");
var id = uuid.v4();


const WorkoutDayCard = ({workout, createWorkout, updateWorkout, deleteWorkout, deleteExercise}) => {
    const [currentWorkout, setCurrentWorkout] = useState(workout);
    const [editMode, setEditMode] = useState(false);
    const [saveMode, setSaveMode] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        setCurrentWorkout(workout)
    }, [workout])

    const emptyWorkout = () => {
        return currentWorkout.name === ""
    }

    const onDeleteWorkout = () => deleteWorkout(workout)

    const addWorkout = () => {
        onEditWorkout()
    }

    const onUpdateWorkout = exercise => {
        if (exercise === null || exercise === undefined) updateWorkout(currentWorkout)
        else { // exercise changed
            if (currentWorkout.exercises.length === 0) {
                setCurrentWorkout({...currentWorkout, exercises: currentWorkout.exercises.concat(exercise)})
            } else {
                const updatedExercises = currentWorkout.exercises.map(e => e.id === exercise.id ? exercise : e);
                const updatedWorkout = {...currentWorkout, exercises: updatedExercises}
                setCurrentWorkout(updatedWorkout)
            }
        }
    }

    const updateExercise = exercise => onUpdateWorkout(exercise)

    const onDeleteExercise = exercise => {
        const updatedExercises = currentWorkout.exercises.filter(e => e.id !== exercise.id);
        const updatedWorkout = {...currentWorkout, exercises: updatedExercises}
        setCurrentWorkout(updatedWorkout)
        if(workout.name !== "") {
            deleteExercise(exercise.id, currentWorkout.id)
            updateWorkout(updatedWorkout)
        }
    }

    const toggle = () => setDropdownOpen(prevState => !prevState);

    const exerciseAchieved = exercise => {
        exercise.achieved = exercise.achieved === true ? false : true
        const updatedExercises = currentWorkout.exercises.map(e => e.id === exercise.id ? exercise : e)
        const updatedWorkout = {...currentWorkout, exercises: updatedExercises}
        setCurrentWorkout(updatedWorkout)
    }

    const addExercise = () => {
        setCurrentWorkout({...currentWorkout, exercises: currentWorkout.exercises.concat(emptyExercise(Date.now()))})
    }

    const onEditWorkout = () => {
        editMode ? setEditMode(false) : setEditMode(true);
        setSaveMode(true);
    }

    const onSaveWorkout = () => {
        if (workout.name === "") { //TODO: get previous state to check if new workout or not
            if (currentWorkout.name !== "") {
                createWorkout(currentWorkout)
                setSaveMode(false);
                setEditMode(false);
            } else console.log("workout needs name") //TODO: validation
        } else {
            setSaveMode(false);
            setEditMode(false);
            updateWorkout(currentWorkout);
        }
    }

    const handleInput = event => {
        const updatedWorkout = {...currentWorkout, [event.target.name]: event.target.value}
        setCurrentWorkout(updatedWorkout)
    }

    return (
        <Card className={"workoutCards"}>
            <CardTitle className={"cardTitleGrid"}>
                <div className={"workoutName"}>
                    {editMode ? <input defaultValue={currentWorkout.name}
                                       className={"workoutNameInput"}
                                       name={"name"}
                                       onChange={handleInput}/>
                        : currentWorkout.name}
                </div>
                <div className={"editWorkout"}>
                    {emptyWorkout() && (saveMode === false) ?
                        <button className={"editWorkoutButton"} onClick={addWorkout}><img
                            className={"editWorkoutIcon"} src={addIcon} alt={"editWokrkout"}/></button>
                        :
                        saveMode ?
                            <button className={"editWorkoutButton"} onClick={onSaveWorkout}><img
                                className={"editWorkoutIcon"} src={saveIcon} alt={"editWokrkout"}/></button>
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
                        <WorkoutExerciseContainer workout={currentWorkout}
                                                  editMode={editMode}
                                                  saveMode={saveMode}
                                                  updateExercise={updateExercise}
                                                  onDeleteExercise={onDeleteExercise}/>
                        <Row>
                            <Col>
                                {editMode && <Button className={"addExerciseButton"}
                                                     onClick={addExercise}>Add exercise</Button>}
                            </Col>
                        </Row>
                    </div>
                </CardBody>
            </div>
        </Card>
    )
}
;


export default WorkoutDayCard;
