package org.MiniSurveyMonkey.Graphs;

import java.util.ArrayList;
import java.util.HashMap;

/**
 * Class to represent the histogram graph
 */
public class HistogramGraph extends Graph {
    private Integer upperBound;
    private Integer lowerBound;

    /**
     * Constructor for HistogramGraph
     * @param formId
     * @param fieldName
     * @param fieldId
     * @param upperBound
     * @param lowerBound
     */
    public HistogramGraph(String formId, String fieldName, String fieldId, Integer upperBound, Integer lowerBound) {
        super(formId, fieldName, fieldId, VisualizationType.HISTOGRAMGRAPH);
        this.lowerBound = lowerBound;
        this.upperBound = upperBound;
    }

    /**
     * Overridden method to calculate the responses
     * @param responses
     */
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

    /**
     * get upperboud
     * @return upper bound
     */
    public Integer getUpperBound() {
        return upperBound;
    }

    /**
     * set the upper bound
     * @param upperBound Integer
     */
    public void setUpperBound(Integer upperBound) {
        this.upperBound = upperBound;
    }

    /**
     * get lower bound
     * @return lower bound
     */
    public Integer getLowerBound() {
        return lowerBound;
    }

    /**
     * sets the lower bound
     * @param lowerBound Integer
     */
    public void setLowerBound(Integer lowerBound) {
        this.lowerBound = lowerBound;
    }
}
