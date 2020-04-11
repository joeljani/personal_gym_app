import React, {useState} from "react";
import goArrow from "../../../misc/goArrow.png";
import "./Workout.css"
import {Modal, ModalHeader, ModalBody, ModalFooter, Table} from "reactstrap";
import WorkoutSelection from "./WorkoutSelection";

const WorkoutNav = ({currentWorkout, setSelectedWorkout, hideNav, deleteWorkout, chooseWorkout}) => {
    const [showMoreInfo, setShowMoreInfo] = useState(false);
    const [showWorkouts, setShowWorkouts] = useState(false);

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

    const toggle = () => {
        setShowMoreInfo(!showMoreInfo);
        setShowWorkouts(false);
    }

    return (
        <div>
            {hideParent()}
            {hideNav && navigateBack()}
            <div className={"navIconsContainer"}>
                <button onClick={navigateBack}><img className={"backArrow"} src={goArrow} alt={"Back to workoutweek"}/>
                </button>
                <button onClick={toggle} className={"editWorkout"}>...</button>
                <Modal isOpen={showMoreInfo} toggle={toggle}>
                    <ModalHeader toggle={toggle}>
                        Workout Options
                    </ModalHeader>
                    <ModalBody>
                        <button onClick={() => setShowWorkouts(!showWorkouts)} className={"accentButton"}>
                            Choose an existing workout
                        </button>
                        {showWorkouts && <WorkoutSelection chooseWorkout={chooseWorkout}
                                                           currentWorkout={currentWorkout}
                                                           setShowWorkouts={setShowWorkouts}
                                                           toggle={toggle}/>}
                    </ModalBody>
                    <ModalFooter>
                        <button onClick={() => onDeleteWorkout()} className={"deleteWorkoutButton"}>
                            Delete workout
                        </button>
                    </ModalFooter>
                </Modal>
            </div>
        </div>
    )
};

export default WorkoutNav;
