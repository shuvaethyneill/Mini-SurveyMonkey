import {createQuestionDiv} from "./questionUpdates.js";
import {createNumericalField, createTextField, createMCOption, updateRemoveChoiceButtons} from "./createField.js";
import {lowerStr, upperStr} from "./Form.js";


function renderEditForm(data) {

    data.forEach(function(field, index) {
        const questionNumber = index + 1;
        console.log(questionNumber)
        const questionDiv = createQuestionDiv(questionNumber); // Create a new question div

        // Populate question title
        questionDiv.find(`#questionTitle${questionNumber}`).val(field.question);

        // Identify the field type and populate accordingly
        switch (field['@type']) {
            case 'NumberField':
                questionDiv.find(`#fieldType${questionNumber}`).val('number');
                const lowerInput = createNumericalField(questionDiv, questionNumber, lowerStr);
                const upperInput = createNumericalField(questionDiv, questionNumber, upperStr);

                lowerInput.find('input').val(field.lowerBound);
                upperInput.find('input').val(field.upperBound);

                questionDiv.append(lowerInput, upperInput);
                break;
            case 'MultipleChoiceField':
                questionDiv.find(`#fieldType${questionNumber}`).val('multipleChoice');

                // to add more choices
                const addChoiceBtn = $('<button>').text('Add Choice').click(function (event) {
                    event.preventDefault();
                    const optionCount = questionDiv.find('.mcOption').length + 1;
                    questionDiv.append(createMCOption(questionNumber, optionCount));
                    updateRemoveChoiceButtons(); // update remove buttons after addition
                });
                questionDiv.append('<br>', addChoiceBtn);
                
                // Assuming createMCOption function exists and works similarly
                field.options.forEach(function(option, optionIndex) {
                    const mcOption = createMCOption(questionNumber, optionIndex + 1);
                    mcOption.find(`#mcQ${questionNumber}Text${optionIndex + 1}`).val(option);
                    questionDiv.append(mcOption);
                });



                break;

            case 'TextField':
                questionDiv.find(`#fieldType${questionNumber}`).val('textField');
                questionDiv.append(createTextField(questionNumber))
                // Populate text field value if available in 'field' object
                break;
            // Add other field types if needed
        }

        // Append the populated question div to the edit form container
        $('#inputContainer').append('<br>').append(questionDiv);
    });
}



$(document).ready(function() {
    console.log("helpme please 123")
    var formId = $(document).find("#formId_span").data("backend-id");
    console.log("helpme please ")
    // Make an AJAX call to get the form data
    $.ajax({
        type: 'GET',
        url: '/getForm/' + formId,
        success: function (data) {
            // Handle the form information
            console.log('Form Info:', data);
            renderEditForm(data.fields);
        },
        error: function (error) {
            console.error('Error retrieving form information:', error);
        }
    });
});


