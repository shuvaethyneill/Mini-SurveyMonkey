package org.MiniSurveyMonkey;

import org.MiniSurveyMonkey.Controllers.RestController;
import org.MiniSurveyMonkey.Fields.Field;
import org.MiniSurveyMonkey.Fields.TextField;
import org.MiniSurveyMonkey.Forms.Form;
import org.MiniSurveyMonkey.Repositories.FormRepo;
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
import static org.hamcrest.Matchers.containsString;
import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

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


    @Test
    void contextLoads() {
        assertThat(controller).isNotNull();
    }


    @Test
    public void submitFormTest() throws Exception {
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
    public void formEndpointTest() throws Exception {
        System.out.println(formId);
        this.mockMvc.perform(get("/form/"+formId)).andExpect(status().isOk());
    }

}
