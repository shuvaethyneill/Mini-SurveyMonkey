package org.MiniSurveyMonkey.Controllers;

import jakarta.servlet.http.HttpSession;
import org.MiniSurveyMonkey.Fields.Field;
import org.MiniSurveyMonkey.Fields.FieldType;
import org.MiniSurveyMonkey.Fields.MultipleChoiceField;
import org.MiniSurveyMonkey.Fields.NumberField;
import org.MiniSurveyMonkey.Forms.Form;
import org.MiniSurveyMonkey.Graphs.Table;
import org.MiniSurveyMonkey.Graphs.Visualization;
import org.MiniSurveyMonkey.Graphs.HistogramGraph;
import org.MiniSurveyMonkey.Graphs.PieGraph;
import org.MiniSurveyMonkey.Repositories.*;
import org.MiniSurveyMonkey.User;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.MediaType;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import org.MiniSurveyMonkey.Response;
import org.springframework.web.bind.annotation.PutMapping;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@org.springframework.web.bind.annotation.RestController
@SessionAttributes("user")
public class RestController {

    @Autowired
    private FormRepo formRepo;

    @Autowired
    private FieldRepo fieldRepo;

    @Autowired
    private ResponseRepo responseRepo;

    @Autowired
    private UserRepo userRepo;

    /**
     * Constructor for RestController
     * @param formRepo
     * @param fieldRepo
     * @param responseRepo
     */
    public RestController(FormRepo formRepo, FieldRepo fieldRepo, ResponseRepo responseRepo) {
        this.formRepo = formRepo;
        this.fieldRepo = fieldRepo;
        this.responseRepo = responseRepo;
    }

    /**
     * Get Mapping to retrieve a form by Id
     *
     * @param id -  the id of the form
     * @return - JSON representation of the object
     */
    @GetMapping(value = "/getForm/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Form viewForm(@PathVariable String id) {

        //trying to find the form in the repo
        Form form = formRepo.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Could not find Form with that id"));

        return form;
    }

    /**
     * POST Mapping to submit a newly created form
     * @param form - the form
     * @return - JSON representation of the form id
     */
    @PostMapping("/submitForm")
    public String submitForm(@RequestBody Form form) {
        System.out.println("Received Form: " + form); //added this for testing purposed
        form.setId(ObjectId.get().toString());
        for (Field f : form.getFields()) {
            f.setFormId(form.getId());
        }

        fieldRepo.saveAll(form.getFields());
        formRepo.save(form);

        System.out.println("Form name: " + form.getFormName());
        System.out.println("Form Consists of fields: " + form.getFields()); // testing purposes
        return "{\"FormId\" : \"" + form.getId() + "\"}";
    }

    /**
     * POST Mapping to submit a response to a form
     * @param response - the response object
     * @return - the response
     */
    @PostMapping("/submitResponse")
    public Response submitResponse(@RequestBody Response response) {

        //get the form associated with these responses
        Form f = formRepo.findById(response.getFormId()).orElseThrow(() ->
                new ResourceNotFoundException("Could not find Form with that id"));

        responseRepo.save(response);

        f.addResponse(response);

        formRepo.save(f);

        return response;
    }

    /**
     * Get Mapping to retrieve the fields
     * @param model
     * @return - the retrieved fields
     */
    @GetMapping("/getFieldRest")
    public List<Field> getField(Model model) {
        List<Field> f1 = fieldRepo.findAll();
        if (f1.isEmpty()) return null;
        model.addAttribute("Fields", f1);
        return f1;
    }

    /**
     * Get Mapping to retrieve all the forms
     * @param model
     * @return - the retrieved forms
     */
    @GetMapping("/getFormsRest")
    public List<Form> getForms(Model model) {
        List<Form> f1 = formRepo.findAll();
        if (f1.isEmpty()) return null;
        model.addAttribute("Forms", f1);
        return f1;
    }

