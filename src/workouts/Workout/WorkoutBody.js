import React, {useState} from "react";
import {navigate} from "@reach/router";


const WorkoutBody = ({workout, setSelectedWorkout}) => {
    const [currentWorkout, setCurrentWorkout] = useState(workout)

    const hideShowParent = () => {
        let nav = document.getElementById("navigation")
        if(nav != null) nav.style.display === "none" ? nav.style.display = "grid" : nav.style.display = "none"
        let currentWeekInfo = document.getElementsByClassName("workoutWeek")[0]
        if(currentWeekInfo != null) currentWeekInfo.style.display === "none" ? currentWeekInfo.style.display = "" : currentWeekInfo.style.display = "none"
    }

    const navigateBack = () => {
        hideShowParent()
        let workoutBody = document.getElementsByClassName("workoutBody")[0]
        if(workoutBody != null) workoutBody.style.display === "none" ? workoutBody.style.display = "" : workoutBody.style.display = "none"
        setSelectedWorkout(undefined)
    }

    return (
        <div className={"workoutBodyWrapper"}>
            <div className={"workoutBody"}>
                {hideShowParent()}
                <button onClick={navigateBack}>back</button>
                <div>
                    <h4>{currentWorkout.name}</h4>
                </div>
            </div>
                <div className={"exercisesGrid"}>
                    <h3>Exercises</h3>
                    <div className={"exercise"}>
                    </div>
                </div>
        </div>
    )
}


export default WorkoutBody;
