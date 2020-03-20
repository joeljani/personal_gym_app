import React, {useState} from "react";
import {useSelector} from "react-redux";
import {transformDateString, workoutDate} from "../helper/DateHelperMethods";
import {emptyWorkout} from "../helper/EmptyObjects";
import CurrentWeekPicker from "./CurrentWeekPicker";
import WorkoutBody from "./Workout/WorkoutBody";
import addIcon from "../misc/addIcon.png";
import goArrow from "../misc/goArrow.png";


const WorkoutWeek = ({workouts, createWorkout, deleteWorkout, updateWorkout, deleteExercise}) => {

    const [selectedWorkout, setSelectedWorkout] = useState(undefined)
    const currentWeek = useSelector(state => state.currentWeek)

    const getWorkoutBasedOnDay = (date) => {
        let stringDate;
        if (date.getDate().toString().length === 1) stringDate = "0" + date.getDate().toString();
        else stringDate = date.getDate().toString();

        if (workouts !== undefined) {
            const workout = workouts.find(workout => (workout.date.substring(8)) === stringDate); //8th pos of (e.g) "2020-02-13" = "13"
            if (workout !== undefined) return workout
            else {
                return emptyWorkout(Date.now().toString(), transformDateString(date));
            }
        }
    }

    const noWorkout = workout => workout.name === "" && workout.exercises.length === 0

    const viewWorkout = workout => {
        setSelectedWorkout(workout)
    }

    const onAddWorkout = () => {

    }


    return (
        <div>
            {selectedWorkout === undefined
                ?
                <div className={"workoutWeek"}>
                    <div className={"currentWeekInfo"}>
                        <span className={"currentWeekHeader"}>Current week</span>
                        <CurrentWeekPicker/>
                    </div>
                    {currentWeek.map(d => {
                        const currentWorkout = getWorkoutBasedOnDay(d)
                        return (
                            <div className={"workoutDayGrid"} key={d.getDate()}>
                                <span className={"wDateName"}>{workoutDate(d)[0]}</span>
                                <span className={"wDate"}>{workoutDate(d)[1]}</span>
                                <div className={noWorkout(currentWorkout) ? "noWorkoutDayButton" : "workoutDayButton"}>
                                    {noWorkout(currentWorkout) ?
                                        <div className={"workoutNameWrapper"}>
                                            <span className={"noWorkoutName"}>Add workout</span>
                                            <button onClick={onAddWorkout}>
                                                <img src={addIcon} alt={"Add Workout"}/>
                                            </button>
                                        </div>
                                        :
                                        <div className={"workoutNameWrapper"}>
                                            <span className={"workoutName"}>{currentWorkout.name}</span>
                                            <button onClick={() => viewWorkout(currentWorkout)}>
                                                <img src={goArrow} alt={"Add Workout"}/>
                                            </button>
                                        </div>
                                    }
                                </div>
                            </div>
                        )
                    })}
                </div>
                :
                <WorkoutBody workout={selectedWorkout}
                             setSelectedWorkout={setSelectedWorkout}
                             createWorkout={createWorkout}
                             deleteWorkout={deleteWorkout}
                             updateWorkout={updateWorkout}
                             deleteExercise={deleteExercise}
                />
            }
        </div>
    )
}


export default WorkoutWeek;
