import React from "react";
import {useSelector} from "react-redux";
import WorkoutDayCard from "./WorkoutCard/WorkoutDayCard";
import {transformDateString, workoutDate} from "../helper/DateHelperMethods";
import {emptyWorkout} from "../helper/EmptyObjects";


const WorkoutWeekTable = ({workouts, createWorkout, deleteWorkout, updateWorkout, deleteExercise}) => {

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


    return (
        <div>
            <div>
                <div className={"nextCardArrow"}></div>
            </div>
            <div className={"horizontalCarousel"}>
                {currentWeek.map(d =>
                    <div key={d.getDate()}>
                        <div className={"workoutDateTitle"}>
                            {workoutDate(d)}
                        </div>
                        <WorkoutDayCard key={d.getDate()}
                                            workout={getWorkoutBasedOnDay(d)}
                                            createWorkout={createWorkout}
                                            deleteWorkout={deleteWorkout}
                                            updateWorkout={updateWorkout}
                                            deleteExercise={deleteExercise}/>
                    </div>
                )}
            </div>
        </div>
    )
};


export default WorkoutWeekTable;


