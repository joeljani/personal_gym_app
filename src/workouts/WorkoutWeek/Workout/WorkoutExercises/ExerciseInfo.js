import React from "react";
import "./WorkoutExercise.css"

const ExerciseInfo = ({exercise, updateExercise}) => {

    const handleLabelInput = event => {
        const newLabel = event.target.value;
        const oldLabel = event.target.name;
        const value = exercise[oldLabel];

        const updatedExercise = {...exercise};
        delete updatedExercise[oldLabel];

        const oldIndex = Object.keys(exercise).findIndex(prop => prop === oldLabel);
        insertProperty(updatedExercise, newLabel, value, oldIndex); // to maintain the order of the exercise properties

        updateExercise(updatedExercise)
    };

    const handleValueInput = event => {
        const label = event.target.name;
        let newValue = event.target.value;
        if (numericLabels.includes(label.toLowerCase()) && newValue !== "")
            newValue = parseInt(newValue);

        const updatedExercise = {...exercise, [label]: newValue};

        updateExercise(updatedExercise)
    };

    const handleAchievedCheck = event =>
        updateExercise({...exercise, achieved: event.target.checked})

    const handleNotesInput = event =>
        updateExercise({...exercise, notes: event.target.value})


    return (
        exercise !== undefined &&
        <div className={"exerciseInfo"}>
            {createPairs(exercise).map((pair, i) => {
                    const label = Object.keys(pair)[0];
                    const value = Object.values(pair)[0];
                    return (
                        <div className={"exerciseInfoContainer"} key={i}>
                            <div className={"infoHeader"}>
                                <input value={label}
                                       name={label}
                                       onChange={handleLabelInput}/>
                            </div>
                            <div className={"infoValue"}>
                                <input value={value}
                                       name={label}
                                       onChange={handleValueInput}/>
                            </div>
                        </div>
                    )
                }
            )}
            <div className={"goalsAchievedContainer"}>
                <label>Exercice goals achieved
                    <input type={"checkbox"}
                           checked={exercise.achieved}
                           onChange={handleAchievedCheck}
                           className={"goalsAchievedCheckbox"}/>
                </label>
            </div>
            <div className={"exerciseNotes"}>
                <textarea value={exercise.notes}
                          placeholder={"Exercise notes"}
                          name={"notes"}
                          onChange={handleNotesInput}
                />
            </div>
        </div>
    )

};

const labelsToIgnore = ["_id", "name", "__v", "achieved", "notes"]
const isCorrectLabel = label => !labelsToIgnore.includes(label)

const numericLabels = ["sets", "reps", "kg"];

const createPairs = exercise => Object.keys(exercise)
    .filter(isCorrectLabel)
    .map(label => {
        return {[label]: exercise[label]}
    });

const insertProperty = (obj, name, value, index) => {
    if (obj._insertProperty === undefined) { // if method doesn't exist yet
        Object.defineProperty(
            Object.prototype,
            '_insertProperty',
            {
                value: function (name, value, index) {
                    // backup my properties
                    let backup = {};
                    // delete all properties after index
                    let propertyIndex = 0;
                    for (let propertyName in this) {
                        if (this.hasOwnProperty(propertyName) && propertyIndex++ >= index) {
                            backup[propertyName] = this[propertyName];
                            delete this[propertyName];
                        }
                    }
                    this[name] = value;
                    // restore all properties after index
                    for (let propertyName in backup) {
                        if (backup.hasOwnProperty(propertyName))
                            this[propertyName] = backup[propertyName];
                    }
                    return this; // same object; not a new object
                },
                enumerable: false,
            });
    }
    obj._insertProperty(name, value, index);
};


export default ExerciseInfo;
