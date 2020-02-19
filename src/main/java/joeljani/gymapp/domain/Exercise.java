package joeljani.gymapp.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.MongoId;

import javax.validation.constraints.NotNull;

@Document(collection="exercises")
public class Exercise {
    @Id
    private String id;

    @NotNull
    private String name;

    private boolean achieved;

    private int sets, reps;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public boolean isAchieved() {
        return achieved;
    }

    public int getReps() {
        return reps;
    }

    public int getSets() {
        return sets;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAchieved(boolean achieved) {
        this.achieved = achieved;
    }

    public void setReps(int reps) {
        this.reps = reps;
    }

    public void setSets(int sets) {
        this.sets = sets;
    }
}
