import React from "react";


const WorkoutExercise = ({exercise}) => {
    return (
        <div className={"cardBodyGrid"}>
            <span className={"cardBodyHeader"}>{exercise.name}</span>
            <span className={"setsLabel"}>Sets</span> <span className={"sets"}>{exercise.sets}</span>
            <span className={"repsLabel"}>Reps</span> <span className={"reps"}>{exercise.reps}</span>
            <span className={"kgLabel"}>Kg</span> <span className={"kg"}>{exercise.kg}</span>
            <span className={"goalLabel"}>Goal</span> <span className={"goal"}>{exercise.goal}</span>
        </div>
    )
}

export default WorkoutExercise;
