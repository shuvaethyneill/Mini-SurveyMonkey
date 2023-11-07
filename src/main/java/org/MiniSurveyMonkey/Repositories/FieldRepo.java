package org.MiniSurveyMonkey.Repositories;

import org.MiniSurveyMonkey.Fields.Field;
import org.MiniSurveyMonkey.Fields.TextField;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface FieldRepo extends MongoRepository<Field, String>{



}
