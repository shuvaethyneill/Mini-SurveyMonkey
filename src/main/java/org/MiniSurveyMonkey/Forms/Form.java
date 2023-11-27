package org.MiniSurveyMonkey.Forms;

import org.MiniSurveyMonkey.Fields.Field;
import org.MiniSurveyMonkey.Graphs.Visualization;
import org.MiniSurveyMonkey.Response;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

/**
 * Class to represent a Form
 */
@Document(collection = "Form")
public class Form {

    @Id
    private String id;

    private ArrayList<Field> fields;

    private ArrayList<Response> responses;

    private String formName;

    private String author;

    private boolean closed;

    private ArrayList<Visualization> visualizations;


    /**
     * Default constructor
     */
    public Form(){
        this("","");
    }

    /**
     * Coonstructor for Form
     * @param formName , name of form
     * @param author , author of form
     */
    public Form(String formName, String author) {
        this.formName = formName;
        this.author = author;
        fields = new ArrayList<>();
        responses = new ArrayList<>();
        closed = false;
        this.visualizations = new ArrayList<>();
    }

    /**
     * Method to add a field to the fields list
     * @param field
     */
    public void addField(Field field){
        this.fields.add(field);
    }

    /**
     * Method to add a response to the responses list
     * @param response
     */
    public void addResponse(Response response){
        this.responses.add(response);
    }

    /**
     * Method to remove a field
     * @param field
     */
    public void removeField(Field field){this.fields.remove(field);}

    /**
     * Method to remove a response
     * @param response
     */
    public void removeResponse(Response response){this.fields.remove(response);}

    /**
     * Method to get the id of the form
     * @return
     */
    public String getId() {
        return id;
    }

    /**
     * Method to set the id of the form
     * @param id
     */
    public void setId(String id) {
        this.id = id;
    }

    /**
     * Method to get the fields in the form
     * @return
     */
    public ArrayList<Field> getFields() {
        return fields;
    }

    /**
     * Method to set the fields in the form
     * @param fields
     */
    public void setFields(ArrayList<Field> fields) {
        this.fields = fields;
    }

    /**
     * Method to get the form responses
     * @return
     */
    public ArrayList<Response> getResponses() {
        return responses;
    }

    /**
     * Method to set the responses of the form
     * @param responses
     */
    public void setResponses(ArrayList<Response> responses) {
        this.responses = responses;
    }

    /**
     * Method to get the form name (title)
     * @return
     */
    public String getFormName() {
        return formName;
    }

    /**
     * Method to set the form name (title)
     * @param formName
     */
    public void setFormName(String formName) {
        this.formName = formName;
    }

    /**
     * Method to get the author of the form
     * @return
     */
    public String getAuthor() {
        return author;
    }

    /**
     * Method to set the author of the form
     * @param author
     */
    public void setAuthor(String author) {
        this.author = author;
    }

    /**
     * Method to check if the form is closed
     * @return
     */
    public boolean isClosed() {
        return closed;
    }

    /**
     * Method to set the form to be closed
     * @param closed
     */
    public void setClosed(boolean closed) {
        this.closed = closed;
    }

    /**
     * Method to get the list of visualizations
     * @return
     */
    public ArrayList<Visualization> getGraphs() {
        return visualizations;
    }

    /**
     * Method to add a visualization
     * @param visualization
     */
    public void addVisualization(Visualization visualization) {
        this.visualizations.add(visualization);
    }

    /**
     * Method to set the list of visualizations
     * @param visualizations
     */
    public void setGraphs(ArrayList<Visualization> visualizations) {
        this.visualizations = visualizations;
    }

    /**
     * Overriden toString method to represent the form object as a String
     * @return
     */
    @Override
    public String toString() {
        return "Form{" +
                "id='" + id + '\'' +
                ", fields=" + fields +
                ", responses=" + responses +
                ", formName='" + formName + '\'' +
                ", author='" + author + '\'' +
                ", closed=" + closed +
                '}';
    }
}
