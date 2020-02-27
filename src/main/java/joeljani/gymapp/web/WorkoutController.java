package joeljani.gymapp.web;

import joeljani.gymapp.domain.Exercise;
import joeljani.gymapp.domain.Workout;
import joeljani.gymapp.persistence.ExerciseRepository;
import joeljani.gymapp.persistence.WorkoutRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;


@CrossOrigin
@RestController
@RequestMapping("/workouts")
public class WorkoutController {
    private Logger log = LoggerFactory.getLogger(this.getClass());

    @Autowired
    WorkoutRepository workoutRepository;
    @Autowired
    ExerciseRepository exerciseRepository;

    @GetMapping
    public ResponseEntity<List<Workout>> getAllWorkouts() {
        log.debug("getAllWorkouts() called");
        List<Workout> ws = workoutRepository.findAll();
        return new ResponseEntity<>(ws, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Workout> createWorkout(@Valid @RequestBody Workout w, BindingResult result) {
        log.debug("createWorkout() called");
        if (result.hasErrors()) {
            result.getAllErrors().forEach(error -> log.debug(error.toString()));
            return new ResponseEntity<>(HttpStatus.PRECONDITION_FAILED);
        }
        setWorkoutDate(w);
        if (workoutRepository.findAll().stream().anyMatch(workout -> workout.getDate().equals(w.getDate()))) {
            log.debug("There exists already a workout at that date");
            return new ResponseEntity<>(HttpStatus.PRECONDITION_FAILED);
        }
        setExercisesForWorkout(w);
        Workout workout = workoutRepository.save(w);
        return new ResponseEntity<>(workout, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Workout> updateWorkout(@Valid @RequestBody Workout w, BindingResult result, @PathVariable String id) {
        log.debug("updateWorkout() called");
        if (result.hasErrors()) {
            result.getAllErrors().forEach(error -> log.debug(error.toString()));
            return new ResponseEntity<>(HttpStatus.PRECONDITION_FAILED);
        }
        Optional<Workout> workoutOptional = workoutRepository.findById(id);
        if (workoutOptional.isPresent()) {
            setExercisesForWorkout(w);
            Workout workout = workoutRepository.save(w);
            log.debug("Updated workout with id=" + workout.getId());
            return new ResponseEntity<>(workout, HttpStatus.OK);
        } else {
            log.debug("No workout with id=" + id + " found");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteWorkout(@PathVariable String id) {
        log.debug("deleteWorkout() with id: " + id);
        Optional<Workout> workout = workoutRepository.findById(id);
        if (!workout.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        workoutRepository.delete(workout.get());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    private void setWorkoutDate(Workout w) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        LocalDate dateOfCreation = w.getDate();
        String formattedDateOfCreationString = dateOfCreation.format(formatter);
        LocalDate formattedDateOfCreation = LocalDate.parse(formattedDateOfCreationString, formatter);
        w.setDate(formattedDateOfCreation);
    }

    private void setExercisesForWorkout(Workout w) {
        w.getExercises().forEach(e -> {
            Optional<Exercise> optionalExercise = checkIfExerciseExists(e);
            if(!optionalExercise.isPresent()) exerciseRepository.save(e);
            else {
                log.debug("This exercise exists already");
                w.replaceExercise(e, optionalExercise.get());
            }
        });
    }

    private Optional<Exercise> checkIfExerciseExists(Exercise exercise) {
        List<Exercise> exercises = exerciseRepository.findAll();
        return exercises.stream().filter(e ->
                e.getName().equals(exercise.getName())
                    && e.getSets() == exercise.getSets()
                    && e.getReps() == exercise.getReps()
        ).findFirst();
    }

}
