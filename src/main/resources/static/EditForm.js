import {createQuestionDiv, updateDeleteQuestionButton} from "./questionUpdates.js";
import {createNumericalField, createTextField, createMCOption, updateRemoveChoiceButtons} from "./createField.js";
import {lowerStr, upperStr} from "./Form.js";
import {getFieldType} from "./createFormSubmission.js";


function renderEditForm(data) {
    data.forEach(function(field, index) {
        const questionNumber = index + 1;
        const questionDiv = createQuestionDiv(questionNumber); // Create a new question div

        // Populate question title
        questionDiv.find(`#questionTitle${questionNumber}`).val(field.question);
        const inputContainer = questionDiv.find('.inputContainer');
        // Identify the field type and populate accordingly
        switch (field['@type']) {
            case 'NumberField':
                questionDiv.find(`#fieldType${questionNumber}`).val('number');
                const lowerInput = createNumericalField(inputContainer, questionNumber, lowerStr);
                const upperInput = createNumericalField(inputContainer, questionNumber, upperStr);

                lowerInput.find('input').val(field.lowerBound);
                upperInput.find('input').val(field.upperBound);

                inputContainer.append(lowerInput, upperInput);
                break;
            case 'MultipleChoiceField':
                questionDiv.find(`#fieldType${questionNumber}`).val('multipleChoice');

                const fieldContainer = $('<div>');
                // Assuming createMCOption function exists and works similarly
                field.options.forEach(function(option, optionIndex) {
                    const mcOption = createMCOption(questionNumber, optionIndex + 1);
                    mcOption.find(`#mcOption${questionNumber}Text${optionIndex + 1}`).val(option);
                    inputContainer.append(mcOption);
                });

                // initial two multiple choice options
                const choiceContainer = $('<div>');

                // to add more choices
                const addChoiceBtn = $('<button>').text('+').click(function (event) {
                    event.preventDefault();
                    const optionCount = fieldContainer.find('.mcOption').length + 1;
                    choiceContainer.append(createMCOption(questionNumber, optionCount));
                    updateRemoveChoiceButtons(); // update remove buttons after addition
                }).addClass("mcAddChoiceButton");
                fieldContainer.append(choiceContainer)
                fieldContainer.append(addChoiceBtn);
                inputContainer.append(fieldContainer);
                break;

            case 'TextField':
                questionDiv.find(`#fieldType${questionNumber}`).val('textField');
                inputContainer.append(createTextField(questionNumber))
                // Populate text field value if available in 'field' object
                break;
            // Add other field types if needed
        }

        // Append the populated question div to the edit form container
        $('#inputContainer').append('<br>').append(questionDiv);
    });
}



$(document).ready(function() {
    var formId = $(document).find("#formId_span").data("backend-id");
    let formData;
    // Make an AJAX call to get the form data
    $.ajax({
        type: 'GET',
        url: '/getForm/' + formId,
        success: function (data) {
            // Handle the form information
            console.log('Form Info:', data);
            formData=data;
            renderEditForm(data.fields);
        },
        error: function (error) {
            console.error('Error retrieving form information:', error);
        }
    });

    $('#addQ').click(function(event) {
        event.preventDefault();

        const questionDiv = createQuestionDiv(++formData.fields.length);
        $('#surveyForm').append('<br><br>').append(questionDiv);
        updateDeleteQuestionButton();
    });

    $('#eForm').submit(function (event) {
        event.preventDefault();

        const confirmed = window.confirm("Are you sure you want to submit the form?")
        if(confirmed) {

            const formObject = {
                formName: formData.formName,
                author: formData.author,
                fields: []
            };

            $('.question').each(function () {
                const questionNumber = $(this).attr('id').match(/\d+/)[0];

                const fieldObject = {
                    '@type': getFieldType($(this)),
                    question: $(`#questionTitle${questionNumber}`).val(),
                };

                if (fieldObject['@type'] === 'NumberField') {
                    fieldObject.lowerBound = $(`#${questionNumber}${lowerStr}`).val();
                    fieldObject.upperBound = $(`#${questionNumber}${upperStr}`).val();
                }

                if (fieldObject['@type'] === 'MultipleChoiceField') {
                    fieldObject.options = [];

                    $(`.mcOption input[name=mcOption${questionNumber}Text]`).each(function () {
                        fieldObject.options.push($(this).val());
                    });
                }

                formObject.fields.push(fieldObject);
            });

            // Handle ajax call
            console.log(formObject);
            $.ajax({
                type: 'POST',
                url: '/submitForm',
                contentType: 'application/json',
                data: JSON.stringify(formObject),
                success: function (response) {
                    console.log("Form submitted successfully. Response:", response);
                    //delete the old form
                    $.ajax({
                        type: 'DELETE',
                        url: `/deleteForm/${formData.id}`,
                        success: function (response) {
                            console.log("Form deleted successfully:", response);
                            // Handle success response here, if needed
                        },
                        error: function (error) {
                            console.error("Error deleting form:", error);
                            // Handle error response here, if needed
                        }
                    });

                    const formId = JSON.parse(response).FormId;
                    const redirectUrl = `/form/${formId}`;
                    const link = `<a href="${redirectUrl}">Click here to view the form</a>`;
                    $('#submitMessage').html(`<p>Form ID: ${formId} - Form successfully created</p>${link}`);
                },
                error: function (error) {
                    console.error("Error submitting form:", error);
                }
            });

        }
    })


});


