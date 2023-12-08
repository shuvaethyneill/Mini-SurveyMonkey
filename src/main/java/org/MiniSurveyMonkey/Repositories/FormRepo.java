package org.MiniSurveyMonkey.Repositories;
import org.MiniSurveyMonkey.Forms.Form;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface FormRepo extends MongoRepository<Form, String>{
    
    /*Method to find all the forms belonging to an author*/
    List<Form> findByAuthor(String author);

}
