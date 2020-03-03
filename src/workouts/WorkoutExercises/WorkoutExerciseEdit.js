import React, {useEffect, useState} from "react";
import {Dropdown, DropdownToggle, DropdownItem, DropdownMenu} from "reactstrap";
import deleteIcon from "../../misc/deleteIcon.png";

const WorkoutExerciseEdit = ({exercise, onDeleteExercise, updateExercise}) => {
    const [currentExercise, setCurrentExercise] = useState(
        {
            id: exercise.id,
            name: exercise.name,
            achieved: exercise.achieved,
            sets: exercise.sets,
            reps: exercise.reps,
            kg: exercise.kg,
            goal: exercise.goal
        }
    )
    const [dropdownOpenSets, setDropdownOpenSets] = useState(false);
    const [dropdownOpenReps, setDropdownOpenReps] = useState(false);

    useEffect(() => {
        if( JSON.stringify(currentExercise) !== JSON.stringify(exercise)) { //may not be robust but good for now
            updateExercise(currentExercise)
        }
    }, [currentExercise])

    const toggleSets = () => setDropdownOpenSets(!dropdownOpenSets);
    const toggleReps = () => setDropdownOpenReps(!dropdownOpenReps);

    const setSets = x => {
        setCurrentExercise({...currentExercise, sets: x})
    }

    const setReps = x => {
        setCurrentExercise({...currentExercise, reps: x})
    }

    const handleInput = event => {
        setCurrentExercise({...currentExercise, [event.target.name]: event.target.value})
    }

    const onDelete = () => {
        onDeleteExercise(exercise)

    }

    return (
        <div className={"cardBodyGrid"}>
            <input className={"cardBodyHeader"} name={"name"} defaultValue={currentExercise.name} onChange={handleInput}/>
            <img className={"deleteExerciseIcon"} src={deleteIcon} style={{width: '20px'}} onClick={onDelete} alt={"deleteExercise"}/>
            <span className={"setsLabel"}>Sets</span>
            <Dropdown className={"sets"} isOpen={dropdownOpenSets} toggle={toggleSets} >
                <DropdownToggle tag={"span"} caret>{currentExercise.sets}</DropdownToggle>
                <DropdownMenu style={{overflowY: 'scroll', height: '100px', width: '20px'}}>
                    {[...Array(20).keys()].map(x => <DropdownItem onClick={() => setSets(x)} key={x}>{x}</DropdownItem>)}
                </DropdownMenu>
            </Dropdown>

            <span className={"repsLabel"}>Reps</span>
            <Dropdown className={"reps"} isOpen={dropdownOpenReps} toggle={toggleReps} >
                <DropdownToggle tag={"span"} caret>{currentExercise.reps}</DropdownToggle>
                <DropdownMenu style={{overflowY: 'scroll', height: '100px', width: '10px'}}>
                    {[...Array(20).keys()].map(x => <DropdownItem onClick={() => setReps(x)} key={x}>{x}</DropdownItem>)}
                </DropdownMenu>
            </Dropdown>

            <span className={"kgLabel"}>Kg</span>
            <input className={"kg"} name={"kg"} defaultValue={exercise.kg} onChange={handleInput}/>

            <span className={"goalLabel"}>Goal</span>
            <input className={"goal"} name={"goal"} defaultValue={exercise.goal} onChange={handleInput}/>
        </div>
    )
}

export default WorkoutExerciseEdit;
