import React from "react";
import {useSelector} from "react-redux";
import {transformDateString, workoutDate} from "../helper/DateHelperMethods";
import {emptyWorkout} from "../helper/EmptyObjects";
import {Card, CardBody} from "reactstrap";
import WorkoutModal from "./Workout/WorkoutModal";


const WorkoutWeek = ({workouts, createWorkout, deleteWorkout, updateWorkout, deleteExercise}) => {

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

    return (
        <div className={"workoutWeek"}>
            {currentWeek.map(d => {
                const workout = getWorkoutBasedOnDay(d)
                return (
                    <div className={"workoutDayGrid"} key={d.getDate()}>
                        <span className={"wDate"}>{workoutDate(d)}</span>
                        <Card className={"workoutDayCardNew"}>
                            <CardBody>
                                <div className={"workoutDayCardNewGrid"}>
                                    <span className={"workoutName"}>
                                        {noWorkout(workout) ? "No workout" : workout.name}
                                    </span>
                                    <WorkoutModal workout={workout}
                                                  createWorkout={createWorkout}/>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                )
            })}
        </div>
    )
};


export default WorkoutWeek;


