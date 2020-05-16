import moment from "moment";
import {emptyWorkout} from "./EmptyObjects";

const transformDateString = (d) => {
    if(d.getDate() >= 10 && d.getMonth()+1 < 10) return "2020-0" + (d.getMonth()+1) + "-" + d.getDate()
    else if(d.getDate() < 10 && d.getMonth()+1 < 10) return "2020-0" + (d.getMonth()+1) + "-0" + d.getDate()
    else if(d.getDate() >= 10 && d.getMonth()+1 >= 10) return  "2020-"+ (d.getMonth()+1) + "-" + d.getDate()
    else if(d.getDate() < 10 && d.getMonth()+1 >= 10) return "2020-"+ (d.getMonth()+1) + "-0" + d.getDate()
}

const workoutDate = date => [moment(date).format('ddd'), date.getDate() + "." + (date.getMonth() + 1)];

const getWorkoutBasedOnDay = (date, workouts) => {
    let stringDate;
    if (date.getDate().toString().length === 1) stringDate = "0" + date.getDate().toString();
    else stringDate = date.getDate().toString();

    if (workouts !== undefined) {
        const workout = workouts.find(workout => (workout.date.substring(8)) === stringDate); //8th pos. => (e.g "2020-02-13" = "13")
        if (workout !== undefined) return workout
        else return emptyWorkout(Date.now().toString(), transformDateString(date));
    }
}


export {transformDateString, workoutDate, getWorkoutBasedOnDay}
