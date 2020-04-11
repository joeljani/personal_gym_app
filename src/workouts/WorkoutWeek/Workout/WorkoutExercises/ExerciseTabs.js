import React from "react";
import {emptyExercise} from "../../../../helper/EmptyObjects";
import "./WorkoutExercise.css"

const ExerciseTabs = ({exercises, selectedExercise, addExercise, updateExercise, deleteExercise,
                          setSelectedExerciseIndex}) => {

    const handleInput = event => {
        const updatedExercise = {...selectedExercise, name: event.target.value};
        updateExercise(updatedExercise);
    };

    let verticalLineStyle;
    if (exercises.indexOf(selectedExercise) === -1)
        verticalLineStyle = {transform: `translateY(0px)`};
    else
        verticalLineStyle = {transform: `translateY(${exercises.indexOf(selectedExercise) * 45}px)`};

    const gridRowStyle = {gridTemplateRows: [...new Array(exercises.length)].reduce(acc => acc + "40px ", "")};


    return (
        <div id={"exerciseTabs"} style={gridRowStyle}>
            <div id={"verticalLine"} style={verticalLineStyle}/>
            {exercises.map((e, i) =>
                <div className={"exerciseTabElement"} key={i}>
                    <input value={e.name}
                           placeholder={"Exercise name"}
                           onChange={handleInput}
                           onClick={() => setSelectedExerciseIndex(i)}
                    />
                    <button className={"deleteExerciseButton"} onClick={() => deleteExercise(e)}>x</button>
                </div>
            )}
            <button onClick={() => addExercise(emptyExercise(Date.now()))}
                    className={"addExerciseButton"}> Add Exercise
            </button>
        </div>
    )
};

export default ExerciseTabs;
