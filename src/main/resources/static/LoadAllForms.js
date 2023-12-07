import { createFormLink } from './createField.js';

$(document).ready(function(){


    /*
    debounce technique to prevent multiple rapid executions of your event handler
    Debouncing involves introducing a delay before the actual execution of the function.
    If another event occurs within this delay, the timer resets.
     */
    let timeout;
    $('#search').keyup(function (){
        clearTimeout(timeout);
        const timeoutDelay = 300;
        timeout = setTimeout(function() {
            $("#result").html('');
            let searchField = $('#search').val();
            let expression = new RegExp(searchField, "i");
            $.getJSON('/getFormsRest', function (form) {
                $.each(form, function (key, value) {
                    const searchBool = value.id.search(expression) !== -1 || value.formName.search(expression) !== -1;
                    if (searchBool && expression.source !== '(?:)') {
                        const redirectUrl = `/form/${value.id}`;
                        const link = document.createElement("a");
                        createFormLink(value, link)
                        link.href = redirectUrl;
                        $('#result').append(link);
                    }
                });
            });
        },timeoutDelay);

    });
    $.ajax({
        type:'GET',
        url:'/getFormsRest',
        success: function(forms) {

            // Handle the form information
            injectFields(forms)

        },
        error: function(error) {
            // Handle errors
            console.error('Error retrieving form information:', error);
        }
    });



    function injectFields(forms){
        const formContainer = $("#formsContainer");

        $.each(forms, function(index, form){
            const fromLabel = $('<label>').attr('for',`${index + 1}`).text(`${index + 1}.${JSON.stringify(form)}`);
            const redirectUrl = `/form/${form.id}`;

            // Create an anchor element
            const link = document.createElement("a");

            // Set the href attribute with the dynamic variable
            link.href = redirectUrl;
            createFormLink(form, link);


            fromLabel.css("display","block");
            formContainer.append(link);
        });

    }
});

