/*********** Workout related validations ***********/

const workoutValid = workout => {
    let isValid = true;
    if(workout.exercises.length === 0) {
        activateExercisesValidation("errorMessageExercise", true);
        isValid = false;
    }
    if(workout.name === "") {
        activateNameValidation("workoutNameInvalid", true);
        isValid = false;
    }
    for(let i = 0; i < 5; i++) { // checks if there exists error messages about exercise info value. not really robust but okay
        if(document.body.contains(document.getElementById("exerciseInfoValueError" + i)))
            isValid = false;
    }
    return isValid;
};

const createErrorMessage = (message, id) => {
    const errorMessage = document.createElement("DIV");
    errorMessage.style.color = "red";
    errorMessage.style.fontSize = "12px";
    errorMessage.innerText = message;
    errorMessage.id = id !== undefined ? id : "";
    return errorMessage;
};

const hasErrorMessage = (parent, id) => {
    let errorMessageExists = false;
    parent.childNodes.forEach(
        child => child.id === id ? errorMessageExists = true : null);
    return errorMessageExists;
};

const activateExercisesValidation = (id, error) => {
    if(error) {
        const exerciseTabs = document.getElementById("exerciseTabs");
        if(!hasErrorMessage(exerciseTabs, id))
            exerciseTabs.appendChild(createErrorMessage("Workout needs at least one exercise", id));
    } else {
        if(document.getElementById(id) != null) document.getElementById(id).remove()
    }
};

const activateNameValidation = (id, error) => {
    const nameInput = document.getElementsByClassName("workoutNameInput")[0];
    if(error) {
        nameInput.classList.add("invalidInput");
        const nameInputContainer = document.getElementById("workoutNameInputContainer");
        if(!hasErrorMessage(nameInputContainer, id))
            nameInputContainer.appendChild(createErrorMessage("Workout needs a name", id));
    } else {
        if(document.getElementById(id) != null) document.getElementById(id).remove()
        nameInput.classList.remove("invalidInput");
    }
};

/*********** Exercise info related validations ***********/

const activateExerciseInfoValidation = (id, index, error) => {
    const exerciseInfoValue = document.getElementsByClassName("infoValue")[index];
    const exerciseInfoContainer = document.getElementsByClassName("exerciseInfoContainer")[index];
    if(error) {
        exerciseInfoContainer.classList.add("invalidInput")
        if(!hasErrorMessage(exerciseInfoValue, id))
            exerciseInfoValue.appendChild(createErrorMessage("Only numeric values allowed", id))
    } else {
        if(document.getElementById(id) != null) document.getElementById(id).remove()
        exerciseInfoContainer.classList.remove("invalidInput");
    }
};

export {workoutValid, createErrorMessage, hasErrorMessage, activateExercisesValidation, activateNameValidation,
    activateExerciseInfoValidation}
