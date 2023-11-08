package org.MiniSurveyMonkey.Fields;
import org.springframework.data.annotation.Id;


public abstract class Field {
    @Id
    protected String id;

    private String formId;

    private FieldType fieldType;

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

    public FieldType getFieldType() {
        return fieldType;
    }

    public void setFieldType(FieldType fieldType) {
        this.fieldType = fieldType;
    }

    public String getFormId() {
        return formId;
    }

    public void setFormId(String formId) {
        this.formId = formId;
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
