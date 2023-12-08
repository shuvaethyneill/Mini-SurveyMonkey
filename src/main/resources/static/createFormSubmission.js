import {lowerStr, upperStr} from "./Form.js";

/**
 * Function to handle form fields submission
 * @param questionDiv
 * @returns {string}
 */
function getFieldType(questionDiv) {
    const selectedOption = questionDiv.find(`#fieldType${questionDiv.attr('id').match(/\d+/)[0]}`).val();
    switch (selectedOption) {
        case 'number':
            return 'NumberField';
        case 'multipleChoice':
            return 'MultipleChoiceField';
        case 'textField':
            return 'TextField';
        default:
            return '';
    }
}

function submitCreatedForm(formObject) {
    $.ajax({
        type: 'POST',
        url: '/submitForm',
        contentType: 'application/json',
        data: JSON.stringify(formObject),
        success: function (response) {
            console.log("Form submitted successfully. Response:", response);
            const formId = JSON.parse(response).FormId;
            location.href = `/submitFormConfirmation/${formId}`;

        },
        error: function (error) {
            console.error("Error submitting form:", error);
        }
    });
}


$(document).ready(function () {
    $('#myForm').submit(function (event) {
        event.preventDefault();
        const confirmed = window.confirm("Are you sure you want to submit the form?")
        if(confirmed) {
            const formTitle = $(`#formTitle`).val();
            const authorText = $('#author').text();

            // Extract the user value from the text content
            const userValue = authorText.replace('Author: ', '');

            const formObject = {
                formName: formTitle,
                author: userValue,
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
            submitCreatedForm(formObject);
        }
    })
});

export { getFieldType };