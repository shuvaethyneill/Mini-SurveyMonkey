package org.MiniSurveyMonkey.Graphs;


public abstract class Visualization {

    private String formId;

    private String fieldName;

    private String fieldId;

    private VisualizationType visualizationType;

    public Visualization(String formId, String fieldName, String fieldId, VisualizationType visualizationType) {
        this.formId = formId;
        this.fieldName = fieldName;
        this.fieldId = fieldId;
        this.visualizationType = visualizationType;
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

    public VisualizationType getVisualizationType() {
        return visualizationType;
    }

    public void setVisualizationType(VisualizationType visualizationType) {
        this.visualizationType = visualizationType;
    }
}
