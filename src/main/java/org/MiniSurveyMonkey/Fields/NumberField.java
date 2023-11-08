package org.MiniSurveyMonkey.Fields;

import org.springframework.data.mongodb.core.mapping.Document;
@Document("numberField")
public class NumberField extends Field {
    private Integer upperBound;
    private Integer lowerBound;

    public NumberField(String question, Integer upperBound, Integer lowerBound) {
        super(question, FieldType.NUMBER);
        this.lowerBound = lowerBound;
        this.upperBound = upperBound;
    }

    /**
     * upper bound getter
     * @return upper bound
     */
    public Integer getUpperBound() {
        return upperBound;
    }

    /**
     * upper bound setter
     * @param newUpper
     */
    public void setUpperBound(Integer newUpper) throws Exception {
        if(isValidRange(this.lowerBound, newUpper)) {
            this.upperBound = newUpper;
        } else {
            throw new Exception("bad range");
        }
    }

    /**
     * lower bound getter
     * @return lower bound
     */
    public Integer getLowerBound() {
        return lowerBound;
    }

    /**
     * lower bound setter
     * @param newLower
     */
    public void setLowerBound(Integer newLower) throws Exception {
        if(isValidRange(newLower, this.upperBound)) {
            this.lowerBound = newLower;
        } else {
            throw new Exception("bad range");
        }
    }

    /**
     * check validity of new range
     * @return
     */
    private boolean isValidRange(Integer lowerBound, Integer upperBound) {
        if (upperBound == null || lowerBound == null) {
            return true;
        } else {
            return lowerBound <= upperBound;
        }
    }
}
