import React, {useEffect, useState} from 'react'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'


const WorkoutModal = ({workout, createWorkout}) => {
    const [currentWorkout, setCurrentWorkout] = useState({})
    const [showModal, setModal] = useState(false)

    useEffect(() => {
        setCurrentWorkout(workout)
    }, [workout])

    const close = () => setModal(false)
    const open = () => setModal(true)

    const onSaveWorkout = () => createWorkout(currentWorkout)

    return (
        <div>
            <button className={"editButton"} onClick={open}>+</button>
            <Modal className={"workoutModal"} isOpen={showModal} toggle={close} size="lg" autoFocus={false}>
                <ModalHeader toggle={close}>
                    Create Workout
                </ModalHeader>
                <ModalBody>
                    <h1 style={{textDecoration: "underline"}}>{currentWorkout.name}</h1>
                    <h2 style={{textDecoration: "underline"}}>Exercises</h2>
                </ModalBody>
                <ModalFooter>
                    <Button color={"primary"} onClick={onSaveWorkout}>Save workout</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default WorkoutModal;

