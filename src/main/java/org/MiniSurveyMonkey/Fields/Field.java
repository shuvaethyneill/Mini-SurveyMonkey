package org.MiniSurveyMonkey.Fields;
import org.springframework.data.annotation.Id;
public abstract class Field {
    @Id
    private long id;

    private String question;

    public Field(String question){
        this.question = question;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }
}
