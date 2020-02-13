import React, {useState} from "react";
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
    Table,
    CardFooter
} from "reactstrap";

const WorkoutDayCard = ({date, workout}) => {

    const [modal, setModal] = useState(false);

    const toggle = () => {
        setModal(!modal);
    };

    const day = moment(date).format('ddd');

    const noWorkout = () => workout === undefined;

    const cardStyle = {
        marginTop: '20px',
        marginBottom: '20px'
    }

    const buttonStyle = {
        width: '150px',
        float: 'right',
        backgroundColor: 'white',
        color: 'black',
        fontSize: '10px',
    }


    return (
        <div>
            {noWorkout() ? (
                <Card style={cardStyle}>
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
                    <CardFooter>
                    <Button style={buttonStyle} onClick={toggle}>Create Workout</Button>
                    <Modal isOpen={modal} toggle={toggle}>
                        <ModalHeader toggle={toggle}>Create a workout</ModalHeader>
                        <ModalBody>
                        </ModalBody>
                    </Modal>
                    </CardFooter>
                </Card>
            ) : (
                <Card>
                    <CardTitle>{day}</CardTitle>
                    <CardSubtitle><h3>{workout.name}</h3></CardSubtitle>
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
                    <CardFooter>
                    {noWorkout() ? (
                        <Button style={buttonStyle} onClick={toggle}>Create Workout</Button>
                    ) : (
                        <Button style={buttonStyle} onClick={toggle}>Edit Workout</Button>
                    )}
                    <Modal isOpen={modal} toggle={toggle}>
                        <ModalHeader toggle={toggle}>Create a workout</ModalHeader>
                        <ModalBody>
                        </ModalBody>
                    </Modal>
                    </CardFooter>
                </Card>
            )}
        </div>


    )
};

export default WorkoutDayCard;
