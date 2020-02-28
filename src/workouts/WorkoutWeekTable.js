import React from "react";
import {useSelector} from "react-redux";
import WorkoutDayCard from "./WorkoutDayCard";
import {workoutDate} from "../helper/DateHelperMethods";


const WorkoutWeekTable = ({workouts, createWorkout, deleteWorkout, updateWorkout}) => {

    const currentWeek = useSelector(state => state.currentWeek)

    const getWorkoutBasedOnDay = (date) => {
        if(workouts !== undefined) {
            return workouts.find(workout => (workout.date.substring(8)) === date.getDate().toString()); //8th pos of (e.g) "2020-02-13" = "13"
        }
    }

    return (
        <div className={"horizontalCarousel"}>
            {currentWeek.map(d =>
                <div>
                    <div className={"workoutDateTitle"}>
                        {workoutDate(d)}
                    </div>
                    <div>
                        <WorkoutDayCard key={d.getDate()}
                                        date={d}
                                        workout={getWorkoutBasedOnDay(d)}
                                        createWorkout={createWorkout}
                                        deleteWorkout={deleteWorkout}
                                        updateWorkout={updateWorkout}/>
                    </div>
                </div>
            )}
        </div>
    )
};


export default WorkoutWeekTable;


