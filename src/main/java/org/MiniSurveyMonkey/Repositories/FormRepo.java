package org.MiniSurveyMonkey.Repositories;
import org.MiniSurveyMonkey.Forms.Form;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface FormRepo extends MongoRepository<Form, String>{

    List<Form> findByAuthor(String author);

}
