package org.MiniSurveyMonkey.Graphs;

import java.util.ArrayList;

/**
 * Table class to hold all the text responses for a question
 */
public class Table extends Visualization {
    private ArrayList<String> textResponses;

    /**
     * Constructor for Table
     * @param formId id of the form
     * @param fieldName name of the field
     * @param fieldId id of the field
     */
    public Table(String formId, String fieldName, String fieldId) {
        super(formId, fieldName, fieldId, VisualizationType.TEXT);
    }

    /**
     * Method to access the textResponses list
     * @return
     */
    public ArrayList<String> getTextResponses() {
        return textResponses;
    }

    /**
     * Method to set the textResponses list
     * @param textResponses
     */
    public void setTextResponses(ArrayList<String> textResponses) {
        this.textResponses = textResponses;
    }
}
