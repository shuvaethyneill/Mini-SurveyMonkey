package org.MiniSurveyMonkey.Repositories;
import org.MiniSurveyMonkey.Fields.Field;
import org.MiniSurveyMonkey.Response;
import org.springframework.data.domain.*;
import org.springframework.data.mongodb.repository.MongoRepository;
public interface FieldRepo extends MongoRepository<Field, Long>{
}
