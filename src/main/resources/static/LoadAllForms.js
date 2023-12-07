$(document).ready(function(){
    $('#result').hide()
    function createFormLink(form) {
        let formName = ""
        const link = $('<div>').addClass("formLink");
        const redirectUrl = `/form/${form.id}`;
        if (form.formName !== formName) {
            var formNameHeader = $('<a>').attr('href',redirectUrl).append($('<h3>').addClass("formTitle").text("Form: " + form.formName))
            var author = $('<h3>').addClass("authorName").text("By: " + form.author)
            link.append(formNameHeader, author)
        }
        return link;
    }


    /**
    debounced to avoid duplicate results in search
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
                        var link = createFormLink(value)
                        if (link.contents().length != 0) {
                            $('#result').append(link);
                        }
                    }
                });
                if ($('#result').contents().length > 0) {
                    $('#result').show()
                } else {
                    $('#result').hide()
                }
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
});

