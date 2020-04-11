import React, {useState} from "react";
import {useSelector} from "react-redux";
import {workoutDate, getWorkoutBasedOnDay, transformDateString} from "../../helper/DateHelperMethods";
import CurrentWeekPicker from "./CurrentWeekPicker";
import addIcon from "../../misc/addIcon.png";
import goArrow from "../../misc/goArrow.png";
import "./WorkoutWeek.css";
import {emptyWorkout} from "../../helper/EmptyObjects";
import Workout from "./Workout/Workout";


const WorkoutWeek = ({workouts, createWorkout, deleteWorkout, updateWorkout, deleteExercise}) => {

    const [selectedWorkout, setSelectedWorkout] = useState({})

    const currentWeek = useSelector(state => state.currentWeek)

    const isEmptyWorkout = workout => workout.name === "" && workout.exercises.length === 0

    const viewWorkout = workout => setSelectedWorkout(workout)
    const onAddWorkout = workout => setSelectedWorkout(workout)

    return (
        <div>
            {Object.entries(selectedWorkout).length === 0 ?
                <div className={"workoutWeek"}>
                    <div className={"currentWeekInfo"}>
                        <span className={"currentWeekHeader"}>Current week</span>
                        <CurrentWeekPicker/>
                    </div>
                    {currentWeek.map(d => {
                        const currentWorkout = getWorkoutBasedOnDay(d, workouts)
                        return (
                            <div className={"workoutDayGrid"} key={d.getDate()}>
                                <span className={"wDateName"}>{workoutDate(d)[0]}</span>
                                <span className={"wDate"}>{workoutDate(d)[1]}</span>
                                <div
                                    className={isEmptyWorkout(currentWorkout) ? "noWorkoutDayButton" : "workoutDayButton"}>
                                    {isEmptyWorkout(currentWorkout) ?
                                        <div className={"workoutNameWrapper"}>
                                            <span className={"noWorkoutName"}>Add workout</span>
                                            <button
                                                onClick={() => onAddWorkout(emptyWorkout(Date.now(), transformDateString(d)))}>
                                                <img src={addIcon} alt={"Add Workout"}/>
                                            </button>
                                        </div>
                                        :
                                        <div className={"workoutNameWrapper"}>
                                            <span className={"workoutName"}>{currentWorkout.name}</span>
                                            <button onClick={() => viewWorkout(currentWorkout)}>
                                                <img src={goArrow} alt={"View Workout"}/>
                                            </button>
                                        </div>
                                    }
                                </div>
                            </div>
                        )
                    })}
                </div>
                :
                <Workout workout={selectedWorkout}
                         setSelectedWorkout={setSelectedWorkout}
                         createWorkout={createWorkout}
                         updateWorkout={updateWorkout}
                         deleteWorkout={deleteWorkout}
                />
            }
        </div>
    )
}


export default WorkoutWeek;
