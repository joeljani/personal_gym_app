import React from "react";
import {useSelector} from "react-redux";
import WorkoutDayCard from "./WorkoutDayCard";


const WorkoutWeekTable = ({workouts, createWorkout}) => {

    const currentWeek = useSelector(state => state.currentWeek)

    const getWorkoutBasedOnDay = (date) => {
        if(workouts !== undefined) {
            return workouts.find(workout => parseInt(workout.date.substring(8)) === date.getDate()); //8th pos of (e.g) "2020-02-13" = "13"
        }
    }

    return (
        <div>
            {currentWeek.map(d => <WorkoutDayCard key={d.getDate()}
                                                  date={d}
                                                  workout={getWorkoutBasedOnDay(d)}
                                                  createWorkout={createWorkout}/>)}
        </div>
    )
};


export default WorkoutWeekTable;


