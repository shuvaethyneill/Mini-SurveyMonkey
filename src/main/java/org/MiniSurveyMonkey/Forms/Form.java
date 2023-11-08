package org.MiniSurveyMonkey.Forms;

import org.MiniSurveyMonkey.Fields.Field;
import org.MiniSurveyMonkey.Response;
import org.springframework.data.annotation.Id;

import java.util.ArrayList;

public class Form {
    @Id
    private String id;
    private ArrayList<Field>  questionFields;
    private ArrayList<Response> formResponses;



}
