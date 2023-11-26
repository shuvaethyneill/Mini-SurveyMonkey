$(document).ready(function(){
    function closeFrom(formId) {
        $.ajax({
            type: 'POST',
            url: '/closeForm',
            data: {formId: formId},
            success: function (data) {
                // Handle the form information
                console.log('Form Information:', data);
                $('#closeButton').remove()
                $('#formContainer').append('<p>Form is closed</p>');
                $('#responseForm').remove();
            },
            error: function (error) {
                // Handle errors
                console.error('Error retrieving form information:', error);
            }
        });
    }

    $("#closeButton").click(function (){
        console.log("hi")

        const formId = $(document).find("#formId_span").text()
        const requestData = {formId: formId}
        let formUser = $('#author').text();
        formUser = formUser.replace('Author: ', '')

        $.ajax({
            type: 'GET',
            url: '/getUser',
            success: function (data){
                console.log('Active user: ' ,data)
                if (formUser === data){

                    closeFrom(formId);
                }
            },
            error: function(error) {
                // Handle errors
                console.error('Error retrieving form information:', error);
            }
        })


    });
});