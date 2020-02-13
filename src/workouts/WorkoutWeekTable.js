import React, {useState} from "react";
import {
    CardBody,
    CardTitle,
    CardSubtitle,
    Card,
    Table,
    Button, Modal, ModalHeader, ModalBody
} from "reactstrap";
import {useSelector} from "react-redux";
import moment from "moment";
import DayPicker from "react-day-picker";
import WorkoutDayCard from "./WorkoutDayCard";


//TODO Creation of a workout and listing of correct workout
const WorkoutWeekTable = ({workouts}) => {

    const currentWeek = useSelector(state => state.currentWeek)

    const getWorkoutBasedOnDay = (date) => {
        if(workouts !== undefined) {
            return workouts.find(workout => parseInt(workout.date.substring(8)) === date.getDate())
        }
    }


    return (
        <div>
            {currentWeek.map(d => <WorkoutDayCard key={d.getDate()} date={d} workout={getWorkoutBasedOnDay(d)}/>)}
        </div>
    )
};


export default WorkoutWeekTable;


