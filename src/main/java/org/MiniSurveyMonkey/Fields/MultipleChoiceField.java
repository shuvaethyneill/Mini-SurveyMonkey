package org.MiniSurveyMonkey.Fields;

import org.springframework.data.mongodb.core.mapping.Document;
import java.util.HashMap;

@Document("mcField")
public class MultipleChoiceField extends Field {
    private HashMap<String, String> options;
    private String selectedOption;

    /**
     * Constructor for MC field
     * @param question, the question associated with this field
     * @param options, the hashmap of option name and value
     */
    public MultipleChoiceField(String question, String formId, HashMap<String, String> options) {
        super(question, FieldType.MC, formId);
        this.options = options;
    }

    /**
     * Method to get options
     * @return HashMap<String, String> options
     */
    public HashMap<String, String> getOptions() {
        return options;
    }

    /**
     * Method to set options
     * @param options
     */
    public void setOptions(HashMap<String, String> options) {
        this.options = options;
    }

    /**
     * Method to get the selected option
     * @return String value of selected option
     */
    public String getSelectedOption() {
        return selectedOption;
    }

    /**
     * Method to set the selected option
     * @param selectedOption
     */
    public void setSelectedOption(String selectedOption) {
        this.selectedOption = selectedOption;
    }
}
