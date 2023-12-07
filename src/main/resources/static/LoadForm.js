$(document).ready(function() {
    var formId = $(document).find("#formId_span").data("backend-id")
    console.log(formId)
    var formClosed = true
    $.ajax({
        type: 'GET',
        url: '/getForm/' + formId,
        success: function(data) {
            // Handle the form information
            console.log('Form Information:', data);
            const existingText = $('#author').text()
            $('#author').text(existingText+ data.author)
            getActiveUser()
                .then(function(user) {

                    if (data.author !== user){
                        $('#closeButton').remove()
                        $('#deleteFormButton').remove()
                        $('#editButton').remove()
                    }
                })
                .catch(function(error) {
                    console.error('Error:', error);
                });

            if (!data.closed){
                injectFields(data)
            }
            else{
                $('#closeButton').remove()
                $('#editButton').remove()
                $('#responseForm').remove();
                $('#formContainer').append('<p>Form is closed</p>');
            }
        },
        error: function(error) {
            // Handle errors
            console.error('Error retrieving form information:', error);
        }
    });

    // Delete form button functionality
    $(document).on('click', '#deleteFormButton', function () {
        console.log("delete button clicked")
        deleteForm(formId);
    });

    function injectFields(form) {
        var fields = form.fields

        const questionsContainer = $("#questionsContainer")
        $.each(fields, function(index, field) {
            // Label
            const questionLabel = $('<label>').addClass("questionTitle").attr('for', `${index + 1}`).text(`${index + 1}. ${field.question}`);
            questionLabel.css("display","block");

            const fieldContainer = $("<div>").attr({
                id: "field-" + (field.question).replace(" ", "-")
            }).addClass("question").data("backend-id", field.id)

            fieldContainer.append(questionLabel)
            //checking which input type
            if (field.fieldType === "TEXT") {
                fieldContainer.append(buildTextField(field))
            } else if (field.fieldType === "MC") {
                fieldContainer.append(buildMCField(field, index))
            } else {
                console.log("numerical field")
                fieldContainer.append(buildNumericalField(field))
            }
            questionsContainer.append(fieldContainer,'<br>')
        })
    }

    function buildTextField(fieldInfo) {
        return $('<textarea>').attr({
            type:'textArea',
            id: fieldInfo.question + fieldInfo.id,
            name: fieldInfo.question + fieldInfo.id,
            rows:'5',
            cols: '50',
            placeholder: 'Enter answer here'
        });
    }

    function buildMCField(fieldInfo, index) {
        const mcFieldContainer = $('<div>');

        const options = fieldInfo.options || [];

        options.forEach(function (option, count) {
            var optionDiv = $('<div>').addClass('mcOptionDiv')
            const radioBtn = $('<input>').attr({
                type: 'radio',
                name: fieldInfo.question + fieldInfo.id,
                id: 'Q'+ (index + 1) + 'Option' + (count + 1),
                value: option
            });

            const optionLabel = $('<label>').addClass("mcLabel").attr('for', 'Q'+ (index + 1) + 'Option' + (count + 1)).text(option);

            optionDiv.append(radioBtn, optionLabel);
            mcFieldContainer.append(optionDiv)
        });
        return mcFieldContainer;
    }

    function buildNumericalField(fieldInfo) {
        return $('<input>').attr({
            type: 'number',
            id: fieldInfo.question + fieldInfo.id,
            name: fieldInfo.question + fieldInfo.id,
        }).addClass("numericField").on("input", function() {
            const input = parseInt($(this).val(), 10)
            if ((fieldInfo.lowerBound != null && input < fieldInfo.lowerBound) ||
                (fieldInfo.upperBound != null && input > fieldInfo.upperBound)) {
                updateErrorStatus($(this), true)
            } else {
                updateErrorStatus($(this), false)
            }
        })
    }

    function updateErrorStatus(field, error) {
        if (error) {
            field.css("outline", "auto");
            field.css("outline-color", "red");
            field.focus(function() {
                field.css("outline-color", "red")
            });
        } else {
            field.css({
                'outline': ''
            });
            field.focus(function() {
                field.css({
                    'outline': ''
                });
            });
        }
    }
});

function getActiveUser(){
    return new Promise(function(resolve, reject) {
        $.ajax({
            type: 'GET',
            url: '/getUser',
            success: function(data) {
                // Resolve the Promise with the data
                resolve(data);
            },
            error: function(error) {
                // Handle errors
                console.error('Error retrieving form information:', error);
                // Reject the Promise with the error
                reject(error);
            }
        });
    });
}

function deleteForm(id) {
    $.ajax({
        type: 'DELETE',
        url: '/deleteForm/' + id,
        success: function (data) {
            // redirect to the delete form confirmation page
            window.location.replace("/deleteFormConfirmation");
        },
        error: function (error) {
            console.error('Error deleting form:', error);
        }
    });
}