package joeljani.gymapp.persistence;

import joeljani.gymapp.domain.Workout;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface WorkoutRepository extends MongoRepository<Workout, String> {
    Workout findByName(String name);
}
