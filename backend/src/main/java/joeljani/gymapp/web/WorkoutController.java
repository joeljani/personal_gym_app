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
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/workouts")
public class WorkoutController  {
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
        if(result.hasErrors()) {
            result.getAllErrors().forEach(error -> log.debug(error.toString()));
            return new ResponseEntity<>(HttpStatus.PRECONDITION_FAILED);
        }
        w.getExercises().forEach(e -> {
            if((exerciseRepository.findByName(e.getName())) == null) exerciseRepository.save(e);
            else w.replaceExercise(e, exerciseRepository.findByName(e.getName()));
        });
        Workout workout = workoutRepository.save(w);
        return new ResponseEntity<>(workout, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteWorkout(@PathVariable String id) {
        log.debug("deleteWorkout() with id: " + id);
        Optional<Workout> workout = workoutRepository.findById(id);
        if(!workout.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        workoutRepository.delete(workout.get());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Workout> addExerciseToWorkout(@PathVariable String id, @Valid @RequestBody Exercise exercise,
                                                        BindingResult result) {
        log.debug("add exercise: " + exercise + " to workout with id: " + id);
        Optional<Workout> workoutOpt = workoutRepository.findById(id);
        if(!workoutOpt.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        if(result.hasErrors()) {
            result.getAllErrors().forEach(error -> log.debug(error.toString()));
            return new ResponseEntity<>(HttpStatus.PRECONDITION_FAILED);
        }
        Workout workout = workoutOpt.get();
        if(workout.getExercises().stream().noneMatch(e -> e.getName().equals(exercise.getName()))) {
            if((exerciseRepository.findByName(exercise.getName())) == null) exerciseRepository.save(exercise);
            workout.addExercise(exercise);
            workoutRepository.save(workout);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
