package org.MiniSurveyMonkey.Graphs;

import org.MiniSurveyMonkey.Response;

import java.util.ArrayList;

public class PieGraph extends Graph {

    private ArrayList<String> options;


    public PieGraph(String formId, String fieldName, String fieldId, ArrayList<String> options) {
        super(formId, fieldName, fieldId, VisualizationType.PIEGRAPH);
        this.options = options;
    }

    @Override
    public void calculateResponse(ArrayList<String> responses) {
        setxLabels(this.options);

        int total = options.size();
        ArrayList<String> amounts = new ArrayList<>();
        for(int i = 0; i<total; i++){
            int counter = 0;
            for (String ans : responses){
                if (ans.equals(options.get(i))){
                    counter += 1;
                }
            }
            amounts.add(Integer.toString(counter));
        }

        this.setyData(amounts);
    }
}
