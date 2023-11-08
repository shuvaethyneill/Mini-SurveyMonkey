package org.MiniSurveyMonkey.Fields;

import org.springframework.data.mongodb.core.mapping.Document;
@Document("numberField")
public class NumberField extends Field{
    //range
    public NumberField(String question,String formId) {
        super(question,FieldType.NUMBER,formId);
    }
}
