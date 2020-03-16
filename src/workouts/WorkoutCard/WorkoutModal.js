import React, {useState} from 'react'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'


const WorkoutModal = ({workout}) => {
    const [showModal, setModal] = useState(false)

    const close = () => setModal(false)

    const open = () => setModal(true)

    return (
        <div>
            <button className={"editButton"} onClick={open}>+</button>
            <Modal className={"workoutModal"} isOpen={showModal} toggle={close} size="lg" autoFocus={false}>
                <ModalHeader toggle={close}>
                    Create Workout
                </ModalHeader>
                <ModalBody>
                    <h1 style={{textDecoration: "underline"}}>Push</h1>
                    <h2 style={{textDecoration: "underline"}}>Exercises</h2>
                </ModalBody>
                <ModalFooter>
                    <Button color={"primary"}>Save workout</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default WorkoutModal;

