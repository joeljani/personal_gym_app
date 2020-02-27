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
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/exercises")
public class ExerciseController {
    private Logger log = LoggerFactory.getLogger(this.getClass());

    @Autowired
    ExerciseRepository exerciseRepository;

    @Autowired
    WorkoutRepository workoutRepository;

    @GetMapping
    public ResponseEntity<List<Exercise>> getAllExercises() {
        log.debug("getAllWorkouts() called");
        List<Exercise> es = exerciseRepository.findAll();
        return new ResponseEntity<>(es, HttpStatus.OK);
    }

    @DeleteMapping("/{eId}/workout/{wId}")
    public synchronized ResponseEntity<String> deleteExercise(@PathVariable String eId, @PathVariable String wId) {
        log.debug("deleteExercise() with id: " + eId);
        Optional<Exercise> exercise = exerciseRepository.findById(eId);
        if (!exercise.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            List<Workout> workouts = workoutRepository.findAll();
            Optional<Exercise> existingExercise = workouts.stream()
                            .flatMap(w -> w.getExercises().stream()
                            .filter(e -> e.getId().equals(eId) && !(w.getId().equals(wId)))).findFirst();
            if(!existingExercise.isPresent()) {
                exerciseRepository.delete(exercise.get());
                return new ResponseEntity<>(HttpStatus.OK);
            } else return new ResponseEntity<>(HttpStatus.PRECONDITION_FAILED);
        }
    }
}
