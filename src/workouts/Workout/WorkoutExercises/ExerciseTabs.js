import React from "react";
import {emptyExercise} from "../../../helper/EmptyObjects";
import {Button} from "reactstrap";
import "./WorkoutExercise.css"

const ExerciseTabs = ({exercises, selectedExercise, addExercise, updateExercise, setSelectedExerciseIndex}) => {

    const handleInput = event => {
        const updatedExercise = {...selectedExercise, name: event.target.value};
        updateExercise(updatedExercise);
    };

    let verticalLineStyle;
    if(exercises.indexOf(selectedExercise) === -1)
        verticalLineStyle = {transform: `translateY(0px)`};
    else
        verticalLineStyle = {transform: `translateY(${exercises.indexOf(selectedExercise) * 45}px)`};

    const gridRowStyle = {gridTemplateRows: [...new Array(exercises.length)].reduce(acc => acc + "40px ", "")};


    return (
        <div id={"exerciseTabs"} style={gridRowStyle}>
            <div id={"verticalLine"} style={verticalLineStyle}/>
            {exercises.map((e, i) =>
                    <input className={"exerciseTabInput"}
                           placeholder={e.name === "" ? "Exercise name" : e.name}
                           onChange={handleInput}
                           onClick={() => setSelectedExerciseIndex(i)}
                           key={i}
                    />
            )}
            <Button onClick={() => addExercise(emptyExercise(Date.now()))}
                    id={"addExerciseButton"}> Add Exercise</Button>
        </div>
    )
};

export default ExerciseTabs;
