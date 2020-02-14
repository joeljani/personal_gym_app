import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import WorkoutWeekTable from "./WorkoutWeekTable";
import {Row} from "reactstrap";
import Col from "reactstrap/es/Col";
import Container from "reactstrap/es/Container";
import CurrentWeekPicker from "./CurrentWeekPicker";


const WorkoutContainer = ({serverUrl}) => {

    const workouts = useSelector(state => state.workouts);
    const currentWeek = useSelector(state => state.currentWeek)
    const dispatch = useDispatch();

    const fetchWorkouts = () => {
        dispatch(
            async dispatch => {
                const res = await fetch("http://192.168.192.65:8080" + "/workouts");
                const data = await res.json();
                dispatch({type: "WORKOUTS_FETCHED", workouts: data});
            }
        );
    };
    useEffect(fetchWorkouts, [serverUrl]);

    const createWorkout = async workout => {
        const request = new Request(serverUrl + "/workouts", {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json; charset=utf-8'
            }),
            body: JSON.stringify(workout)
        });
        try {
            const response = await fetch(request);
            if (!response.ok) {
                console.log('Status Code: ' + response.status);
            } else {
                const newWorkout = await response.json();
                dispatch({type: "WORKOUTS_CHANGED", workouts: workouts.concat(newWorkout)})
            }
        } catch (error) {
            console.error(error)
        }
    }

    const getWorkoutsOfCurrentWeek = (workouts) => {
        const currentWeekTransformed = currentWeek.map(d => transformDateString(d))
        return workouts.filter(workout => currentWeekTransformed.includes(workout.date))
    }

    return (
        <Container>
            <Row>
                <Col><h3>Current week</h3></Col>
            </Row>
            <Row>
                <Col><CurrentWeekPicker/></Col>
            </Row>
            <WorkoutWeekTable workouts={getWorkoutsOfCurrentWeek(workouts)} createWorkout={createWorkout}/>
        </Container>
    )
}

const transformDateString = (d) => {
    if(d.getDate() >= 10 && d.getMonth()+1 < 10) return "2020-"+"0" + (d.getMonth()+1) + "-" + d.getDate()
    else if(d.getDate() < 10 && d.getMonth()+1 < 10) return "2020-"+"0" + (d.getMonth()+1) + "-" + "0" + d.getDate()
    else if(d.getDate() >= 10 && d.getMonth()+1 >= 10) return  "2020-"+ (d.getMonth()+1) + "-" + d.getDate()
    else if(d.getDate() < 10 && d.getMonth()+1 >= 10) return "2020-"+ (d.getMonth()+1) + "-" + "0" + d.getDate()
}

export default WorkoutContainer;
