import React, {useEffect, useState} from "react";
import {Col, FormGroup, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import deleteIcon from "../../misc/deleteIcon.png";

const ModalExercise = ({id, currentExercise, updateExercise, deleteExercise}) => {
    const [exercise, setExercise] = useState(
        {
            id: id,
            name: currentExercise.name,
            achieved: currentExercise.achieved,
            sets: currentExercise.sets,
            reps: currentExercise.reps,
            goal: currentExercise.goal
        }
    )
    const [dropdownOpenSets, setDropdownOpenSets] = useState(false);
    const [dropdownOpenReps, setDropdownOpenReps] = useState(false);

    const toggleSets = () => setDropdownOpenSets(!dropdownOpenSets);
    const toggleReps = () => setDropdownOpenReps(!dropdownOpenReps);

    const setSets = x => {
        setExercise({...exercise, sets: x})
    }

    const setReps = x => {
        setExercise({...exercise, reps: x})
    }


    const handleInput = event => {
        setExercise({...exercise, [event.target.name]: event.target.value})
    }

    useEffect(() => {
        updateExercise(exercise)
    }, [exercise])

    const onDelete = () => {
        deleteExercise(exercise.id)
    }

    //TODO: SET STYLE FOR EXERCISE FIELDS
    return (
        <FormGroup row>
            <Col xs={3}>
                <Input
                    onChange={handleInput}
                    type="text"
                    name='name'
                    style={{fontSize: '8px'}}
                    value={currentExercise.name}/>
            </Col>
            <Col xs={2}>
                <Dropdown isOpen={dropdownOpenSets} toggle={toggleSets} >
                    <DropdownToggle caret style={{width: '40px', fontSize: '8px'}}>{currentExercise.sets}</DropdownToggle>
                    <DropdownMenu style={{overflowY: 'scroll', height: '100px', width:'20px', fontSize: '8px'}}>
                        {[...Array(20).keys()].map(x => <DropdownItem onClick={() => setSets(x)} key={x}>{x}</DropdownItem>)}
                    </DropdownMenu>
                </Dropdown>
            </Col>
            <Col xs={2}>
                <Dropdown isOpen={dropdownOpenReps} toggle={toggleReps} >
                    <DropdownToggle caret style={{width: '40px', fontSize: '8px'}}>{currentExercise.reps}</DropdownToggle>
                    <DropdownMenu style={{overflowY: 'scroll', height: '100px', width:'20px', fontSize: '8px'}}>
                        {[...Array(20).keys()].map(x => <DropdownItem onClick={() => setReps(x)} key={x}>{x}</DropdownItem>)}
                    </DropdownMenu>
                </Dropdown>
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
