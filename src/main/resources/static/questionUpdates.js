import { upperStr, lowerStr, questionCount } from './Form.js';
import { createFieldTypeElement } from './createField.js';

/**
 * Function to create a specific question div and its initial contents
 * @returns {*|jQuery}
 */
function createQuestionDiv(question) {
    var questionNumber = (question === undefined) ? questionCount : question;
    // each question has a div
    const questionDiv = $('<div>').addClass('question').attr('id', `question${questionNumber}`);

    const questionHeaderDiv = $('<div>').addClass('questionHeader').attr('id', `question${questionNumber}`);
    const questionLabel = $('<label>').attr('for', `questionTitle${questionNumber}`).text(`Question ${questionNumber}`).addClass("questionTitle");
    const questionInput = $('<input>').attr({
        type: 'text',
        id: `questionTitle${questionNumber}`,
        name: `questionTitle${questionNumber}`,
        placeholder: 'Enter Survey Question',
        required: 'true'
    }).addClass("questionTitleInput");


    // add a delete button
    const deleteQuestionButton = $('<button>').addClass('deleteButton').attr('name', 'deleteQuestion').text('X');

    const fieldTypeElements = createFieldTypeElement(questionNumber);
    const inputContainer = $('<div>').addClass('inputContainer');

    questionHeaderDiv.append(questionLabel,questionInput, deleteQuestionButton, fieldTypeElements.dropdown);
    questionDiv.append(questionHeaderDiv,inputContainer)
    return questionDiv;
}

/**
 * Function to update attributes and labels for the remaining questions
 * after a question has been deleted
 */
function updateQuestionNumbers() {
    $('.question').each(function (index) {
        const questionNumber = index + 1;

        // Update question div id and question label
        $(this).attr('id', `question${questionNumber}`);
        $(this).find('label[for^="questionTitle"]').attr('for', `questionTitle${questionNumber}`).text(`Question ${questionNumber} `);

        // Update question title input id and name
        $(this).find('input[id^=questionTitle]').attr({
            id: `questionTitle${questionNumber}`,
            name: `questionTitle${questionNumber}`
        });

        // Update field type dropdown id and name
        $(this).find('label[for^="fieldType"]').attr('for', `fieldType${questionNumber}`)
        $(this).find('select[id^=fieldType]').attr({
            id: `fieldType${questionNumber}`,
            name: `fieldType${questionNumber}`
        });

        // Update numerical field ids and names
        $(this).find('input[type="number"]').each(function () {
            const numericType = $(this).attr('id').includes(upperStr) ? upperStr : lowerStr;
            $(this).attr({
                id: `${questionNumber}${numericType}`,
                name: `${questionNumber}${numericType}`
            });
        });

        // Update textfield id and name
        $(this).find('textarea[id^=textField]').attr({
            id: `textField${questionNumber}`,
            name: `textField${questionNumber}`
        });

        // Update MC option ids and names
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

    updateDeleteQuestionButton();
}

/**
 * Function to enable/disable a delete question button
 */
function updateDeleteQuestionButton() {
    const deleteButtons = $('[name="deleteQuestion"]');

    // disable if there is only one, otherwise enable it
    deleteButtons.prop('disabled', $('.question').length === 1);
}

export { createQuestionDiv, updateQuestionNumbers, updateDeleteQuestionButton, createFieldTypeElement };

