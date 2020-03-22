import React from "react";
import goArrow from "../../misc/goArrow.png";

const WorkoutNav = ({currentWorkout, setSelectedWorkout}) => {

    const hideShowParent = () => {
        let nav = document.getElementById("navigation")
        if (nav != null) nav.style.display === "none" ? nav.style.display = "grid" : nav.style.display = "none"
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


    return (
        <div>
            {hideShowParent()}
            <div className={"navIconsContainer"}>
                <button onClick={navigateBack}><img className={"backArrow"} src={goArrow} alt={"Back to workoutweek"}/>
                </button>
                <button onClick={() => console.log("edit workout click")} className={"editWorkout"}>...</button>
            </div>
            <div className={"workoutInfoHeader"}>
                <h3>{currentWorkout.name}</h3>
                <span>A workout with only pushing motions. A workout with only pushing motions</span>
            </div>
        </div>
    )
}


export default WorkoutNav;
