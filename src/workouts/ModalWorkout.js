import React, {useEffect, useState} from "react";
import {Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row} from "reactstrap";
import ModalExercise from "./ModalExercise";
import ModalExerciseList from "./ModalExerciseList";

const ModalWorkout = ({workout, date, noWorkout, createWorkout, deleteWorkout}) => {
    const [modal, setModal] = useState(false);
    const [currentWorkout, setCurrentWorkout] = useState(
        {
            name: '',
            date: '',
            notes: '',
            exercises: [],
        })
    const [exercises, setExercises] = useState([{
        key: Date.now(),
        name: '',
        achieved: false,
        sets: 0,
        reps: 0
    }])

    useEffect(() => {
        setCurrentWorkout({...currentWorkout, exercises: exercises})
    }, [exercises])


    const workoutChange = event => {
        const transformedDate = transformDateString(date) //TODO: change location of set date for better performance, export function transformDateDate,
        setCurrentWorkout({...currentWorkout, [event.target.name]: event.target.value, date: transformedDate})
    }

    const onSaveWorkout = () => {
        createWorkout(currentWorkout);
        toggle()
    }

    const onDeleteWorkout = () => {
        deleteWorkout(workout)
        toggle()
    }

    const addExercise = () => {
        const key = Date.now();
        setExercises(exercises.concat({
            key: key,
            name: '',
            achieved: false,
            sets: 0,
            reps: 0
        }))
    }

    const updateExercise = exercise => {
        console.log(exercise)
        const updatedExerciseList = exercises.map(e => {
            if(e.key === exercise.key) return exercise; else return e;
        })
        setExercises(updatedExerciseList)
    }

    const deleteExercise = key => {
        const updatedExerciseList = exercises.filter(e => e.key !== key)
        setExercises(updatedExerciseList)
    }


    const toggle = () => {
        setModal(!modal);
    };

    return (
        <div>
            <Button style={buttonStyle}
                    onClick={toggle}>{noWorkout ? ("Create Workout") : ("Edit Workout")}
            </Button>
            <Modal isOpen={modal} toggle={toggle} style={{fontSize: '8px'}}>
                <ModalHeader toggle={toggle}>{noWorkout ? ("Create Workout") : ("Edit Workout")}</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup row>
                            <Label md={2} for="workoutName">
                                Workout name
                            </Label>
                            <Col md={10}>
                                <Input onChange={workoutChange}
                                       type="text"
                                       name='name'
                                />
                            </Col>
                        </FormGroup>
                        <Row>
                            <Label xs={3}>
                                Exercise
                            </Label>
                            <Label xs={2}>
                                Sets
                            </Label>
                            <Label xs={2}>
                                Reps
                            </Label>
                            <Label xs={3}>
                                Goal
                            </Label>
                            <Label xs={1}/>
                        </Row>
                        <ModalExerciseList exercises={exercises} updateExercise={updateExercise} deleteExercise={deleteExercise}/>
                        <Button onClick={addExercise}>Add exercise</Button>
                        <FormGroup row>
                            <Label md={2} for="workoutNotes">
                                Notes
                            </Label>
                            <Col md={10}>
                                <Input
                                    onChange={workoutChange}
                                    type="text"
                                    name='notes'
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Row className={"justify-content-end"}>
                                <Col xs={3} className="clearfix" style={{padding: '.2rem'}}>
                                    <Button onClick={onSaveWorkout} color="success">Save</Button>
                                </Col>
                                <Col xs={3} className="clearfix" style={{padding: '.2rem'}}>
                                    <Button onClick={onDeleteWorkout} color="danger">Delete</Button>
                                </Col>
                            </Row>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

const buttonStyle = {
    width: '150px',
    float: 'right',
    backgroundColor: 'white',
    color: 'black',
    fontSize: '10px',
}

const transformDateString = (d) => {
    if (d.getDate() >= 10 && d.getMonth() + 1 < 10) return "2020-" + "0" + (d.getMonth() + 1) + "-" + d.getDate()
    else if (d.getDate() < 10 && d.getMonth() + 1 < 10) return "2020-" + "0" + (d.getMonth() + 1) + "-" + "0" + d.getDate()
    else if (d.getDate() >= 10 && d.getMonth() + 1 >= 10) return "2020-" + (d.getMonth() + 1) + "-" + d.getDate()
    else if (d.getDate() < 10 && d.getMonth() + 1 >= 10) return "2020-" + (d.getMonth() + 1) + "-" + "0" + d.getDate()
}

export default ModalWorkout;
