import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import WorkoutWeekTable from "./WorkoutWeekTable";
import {Row} from "reactstrap";
import Col from "reactstrap/es/Col";
import Container from "reactstrap/es/Container";
import CurrentWeekPicker from "./CurrentWeekPicker";
import {transformDateString} from "../helper/TransformDateString";

//TODO: get serverurl from redux store
const WorkoutContainer = ({serverUrl}) => {

    const workouts = useSelector(state => state.workouts);
    const currentWeek = useSelector(state => state.currentWeek)
    const dispatch = useDispatch();

    const fetchWorkouts = () => {
        dispatch(
            async dispatch => {
                const res = await fetch("http://127.0.0.1:8080" + "/workouts");
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
                dispatch({
                    type: "WORKOUTS_CHANGED",
                    workouts: workouts.concat(newWorkout)
                })
            }
        } catch (error) {
            console.error(error)
        }
    }

    const updateWorkout = async workout => {
        console.log(workout)
        const request = new Request(serverUrl + "/workouts/" + workout.id, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json; charset=utf-8'
            }),
            body: JSON.stringify(workout)
        });
        console.log(request)
        try {
            const response = await fetch(request);
            if (!response.ok) {
                console.log('Status Code: ' + response.status);
            } else {
                dispatch({
                    type: "WORKOUTS_CHANGED",
                    workouts: workouts.map(w => w.id === workout.id ? workout : w)
                })
            }
        } catch (error) {
            console.error(error)
        }
    }

    const deleteWorkout = async workout => {
        const request = new Request(serverUrl + "/workouts/" + workout.id, {
            method: 'DELETE',
        });
        try {
            const response = await fetch(request);
            if (!response.ok) {
                console.log('Status Code: ' + response.status);
            } else {
                const modifiedWorkoutList = workouts.filter(w => w.id !== workout.id)
                dispatch({
                    type: "WORKOUTS_CHANGED",
                    workouts: modifiedWorkoutList
                })
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
            <WorkoutWeekTable workouts={getWorkoutsOfCurrentWeek(workouts)}
                              createWorkout={createWorkout}
                              deleteWorkout={deleteWorkout}
                              updateWorkout={updateWorkout}/>
        </Container>
    )
}


export default WorkoutContainer;
