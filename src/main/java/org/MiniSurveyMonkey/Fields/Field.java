package org.MiniSurveyMonkey.Fields;
import org.springframework.data.annotation.Id;


public abstract class Field {
    @Id
    private long id;

    public Enum<FieldType> fieldType;

    private String question;

    public Field(String question, FieldType fieldType){
        this.question = question;
        this.fieldType= fieldType;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public Enum<FieldType> getFieldTypeEnum() {
        return fieldType;
    }

    @Override
    public String toString() {
        return "Field{" +
                "id=" + id +
                ", fieldType=" + fieldType +
                ", question='" + question + '\'' +
                '}';
    }
}
