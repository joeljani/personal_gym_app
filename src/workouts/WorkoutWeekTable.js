import React from "react";
import {
    CardBody,
    CardTitle,
    CardSubtitle,
    Card,
    Table,
} from "reactstrap";


const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


const WorkoutWeekTable = ({workouts}) => {
    return (
        <div>
            {days.map(d => createDayCard(d))}
        </div>
    )
};

const createDayCard = (day) => {
    return (
        <Card>
            <CardTitle>{day}</CardTitle>
            <CardSubtitle>Push</CardSubtitle>
            <CardBody>
                <Table>
                    <thead>
                    <tr>
                        <th>Exercise</th>
                        <th>Reps</th>
                        <th>Sets</th>
                        <th>Achieved</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/*workout content*/}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    )
};


export default WorkoutWeekTable;


