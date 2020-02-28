import React from "react";
import {Card, CardBody, CardTitle} from "reactstrap";


const WorkoutDayCard = ({date, workout, createWorkout, updateWorkout, deleteWorkout}) => {

    const noWorkout = () => workout === undefined;

    const exerciseAchieved = exercise => {
        exercise.achieved = exercise.achieved === true ? false : true
        workout.exercises = workout.exercises.map(e => e.id === exercise.id ? exercise : e)
        updateWorkout(workout);
    }

    return (
        <Card className={"workoutCards"}>
            <CardTitle className={"cardTitleGrid"}>
                <div className={"workoutName"}>{noWorkout() ? ("") : (<h3>{workout.name}</h3>)}</div>
                <div className={"editWorkout"}>...</div>
            </CardTitle>
            <div className={"cardBodyContainer"}>
                <CardBody className={"cardBody"}>
                    <div className={"cardBodyInside"}>
                        {noWorkout() ? null : (
                                workout.exercises.map(e =>
                                    <div className={"cardBodyGrid"}>
                                        <span className={"cardBodyHeader"}>{e.name}</span>
                                        <span className={"setsLabel"}>Sets</span> <span className={"sets"}>{e.sets}</span>
                                        <span className={"repsLabel"}>Reps</span> <span className={"reps"}>{e.reps}</span>
                                        <span className={"goalLabel"}>Goal</span> <span className={"goal"}>{e.goal}</span>
                                    </div>
                                ))
                        }
                    </div>
                </CardBody>
            </div>
        </Card>
    )
};


const cardStyle = {
    marginTop: '20px',
    marginBottom: '20px',
    fontSize: '9px'
}

export default WorkoutDayCard;
