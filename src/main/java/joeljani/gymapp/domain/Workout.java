package joeljani.gymapp.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Document(collection="workouts")
public class Workout  {
    @Id
    private String id;

    @NotNull
    private String name;

    @Size(max=50)
    private String notes;

    private List<Exercise> exercises = new ArrayList<>();

    public void addExercise(Exercise e) {
        if(e != null) exercises.add(e);
        else throw new IllegalArgumentException();
    }

    public void removeExercise(Exercise e) {
        if(e != null ) exercises.remove(e);
        else throw new IllegalArgumentException();
    }

    public List<Exercise> getExercises() {
        return this.exercises;
    }

    public void replaceExercise(Exercise oldE, Exercise newE) {
        Collections.replaceAll(this.exercises, oldE, newE);
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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
