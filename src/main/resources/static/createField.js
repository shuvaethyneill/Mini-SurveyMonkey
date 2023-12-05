
import { upperStr, lowerStr, questionCount } from './Form.js';
/**
 * Function to create field dropdown
 * @returns {{label: (*|jQuery), dropdown: (*|jQuery)}}
 */
function createFieldTypeElement() {
    const fieldTypeLabel = $('<label>')
        .attr('for', `fieldType${questionCount}`)
        .text('Choose Field Type: ');

    const fieldTypeDropdown = $('<select>').attr({
        id: `fieldType${questionCount}`,
        name: `fieldType${questionCount}`,
        required: 'required'
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

/**
 * Function to create numerical field specifying upper and lower bound
 * @param fieldContainer
 * @param questionNumber
 * @param type
 * @returns {*|jQuery|HTMLElement}
 */
function createNumericalField(fieldContainer, questionNumber, type) {
    const divForField = $('<div>')

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
        name: `mcQ${questionNumber}Radio`,
        id: `mcQ${questionNumber}Radio${optionCount}`,
        disabled: true
    });

    const optionInput = $('<input>').attr({
        type: 'text',
        name: `mcQ${questionNumber}Text`,
        id: `mcQ${questionNumber}Text${optionCount}`,
        placeholder: 'Enter Choice',
        required: 'true'
    });

    const removeButton = $('<button>').text('Remove').prop('disabled', true).click(function () {
        const questionContainer = $(this).closest('.question');
        $(this).closest('.mcOption').remove();
        updateRemoveChoiceButtons(questionNumber); // update remove buttons after removal
    });

    mcOptionDiv.append(radioBtn, optionInput, removeButton);
    return mcOptionDiv;
}

/**
 * Function to enable/disable remove buttons for MC options
 * @param questionNumber
 */
function updateRemoveChoiceButtons(questionNumber) {
    $('.question').each(function () {
        const mcOptions = $(this).find('.mcOption');
        const numOptions = mcOptions.length;

        mcOptions.each(function (index) {
            const removeButton = $(this).find('button');
            removeButton.prop('disabled', numOptions <= 2 && index < 2);
        });
    });
}

export {
    createFieldTypeElement,
    createNumericalField,
    checkNumericalValidity,
    createTextField,
    createMCOption,
    updateRemoveChoiceButtons
};
