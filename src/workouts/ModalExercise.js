import React, {useEffect, useState} from "react";
import {Col, FormGroup, Input} from "reactstrap";
import deleteIcon from "../misc/deleteIcon.png";

const ModalExercise = ({id, updateExercise, deleteExercise}) => {
    const [exercise, setExercise] = useState(
        {
            key: id,
            name: "",
            achieved: false,
            sets: 0,
            reps: 0,
        }
    )

    const handleInput = event => {
        try { //if user enters non numeric value
            if(event.target.name === "sets" || event.target.name === "reps") {
                const value = JSON.parse(event.target.value)
                setExercise({...exercise, [event.target.name]: value})
            } else {
                setExercise({...exercise, [event.target.name]: event.target.value})
            }
        } catch (e) {
            console.log(e)
        }

    }

    useEffect(() => {
        updateExercise(exercise)
    }, [exercise])

    const onDelete = key => {
        deleteExercise(exercise.key)
    }

    return (
        <FormGroup row>
            <Col xs={3}>
                <Input
                    onChange={handleInput}
                    type="text"
                    name='name'
                    style={{fontSize: '8px'}}/>
            </Col>
            <Col xs={2}>
                <Input
                    onChange={handleInput}
                    type="text"
                    name='sets'
                    style={{width: '40px', fontSize: '8px'}}/>
            </Col>
            <Col xs={2}>
                <Input
                    onChange={handleInput}
                    type="text"
                    name='reps'
                    style={{width: '40px', fontSize: '8px'}}/>
            </Col>
            <Col xs={3}>
                <Input
                    onChange={handleInput}
                    type="text"
                    name='goal'
                    style={{width: '60px', fontSize: '8px'}}/>
            </Col>
            <Col xs={1}>
                <img src={deleteIcon} style={{width: '20px'}} onClick={onDelete} alt={"deleteExercise"}/>
            </Col>
        </FormGroup>
    )
}

export default ModalExercise;
