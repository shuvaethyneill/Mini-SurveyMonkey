package org.MiniSurveyMonkey.Graphs;

import java.util.ArrayList;
import java.util.HashMap;

public class HistogramGraph extends Graph {
    private Integer upperBound;
    private Integer lowerBound;

    public HistogramGraph(String formId, String fieldName, String fieldId, Integer upperBound, Integer lowerBound) {
        super(formId, fieldName, fieldId, VisualizationType.HISTOGRAMGRAPH);
        this.lowerBound = lowerBound;
        this.upperBound = upperBound;
    }


    @Override
    public void calculateResponse(ArrayList<String> responses) {
        HashMap<String, Integer> responsesByQuantity = new HashMap<>();

        for (String r : responses) {
            responsesByQuantity.putIfAbsent(r, 0);
            responsesByQuantity.put(r, responsesByQuantity.get(r) + 1);
        }
        ArrayList<String> xLabels = new ArrayList<>(responsesByQuantity.keySet());

        ArrayList<String> yData = new ArrayList<>();
        for (Integer i : responsesByQuantity.values()) {
            yData.add(i.toString());
        }
        this.setxLabels(xLabels);
        this.setyData(yData);
    }
}
