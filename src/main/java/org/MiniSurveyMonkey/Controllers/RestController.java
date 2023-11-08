package org.MiniSurveyMonkey.Controllers;

import org.MiniSurveyMonkey.Forms.Form;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import org.MiniSurveyMonkey.Repositories.FormRepo;
import org.MiniSurveyMonkey.Repositories.FieldRepo;
import org.MiniSurveyMonkey.Repositories.ResponseRepo;
import org.MiniSurveyMonkey.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;

@org.springframework.web.bind.annotation.RestController
public class RestController {

    @Autowired
    private FormRepo formRepository;
    
    @Autowired
    private FieldRepo fieldRepo;

    @Autowired
    private ResponseRepo responseRepo;

    /**
     * Get Mapping to retrieve a form by Id
     * @param id -  the id of the form
     * @return - JSON representation of the object
     */
    @GetMapping(value = "/form", produces = MediaType.APPLICATION_JSON_VALUE)
    public Form viewForm(@RequestParam String id) {

        //trying to find the form in the repo
        Form form = formRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Could not find Form with that id"));

        return form;
    }

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
