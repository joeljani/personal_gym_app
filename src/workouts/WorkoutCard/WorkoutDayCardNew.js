import React, {useEffect, useState} from "react";
import {Card, CardBody} from "reactstrap";
import WorkoutModal from "./WorkoutModal";


const WorkoutDayCardNew = ({workout, workoutDate}) => {
    const [currentWorkout, setCurrentWorkout] = useState({})

    useEffect(() => {
        setCurrentWorkout(workout)
    }, [workout])


    return (
        <div className={"workoutDayGrid"}>
            <span className={"wDate"}>{workoutDate}</span>
            <Card className={"workoutDayCardNew"}>
                <CardBody>
                    {workout === undefined ?
                        <div className={"workoutDayCardNewGrid"}>
                            <span className={"workoutName"}>No workout</span>
                            <WorkoutModal workout={currentWorkout}/>
                        </div>
                        :
                        <div className={"workoutDayCardNewGrid"}>
                            <span className={"workoutName"}>{workout.name}</span>
                            <button className={"editButton"} onClick={() => console.log("hey")}>...</button>
                        </div>
                    }
                </CardBody>
            </Card>
        </div>
    )
}

export default WorkoutDayCardNew;
