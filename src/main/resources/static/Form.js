/**
 * File handles all SPA actions by the Form
 */

const upperStr = "_upper";
const lowerStr = "_lower";
let questionCount = 1; // first question added by default

$(document).ready(function () {
    //let questionCount = 1; // first question added by default

    $('#addQuestion').click(function(event) {
        questionCount++;
        event.preventDefault();

        const questionDiv = createQuestionDiv();
        $('#surveyForm').append('<br><br>').append(questionDiv);
    });

    $('#surveyForm').on('change', '[id^=fieldType]', function () {
        const selectedOption = $(this).val();
        const questionNumber = $(this).attr('id').match(/\d+/)[0];
        const parentDiv = $(this).closest('.question');
        const inputContainer = parentDiv.find('.inputContainer');

        inputContainer.empty();

        const fieldContainer = $('<div>');

        if (selectedOption === 'number') {
            fieldContainer.append(createNumericalField(fieldContainer, questionNumber, lowerStr))
            fieldContainer.append(createNumericalField(fieldContainer, questionNumber, upperStr))
        } else if (selectedOption === 'text') {
            fieldContainer.append(createTextField(questionNumber))
        } else if (selectedOption === 'multipleChoice') {
            // initial two multiple choice options
            fieldContainer.append(createMCOption(questionNumber, 1), createMCOption(questionNumber, 2));

            // to add more choices
            const addChoiceBtn = $('<button>').text('Add Choice').click(function (event) {
                event.preventDefault();
                const optionCount = fieldContainer.find('.mcOption').length + 1;
                fieldContainer.append(createMCOption(questionNumber, optionCount));
                updateRemoveButtons(); // update remove buttons after addition
            });
            inputContainer.append('<br>', addChoiceBtn);
        }

        inputContainer.append('<br>', fieldContainer);
    });
})

function createQuestionDiv() {
    // each question has a div
    const questionDiv = $('<div>').addClass('question').attr('id', `question${questionCount}`);

    const questionLabel = $('<label>').attr('for', `questionTitle${questionCount}`).text(`Question ${questionCount} `);
    const questionInput = $('<input>').attr({
        type: 'text',
        id: `questionTitle${questionCount}`,
        name: `questionTitle${questionCount}`,
        placeholder: 'Enter Survey Question',
        required: 'true'
    });

    // Add a delete button
    const deleteQuestionButton = $('<button>').text('Delete Question').click(function () {
        $(this).closest('.question').prevAll('br').slice(0, 2).remove();
        questionDiv.remove();
        // Adjust question numbers in other elements
        updateQuestionNumbers();
    });

    const fieldTypeElements = createFieldTypeElement();
    const inputContainer = $('<div>').addClass('inputContainer');

    questionDiv.append(questionLabel,questionInput, deleteQuestionButton, '<br><br>', fieldTypeElements.label, fieldTypeElements.dropdown,inputContainer);

    return questionDiv;
}

function updateQuestionNumbers() {
    questionCount--;
    $('.question').each(function (index) {
        const questionNumber = index + 1;

        // update question div id
        $(this).attr('id', `question${questionNumber}`);
        $(this).find('label[for^="questionTitle"]').attr('for', `questionTitle${questionNumber}`).text(`Question ${questionNumber} `);

        // Update question title input ID and name
        $(this).find('input[id^=questionTitle]').attr({
            id: `questionTitle${questionNumber}`,
            name: `questionTitle${questionNumber}`
        });

        // Update field type dropdown ID and name
        $(this).find('label[for^="fieldType"]').attr('for', `fieldType${questionNumber}`)
        $(this).find('select[id^=fieldType]').attr({
            id: `fieldType${questionNumber}`,
            name: `fieldType${questionNumber}`
        });

        // Update numerical field IDs and names
        $(this).find('input[type="number"]').each(function () {
            const numericType = $(this).attr('id').includes(upperStr) ? upperStr : lowerStr;
            $(this).attr({
                id: `${questionNumber}${numericType}`,
                name: `${questionNumber}${numericType}`
            });
        });

        // Update text area ID and name
        $(this).find('textarea[id^=textField]').attr({
            id: `textField${questionNumber}`,
            name: `textField${questionNumber}`
        });

        // Update MC option IDs and names
        $(this).find('input[id^=mcOption]').each(function () {
            const optionType = $(this).attr('id').includes('Text') ? 'Text' : 'Radio';
            const matchResult = $(this).attr('id').match(/\d+(?=${optionType})/);
            const optionCount = matchResult ? parseInt(matchResult[0]) : 0;

            $(this).attr({
                name: `mcOption${questionNumber}${optionType}`,
                id: `mcOption${questionNumber}${optionType}${optionCount}`
            });
        });
    });
}

