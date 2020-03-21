import React, {useState} from "react";
import goArrow from "../../misc/goArrow.png";
import WorkoutExercise from "./WorkoutExercises/WorkoutExercise";


const WorkoutBody = ({workout, setSelectedWorkout}) => {
    const [currentWorkout, setCurrentWorkout] = useState(workout)

    const hideShowParent = () => {
        let nav = document.getElementById("navigation")
        if (nav != null) nav.style.display === "none" ? nav.style.display = "grid" : nav.style.display = "none"
        let currentWeekInfo = document.getElementsByClassName("workoutWeek")[0]
        if (currentWeekInfo != null) currentWeekInfo.style.display === "none" ? currentWeekInfo.style.display = "" : currentWeekInfo.style.display = "none"
    }

    const navigateBack = () => {
        hideShowParent()
        let workoutBody = document.getElementsByClassName("workoutBody")[0]
        if (workoutBody != null) workoutBody.style.display === "none" ? workoutBody.style.display = "" : workoutBody.style.display = "none"
        setSelectedWorkout(undefined)
    }

    return (
        <div className={"workoutBodyWrapper"}>
            {hideShowParent()}
            <div className={"workoutBody"}>
                <div className={"navIconsContainer"}>
                    <button onClick={navigateBack}><img className={"backArrow"} src={goArrow} alt={"Add Workout"}/>
                    </button>
                    <button onClick={() => console.log("click")} className={"editWorkout"}>...</button>
                </div>
                <div className={"workoutInfoHeader"}>
                    <h3>{currentWorkout.name}</h3>
                    <span>A workout with only pushing motions A workout with only pushing motions</span>
                </div>
                <div className={"exercisesField"}>
                    <h5 style={{fontStyle: "italic"}}>Exercises</h5>
                    {currentWorkout.exercises.map((e, i) => {
                        return (
                            <WorkoutExercise key={i}
                                             exercise={e}
                                             index={i}/>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}


export default WorkoutBody;
