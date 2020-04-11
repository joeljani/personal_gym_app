import React from "react";
import goArrow from "../../../misc/goArrow.png";
import "./Workout.css"

const WorkoutNav = ({currentWorkout, setSelectedWorkout, hideNav, deleteWorkout}) => {
    let nav = document.getElementById("navigation");

    const hideParent = () => {
        if (nav !== null) nav.style.display = "none";
        let workoutWeek = document.getElementsByClassName("workoutWeek")[0];
        if (workoutWeek != null) workoutWeek.style.display = "none"
    };

    const showParent = () => {
        if (nav !== null) nav.style.display = "";
        let workoutWeek = document.getElementsByClassName("workoutWeek")[0];
        if (workoutWeek != null) workoutWeek.style.display = ""
    };

    const navigateBack = () => {
        showParent();
        let workoutBody = document.getElementsByClassName("workoutBody")[0];
        if (workoutBody != null) {
            workoutBody.style.display === "none" ?
                workoutBody.style.display = "" : workoutBody.style.display = "none"
        }
        setSelectedWorkout({})
    };

    const onDeleteWorkout = _ => {
        navigateBack();
        deleteWorkout(currentWorkout)
    };

    return (
        <div>
            {hideParent()}
            {hideNav && navigateBack()}
            <div className={"navIconsContainer"}>
                <button onClick={navigateBack}><img className={"backArrow"} src={goArrow} alt={"Back to workoutweek"}/>
                </button>
                <button onClick={() => onDeleteWorkout()} className={"editWorkout"}>...</button>
            </div>
        </div>
    )
};

export default WorkoutNav;
