package joeljani.gymapp.web;

import joeljani.gymapp.domain.Exercise;
import joeljani.gymapp.domain.Workout;
import joeljani.gymapp.persistence.ExerciseRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/exercises")
public class ExerciseController {
    private Logger log = LoggerFactory.getLogger(this.getClass());

    @Autowired
    ExerciseRepository exerciseRepository;

    @GetMapping
    public ResponseEntity<List<Exercise>> getAllExercises() {
        log.debug("getAllWorkouts() called");
        List<Exercise> es = exerciseRepository.findAll();
        return new ResponseEntity<>(es, HttpStatus.OK);
    }
}
