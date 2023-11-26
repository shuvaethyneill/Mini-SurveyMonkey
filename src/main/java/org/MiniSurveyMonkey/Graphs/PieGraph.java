package org.MiniSurveyMonkey.Graphs;

import java.util.ArrayList;

public class PieGraph extends Graph {


    public PieGraph(String formId, String fieldName, String fieldId) {
        super(formId, fieldName, fieldId, VisualizationType.PIEGRAPH);
    }

    @Override
    public void calculateResponse(ArrayList<String> responses) {

    }
}
