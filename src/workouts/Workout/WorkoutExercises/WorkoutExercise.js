import React, {useState} from "react";
import {Collapse} from "reactstrap";
import "./WorkoutExercise.css"


const WorkoutExercise = ({exercise, index, onDeleteExercise}) => {

    const [showMoreInfo, setShowMoreInfo] = useState(false)

    const exerciseLabels = Object.keys(exercise).filter(label => {
        return label !== "_id" && label !== "name" && label !== "__v"
    })

    const exerciseLabelHeaders = exerciseLabels.filter(l => l === "reps" || l === "sets" || l === "kg")

    const toggle = () => {
        setShowMoreInfo(!showMoreInfo)
        let togglerStyle = document.getElementById("moreExerciseInfoToggler"+index).style
        togglerStyle.transition = "0.5s"
        togglerStyle.transform === "" ?
            togglerStyle.transform = "translateY(80%) rotate(180deg)"
            :
            togglerStyle.transform = ""
    }

    return (
        <div>
            <div className={"exercise"}>
                <div>
                    <h4>{exercise.name}</h4>
                    {exerciseLabelHeaders.length !== 3 ?
                        <div className={"exerciseGrid"}>
                            {exerciseLabels.slice(0, 3).map(label =>
                                <div>
                                    <span>{label}</span>
                                    <span>{exercise[label]}</span>
                                </div>
                            )}
                            <button onClick={toggle} id={"moreExerciseInfoToggler"+index}><span>V</span></button>
                        </div>
                        :
                        <div className={"exerciseGrid"}>
                            <span>Sets</span>
                            <span>{exercise["sets"]}</span>
                            <span>Reps</span>
                            <span>{exercise["sets"]}</span>
                            <span>Kg</span>
                            <span>{exercise["kg"]}</span>
                            <button onClick={toggle} id={"moreExerciseInfoToggler"+index}><span>V</span></button>
                        </div>
                    }
                    <Collapse isOpen={showMoreInfo} className={"moreExerciseInfo"}>
                        {exerciseLabelHeaders.length !== 3 ?
                            exerciseLabels.slice(3, exerciseLabels.length).map(label =>
                                <div className={"exerciseGrid"} key={index}>
                                    <span>{label}</span>
                                    <span>{exercise[label]}</span>
                                </div>
                            )
                            :
                            exerciseLabels.map(label => {
                                if (label !== "reps" && label !== "sets" && label !== "kg") {
                                    return (
                                        <div className={"exerciseGrid"} key={index}>
                                            <span>{label}</span>
                                            <span>{exercise[label]}</span>
                                        </div>
                                    )
                                } else return null
                            })
                        }
                    </Collapse>
                </div>
            </div>
            {/*
            <Button onClick={() => onDeleteExercise(exercise)}>Delete exercise</Button>
*/}
        </div>
    )
}

export default WorkoutExercise;