function createFieldTypeElement() {
    const fieldTypeLabel = $('<label>')
        .attr('for', `fieldType${questionCount}`)
        .text('Choose Field Type: ');

    const fieldTypeDropdown = $('<select>').attr({
        id: `fieldType${questionCount}`,
        name: `fieldType${questionCount}`
    }).html(`
        <option value="text">Select a Field Type</option>
        <option value="text">Text Field</option>
        <option value="number">Number Field</option>
        <option value="multipleChoice">Multiple Choice</option>
    `);

    return {
        label: fieldTypeLabel,
        dropdown: fieldTypeDropdown
    };
}

function createNumericalField(fieldContainer, questionNumber, type) {
    const divForField = $('<div>')

    const label = (type == upperStr ? 'Upper bound ' : 'Lower bound ')
    divForField.append($('<label>').text(label))
    divForField.append(
        $('<input>').attr({
            type: 'number',
            id: questionNumber + type,
            name: questionNumber + type,
            placeholder: '(Optional)'
        }).on("input", checkNumericalValidity(fieldContainer, questionNumber)))

    return divForField
}

function createTextField(questionNumber) {
    const textFieldDiv = $('<div>').addClass('textField');
    const textArea = $('<textarea>').attr({
        type: 'textArea',
        id: `textField${questionNumber}`,
        name: `textField${questionNumber}`,
        rows: '5',
        cols: '50',
        readOnly: true,
        placeholder: 'User answer would go here'
    });
    $(textArea).css("resize", "none")
    textFieldDiv.append(textArea);
    return textFieldDiv;
}

// Function to create a multiple choice option
function createMCOption(questionNumber, optionCount) {
    const mcOptionDiv = $('<div>').addClass('mcOption');
    const radioBtn = $('<input>').attr({
        type: 'radio',
        name: `mcOption${questionNumber}Radio`,
        id: `mcOption${questionNumber}Radio${optionCount}`,
        disabled: true
    });

    const optionInput = $('<input>').attr({
        type: 'text',
        name: `mcOption${questionNumber}Text`,
        id: `mcOption${questionNumber}Text${optionCount}`,
        placeholder: 'Enter Choice',
        required: 'true'
    });

    const removeButton = $('<button>').text('Remove').prop('disabled', true).click(function () {
        $(this).closest('.mcOption').remove();
        updateRemoveButtons(); // update remove buttons after removal
    });

    mcOptionDiv.append(radioBtn, optionInput, removeButton);
    return mcOptionDiv;
}

// Function to enable/disable remove buttons for MC options
function updateRemoveButtons() {
    $('.question').each(function () {
        const mcOptions = $(this).find('.mcOption');
        const numOptions = mcOptions.length;

        mcOptions.each(function (index) {
            const removeButton = $(this).find('button');
            removeButton.prop('disabled', numOptions <= 2 && index < 2);
        });
    });
}

function checkNumericalValidity(fieldContainer, questionNumber) {
    return function () {
        const lower = fieldContainer.find('#' + questionNumber + lowerStr);
        const upper = fieldContainer.find('#' + questionNumber + upperStr);
        const lowerValue = parseInt(lower.val(), 10);
        const upperValue = parseInt(upper.val(), 10);

        if (!isNaN(lowerValue) && !isNaN(upperValue) && lowerValue > upperValue) {
            upper.css("outline", "auto");
            lower.css("outline", "auto");
            upper.css("outline-color", "red");
            lower.css("outline-color", "red");
            upper.focus(function () {
                upper.css("outline-color", "red");
            });
            lower.focus(function () {
                lower.css("outline-color", "red");
            });
        } else {
            upper.css({
                'outline': ''
            });
            lower.css({
                'outline': ''
            });
            upper.focus(function () {
                upper.css({
                    'outline': ''
                });
            });
            lower.focus(function () {
                lower.css({
                    'outline': ''
                });
            });
        }
    };
}

//to handle form submission
function getFieldType(questionDiv) {
    const selectedOption = questionDiv.find(`#fieldType${questionDiv.attr('id').match(/\d+/)[0]}`).val();
    if (selectedOption === 'number') {
        return 'NumberField';
    } else if (selectedOption === 'multipleChoice') {
        return 'MultipleChoiceField';
    } else if (selectedOption === 'text') {
        return 'TextField';
    }
    return '';
}

$(document).ready(function () {
    $('#myForm').submit(function (event) {
        event.preventDefault();

        const formObject = {
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
                fieldObject.selectedOption = ''; //blank for now because we didn't acc select anything

                $(`.mcOption input[name=mcOption${questionNumber}Text]`).each(function () {
                    fieldObject.options.push($(this).val());
                });
            }

            formObject.fields.push(fieldObject);
        });

        //handle ajax call
        $.ajax({
            type: 'POST',
            url: '/submitForm',
            contentType: 'application/json',
            data: JSON.stringify(formObject),
            success: function (response) {
                console.log("Form submitted successfully. Response:", response);
                const formId = JSON.parse(response).FormId;
                const redirectUrl = `/form/${formId}`;
                const link = `<a href="${redirectUrl}">Click here to view the form</a>`;
                $('#submitMessage').html(`<p>Form ID: ${formId} - Form successfully created</p>${link}`);
            },
            error: function (error) {
                console.error("Error submitting form:", error);
            }
        });
    })
});