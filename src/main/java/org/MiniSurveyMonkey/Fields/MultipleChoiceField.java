package org.MiniSurveyMonkey.Fields;

import org.springframework.data.mongodb.core.mapping.Document;

@Document("mcField")
public class MultipleChoiceField extends Field{


    public MultipleChoiceField(String question) {
        super(question, FieldType.MC);
    }
}
