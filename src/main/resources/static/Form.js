/**
 * File handles all SPA actions by the Form
 */

$(document).ready(function () {
    let questionCount = 1; // first question added by default

    $('#addQuestion').click(function (event) {
        questionCount++;
        event.preventDefault();

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

        const inputContainer = $('<div>').addClass('inputContainer');

        questionDiv.append(questionLabel).append(questionInput).append('<br><br>').append(fieldTypeElements.label).append(fieldTypeElements.dropdown);
        questionDiv.append(inputContainer);
        $('#surveyForm').append('<br><br>').append(questionDiv);
    });

    $('#surveyForm').on('change', '[id^=fieldType]', function () {
        const selectedOption = $(this).val();
        const questionNumber = $(this).attr('id').match(/\d+/)[0];
        const parentDiv = $(this).closest('.question');
        const inputContainer = parentDiv.find('.inputContainer');

        inputContainer.empty();

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
            const addChoiceBtn = $('<button>').text('Add Choice').click(function (event) {
                event.preventDefault();
                const optionCount = mcContainer.find('.mcOption').length + 1;
                mcContainer.append(createMCOption(questionNumber, optionCount));
                updateRemoveButtons(); // update remove buttons after addition
            });
            inputContainer.append('<br>').append(addChoiceBtn);
        }
    });

    function createFieldTypeElement(questionCount) {
        const fieldTypeLabel = $('<label>').attr('for', `fieldType${questionCount}`).text('Choose Field Type:');
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

    // Function to create a multiple choice option
    function createMCOption(questionNumber, optionCount) {
        const mcOptionDiv = $('<div>').addClass('mcOption');
        const radioBtn = $('<input>').attr({
            type: 'radio',
            name: `mcOption${questionNumber}`,
        });

        const optionInput = $('<input>').attr({
            type: 'text',
            name: `mcOption${questionNumber}Text`,
            placeholder: 'Enter Choice'
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
})