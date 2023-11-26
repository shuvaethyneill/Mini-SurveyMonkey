$(document).ready(function() {

    $('#responseForm').submit(function (event) {
            event.preventDefault();

            const responseObj = {
                formId: $(document).find("#formId_span").data("backend-id"),
                responses: {}
            };

           $('.question').each(function () {
                           var backendId = $(this).data("backend-id")
                           var response;
                           if ($(this).find('input[type="radio"]').length > 0) {
                               response = $(this).find('input[type="radio"]:checked').siblings('label').text();
                           } else if ($(this).find('textarea').length > 0) {
                               response = $(this).find('textarea').val();
                           } else if ($(this).find('input[type="number"]').length > 0) {
                               console.log('help')
                               response = $(this).find('input[type="number"]').val();
                           }
                           console.log(backendId)
                           console.log(response)
                           responseObj.responses.backendId = response
                       });

            //TODO: post request "/submitResponse" takes ResponseObj

    })
})