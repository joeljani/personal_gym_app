import moment from "moment";
import {
    Button,
    Card,
    CardBody,
    CardSubtitle,
    CardTitle,
    Input,
    Modal,
    ModalBody,
    ModalHeader,
    Table
} from "reactstrap";
import React, {useState} from "react";

const WorkoutDayCard = ({date, workout}) => {

    const [modal, setModal] = useState(false);

    const toggle = () => {
        setModal(!modal);
    };

    const day = moment(date).format('ddd');

    const noWorkout = () => workout === undefined;

    return (
        <div>
            {noWorkout() ? (
                <Card>
                    <CardTitle>{day}</CardTitle>
                    <CardSubtitle></CardSubtitle>
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
                        </Table>
                    </CardBody>
                    <Button onClick={toggle}>Create Workout</Button>
                    <Modal isOpen={modal} toggle={toggle}>
                        <ModalHeader toggle={toggle}>Create a workout</ModalHeader>
                        <ModalBody>
                        </ModalBody>
                    </Modal>
                </Card>
            ) : (
                <Card>
                    <CardTitle>{day}</CardTitle>
                    <CardSubtitle>{workout.name}</CardSubtitle>
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
                            {workout.exercises.map(e =>
                                <tr>
                                    <td>{e.name}</td>
                                    <td>{e.reps}</td>
                                    <td>{e.sets}</td>
                                    <td>
                                        <Input
                                            type="checkbox"
                                            onChange={() => console.log("checked")}
                                        />
                                    </td>
                                </tr>)}
                            </tbody>
                        </Table>
                    </CardBody>
                    <Button onClick={toggle}>Create Workout</Button>
                    <Modal isOpen={modal} toggle={toggle}>
                        <ModalHeader toggle={toggle}>Create a workout</ModalHeader>
                        <ModalBody>
                        </ModalBody>
                    </Modal>
                </Card>
            )}
        </div>


    )
};

export default WorkoutDayCard;
