package org.MiniSurveyMonkey.Fields;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("textfield")
public class TextField {


    @Id
    private String id;

    private String content;

    private String question;
    public TextField(String question, String content){
        this.question = question;
        this.content = content;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Override
    public String toString() {
        return "TextField{" +
                "id=" + id +
                ", content='" + content + '\'' +
                '}';
    }
}
