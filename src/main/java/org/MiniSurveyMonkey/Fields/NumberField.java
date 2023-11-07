package org.MiniSurveyMonkey.Fields;

import org.springframework.data.mongodb.core.mapping.Document;
@Document("numberField")
public class NumberField extends Field{

    public NumberField(String question) {
        super(question,FieldType.NUMBER);
    }
}
