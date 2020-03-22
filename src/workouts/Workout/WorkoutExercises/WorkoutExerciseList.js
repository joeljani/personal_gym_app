import React from "react";
import WorkoutExercise from "./WorkoutExercise";

const WorkoutExerciseList = ({workout}) => {

    return (
        <div className={"exercisesField"}>
            <h5 style={{fontStyle: "italic"}}>Exercises</h5>
            {workout.exercises.map((e, i) => <WorkoutExercise key={i}
                                                                         exercise={e}
                                                                         index={i}/>)}
        </div>
    )

}

export default WorkoutExerciseList;
