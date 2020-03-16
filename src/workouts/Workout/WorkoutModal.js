import React, {useEffect, useState} from 'react'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import WorkoutExercise from "./WorkoutExercises/WorkoutExercise";
import WorkoutExerciseCreateField from "./WorkoutExercises/WorkoutExerciseCreateField";


const WorkoutModal = ({workout, createWorkout}) => {
    const [currentWorkout, setCurrentWorkout] = useState(workout)
    const [exercises, setCurrentExercises] = useState([])
    const [showModal, setModal] = useState(false)
    const [showExerciseCreateField, setShowExerciseCreateField] = useState(false)

    useEffect(() => {
        setCurrentWorkout(workout)
        setCurrentExercises(workout.exercises)
    }, [workout, exercises])

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
    const addExercise = exercise => setCurrentExercises(exercises.concat(exercise))

    return (
        <div>
            <button className={"editButton"} onClick={open}>+</button>
            <Modal className={"workoutModal"} isOpen={showModal} toggle={close} size="lg" autoFocus={false}>
                <ModalHeader toggle={close}>
                    Create Workout
                </ModalHeader>
                <ModalBody>
                    <input defaultValue={currentWorkout.name}
                           className={"workoutNameInput"}
                           name={"name"}
                           onChange={handleInput}/>
                    <h2 style={{textDecoration: "underline"}}>Exercises</h2>
                    {currentWorkout.exercises.map(e => (
                        <WorkoutExercise exercise={e}/>
                        ))
                    }
                    {showExerciseCreateField ?
                        <WorkoutExerciseCreateField setShowExerciseCreateField={setShowExerciseCreateField}
                                                    addExercise={addExercise}/>
                        :
                        <Button onClick={createExercise}>Create exercise</Button>}
                </ModalBody>
                <ModalFooter>
                    <Button color={"primary"} onClick={onSaveWorkout}>Save workout</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default WorkoutModal;

