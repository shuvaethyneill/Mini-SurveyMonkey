package org.MiniSurveyMonkey.Graphs;

import java.util.ArrayList;

/**
 * Abstract class to represent a graph
 */
public abstract class Graph extends Visualization {
    private ArrayList<String> xLabels;
    private ArrayList<String> yData;

    /**
     * Constructor for Graph
     * @param formId
     * @param fieldName
     * @param fieldId
     * @param visualizationType
     */
    public Graph(String formId, String fieldName, String fieldId, VisualizationType visualizationType) {
        super(formId, fieldName, fieldId, visualizationType);
    }

    /**
     * Method to get the list of xLabels
     * @return
     */
    public ArrayList<String> getxLabels() {
        return xLabels;
    }

    /**
     * Method to set the list of xLabels
     * @param xLabels
     */
    public void setxLabels(ArrayList<String> xLabels) {
        this.xLabels = xLabels;
    }

    /**
     * Method to get the list of yData
     * @return
     */
    public ArrayList<String> getyData() {
        return yData;
    }

    /**
     * Method to set the list of yData
     * @param yData
     */
    public void setyData(ArrayList<String> yData) {
        this.yData = yData;
    }

    /**
     * Method to calculate responses
     * @param responses
     */
    public abstract void calculateResponse(ArrayList<String> responses);

}
