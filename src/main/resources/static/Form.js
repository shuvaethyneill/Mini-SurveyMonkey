/**
 * File handles all SPA actions by the Form
 */

import { createQuestionDiv, updateQuestionNumbers, updateDeleteQuestionButton } from './questionUpdates.js';
import { createNumericalField, createTextField, createMCOption, updateRemoveChoiceButtons } from './createField.js';

const upperStr = "_upper";
const lowerStr = "_lower";
let questionCount = 1; // first question added by default

$(document).ready(function () {

    // Add question button functionality
    $('#addQuestion').click(function(event) {
        questionCount++;
        event.preventDefault();

        const questionDiv = createQuestionDiv();
        $('#surveyForm').append('<br><br>').append(questionDiv);
        updateDeleteQuestionButton();
    });

    // Delete question button functionality
    $('body').on('click', '[name=deleteQuestion]', function() {
        questionCount--;
        const questionDiv = $(this).closest('.question')
        const isFirstQuestion = questionDiv.prevAll('.question').length === 0;
        const brElements = isFirstQuestion ? questionDiv.nextAll('br').slice(0, 2) : questionDiv.prevAll('br').slice(0, 2);

        brElements.remove();
        questionDiv.remove();

        updateQuestionNumbers(); //adjust formatting for questions
    });

    // Field dropdown functionality
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
        } else if (selectedOption === 'textField') {
            fieldContainer.append(createTextField(questionNumber))
        } else if (selectedOption === 'multipleChoice') {
            // initial two multiple choice options
            const choiceContainer = $('<div>');
            choiceContainer.append(createMCOption(questionNumber, 1), createMCOption(questionNumber, 2));

            // to add more choices
            const addChoiceBtn = $('<button>').text('+').click(function (event) {
                event.preventDefault();
                const optionCount = fieldContainer.find('.mcOption').length + 1;
                choiceContainer.append(createMCOption(questionNumber, optionCount));
                updateRemoveChoiceButtons(); // update remove buttons after addition
            }).addClass("mcAddChoiceButton");
            fieldContainer.append(choiceContainer)
            fieldContainer.append(addChoiceBtn);
        }

        inputContainer.append('<br>', fieldContainer);
    });

    // Reset button functionality
    $('#myForm').on('reset', function () {
        $('#formTitle').val('');

        // Remove all question divs except the first one
        $('.question:not(:first)').remove();
        questionCount = 1
        const firstQuestion = $('#question1');
        // Reset the first question
        firstQuestion.find('select').val('');
        firstQuestion.find('.inputContainer').empty();

        updateQuestionNumbers()
        $('#surveyForm > br').slice(2).remove();
    });
})

export { upperStr, lowerStr, questionCount };