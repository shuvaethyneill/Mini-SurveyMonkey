package org.MiniSurveyMonkey;

import org.MiniSurveyMonkey.Controllers.RestController;
import org.MiniSurveyMonkey.Fields.Field;
import org.MiniSurveyMonkey.Forms.Form;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

@SpringBootTest
@AutoConfigureMockMvc
public class automatedTests {
    @Autowired
    private RestController controller;

    @Autowired
    private MockMvc mockMvc;

    @Value(value = "8080")
    private int port;

    @Test
    public void contextLoads() throws Exception {
        assertThat(controller).isNotNull();
    }

    @Test
    public void submitFormTest() throws Exception {
        Form testForm = new Form();

        //Converts Form object to JSON for the @RequestBody parameter in the endpoint.
        ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
        String json = ow.writeValueAsString(testForm);

        this.mockMvc.perform(post("/submitForm").contentType(MediaType.APPLICATION_JSON).content(json)).andDo(print()).andExpect(status().isOk())
                .andExpect(content().string(containsString("{\"FormId\" ")));
    }

    @Test
    public void formEndpointTest() throws Exception {
        this.mockMvc.perform(get("/form/1")).andDo(print()).andExpect(status().isOk())
                .andExpect(content().string(containsString("<!DOCTYPE html>")));;
    }

}
