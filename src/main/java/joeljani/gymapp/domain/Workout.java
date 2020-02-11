package joeljani.gymapp.model;

import java.util.List;

public interface Workout {
    List<Exercise> getExercises();
    void addExercise(Exercise e);
    void removeExercise(Exercise e);
}
