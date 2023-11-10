/**
 * File handles all SPA actions by the Form
 */

$(document).ready(function () {
    let questionCount = 1; // first question added by default

    $('#addQuestion').click(function () {
        questionCount++;

        // each question has a div
        const questionDiv = $('<div>').addClass('question').attr('id', `question${questionCount}`);

        const questionLabel = $('<label>').attr('for', `questionTitle${questionCount}`).text(`Question ${questionCount}`);
        const questionInput = $('<input>').attr({
            type: 'text',
            id: `questionTitle${questionCount}`,
            name: `questionTitle${questionCount}`,
            placeholder: 'Enter Survey Question'
        });

        const fieldTypeElements= createFieldTypeElement(questionCount)

        questionDiv.append(questionLabel).append(questionInput).append('<br><br>').append(fieldTypeElements.label).append(fieldTypeElements.dropdown);
        $('#surveyForm').append(questionDiv);
    });

    $('#surveyForm').on('change', '[id^=fieldType]', function () {
        const selectedOption = $(this).val();
        const questionNumber = $(this).attr('id').match(/\d+/)[0];
        const parentDiv = $(this).closest('.question');
        const inputContainer = parentDiv.find('.inputContainer');

        if (selectedOption === 'number') {
            // TODO: show number field
        } else if (selectedOption === 'text') {
            // TODO: show text field
        } else if (selectedOption === 'multipleChoice') {
            const mcContainer = $('<div>'); // container for multiple choice options

            // initial two multiple choice options
            mcContainer.append(createMCOption(questionNumber, 1)).append(createMCOption(questionNumber, 2));
            inputContainer.append(mcContainer);

            // to add more choices
            const addChoiceBtn = $('<button>').text('Add Choice').click(function () {
                const optionCount = mcContainer.find('.mcOption').length + 1;
                mcContainer.append(createMCOption(optionCount));
                updateRemoveBtns(); // update remove buttons after addition
            });
            inputContainer.append(addChoiceBtn);
        }
    });

    function createFieldTypeElement(questionCount) {
        const fieldTypeLabel = $('<label>').attr('for', `fieldType${questionCount}`).text('Choose Field Type:');
        const fieldTypeDropdown = $('<select>').attr({
            id: `fieldType${questionCount}`,
            name: `fieldType${questionCount}`
        }).html(`
        <option value="text">Text Field</option>
        <option value="number">Number Field</option>
        <option value="multipleChoice">Multiple Choice</option>
    `);

        return {
            label: fieldTypeLabel,
            dropdown: fieldTypeDropdown
        };
    }

    // Function to create a multiple choice option
    function createMCOption(questionNumber, optionCount) {
        const mcOptionDiv = $('<div>').addClass('mcOption');
        const radioBtn = $('<input>').attr({
            type: 'radio',
            name: `mcOptions${questionNumber}`,
        });

        const optionInput = $('<input>').attr({
            type: 'text',
            name: `mcOption${questionNumber}_${optionCount}`,
            placeholder: 'Enter Choice'
        });

        const removeBtn = $('<button>').text('Remove Choice').prop('disabled', true).click(function () {
            $(this).closest('.mcOption').remove();
            updateRemoveButtons(); // update remove buttons after removal
        });

        mcOptionDiv.append(radioBtn, optionInput, removeBtn);
        return mcOptionDiv;
    }

    // Function to enable/disable remove buttons for MC options
    function updateRemoveButtons() {
        $('.mcOption').each(function (index) {
            const removeBtn = $(this).find('button');
            removeBtn.prop('disabled', index < 2);
        });
    }
})