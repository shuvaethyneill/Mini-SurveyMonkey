$(document).ready(function(){
    $.ajax({
        type:'GET',
        url:'/getFormsRest',
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
    function injectFields(){

    }
});

