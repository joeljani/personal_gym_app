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
    CardFooter, Form, FormGroup, Label, Col, Row
} from "reactstrap";
import deleteIcon from '../misc/deleteIcon.png';

const WorkoutDayCard = ({date, workout, createWorkout}) => {

    const [modal, setModal] = useState(false);
    const [modalExercises, setModalExercises] = useState([modalExercise()])
    const [currentWorkout, setCurrentWorkout] = useState(
        {
            name: '',
            date: '',
            notes: '',
            exercises: [],
        })

    const toggle = () => {
        setModal(!modal);
    };

    const day = moment(date).format('ddd');

    const noWorkout = () => workout === undefined;

    const addExercise = () => {
        const updatedModalExercises = modalExercises.concat(modalExercise())
        setModalExercises(updatedModalExercises)
    }

    const change = event => {
        const transformedDate = transformDateString(date) //TODO: change location of set date for better performance
        setCurrentWorkout({...currentWorkout, [event.target.name]: event.target.value, date: transformedDate})
    }

    const onSaveWorkout = () => {
        createWorkout(currentWorkout);
        toggle()
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
                        <th>Reps</th>
                        <th>Sets</th>
                        <th>Goal</th>
                        <th>Achieved</th>
                    </tr>
                    </thead>
                    {noWorkout() ? (<div></div>) : (<tbody>
                    {workout.exercises.map(e =>
                        <tr>
                            <td>{e.name}</td>
                            <td>{e.reps}</td>
                            <td>{e.sets}</td>
                            <td/>
                            <td>
                                <Input
                                    style={{right: '-70%', position: 'relative'}} //TODO: find solution for larger sizes
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
                <Button style={buttonStyle}
                        onClick={toggle}>{noWorkout() ? ("Create Workout") : ("Edit Workout")}</Button>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>{noWorkout() ? ("Create Workout") : ("Edit Workout")}</ModalHeader>
                    <ModalBody>
                    </ModalBody>
                </Modal>
            </CardFooter>
            <Modal isOpen={modal} toggle={toggle} style={{fontSize: '8px'}}>
                <ModalHeader toggle={toggle}>{noWorkout() ? ("Create Workout") : ("Edit Workout")}</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup row>
                            <Label md={2} for="workoutName">
                                Workout name
                            </Label>
                            <Col md={10}>
                                <Input onChange={change}
                                       type="text"
                                       name='name'
                                />
                            </Col>
                        </FormGroup>
                        <Row>
                            <Label xs={3}>
                                Exercise
                            </Label>
                            <Label xs={2}>
                                Sets
                            </Label>
                            <Label xs={2}>
                                Reps
                            </Label>
                            <Label xs={3}>
                                Goal
                            </Label>
                            <Label xs={1}/>
                        </Row>
                        {[...Array(modalExercises.length)].map(() => modalExercise(change))}
                        <Button onClick={addExercise}>Add exercise</Button>
                        <FormGroup row>
                            <Label md={2} for="workoutNotes">
                                Notes
                            </Label>
                            <Col md={10}>
                                <Input
                                    onChange={change}
                                    type="text"
                                    name='notes'
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col className="clearfix" style={{padding: '.2rem'}}>
                                <Button onClick={onSaveWorkout} className="float-right" color="secondary">Save</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </Card>
    )
};

const modalExercise = (change) => {
    return (
        <FormGroup row>
            <Col xs={3}>
                <Input
                       style={{fontSize: '8px'}}/>
            </Col>
            <Col xs={2}>
                <Input style={{width: '40px', fontSize: '8px'}}/>
            </Col>
            <Col xs={2}>
                <Input style={{width: '40px', fontSize: '8px'}}/>
            </Col>
            <Col xs={3}>
                <Input style={{width: '60px', fontSize: '8px'}}/>
            </Col>
            <Col xs={1}>
                <img src={deleteIcon} style={{width: '20px'}} onClick={() => console.log("delete exercise")} alt={'delete'}/>
            </Col>
        </FormGroup>
    )
}


const cardStyle = {
    marginTop: '20px',
    marginBottom: '20px',
    fontSize: '9px'
}

const buttonStyle = {
    width: '150px',
    float: 'right',
    backgroundColor: 'white',
    color: 'black',
    fontSize: '10px',
}

const transformDateString = (d) => {
    if(d.getDate() >= 10 && d.getMonth()+1 < 10) return "2020-"+"0" + (d.getMonth()+1) + "-" + d.getDate()
    else if(d.getDate() < 10 && d.getMonth()+1 < 10) return "2020-"+"0" + (d.getMonth()+1) + "-" + "0" + d.getDate()
    else if(d.getDate() >= 10 && d.getMonth()+1 >= 10) return  "2020-"+ (d.getMonth()+1) + "-" + d.getDate()
    else if(d.getDate() < 10 && d.getMonth()+1 >= 10) return "2020-"+ (d.getMonth()+1) + "-" + "0" + d.getDate()
}

export default WorkoutDayCard;
