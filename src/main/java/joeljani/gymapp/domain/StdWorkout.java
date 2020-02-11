package joeljani.gymapp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;


@Document(collection="workouts")
public class StdWorkout implements Workout {
    @Id
    private String id;

    @NotNull
    private String name;

    @Size(min=10, max=50)
    private String notes;

    private List<Exercise> exercises = new ArrayList<>();

    @Override
    public void addExercise(Exercise e) {
        if(e != null) exercises.add(e);
        else throw new IllegalArgumentException();
    }

    @Override
    public void removeExercise(Exercise e) {
        if(e != null ) exercises.remove(e);
        else throw new IllegalArgumentException();
    }

    @Override
    public List<Exercise> getExercises() {
        return this.exercises;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
