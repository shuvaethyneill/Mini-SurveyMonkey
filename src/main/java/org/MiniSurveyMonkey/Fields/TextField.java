package org.MiniSurveyMonkey.Fields;

public class TextField extends Field{



    private String content;

    public TextField (String question, String input){
        super(question, FieldType.TEXT);
        this.content = input;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
