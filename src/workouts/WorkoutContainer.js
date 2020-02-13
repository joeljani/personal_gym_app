import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import WorkoutWeekTable from "./WorkoutWeekTable";
import {Row} from "reactstrap";
import Col from "reactstrap/es/Col";
import Container from "reactstrap/es/Container";
import CurrentWeek from "./CurrentWeek";
import moment from "moment";


const WorkoutContainer = ({serverUrl}) => {

    const workouts = useSelector(state => state.workouts);
    const currentWeek = useSelector(state => state.currentWeek)
    const dispatch = useDispatch();

    const fetchWorkouts = () => {
        dispatch(
            async dispatch => {
                const res = await fetch(serverUrl + "/workouts");
                const data = await res.json();
                dispatch({type: "WORKOUTS_FETCHED", workouts: data});
            }
        );
    };
    useEffect(fetchWorkouts, [serverUrl]);

    const getWorkoutsOfCurrentWeek = (workouts) => {
        console.log(currentWeek)
        const currentWeekTransformed = currentWeek.map(d => {
            if(d.getDate() >= 10 && d.getMonth()+1 < 10) return "2020-"+"0" + (d.getMonth()+1) + "-" + d.getDate()
            else if(d.getDate() < 10 && d.getMonth()+1 < 10) return "2020-"+"0" + (d.getMonth()+1) + "-" + "0" + d.getDate()
            else if(d.getDate() >= 10 && d.getMonth()+1 >= 10) return  "2020-"+ (d.getMonth()+1) + "-" + d.getDate()
            else if(d.getDate() < 10 && d.getMonth()+1 >= 10) return "2020-"+ (d.getMonth()+1) + "-" + "0" + d.getDate()
        })
        return workouts.filter(workout => currentWeekTransformed.includes(workout.date))
    }


    return (
        <Container>
            <Row>
                <Col><h1>Header</h1></Col>
            </Row>
            <Row>
                <Col><CurrentWeek/></Col>
            </Row>
            <WorkoutWeekTable workouts={getWorkoutsOfCurrentWeek(workouts)}/>
        </Container>
    )


}

export default WorkoutContainer;
