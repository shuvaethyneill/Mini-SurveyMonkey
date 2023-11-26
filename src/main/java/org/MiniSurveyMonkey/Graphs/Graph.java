package org.MiniSurveyMonkey.Graphs;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import org.MiniSurveyMonkey.Fields.MultipleChoiceField;
import org.MiniSurveyMonkey.Fields.NumberField;
import org.MiniSurveyMonkey.Fields.TextField;
import org.MiniSurveyMonkey.Response;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "@type")
@JsonSubTypes({
        @JsonSubTypes.Type(value = HistogramGraph.class, name = "Histogram"),
        @JsonSubTypes.Type(value = PieGraph.class, name = "PieChart"),
})

@Document("Graph")
public abstract class Graph {

    private String formId;

    private String fieldName;

    private String fieldId;

    public Graph() {

    }

    public String getFormId() {
        return formId;
    }

    public void setFormId(String formId) {
        this.formId = formId;
    }

    public String getFieldName() {
        return fieldName;
    }

    public void setFieldName(String fieldName) {
        this.fieldName = fieldName;
    }

    public String getFieldId() {
        return fieldId;
    }

    public void setFieldId(String fieldId) {
        this.fieldId = fieldId;
    }

    public abstract void calculateResponse(ArrayList<String> responses);
}
