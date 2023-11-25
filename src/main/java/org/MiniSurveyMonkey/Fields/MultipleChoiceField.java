package org.MiniSurveyMonkey.Fields;

import com.fasterxml.jackson.annotation.JsonTypeName;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Document("mcField")
@JsonTypeName("MultipleChoiceField")
public class MultipleChoiceField extends Field {
    private ArrayList<String> options;

    public MultipleChoiceField() {
        this.setFieldType(FieldType.MC);
    }
    /**
     * Constructor for MC field
     * @param question, the question associated with this field
     * @param options, the list of options
     */
    public MultipleChoiceField(String question, String formId, ArrayList<String> options) {
        super(question, FieldType.MC, formId);
        this.options = options;
    }

    /**
     * Method to get options
     * @return ArrayList<String> options
     */
    public ArrayList<String> getOptions() {
        return options;
    }

    /**
     * Method to set options
     * @param options
     */
    public void setOptions(ArrayList<String> options) {
        this.options = options;
    }
}
