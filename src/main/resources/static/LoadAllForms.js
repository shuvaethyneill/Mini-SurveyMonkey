$(document).ready(function(){
    function createFormLink(form, link) {
        let formName = ""
        if (form.formName !== formName) {
            // Set the link text
            link.innerHTML = "Form: " + form.formName + ",Author: " + form.author + "<br><br>";
        } else {
            // Set the link text
            link.innerHTML = "Form: " + form.id + ",Author: " + form.author + "<br><br>";
        }
    }


    $('#search').keyup(function (){
        $("#result").html('');
        let searchField = $('#search').val();
        let expression = new RegExp(searchField, "i");
        $.getJSON('/getFormsRest', function(form){
            $.each(form,function (key,value){
                const searchBool = value.id.search(expression) !== -1 || value.formName.search(expression) !== -1;
                if(searchBool && expression.source !== '(?:)'){
                    console.log(expression.source)
                    console.log(value)
                    const redirectUrl = `/form/${value.id}`;
                    const link = document.createElement("a");
                    createFormLink(value, link)
                    link.href = redirectUrl;

                    $('#result').append(link);
                }
            });
        });
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

