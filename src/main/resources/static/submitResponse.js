$(document).ready(function() {

    $('#responseForm').submit(function (event) {
            event.preventDefault();

            const responseObj = {
                formName: $(document).find("#formId_span").text(),
                responses: {}
            };

            $('.question').each(function () {

                //TODO: scrape response, responses dict format is - backend-id: response
                var backendId = $(this).data("backend-id")
//                responseObj.responses.backendId = SCRAPE RESPONSE FROM INPUT FIELD

            });

            //TODO: post request "/submitResponse" takes ResponseObj

        })
}