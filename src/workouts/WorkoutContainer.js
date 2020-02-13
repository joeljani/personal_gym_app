import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import WorkoutWeekTable from "./WorkoutWeekTable";
import {Row} from "reactstrap";
import Col from "reactstrap/es/Col";
import Container from "reactstrap/es/Container";
import CurrentWeek from "./CurrentWeek";

const WorkoutContainer = ({serverUrl}) => {

    const workouts = useSelector(state => state.workouts);
    const currentWeek = useSelector(state => state.currentWeek)
    const dispatch = useDispatch();

    useEffect(() => console.log(currentWeek), [currentWeek])


    const fetchWorkouts = () => {
        dispatch(
            async dispatch => {
                const res = await fetch("http://127.0.0.1:8080/workouts");
                const data = await res.json();
                dispatch({type: "WORKOUTS_FETCHED", workouts: data});

            }
        );
    };

    useEffect(fetchWorkouts, [serverUrl]);

    return (
        <Container>
            <Row>
                <Col><h1>Header</h1></Col>
            </Row>
            <Row>
                <Col><CurrentWeek/></Col>
            </Row>
            <WorkoutWeekTable workouts={workouts}/>
        </Container>
    )


}

export default WorkoutContainer;
