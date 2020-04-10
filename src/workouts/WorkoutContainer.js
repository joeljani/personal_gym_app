import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {transformDateString} from "../helper/DateHelperMethods";
import WorkoutWeek from "./WorkoutWeek/WorkoutWeek";


const WorkoutContainer = () => {

    const workouts = useSelector(state => state.workouts);
    const currentWeek = useSelector(state => state.currentWeek)
    const serverUrl = useSelector(state => state.serverUrl);
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
                console.log(newWorkout)
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
        const request = new Request(serverUrl + "/workouts/" + workout._id, {
            method: 'PUT',
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
                dispatch({
                    type: "WORKOUTS_CHANGED",
                    workouts: workouts.map(w => w._id === workout._id ? workout : w)
                })
            }
        } catch (error) {
            console.error(error)
        }
    }

    const deleteWorkout = async workout => {
        console.log(workout)
        const request = new Request(serverUrl + "/workouts/" + workout._id, {
            method: 'DELETE',
        });
        try {
            const response = await fetch(request);
            if (!response.ok) {
                console.log('Status Code: ' + response.status);
            } else {
                const modifiedWorkoutList = workouts.filter(w => w._id !== workout._id)
                dispatch({
                    type: "WORKOUTS_CHANGED",
                    workouts: modifiedWorkoutList
                })
            }
        } catch (error) {
            console.error(error)
        }
    }

    const deleteExercise = async (eId, wId) => {
        const request = new Request(serverUrl + "/exercises/" + eId + "/workout/" + wId, {
            method: 'DELETE',
        });
        try {
            const response = await fetch(request);
            if (!response.ok) console.log('Status Code: ' + response.status);
        } catch (error) {
            console.error(error)
        }
    }

    const getWorkoutsOfCurrentWeek = (workouts) => {
        const currentWeekTransformed = currentWeek.map(d => transformDateString(d))
        return workouts.filter(workout => currentWeekTransformed.includes(workout.date))
    }

    return (
        <div>
            <WorkoutWeek workouts={getWorkoutsOfCurrentWeek(workouts)}
                         createWorkout={createWorkout}
                         deleteWorkout={deleteWorkout}
                         updateWorkout={updateWorkout}
                         deleteExercise={deleteExercise}/>
        </div>
    )
}


export default WorkoutContainer;
