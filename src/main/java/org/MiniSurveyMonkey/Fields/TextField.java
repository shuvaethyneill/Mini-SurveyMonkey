package org.MiniSurveyMonkey.Fields;

public class TextField extends Field{

    private String input;

    public TextField (String question, String input){
        super(question);
        this.input = input;
    }
}
