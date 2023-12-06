package org.MiniSurveyMonkey;

import org.MiniSurveyMonkey.Controllers.RestController;
import org.MiniSurveyMonkey.Fields.Field;
import org.MiniSurveyMonkey.Fields.MultipleChoiceField;
import org.MiniSurveyMonkey.Fields.TextField;
import org.MiniSurveyMonkey.Forms.Form;
import org.MiniSurveyMonkey.Graphs.HistogramGraph;
import org.MiniSurveyMonkey.Repositories.FormRepo;
import org.MiniSurveyMonkey.Repositories.UserRepo;
import org.json.JSONObject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.AutoConfigureDataMongo;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.contentOf;
import static org.hamcrest.Matchers.containsString;
import static org.junit.jupiter.api.Assertions.*;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.web.bind.annotation.DeleteMapping;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Optional;

@TestPropertySource(properties = {
        "spring.data.mongodb.uri=mongodb+srv://andre:surveymonkey@cluster0.d1qlp6v.mongodb.net/cluster0?retryWrites=true&w=majority"
})
@SpringBootTest(classes = SurveyMonkeyApplication.class)
@AutoConfigureMockMvc
public class AutomatedTests {
    private String formId;

    @Autowired
    private RestController controller;
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private FormRepo formRepo;
    @Autowired
    private UserRepo userRepo;


    @Test
    void contextLoads() {
        assertThat(controller).isNotNull();
    }


    @Test
    public void submitCreateFormTest() throws Exception {
        Form testForm = new Form();

        Field f = new TextField();
        f.setQuestion("test-question");
        testForm.addField(f);

        ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
        String json = ow.writeValueAsString(testForm);
        System.out.println(json);

        this.mockMvc.perform(post("/submitForm").contentType(MediaType.APPLICATION_JSON).content(json)).andExpect(status().isOk());
    }

    @Test
    public void submitResponseFormTest() throws Exception {
        //create a new form to get a Form id
        Form testForm = new Form();
        testForm.setId("Test11");

        formRepo.save(testForm);

        //now add a response to it
        Response r = new Response();
        r.setFormId(testForm.getId());

        HashMap<String, String> answers = new HashMap<>();
        answers.put("fieldId1", "answer1"); //we assume the field id already exists

        r.setFieldAnswers(answers);

        // Convert the Response object to JSON
        ObjectMapper objectMapper = new ObjectMapper();
        String json = objectMapper.writeValueAsString(r);

        // Perform a POST request to the /submitResponse endpoint with the JSON payload
        mockMvc.perform(post("/submitResponse")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk());

    }

    @Test
    public void closeFormTest() throws Exception{
        Form testForm = new Form();
        testForm.setId("Test15");
        formRepo.save(testForm);

        ObjectMapper objectMapper = new ObjectMapper();
        String json = objectMapper.writeValueAsString(testForm.getId());

        mockMvc.perform(post("/closeForm")
                        .param("formId", testForm.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk());


        Form f = formRepo.findById(testForm.getId()).orElse(null);

        assert f == null || f.isClosed();
    }

    @Test
    public void userLoginTest() throws  Exception{
        //login
        String username = "TestUser";
        // Prepare the user object
        User user = new User();
        user.setUsername(username);

        ObjectMapper objectMapper = new ObjectMapper();
        String json = objectMapper.writeValueAsString(user);

        // Perform a POST request to the /login endpoint
        mockMvc.perform(post("/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.Username").value(username));
    }


    @Test
    public void formEndpointTest() throws Exception {
        Form testForm = new Form();
        testForm.setId("Test20");
        formRepo.save(testForm);
        this.mockMvc.perform(get("/getForm/"+testForm.getId())).andExpect(status().isOk());

    }

    @Test
    public void formDeleteEndpointTest() throws Exception{
        //Creating a new form
        Form testForm = new Form();
        testForm.setId("Del1");
        formRepo.save(testForm);

        //Creating
        MultipleChoiceField fieldMC1 = new MultipleChoiceField();
        ArrayList<String> options1 = new ArrayList<>();
        options1.add("A");
        options1.add("B");
        options1.add("C");
        fieldMC1.setOptions(options1);
        testForm.addField(fieldMC1);



        //Creating a form based on the first form
        Form editForm = new Form();
        MultipleChoiceField fieldMCEdited = new MultipleChoiceField();
        fieldMC1.getOptions().remove("B");
        fieldMCEdited.setOptions(fieldMC1.getOptions());
        editForm.addField(fieldMCEdited);

        assertEquals(fieldMC1.getOptions(), fieldMCEdited.getOptions());
        this.mockMvc.perform(delete("/deleteForm/" + testForm.getId())).andExpect(status().isOk());
        assert(!(formRepo.existsById(testForm.getId())));
    }


}
