import React from "react";
import {Table} from "reactstrap";
import {useSelector} from "react-redux";

const WorkoutSelection = ({chooseWorkout, currentWorkout, setShowWorkouts, toggle}) => {
    const workouts = useSelector(state => state.workouts);

    const onSelectWorkout = workout => {
        setShowWorkouts(false)
        chooseWorkout({...workout, _id: currentWorkout._id, date: currentWorkout.date})
        toggle()
    };

    return (
        <Table>
            <thead>
            <tr>
                <th>Date</th>
                <th>Workout Name</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {workouts.length === 0 ?
                <tr>
                    <td>No workouts yet!</td>
                </tr>
                :
                workouts.map((w, i) => (
                    <tr key={i}>
                        <td>{w.date}</td>
                        <td>{w.name}</td>
                        <td>
                            <button onClick={() => onSelectWorkout(w)} className={"accentButton"}>
                                Choose
                            </button>
                        </td>
                    </tr>
                ))
            }
            </tbody>
        </Table>
    )
}

export default WorkoutSelection;
