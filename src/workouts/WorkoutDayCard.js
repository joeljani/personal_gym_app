import React from "react";
import moment from "moment";
import {Card, CardBody, CardFooter, CardSubtitle, CardTitle, Input, Table} from "reactstrap";

import ModalWorkout from "./ModalWorkout";

const WorkoutDayCard = ({date, workout, createWorkout, deleteWorkout}) => {

    const day = moment(date).format('ddd');

    const noWorkout = () => workout === undefined;

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
                                    onChange={() => console.log("checked")}
                                />
                            </td>
                        </tr>
                    )}
                    </tbody>)
                    }
                </Table>
            </CardBody>
            <CardFooter>
                <ModalWorkout workout={workout} date={date} noWorkout={noWorkout()} createWorkout={createWorkout}
                              deleteWorkout={deleteWorkout}/>
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
