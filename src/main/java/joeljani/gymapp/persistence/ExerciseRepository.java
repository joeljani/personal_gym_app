package joeljani.gymapp.persistence;

import joeljani.gymapp.domain.Exercise;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ExerciseRepository extends MongoRepository<Exercise, String> {
    Exercise findByName(String name);
}
