package org.MiniSurveyMonkey.Graphs;

import java.util.ArrayList;

public class PieGraph extends Graph{

    private ArrayList<String> xLabels;

    private ArrayList<String> yData;

    public PieGraph() {
        super(GraphType.PIEGRAPH);
    }

    public ArrayList<String> getxLabels() {
        return xLabels;
    }

    public void setxLabels(ArrayList<String> xLabels) {
        this.xLabels = xLabels;
    }

    public ArrayList<String> getyData() {
        return yData;
    }

    public void setyData(ArrayList<String> yData) {
        this.yData = yData;
    }

    @Override
    public void calculateResponse(ArrayList<String> responses) {

    }
}
