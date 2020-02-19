import ModalExercise from "./ModalExercise";
import React from "react";


const ModalExerciseList = ({exercises, updateExercise, deleteExercise}) => {

    return (<div>
        {exercises.map(item => <ModalExercise key={item.key}
                                              id={item.key}
                                              updateExercise={updateExercise}
                                              deleteExercise={deleteExercise}/>)}
    </div>)

}

export default ModalExerciseList;
