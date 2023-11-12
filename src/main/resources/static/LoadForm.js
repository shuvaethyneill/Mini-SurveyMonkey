$(document).ready(function() {
    var formId = $(document).find("#formId_span").text()
    console.log(formId)
    $.ajax({
        type: 'GET',
        url: '/getForm/' + formId,
        success: function(data) {
            // Handle the form information
            console.log('Form Information:', data);
            injectFields(data)
        },
        error: function(error) {
            // Handle errors
            console.error('Error retrieving form information:', error);
        }
    });

    function injectFields(form) {
        fields = form.fields
        const questionsContainer = $("#questionsContainer")
        $.each(fields, function(index, field) {
            // Label
            const questionLabel = $('<label>').attr('for', `${index + 1}`).text(`${index + 1}. ${field.question}`);
            questionLabel.css("display","block");

            const fieldContainer = $("<div>").attr({
                id: "field-" + (field.question).replace(" ", "-")
            })

            fieldContainer.append(questionLabel)
            //checking which input type
            if (field.fieldType === "TEXT") {
                fieldContainer.append(buildTextField(field))
                //TODO
            } else if (field.fieldType === "MC") {
                console.log("mc field")
                //TODO
            } else {
                console.log("numerical field")
                fieldContainer.append(buildNumericalField(field))
            }
            questionsContainer.append(fieldContainer)
        })
    }

    function buildTextField(fieldInfo){
        return textField = $('<textarea>').attr({
            type:'textArea',
            id: fieldInfo.question + fieldInfo.id,
            name: fieldInfo.question + fieldInfo.id,
            rows:'5',
            cols: '50',
            placeholder: 'User answer would go here'
        });
    }

    function buildNumericalField(fieldInfo) {
        return numericalField = $('<input>').attr({
            type: 'number',
            id: fieldInfo.question + fieldInfo.id,
            name: fieldInfo.question + fieldInfo.id,
        }).on("input", function() {
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