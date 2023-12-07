
import { upperStr, lowerStr, questionCount } from './Form.js';
/**
 * Function to create field dropdown
 * @returns {{label: (*|jQuery), dropdown: (*|jQuery)}}
 */
function createFieldTypeElement(question) {
var questionNumber = (question === undefined) ? questionsCount : question

    const fieldTypeDropdown = $('<select>').attr({
        id: `fieldType${questionNumber}`,
        name: `fieldType${questionNumber}`,
    }).addClass("selectFieldType").html(`
        <option value="text">Select a Field Type</option>
        <option value="textField">Text Field</option>
        <option value="number">Number Field</option>
        <option value="multipleChoice">Multiple Choice</option>
    `).prop('required', true);;

    return {
        dropdown: fieldTypeDropdown
    };
}

/**
 * Function to create numerical field specifying upper and lower bound
 * @param fieldContainer
 * @param questionNumber
 * @param type
 * @returns {*|jQuery|HTMLElement}
 */
function createNumericalField(fieldContainer, questionNumber, type) {
    const divForField = $('<div>').addClass("numericField")

    const label = (type === upperStr ? 'Upper bound ' : 'Lower bound ')
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

/**
 * Function to create a sample textfield
 * @param questionNumber
 * @returns {*|jQuery}
 */
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

/**
 * Function to create a multiple choice field with options
 * @param questionNumber
 * @param optionCount
 * @returns {*|jQuery}
 */
function createMCOption(questionNumber, optionCount) {
    const mcOptionDiv = $('<div>').addClass('mcOption');
    const radioBtn = $('<input>').attr({
        type: 'radio',
        name: `mcOption${questionNumber}Radio`,
        id: `mcOption${questionNumber}Radio${optionCount}`,
        disabled: true
    }).addClass("mcChoiceRadio");

    const optionInput = $('<input>').attr({
        type: 'text',
        name: `mcOption${questionNumber}Text`,
        id: `mcOption${questionNumber}Text${optionCount}`,
        placeholder: 'Enter Choice',
        required: 'true'
    }).addClass("mcChoiceInput");

    const removeButton = $('<button>').addClass("removeChoice").text('X').prop('disabled', true).click(function () {
        $(this).closest('.mcOption').remove();
        updateRemoveChoiceButtons(); // update remove buttons after removal
    });

    mcOptionDiv.append(radioBtn, optionInput, removeButton);
    return mcOptionDiv;
}

/**
 * Function to enable/disable remove buttons for MC options
 */
function updateRemoveChoiceButtons() {
    $('.question').each(function () {
        const mcOptions = $(this).find('.mcOption');
        const numOptions = mcOptions.length;

        mcOptions.each(function (index) {
            const removeButton = $(this).find('button');
            removeButton.prop('disabled', numOptions <= 2 && index < 2);
        });
    });
}

/**
 * Function to check if the provided upper and lower bounds are valid
 * @param fieldContainer
 * @param questionNumber
 * @returns {(function(): void)|*}
 */
function checkNumericalValidity(fieldContainer, questionNumber) {
    return function () {
        const lower = fieldContainer.find('#' + questionNumber + lowerStr);
        const upper = fieldContainer.find('#' + questionNumber + upperStr);
        const lowerValue = parseInt(lower.val(), 10);
        const upperValue = parseInt(upper.val(), 10);

        const isInvalid = !isNaN(lowerValue) && !isNaN(upperValue) && lowerValue > upperValue;

        // iterate over lower and upper input to apply styling
        [lower, upper].forEach(input => {
            const color = isInvalid ? 'red' : '';
            input.css({ outline: isInvalid ? 'auto' : '', 'outline-color': color });

            input.focus(function () {
                input.css({ 'outline-color': color });
            });
        });
    };
}

function createFormLink(form, link) {
    let formName = ""
    if (form.formName !== formName) {
        // Set the link text
        link.innerHTML = "Form: " + form.formName + ",Author: " + form.author + "<br><br>";
    } else {
        // Set the link text
        link.innerHTML = "Form: " + form.id + ",Author: " + form.author + "<br><br>";
    }
}

export {
    createFieldTypeElement,
    createNumericalField,
    checkNumericalValidity,
    createTextField,
    createMCOption,
    createFormLink,
    updateRemoveChoiceButtons
};
