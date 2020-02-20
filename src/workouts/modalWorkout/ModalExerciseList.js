import ModalExercise from "./ModalExercise";
import React from "react";


const ModalExerciseList = ({workout, updateExercise, deleteExercise}) => {
    return (<div>
        {workout.exercises.map(e => <ModalExercise key={e.id}
                                           id={e.id}
                                           currentExercise={e}
                                           updateExercise={updateExercise}
                                           deleteExercise={deleteExercise}/>)}
    </div>)

}

export default ModalExerciseList;
