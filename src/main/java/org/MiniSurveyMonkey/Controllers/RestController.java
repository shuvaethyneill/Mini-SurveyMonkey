package org.MiniSurveyMonkey.Controllers;

import org.MiniSurveyMonkey.Repositories.FormRepo;
import org.MiniSurveyMonkey.Repositories.FieldRepo;
import org.MiniSurveyMonkey.Repositories.ResponseRepo;
import org.MiniSurveyMonkey.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;

@org.springframework.web.bind.annotation.RestController
public class RestController {

    private FormRepo formRepo;

    private FieldRepo fieldRepo;

    private ResponseRepo responseRepo;


    public RestController(FormRepo formRepo, FieldRepo fieldRepo, ResponseRepo responseRepo) {
        this.formRepo = formRepo;
        this.fieldRepo = fieldRepo;
        this.responseRepo = responseRepo;

    }

    @PutMapping("/editForm")
    public ResponseEntity<Response> editForm(){

        return null;
    }
}
