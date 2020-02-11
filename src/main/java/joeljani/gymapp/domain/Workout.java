package joeljani.gymapp.domain;

import java.util.List;

public interface Workout {
    List<Exercise> getExercises();
    void addExercise(Exercise e);
    void removeExercise(Exercise e);
}