    /**
     * Put Mapping to edit a form
     * @param formId - the id of the form
     * @param fields - the fields of the form
     * @param m - the model
     * @return - the form
     */
    @PutMapping("/editForm")
    public Form editForm(@RequestParam String formId, @RequestParam ArrayList<Field> fields, Model m) {
        ArrayList<Field> fieldInDb = (ArrayList<Field>) fieldRepo.findByFormId(formId);
        ArrayList<Field> toBeRemoved = new ArrayList<>(fieldInDb);
        toBeRemoved.removeAll(fields);
        ArrayList<Field> toBeAdded = new ArrayList<>(fields);
        toBeAdded.removeAll(fieldInDb);
        fieldRepo.deleteAll(toBeRemoved);
        fieldRepo.saveAll(toBeAdded);
        Form f = (Form) m.getAttribute("formId");
        assert f != null;
        f.setFields(fields);
        m.addAttribute("formId", f);
        return f;
    }

    /**
     * POST Mapping to login as a user
     * @param user - the user to login with
     * @param m - the model
     * @return - JSON representation of the username
     */
    @PostMapping("/login")
    public String login(@RequestBody User user, Model m) {
        System.out.println("/Login Received this user: " + user);
        for (User i : userRepo.findAll()) {
            if (i.getUsername().equals(user.getUsername())) {
                System.out.println("User Found");
                return "{\"Username\" : \"" + user.getUsername() + "\"}";
            }
        }
        userRepo.save(user);
        System.out.println("New User!");
        m.addAttribute("user", user.getUsername());
        return "{\"Username\" : \"" + user.getUsername() + "\"}";
    }

    /**
     * Get Mapping to retrieve the session user
     * @param m - the model
     * @param session - the current session
     * @return - String representation of the session user
     */
    @GetMapping("/getUser")
    public String getUser(Model m, HttpSession session) {

        System.out.println(session.getAttribute("user"));

        return session.getAttribute("user").toString();
    }

    /**
     * POST Mapping to close the form
     * @param formId - the id of the form
     * @return - the form after it has been closed
     */
    @PostMapping("/closeForm")
    public Form closeFrom(@RequestParam String formId) {
        Form temp = null;
        Form f = formRepo.findById(formId).orElseThrow(() ->
                new ResourceNotFoundException("Could not find Form with that id"));

        // all answers per field
        HashMap<String, ArrayList<String>> answersByField = new HashMap<>();

        for (Response r : f.getResponses()) {

            for (Map.Entry<String, String> entry : r.getFieldAnswers().entrySet()) {
                //append answer
                answersByField.computeIfAbsent(entry.getKey(), k -> new ArrayList<String>());
                answersByField.get(entry.getKey()).add(entry.getValue());
            }
        }

        for (Field field : f.getFields()) {
            ArrayList<String> answers = answersByField.get(field.getId());
            Visualization visualization = null;
            if (field.getFieldType() == FieldType.NUMBER) {
                visualization = new HistogramGraph(formId, field.getQuestion(), field.getId(),
                        ((NumberField) field).getUpperBound() != null ? ((NumberField)field).getUpperBound() : null,
                        ((NumberField) field).getLowerBound() != null ? ((NumberField)field).getLowerBound() : null);
                ((HistogramGraph) (visualization)).calculateResponse(answers);
            } else if (field.getFieldType() == FieldType.MC) {
                visualization = new PieGraph(formId, field.getQuestion(), field.getId(), ((MultipleChoiceField) (field)).getOptions());
                ((PieGraph) (visualization)).calculateResponse(answers);
            } else if (field.getFieldType() == FieldType.TEXT) {
                visualization = new Table(formId, field.getQuestion(), field.getId());
                ((Table) (visualization)).setTextResponses(answers);
            }

            f.addVisualization(visualization);
        }

        temp = f;
        temp.setClosed(true);
        formRepo.save(temp);

        return temp;
    }
}
