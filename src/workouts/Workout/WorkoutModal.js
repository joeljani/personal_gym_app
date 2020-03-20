import React, {useEffect, useState} from 'react'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import WorkoutExercise from "./WorkoutExercises/WorkoutExercise";
import WorkoutExerciseCreateField from "./WorkoutExercises/WorkoutExerciseCreateField";
import {Link} from "@reach/router";


const WorkoutModal = ({workout, createWorkout, deleteExercise}) => {
    const [currentWorkout, setCurrentWorkout] = useState(workout)
    const [exercises, setExercises] = useState([])
    const [showModal, setModal] = useState(false)
    const [showExerciseCreateField, setShowExerciseCreateField] = useState(false)

    useEffect(() => {
        setCurrentWorkout(workout)
        setExercises(workout.exercises)
    }, [workout])

    useEffect(() => {
        setCurrentWorkout({...currentWorkout, exercises: exercises})
    }, [exercises])

    const close = () => setModal(false)
    const open = () => setModal(true)

    const handleInput = event => {
        const updatedWorkout = {...currentWorkout, [event.target.name]: event.target.value}
        setCurrentWorkout(updatedWorkout)
    }

    const onSaveWorkout = () => {
        createWorkout(currentWorkout)
        close()
    }

    const createExercise = () => setShowExerciseCreateField(true)
    const addExercise = exercise => setExercises(exercises.concat(exercise))
    const onDeleteExercise = exercise => {
        setExercises(exercises.filter(e => e._id !== exercise._id))
        deleteExercise(exercise._id)
    }

    const noWorkout = workout => workout.name === "" && workout.exercises.length === 0


    return (
        <div>
{/*
            <span className={"editButton"} onClick={open}></span>
*/}
            <Modal className={"workoutModal"} isOpen={showModal} toggle={close} size="lg" autoFocus={false}>
                <ModalHeader toggle={close}>
                    {noWorkout(currentWorkout) ? "Create Workout" : "Edit workout"}
                </ModalHeader>
                <ModalBody className={"workoutModalBody"}>
                    <div>
                        <input defaultValue={currentWorkout.name}
                               className={"workoutNameInput"}
                               name={"name"}
                               onChange={handleInput}/>
                    </div>
                    <div className={"workoutExercises"}>
                        <h2 style={{textDecoration: "underline"}}>Exercises</h2>
                        {currentWorkout.exercises.map(e => (
                            <WorkoutExercise exercise={e}
                                             onDeleteExercise={onDeleteExercise}/>
                        ))
                        }
                        {showExerciseCreateField ?
                            <WorkoutExerciseCreateField setShowExerciseCreateField={setShowExerciseCreateField}
                                                        addExercise={addExercise}/>
                            :
                            <Button onClick={createExercise}>Create exercise</Button>}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color={"primary"} onClick={onSaveWorkout}>Save workout</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default WorkoutModal;

