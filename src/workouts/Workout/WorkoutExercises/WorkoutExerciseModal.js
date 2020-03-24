import React, {useEffect, useState} from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Input} from 'reactstrap'
import deleteIcon from "../../../misc/deleteIcon.png";

const WorkoutExerciseModal = ({exercise, isOpen, setModal}) => {
    const [currentExercise, setExercise] = useState(exercise)
    const [labelValuePairs, setLabelValuePairs] = useState([{}])

    useEffect(() => {
        setLabelValuePairs(Object.keys(currentExercise)
            .filter(isCorrectLabel)
            .map(label => {
                return {[label]: currentExercise[label]}
            }))
    }, [currentExercise])

    const closeModal = () => setModal(!isOpen)

    const handleInput = event => {
        const updatedExercise = {...currentExercise, [event.target.name]: event.target.value}
        setExercise(updatedExercise)
    }

    const onSaveExercise = () => {
        const updatedExercise = {
            "_id": currentExercise["_id"],
            "name": currentExercise["name"],
            "achieved": currentExercise["achieved"]
        }
        labelValuePairs.forEach(pair => updatedExercise[Object.keys(pair)[0]] = Object.values(pair)[0])
        setExercise(updatedExercise)
        closeModal()
    }

    const removeExerciseLabel = i => {
        const updatedLabelValuePairs = [...labelValuePairs]
        updatedLabelValuePairs.splice(i, 1)
        setLabelValuePairs(updatedLabelValuePairs)
    }

    const addExerciseLabel = () => setLabelValuePairs(labelValuePairs.concat({"":""}))

    const handleLabelInput = (event, i) => {
        const newLabel = event.target.value
        const oldLabel = event.target.name
        const oldPair = labelValuePairs[i]
        const newPair = {[newLabel]: Object.values(oldPair)[0]}
        const updatedLabelValuePairs = labelValuePairs.map(p => Object.keys(p)[0] === oldLabel ? newPair : p)
        setLabelValuePairs(updatedLabelValuePairs)
    }

    const handleValueInput = event => {
        const label = event.target.name
        let newValue = event.target.value
        if(numericLabels.includes(label.toLowerCase())) newValue = parseInt(event.target.value)
        const newPair = {[label]: newValue}
        const updatedLabelValuePairs = labelValuePairs.map(p => Object.keys(p)[0] === label ? newPair : p)
        setLabelValuePairs(updatedLabelValuePairs)
    }

    return (
        <Modal isOpen={isOpen} toggle={closeModal}>
            <ModalHeader toggle={closeModal}>
                Add Exercise
            </ModalHeader>
            <ModalBody>
                <Input defaultValue={currentExercise.name}
                       className={"exerciseNameInput"}
                       name={"name"}
                       onChange={handleInput}
                       placeholder="Add exercise name"/>
                <div className={"exerciseInfoTitle"}>Exercise Info</div>
                {labelValuePairs.map((pair, i) => { //TODO: create component for this logic
                    const label = Object.keys(pair)[0]
                    const value = Object.values(pair)[0]
                    return (
                        <div className={"exerciseEditGrid"}>
                            <Input value={label}
                                   name={label}
                                   onChange={event => handleLabelInput(event, i)}/>
                            {label !== undefined && numericLabels.includes(label.toLowerCase()) ?
                                <Input value={value}
                                       type="select"
                                       name={label}
                                       onChange={event => handleValueInput(event, i)}>
                                    {[...Array(30).keys()].map(num =>
                                        <option key={num}>{num}</option>
                                    )}
                                </Input>
                                :
                                <Input value={value}
                                       name={label}
                                       onChange={event => handleValueInput(event, i)}/>
                            }
                            <img src={deleteIcon} onClick={() => removeExerciseLabel(i)} alt={"delete exercise info"}/>
                        </div>
                    )
                })}
                <Button onClick={addExerciseLabel}>Add Info</Button>
            </ModalBody>
            <ModalFooter>
                <Button onClick={onSaveExercise}>Save Exercise</Button>
            </ModalFooter>
        </Modal>
    )
}

const isCorrectLabel = label => label !== "_id" && label !== "name" && label !== "__v" && label !== "achieved"
const numericLabels = ["sets", "reps", "kg"]

export default WorkoutExerciseModal;
