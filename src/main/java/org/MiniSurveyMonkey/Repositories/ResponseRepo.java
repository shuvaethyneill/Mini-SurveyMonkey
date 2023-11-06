package org.MiniSurveyMonkey.Repositories;
import org.MiniSurveyMonkey.Response;
import org.springframework.data.domain.*;
import org.springframework.data.repository.*;
import org.springframework.data.mongodb.repository.MongoRepository;
public interface ResponseRepo extends MongoRepository<Response, Long>{
}
