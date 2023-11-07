package org.MiniSurveyMonkey.Fields;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("textfield")
public class TextField extends Field{


    private String content;


    public TextField(String question, String content){
        super(question,FieldType.TEXT);
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
                "id=" + super.id +
                ", content='" + content + '\'' +
                '}';
    }
}
