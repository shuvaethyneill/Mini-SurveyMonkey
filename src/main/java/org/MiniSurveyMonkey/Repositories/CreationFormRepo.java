package org.MiniSurveyMonkey.Repositories;
import org.MiniSurveyMonkey.Fields.Field;
import org.MiniSurveyMonkey.Forms.CreationForm;
import org.springframework.data.domain.*;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CreationFormRepo extends MongoRepository<CreationForm, Long>{
}
