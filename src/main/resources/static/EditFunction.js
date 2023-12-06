$(document).ready(function(){
    //navigate to edit form page
    $("#editButton").click(function (){
        const formId = $(document).find("#formId_span").data("backend-id")
        window.location.replace("/editForm/" + formId);
    });
});

$(document).ready(function(){
    //navigate to edit form page
    $("#help").click(function (){
        const formId = $(document).find("#formId_span").data("backend-id")
        window.location.replace("/editForm/" + formId);
    });
});