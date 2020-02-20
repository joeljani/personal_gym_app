import React, {useState} from "react";
import moment from "moment";
import {Card, CardBody, CardFooter, CardSubtitle, CardTitle, Input, Table} from "reactstrap";
import ModalWorkoutCreate from "./modalWorkout/ModalWorkoutCreate";
import ModalWorkoutUpdate from "./modalWorkout/ModalWorkoutUpdate";


const WorkoutDayCard = ({date, workout, createWorkout, updateWorkout, deleteWorkout}) => {
    const day = moment(date).format('ddd');

    const noWorkout = () => workout === undefined;

    const exerciseAchieved = exercise => {
        exercise.achieved = exercise.achieved === true ? false : true
        workout.exercises = workout.exercises.map(e => e.id === exercise.id ? exercise : e)
        updateWorkout(workout);
    }

    return (
        <Card style={cardStyle}>
            <CardTitle>{day}</CardTitle>
            <CardSubtitle>{noWorkout() ? ("") : (<h3>{workout.name}</h3>)}</CardSubtitle>
            <CardBody>
                <Table>
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
                            <td/>
                            <td>
                                <Input
                                    style={{
                                        right: '-70%',
                                        position: 'relative'
                                    }} //TODO: find solution for larger displays (e.g tablet)
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
            <CardFooter>
                {noWorkout() ?
                    <ModalWorkoutCreate date={date} createWorkout={createWorkout}/>
                    :
                    <ModalWorkoutUpdate date={date} workout={workout} updateWorkout={updateWorkout} deleteWorkout={deleteWorkout}/>}
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
