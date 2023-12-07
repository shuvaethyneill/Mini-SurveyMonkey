$(document).ready(function(){
    function closeForm(formId) {
        $.ajax({
            type: 'POST',
            url: '/closeForm',
            data: {formId: formId},
            success: function (data) {
                // Handle the form information
                console.log('Form Information:', data);
                $('#closeButton').remove()
                var contentDiv = $('<div>').addClass('content')
                var viewGraphsLink = '/form/' + formId
                contentDiv.append("<p>Form is closed. <span class='graphsLink'><a href="+ viewGraphsLink + ">See Metrics</a></span></p>")
                $('#formContainer').append(contentDiv);

                $('#responseForm').remove();
            },
            error: function (error) {
                // Handle errors
                console.error('Error retrieving form information:', error);
            }
        });
    }

    $("#closeButton").click(function (){
        var formId = $(document).find("#formId_span").data("backend-id")
        const requestData = {formId: formId}
        let formUser = $('#author').text();
        formUser = formUser.replace('Author: ', '')

        $.ajax({
            type: 'GET',
            url: '/getUser',
            success: function (data){
                console.log('Active user: ' ,data)
                if (formUser === data){

                    closeForm(formId);
                }
            },
            error: function(error) {
                // Handle errors
                console.error('Error retrieving form information:', error);
            }
        })
    });
});