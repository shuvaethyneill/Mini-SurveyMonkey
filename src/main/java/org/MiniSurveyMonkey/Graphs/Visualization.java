package org.MiniSurveyMonkey.Graphs;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "@type")
@JsonSubTypes({
        @JsonSubTypes.Type(value = HistogramGraph.class, name = "Histogram"),
        @JsonSubTypes.Type(value = PieGraph.class, name = "PieChart"),
        @JsonSubTypes.Type(value = Table.class, name = "Table"),
})

public abstract class Visualization {

    private String formId;

    private String fieldName;

    private String fieldId;

    private VisualizationType visualizationType;

    /**
     * Constructor for Visualization
     * @param formId id of the form
     * @param fieldName name of the field
     * @param fieldId id of the field
     * @param visualizationType the type of visualization
     */
    public Visualization(String formId, String fieldName, String fieldId, VisualizationType visualizationType) {
        this.formId = formId;
        this.fieldName = fieldName;
        this.fieldId = fieldId;
        this.visualizationType = visualizationType;
    }

    /**
     * Method to get the id of the form
     * @return String id
     */
    public String getFormId() {
        return formId;
    }

    /**
     * Method to set the id of the form
     * @param formId
     */
    public void setFormId(String formId) {
        this.formId = formId;
    }

    /**
     * Method to get the field name
     * @return String fieldName
     */
    public String getFieldName() {
        return fieldName;
    }

    /**
     * Method to set the field name
     * @param fieldName
     */
    public void setFieldName(String fieldName) {
        this.fieldName = fieldName;
    }

    /**
     * Method to get the id of the field
     * @return String fieldId
     */
    public String getFieldId() {
        return fieldId;
    }

    /**
     * Method to set the id of the field
     * @param fieldId
     */
    public void setFieldId(String fieldId) {
        this.fieldId = fieldId;
    }

    /**
     * Method to get the visualization type
     * @return
     */
    public VisualizationType getGraphType(){
        return this.visualizationType;
    }

    /**
     * Method to set the visualization type
     * @param visualizationType
     */
    public void setGraphType(VisualizationType visualizationType){
        this.visualizationType = visualizationType;
    }


}
