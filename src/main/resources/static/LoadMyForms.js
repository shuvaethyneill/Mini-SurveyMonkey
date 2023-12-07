import {createFormLink} from "./createField.js";

function formList(forms){
        const formContainer = $("#allForms");

        $.each(forms, function(index, form){
            const fromLabel = $('<label>').attr('for',`${index + 1}`).text(`${index + 1}.${JSON.stringify(form)}`);
            const link = createFormLink(form);

            if (link.contents().length != 0) {
                fromLabel.css("display","block");
                formContainer.append(link);
            }

        });

}
$(document).ready(function(){
    let user = $('#author').text().split(':')[1].trim(); // Extracting the user part
    console.log(user)

    // Make an AJAX call with the retrieved user
    $.ajax({
        type: 'GET',
        url: '/getUserForms/' + user,
        success: function(response) {
            console.log('Forms retrieved:', response);
            // Process the retrieved forms
            formList(response)
        },
        error: function(xhr, status, error) {
            // Handle errors
            console.error('Error fetching forms:', error);
        }
    });

});