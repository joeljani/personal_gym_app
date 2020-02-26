import React, {useState} from "react";
import moment from "moment";
import {Card, CardBody, CardFooter, CardSubtitle, CardTitle, Input, Table} from "reactstrap";
import ModalWorkoutCreate from "./modalWorkout/ModalWorkoutCreate";
import ModalWorkoutUpdate from "./modalWorkout/ModalWorkoutUpdate";


const WorkoutDayCard = ({date, workout, createWorkout, updateWorkout, deleteWorkout}) => {
    const workoutDate = moment(date).format('ddd') + "  " + date.getDate() + "." + (date.getMonth() + 1) + " ";

    const noWorkout = () => workout === undefined;

    const exerciseAchieved = exercise => {
        exercise.achieved = exercise.achieved === true ? false : true
        workout.exercises = workout.exercises.map(e => e.id === exercise.id ? exercise : e)
        updateWorkout(workout);
    }

    return (
        <Card className={"workoutCards"}>
            <CardTitle style={{margin: '0.9rem'}}>{workoutDate}</CardTitle>
            <CardSubtitle style={{textAlign: 'center'}}>{noWorkout() ? ("") : (<h3>{workout.name}</h3>)}</CardSubtitle>
            <div className={"cardBodyContainer"}>
                <CardBody className={"cardBody"}>
                    <Table borderless={true}>
                        <thead>
                        <tr>
                            <th>Exercises</th>
                            <th>Sets</th>
                            <th>Reps</th>
                            <th>Goal</th>
                            <th>Achieved</th>
                        </tr>
                        </thead>
                        {noWorkout() ? (<div></div>) : (<tbody>
                        {workout.exercises.map(e =>
                            <tr key={e.name}>
                                <td>{e.name}</td>
                                <td>{e.sets}</td>
                                <td>{e.reps}</td>
                                <td>{e.goal}</td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={e.achieved}
                                        onChange={() => exerciseAchieved(e)}
                                    />
                                </td>
                            </tr>
                        )}
                        </tbody>)
                        }
                    </Table>
                </CardBody>
            </div>
            <CardFooter>
                {noWorkout() ?
                    <ModalWorkoutCreate date={date} createWorkout={createWorkout}/>
                    :
                    <ModalWorkoutUpdate date={date} workout={workout} updateWorkout={updateWorkout}
                                        deleteWorkout={deleteWorkout}/>}
            </CardFooter>
        </Card>
    )
};


const cardStyle = {
    marginTop: '20px',
    marginBottom: '20px',
    fontSize: '9px'
}

export default WorkoutDayCard;
