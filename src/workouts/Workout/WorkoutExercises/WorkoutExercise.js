import React from "react";
import {Card, CardBody, Button} from "reactstrap";


const WorkoutExercise = ({exercise, deleteExercise}) => {
    return (
        <Card className={"exerciseCard"}>
            <CardBody>
                {Object.keys(exercise).map(label => {
                        return (
                            <div>
                                {label === "name" && <h4>{exercise[label]}</h4>}
                                {(label !== "_id" && label !== "name") &&
                                <div className={"exerciseGrid"} key={label}>
                                    <span className={"label"}>{label}</span>
                                    <span className={"value"}>{exercise[label]}</span>
                                </div>}
                            </div>
                        )
                })}
                <Button onClick={() => deleteExercise(exercise)}>Delete exercise</Button>
            </CardBody>
        </Card>
    )
}

export default WorkoutExercise;
