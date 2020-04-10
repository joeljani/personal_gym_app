import React from "react";
import goArrow from "../../misc/goArrow.png";
import "./Workout.css"

const WorkoutNav = ({currentWorkout, setSelectedWorkout, canDisplayNav, canNavigateBack, deleteWorkout}) => {

    const hideShowParent = () => {
        let nav = document.getElementById("navigation")
        console.log(nav.style.display)
        if (nav !== null) nav.style.display === "" ? nav.style.display = "none" : nav.style.display = ""
        let currentWeekInfo = document.getElementsByClassName("workoutWeek")[0]
        if (currentWeekInfo != null) {
            currentWeekInfo.style.display === "none" ?
                currentWeekInfo.style.display = "" : currentWeekInfo.style.display = "none"
        }
    }

    const navigateBack = () => {
        hideShowParent()
        let workoutBody = document.getElementsByClassName("workoutBody")[0]
        if (workoutBody != null) {
            workoutBody.style.display === "none" ?
                workoutBody.style.display = "" : workoutBody.style.display = "none"
        }
        setSelectedWorkout({})
    }

    const onDeleteWorkout = _ => {
        navigateBack()
        deleteWorkout(currentWorkout)
    }

    return (
        <div>
            {canNavigateBack && navigateBack()}
            {!canDisplayNav && hideShowParent()}
            <div className={"navIconsContainer"}>
                <button onClick={navigateBack}><img className={"backArrow"} src={goArrow} alt={"Back to workoutweek"}/>
                </button>
                <button onClick={() => onDeleteWorkout()} className={"editWorkout"}>...</button>
            </div>
        </div>
    )
}


export default WorkoutNav;
