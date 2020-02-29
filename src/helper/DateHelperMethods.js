import moment from "moment";

const transformDateString = (d) => {
    if(d.getDate() >= 10 && d.getMonth()+1 < 10) return "2020-"+"0" + (d.getMonth()+1) + "-" + d.getDate()
    else if(d.getDate() < 10 && d.getMonth()+1 < 10) return "2020-"+"0" + (d.getMonth()+1) + "-" + "0" + d.getDate()
    else if(d.getDate() >= 10 && d.getMonth()+1 >= 10) return  "2020-"+ (d.getMonth()+1) + "-" + d.getDate()
    else if(d.getDate() < 10 && d.getMonth()+1 >= 10) return "2020-"+ (d.getMonth()+1) + "-" + "0" + d.getDate()
}

const workoutDate = date => moment(date).format('ddd') + "  " + date.getDate() + "." + (date.getMonth() + 1) + " ";

export {transformDateString, workoutDate}
