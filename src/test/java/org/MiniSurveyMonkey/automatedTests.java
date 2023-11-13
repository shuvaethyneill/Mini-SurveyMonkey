package org.MiniSurveyMonkey;

import org.MiniSurveyMonkey.Controllers.RestController;
import org.MiniSurveyMonkey.Forms.Form;
import org.MiniSurveyMonkey.Repositories.FormRepo;
import org.json.JSONObject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.containsString;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.hamcrest.MatcherAssert.assertThat;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

import java.util.Optional;

@SpringBootTest
@AutoConfigureMockMvc
public class automatedTests {
    private String formId;
    
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private FormRepo formRepo;


    @BeforeEach
    public void setUp() throws Exception {
        Form testForm = new Form();

        //Converts Form object to JSON for the @RequestBody parameter in the endpoint.
        ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
        String json = ow.writeValueAsString(testForm);

        String result = this.mockMvc.perform(post("/submitForm").contentType(MediaType.APPLICATION_JSON).content(json))
                .andReturn().getResponse().getContentAsString();

        JSONObject obj = new JSONObject(result);
        this.formId = obj.getString("FormId");
    }

    @Test
    public void submitFormTest() throws Exception {
        assertNotEquals(Optional.empty(), formRepo.findById(formId));
    }

    @Test
    public void formEndpointTest() throws Exception {
        String result = this.mockMvc.perform(get("/form/"+formId)).andReturn().getResponse().getContentAsString();
        assertThat(result, containsString(formId));
    }

}
