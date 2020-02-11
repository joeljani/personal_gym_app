import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";

const WorkoutContainer = ({serverUrl}) => {

    const workouts = useSelector(state => state.workouts);
    const dispatch = useDispatch();


    const fetchWorkouts = () => {
        dispatch(
            async dispatch => {
                const res = await fetch(serverUrl + "/workouts");
                const data = await res.json();
                dispatch({type: "WORKOUTS_FETCHED", workouts: data});
            });
    }

    useEffect(fetchWorkouts, [serverUrl]);


    return (
        <div>
            <ul>
                {workouts.map(workout => <li key={workout.id}>{workout.name}</li>)}
            </ul>
        </div>
    )
}

export default WorkoutContainer;
